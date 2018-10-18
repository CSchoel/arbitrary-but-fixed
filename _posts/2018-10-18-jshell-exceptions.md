---
layout: post
title:  "Unit tests for JShell code with the jdk.jshell module"
description: >
    Using the jdk.jshell module of the java API it is possible to evaluate jshell code from a normal java application.
    I did this to build a JUnit test for an e-learning platform and encountered some interesting quirks and an actual bug in the API.
categories: teaching java jshell
---

## Introduction

The JShell is the [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for Java that was introduced in Java 9.
Although it has some [peculiarities]({{ site.baseurl }}{% post_url 2017-12-15-jshell-peculiarities %}), it is very useful to test small snippets of Java code, which makes it a great tool for teaching Java to programming novices.

There are some interesting projects that build on the JShell. For example, you can now create a [Jupyter notebook](http://jupyter.org/) with a [Java kernel](https://github.com/SpencerPark/IJava).
This is possible, because you can interact with the JShell from a normal java application using the classes in the module [`jdk.jshell`](https://docs.oracle.com/javase/10/docs/api/jdk.jshell-summary.html) in the Java API.

Since I am using an e-learning tool based on unit tests for my lectures, I wanted to be able to test JShell code from a normal JUnit test.
In this post I want to guide you to the process of building the base class for these tests and discuss the quirks of the API that may confuse the user at first glance.

## Evaluate JShell code

So we want to interact with a JShell from our code.
The first thing that we need is an instance of the class `jdk.jshell.JShell` that you can obtain as follows.

```java
JShell shell = JShell.create();
```

It is important to note that the modules beginning with `jdk` are (as the name suggests) part of the JDK, but are not present in the JRE. This means that you will need to run your application using the `java` executable from the JDK and not the one in your JRE directory.

Now that we have the JShell instance, the obvious method to evaluate JShell code is [`JShell.eval(String)`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/JShell.html#eval(java.lang.String)).

```java
List<SnippetEvent> events = shell.eval("int x = 1;");
```

The return type `List<SnippetEvent>` suggests, that eval is able to evaluate multiple JShell snippets in one go, but this is misleading. To cite the docs:

> The input should be exactly one complete snippet of source code, that is, one expression, statement, variable declaration, method declaration, class declaration, or import. To break arbitrary input into individual complete snippets, use [SourceCodeAnalysis.analyzeCompletion(String)](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/SourceCodeAnalysis.html#analyzeCompletion(java.lang.String)).

So for example if you call `shell.eval("int x = 1;int y = 0;")` only the first statement `int x = 1;` will be evaluated while the second part is simply ignored.
You can confirm this with the following code:

```java
shell.eval("int x = 1;int y = 0;");
shell.variables().map(x -> x.name()).forEach(System.out::println);
```

This will only print `x` on a single line, while the next example will print both variables `x` and `y`:

```java
shell.eval("int x = 1;");
shell.eval("int y = 0;");
shell.variables().map(x -> x.name()).forEach(System.out::println);
```

If you want to evaluate a larger file with several lines of JShell code, as is the case for our JUnit scenario, you will have to use [`SourceCodeAnalysis.analyzeCompletion(String)`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/SourceCodeAnalysis.html#analyzeCompletion(java.lang.String)) as suggested by the documentation.
Note that the previous example also shows that it is not enough to just evaluate the file line by line with `eval`, because a single line of code may contain multiple snippets.

This is another example where the JShell API is a little bit confusing.
One would expect to have a method that simply splits a large string into snippets.
`analyzeCompletion` kind of does that, but not directly.
Instead, you have to setup a loop like the following:

```java
String str = "int x = 1;int y = 0;";
SourceCodeAnalysis sca = shell.sourceCodeAnalysis();
List<String> snippets = new ArrayList<>();
do {
    SourceCodeAnalysis.CompletionInfo info = sca.analyzeCompletion(str);
    snippets.add(info.source());
    str = info.remaining();
} while (str.length() > 0);
```

Although the documentation for `analyzeCompletion` states that it will "evaluate if it [the snippet] is complete", the source snippet actually is *not* passed to `JShell.eval` automatically.
Instead, you have to call `JShell.eval` yourself, which allows you to collect the `SnippetEvent`s that are triggered by the code.
The following code does this to collect a flat list of `SnippetEvents` for all the snippet strings contained in the list `snippets`.

```java
List<SnippetEvent> ev = snippets.stream().map(shell::eval)
  .flatMap(List::stream).collect(Collectors.toList());
```

## Retreive expression results from the JShell

Now that we know how to pass code to the JShell, the next question is how can we get variable and expression values out of the JShell into our test code?

Well, first of all we can use `JShell.eval` again, since [`SnippetEvent`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/SnippetEvent.html) has a method [`value()`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/SnippetEvent.html#value()) which returns a String representation of the value of the evaluated expression.

```java
String isEqualXY = shell.eval("x == y").get(0).value();
```

In this example `ìsEqualXY` will have the value `"false"`.
This already allows to build the typical JUnit tests with methods such as `assertEquals` or `assertTrue`.
On top of that, you can also inspect some static aspects of the code such as variable types.

```java
VarSnippet varX = shell.variables().filter(x -> "x".equals(x.name()))
    .findFirst().get();
String typeX = varX.typeName();
```

Similar methods exist for retrieving methods, giving access to parameter types and the full signature, and type declarations.

## Get compiler messages and exceptions

Up until now we have only considered what happens when the code passed to `JShell.eval` is syntactically correct and does not throw any exceptions.
Of course we want to also get that information from the JShell when we are building a unit test.

The exceptions are actually quite easy to get as there is a Method [`SnippetEvent.exception()`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/SnippetEvent.html#exception()) that returns the exception thrown by a given snippet if there was any.

The exception will either be a [`UnresolvedReferenceException`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/UnresolvedReferenceException.html) or a [`EvalException`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/EvalException.html).
`UnresolvedReferenceException`s capture warnings by the JShell that a method was called that has references to another method, type or variable that has not yet been declared.

```java
shell.eval("int foo() { return bla; }"); // variable bla is not yet defined
JShellException ex = shell.eval("foo()").get(0).exception();
throw ex; // "Attempt to use definition snippet with unresolved references"
```

All regular exceptions that would also be thrown from normal Java code are wrapped in an `EvalException`.
This is necessary, because the original exception class may not even be loaded in the host JVM that calls `exception()`.
For these exceptions, you can access the original class name of the exception with the method [`EvalException.getExceptionClassName()`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/EvalException.html#getExceptionClassName()).

This covers errors that occur during runtime.
For static errors that occur during compile time the procedure is a little bit more complicated.
With the method [`JShell.diagnostics(Snippet)`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/JShell.html#diagnostics(jdk.jshell.Snippet)) you can get a stream of [`Diag`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/Diag.html) objects, that capture an compiler messages for a given snippet.

```java
Snippet s = shell.eval("int x = 0l;").get(0).snippet();
shell.diagnostics(s).forEach(
  d -> System.out.println(d.getMessage(Locale.getDefault()))
);
// prints "incompatible types: possible lossy conversion from long to int"
```

Apart from the error message, `Diag` objects also provide access to the location of the error in characters from the beginning of the snippet code string.

## Improving feedback

So far, so well. The JShell API gives us access to everything we need to build comprehensive unit tests.
Especially for java novices, however, the raw feedback that we can provide with the API might not be that helpful.
For example, if a method has ten or more lines of code, the diagnostic for a syntax error may say that this error is located from character 541 to character 549 of that method snippet.
This is not very human readable in itself.
The stacktrace of an `EvalException` at least shows some line numbers, but they do not refer to global line numbers in the source file but local line numbers inside the respective snippet.
Instead of the file name you therefore see the numeric snippet id in front of the line number.

```text
Exception in thread "main" jdk.jshell.UnresolvedReferenceException: Attempt to use
definition snippet with unresolved references
	at .foo(#4:3)
	at .(#5:1)
```

Here, `#4` refers to the snippet `int foo() { return bla; }` that defines the method `foo` and `#5` refers to the snippet `foo()` that calls said method.
This is not immediately recognizable for a novice - especially if he or she just turned in one complete file to the e-learning application.

Fortunately, we can augment the error messages and stack traces with global line numbers.
For this, we need a `Map<String,Integer>`, that maps from the unique snippet id (which can be obtained by the method [`Snippet.id()`](https://docs.oracle.com/javase/10/docs/api/jdk/jshell/Snippet.html#id())) to the line number where this snippet starts in the source file.

```java
Map<String, Integer> globalLineNumbers = new HashMap<>();
int lnr = 0;
for(String source: snippets) {
    List<SnippetEvent> events = shell.eval(source);
    for(SnippetEvent e: events) {
        globalLineNumbers.putIfAbsent(e.snippet().id(), lnr);
    }
    lnr += source.split("\\n|(\\r\\n?)").length - 1;
}
```

For `Diag` objects the conversion of line numbers is straightforward, since we can retrieve the character position of the error and the source string of the snippet from the JShell instance.
For exceptions the case is a little bit trickier, but since we use the snippet id in our map, we can use the methods [`getStackTrace()`](https://docs.oracle.com/javase/10/docs/api/java/lang/Throwable.html#getStackTrace()) and [`setStackTrace(StackTraceElement[])`](https://docs.oracle.com/javase/10/docs/api/java/lang/Throwable.html#setStackTrace(java.lang.StackTraceElement%5B%5D)) of the `Throwable` interface.
We can also throw our own exception and pass the original `JShellException` as the cause so that the student is able to locate the error both within the unit test and within his or her own code.

With this, we can create error messages such as this one (for static errors)

```text
Compiler error in following snippet:
##### Snippet start #####
 1|if (true) {
 2|	float y = 10f;
 3|	int x = 0l;
 4|}
###### Snippet end ######
Error start: Line   3 (  3 in source), character  10
Error end  : Line   3 (  3 in source), character  12
Message:
incompatible types: possible lossy conversion from long to int
```

or this one (for dynamic exceptions; note that for JUnit tests the stack trace is much longer than in this example)

```text
Exception in thread "main" JShellTestException: An java.lang.NullPointerException
occurred during the execution of your JShell code.

Hint: To find out, which test failed you can look at the next entry
after the method 'expressionResult'. If 'expressionResult' is not in
the stack trace, this means the exception was triggered directly from
your code. In both cases you will find the source of the actual
exception in your JShell code by scrolling down until you find a line
that says 'Caused by: ...'.
	at JShellTest.testJShellExceptions(JShellTest.java:142)
	at JShellTest.main(JShellTest.java:112)
Caused by: jdk.jshell.EvalException
	at .myMethod(input.jshell:4)
	at .(input.jshell:6)
```

This leaves us only with one remaining problem: The line numbers of `JShellExceptions` can sometimes be false.
This is an actual bug in the JShell that can be demonstrated in the shell itself by the following example:

```jshell
jshell> if (true) {
   ...>   int x = 10;
   ...>   int y = 10 / 0;}
|  java.lang.ArithmeticException thrown: / by zero
|        at (#1:1)
```

The message says the exception occurred on line one, but in the multiline snippet that we entered, the error that caused the exception is actually on line three.

Funny enough, a single additional newline "fixes" this problem, but I have yet to find any consistent pattern when this error occurs and when it does not.

```jshell
jshell> if (true) {
   ...>   int x = 10;
   ...>   int y = 10 / 0;
   ...> }
|  java.lang.ArithmeticException thrown: / by zero
|        at (#2:3)
```

When you scroll back up to the example with the `UnresolvedReferenceException`, you will notice that this exception also was reported on line 3 in a snippet that has only one line.
Until this bug is fixed, it is unfortunately not possible to provide reliable global line numbers for JShell exceptions.
I submitted a [bug report](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8212167) to Oracle.
You may check the link to see if this issue has been fixed.