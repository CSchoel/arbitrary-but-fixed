---
layout: post
title:  "The peculiarities of the JShell"
description: >
    The JShell is a great tool for learning Java and experimenting with the language, but it has some pitfalls and it breaks with the principle of least astonishment.
date:   2017-12-15 00:24 +0200
categories: teaching java jshell
---

## Java 9 and the JShell

Java 9 is a blessing for teachers in computer science because of the JShell - a [Read-eval-print loop (REPL)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for Java. It encourages experimentation and drastically reduces the time it takes to demonstrate an example.

What happens if you add `Double.POSITIVE_INFINITY` to `Double.NEGATIVE_INFINITY`? Before the JShell you would have to write this code to answer your question:

```java
package oop.examples;
public class Infinities {
    public static void main(String[] args) {
        System.out.println(Double.POSITIVE_INFINITY + Double.NEGATIVE_INFINITY);
    }
}
```

Then you would have to find a way to execute this code in your IDE which may present you with well over a hundred menus and buttons to click.

Now you can simply type this in your favorite console:

```
C:\Users\Kylar>jshell
|  Welcome to JShell -- Version 9.0.1
|  For an introduction type: /help intro

jshell> Double.POSITIVE_INFINITY + Double.NEGATIVE_INFINITY
$1 ==> NaN
```

However, there are several pitfalls when working with the JShell that can be confusing if they are not explained properly (and some still remain confusing after explanation).
This post will dive into the sources of strangeness that I encountered so far and tries to remedy some of the confusion.

## REPL me timbers!

Java was never designed as a REPL language.
As you see in the first example, the only top level language elements are classes and interfaces.
Methods, statements and expressions only have meaning if they are embedded in a surrounding context.
The JShell has both to adhere to this syntactic constraint and to break it to be productive.
If it does not adhere with the normal Java syntax, the code that we write in it would not be Java.
However, if it does not break with the constraint, we would loose the benefit of being able to test small snippets on their own.

The Java developers came up with a clever solution to this problem, that is rarely noticeable, but may lead to confusion for students in some cases:
**Everything that we write in the JShell actually is considered to be part of a class definition.**

This JShell code

```java
System.out.println("Hello Java");
int x = 0;
x + 7
System.out.println(x);
```

is totally equivalent to the following regular Java code:

```java
class REPL {
    static { System.out.println("Hello Java"); }
    static int x = 0;
    static int $1 = x + 7;
    static { System.out.println(x); }
}
```

An expression that returns a value will be saved in a generated variable of the type of that value; a variable declaration will introduce a static variable; and a statement that returns `void` will have the same effect as a static initialization block (and yes, you can have more than one of these - try it out with the JShell :wink:).

This already explains most of the peculiarities of the JShell, such as the following example:

```
jshell> int x; System.out.println(x);
x ==> 0
0
jshell> { int y; System.out.println(y); }
|  Error:
|  variable y might not have been initialized
|  { int y; System.out.println(y); }
|                              ^
```

After the translation it becomes apparent that `x` is a class variable that is initialized with `0` while `y` is a local variable, that has no implicit initialization:

```java
class REPL {
    static int x;
    static { System.out.println(x); }
    static { int y; System.out.println(y); }
}
```

## Sacrifices to the god of Replacements

In a REPL you will try out things - and you will make many mistakes that you want to correct.
In Java you cannot define a variable or method twice in the same class.
The JShell therefore allows to *replace* variables, methods, classes and interfaces with new definitions.
This goes so far that existing instances of a replaced class will be reset to `null` to avoid potential conflicts.

```
jshell> class A {}
|  created class A

jshell> A obj = new A();
obj ==> A@64bf3bbf

jshell> class A { int x; }
|  replaced class A
|    update replaced variable obj, reset to null
```

This, however, means that we have to break the aforementioned equivalence to the class definition, since this is perfectly legal JShell code:

```
int x = 7;
System.out.println(x + 3);
String x = "I am X";
System.out.println(x);
```

but this will result in an error:

```java
class REPL {
    static int x = 7;
    static { System.out.println(x + 3); }
    static String x = "I am X";
    static { System.out.println(x); }
}
```

## Incremental nightmares

In Java you can easily define a function `foo()` that uses another function `bar()` which is defined later within the class.
To recreate this behavior, the JShell has to allow incremental definitions - that is definitions which contain as of yet undefined variables, classes, interfaces or methods.
You can see an example in the following snippet:

```
jshell> void foo() { bar(); }
|  created method foo(), however, it cannot be invoked until method bar() is dec
lared

jshell> foo();
|  attempted to call method foo() which cannot be invoked until method bar() is
declared

jshell> void bar() { System.out.println("Hello Bar!"); }
|  created method bar()

jshell> foo();
Hello Bar!
```

Now this can also happen by accident. Consider the following example:

```
jshell> void foo() { Sting.format("foo%d", 10); }
|  created method foo(), however, it cannot be invoked until variable Sting is d
eclared
```

It seems that the author wanted to write `String.format` but actually missed the `r`.
The JShell, however, cannot distinguish this case from the case where the user wants to access a variable called `Sting`, that will be defined later in the code.

In this case, the problem is not *that* confusing, since the JShell at least produces a helpful message, but combined with the next issue it can get ugly.

## /open Sesame.java

The JShell is mostly built for executing small code examples, but even small examples may be tedious to type if they contain method or class definitions that span multiple lines.
One missed typo in that class definition and you can start from scratch.
To remedy this issue, the JShell has the command `/open` with which you can load code snippets.

Unfortunately `/open` is rather quiet, showing only the result of errors or actual print commands on the console.
On the one hand, this is nice, because you do not get a wall of text each time you load a larger file.
On the other hand, this behavior can hide errors.

Consider the following example file `test.java`:

```java
float foo() {
    int x = 10;
    return f(x);
}
float bar() {
    int x;
    return f(x);
}
```

```
jshell> /open test.java
|  Error:
|  cannot find symbol
|    symbol:   method f(int)
|      return f(x);
|             ^
|  Error:
|  variable x might not have been initialized
|      return f(x);
|               ^
```

This is a nice example, because I confused myself when writing it.
It looks like the first function definition fails because of the `cannot find symbol` error and the second one fails because of the uninitialized variable `x`.
However, if you paste the code directly in the JShell, you will see that actually the first function definition works but remains incomplete and both errors belong ot the second definition.

```
jshell> float foo() {
   ...>     int x = 10;
   ...>     return f(x);
   ...> }
|  created method foo(), however, it cannot be invoked until method f(int) is de
clared

jshell> float bar() {
   ...>     int x;
   ...>     return f(x);
   ...> }
|  Error:
|  cannot find symbol
|    symbol:   method f(int)
|      return f(x);
|             ^
|  Error:
|  variable x might not have been initialized
|      return f(x);
|               ^
```

The JShell swallows all information about a file except for the actual errors and print commands.
Since the semantics of opening a file is that of subsequently typing all the snippets in the file in the JShell, it would make more sense to be able to see the individual result of each of the snippets.
At least there should be an option like `-v` (which shows you the type of the generated variables) to tell the JShell to report these incremental changes.
As it is, I currently prefer to type my code in a text editor but then copy and paste it to the JShell to see the effects.

## Do not touch my private parts

Quick quiz: What is the problem in this code snippet?

```java
class A {
  private class B { }
  public B foo() { return new B(); }
}
```

You may think that the method `foo()` does something illegal: It exposes an instance of a private inner class to the outside world.
And the JShell gives evidence that this is indeed a problem:

```
jshell> new A().foo()
|  Error:
|  A.B has private access in A
|  new A().foo()
|  ^
```

However, what about this:

```
jshell> Object o = new A().foo()
o ==> A$B@520a3426
```

Actually, the definition of class `A` is perfectly legal and you can use the method `foo` wherever you have an instance of this class.
The only thing that you *cannot* do is to use the private class `B` as a type outside of class `A`.
Let's do our conversion form JShell to "normal" Java again:

```java
class REPL {
  static class A {
    private class B { }
    public B foo() { return new B(); }
  }
  static A.B $1 = new A().foo();
}
```

The problem is not that you are not allowed to call `new A().foo()`, but that the code that generates the variable `$1` uses an illegal type for the variable.

## One final oddness: Class names

This last point is a little specific, but it is probably the most baffling one.
Just look at the following snippet in the JShell:

```
jshell> class Test {}
|  created class Test

jshell> String name = Test.class.getName()
name ==> "Test"

jshell> "Test".equals(name)
$3 ==> false
```

.... What? We learned that the `equals`-Method compares the content of objects.
So why should one String with the content `"Test"` be different from another string with the same content?

The reason for this becomes a little more apparent when we ask more about the properties of the String object - it's length for example.

```
jshell> name.length()
$4 ==> 20
```

Ok, we can agree that `"Test"` should not be 20 characters long.
Something seems to be amiss, so let's take apart the String:

```
jshell> name.toCharArray()
$5 ==> char[20] { 'R', 'E', 'P', 'L', '.', '$', 'J', 'S', 'h', 'e', 'l', 'l', '$
', '1', '1', '$', 'T', 'e', 's', 't' }
```

And here we have the proof that the JShell treats every variable, method and class defined at the top level as a member of another class - and the reason why I chose the name `REPL` for my class in the previous examples:
The actual full qualified name of our class `Test` is `REPL.$JShell$11$Test`.

But how does the JShell hide this part of the String? Did they actually...

```
jshell> "REPL.$JShell$4589$foo"
$6 ==> "foo"
```

Yes, the authors of the JShell really chose to tinker with the way that String values are displayed.
However, to make this just a little bit more confusing, this does not hold for print statements:

```
jshell> System.out.println(Test.class.getName())
REPL.$JShell$11$Test
```

## The verdict

Some of my students say that the JShell is confusing and that we should rather abandon it altogether for an IDE like Eclipse.

I actually would not go that far.
The JShell has helped me tremendously both for demonstrating certain facts quickly to my students and for experimenting myself.
I think it is perfectly suited for the first contact with the language and for experts who know how Java works and what actually happens behind the scenes in the JShell.

The dangerous part is the middle ground between those groups, since the JShell breaks with the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) in many cases.
Here, I think you *can* use the JShell, and you probably should, because the peculiarities may very well be a great learning opportunity.
However, you have to be careful to teach your students (or yourself as a learner) *why* it behaves differently than an IDE for some code examples.

