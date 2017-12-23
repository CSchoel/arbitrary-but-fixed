---
layout: post
title:  "Top-level final declarations and the JShell"
description: >
    The keyword final is ignored for top-level classes and variables in the JShell. This is not consistent with normal Java semantics.
date:   2017-12-23 10:47 +0200
categories: java jshell top-level class variable final
---

This post is about [my first JDK bug report](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8193919).

My colleague Dominikus and I noticed this strange behavior of the JShell when we were designing a multiple choice question for students that asked which modifiers are not allowed for top-level classes (the correct answers being `static`, `private` and `protected`).

To double-check our solution, we tried several small examples in the JShell, including this one:

```
jshell> final class A {}
|  Warning:
|  Modifier 'final'  not permitted in top-level declarations, ignored
|  final class A {}
|  ^---^
|  created class A
```

This is strange. A `final` class should just be a class that cannot be further extended by subclasses.
There is no reason, why this should not be possible for a top-level class.
And indeed the following example is perfectly valid Java code that is accepted by `javac`.

```java
final public class ToplevelFinal {
  public static void main(String[] args) {
    System.out.println("look at me, i'm final!");
  }
}
```

My first instinct was that the reason for this behavior of the JShell could be the semantics that every snippet is considered to be part of a class ([which is often the reason for confusing JShell behavior](jshell-post)).
However, a static inner class can also be declared as `final` without any problems:

```java
final public class ToplevelFinal {
  public static final class InnerFinal {}
  public static void main(String[] args) {
    System.out.println("look at me, i'm final!");
  }
}
```

This leaves us with no good reason why the JShell should behave differently than a normal Java program in this case.
We encountered an actual bug that makes it hard to explain to students what the keyword `final` means for a class declaration - especially since the following example works in the JShell (albeit issuing a warning):

```
jshell> final class A {}
|  Warning:
|  Modifier 'final'  not permitted in top-level declarations, ignored
|  final class A {}
|  ^---^
|  created class A

jshell> class B extends A {}
|  created class B
```

To make it worse, the same is true for variables:

```
jshell> final int x = 7;
|  Warning:
|  Modifier 'final'  not permitted in top-level declarations, ignored
|  final int x = 7;
|  ^---^
x ==> 7

jshell> x = 10;
x ==> 10
```

The only remedy for now is to use examples that work with *local* class and variable declarations.

```
jshell> {
   ...>   final class A {}
   ...>   class B extends A {}
   ...> }
|  Error:
|  cannot inherit from final A
|    class B extends A {}
|                    ^

jshell> { final int x = 7; x = 10; }
|  Error:
|  cannot assign a value to final variable x
|  { final int x = 7; x = 10; }
|                     ^
```

Here, the JShell behaves as it should.
My guess is that the developers disallowed `final` for top-level declarations, because the JShell allows to update them with other versions of the declaration.
While this makes somewhat sense for methods, because there is no way in which a top-level method in the JShell may be overwritten, it is confusing for variables and classes.