---
layout: post
title:  "Class names in the JShell"
description: >
    Class names in the JShell are not what they seem to be. This can lead to confusions.
date:   2017-11-21 16:02 +0200
categories: teaching java jshell
---

## Java 9 and the JShell

Java 9 is a blessing for teachers in computer science because of the JShell - a [Read-eval-print loop (REPL)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) for Java. It encourages experimentation and drastically reduces the time it takes to demonstrate an example. What happens if you add `Double.POSITIVE_INFINITY` to `Double.NEGATIVE_INFINITY`? Before the JShell you would have to write this code to answer your question:

```java
package oop.examples;
public class Infinities {
    public static void main(String[] args) {
        System.out.println(Double.POSITIVE_INFINITY + Double.NEGATIVE_INFINITY);
    }
}
```

Now you can simply type this in your favorite console:

```
C:\Users\Kylar>jshell
|  Welcome to JShell -- Version 9.0.1
|  For an introduction type: /help intro

jshell> Double.POSITIVE_INFINITY + Double.NEGATIVE_INFINITY
$1 ==> NaN
```

## REPL me timbers!

However, Java was never designed as a REPL language.
As you see in the first example, the only toplevel language elements are classes and interfaces.
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

is totally equivalent to the following normal Java code:

```java
class REPL {
    static { System.out.println("Hello Java"); }
    static int x = 0;
    static int $1 = x + 7;
    static { System.out.println(x); }
}
```

An expression that returns a value will be saved in a generated variable of the type of that value; a variable declaration will introduce a static variable; and a statement that returns `void` will have the same effect as a static initialization block (and yes, you can have more than one of these - try it out with the JShell :wink:).

This explains most of the peculiarities of the JShell, such as the following example:

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

```
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

## There are no errors, so why doesn't it DO anything? - /open and incremental definitions

The JShell is mostly built for executing small code examples, but even small examples may be tedious to type if they contain method or class definitions that span multiple lines.
One missed typo in that class definition and you can start from scratch.
To remedy this issue, the JShell has the command `/open` with which you can load code snippets.

Unfortunately `/open` is rather quiet, showing only the result of errors or actual print commands on the console.
On the one hand, this is nice, because you do not get a wall of text each time you load a larger file.
On the other hand, this behavior can hide errors.

Consider the following example file `test.java`:

```java
void foo() {
    int x = 10;
    y += x;
}
```


## One final oddness: Class names