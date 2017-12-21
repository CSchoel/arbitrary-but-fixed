---
layout: post
title:  "Generic Java arrays and varargs heap pollution"
description: >
    Introducing a small Java project that implements a library for evolutionary algorithms.
date:   2017-11-21 16:02 +0200
categories:
    - teaching
    - java
    - generics
    - arrays
    - varargs
---

When working with generic classes in Java, you may run into problems when you use a varargs parameter like in the following example:

```java
<T> void foo(T ... things) {}
```

This will produce a warning with the following message: `Warning: Possible heap pollution from parameterized vararg type T`.
If the method is `final` or `static` (that is, if it is not possible to overwrite the method at some other part of the code), you can use the annotation `@SafeVarargs` to hide this warning.
However, it is usually better to understand the problem before ignoring a warning.

It turns out that this issue actually is among the hardest things to explain in Java.

## What is "heap pollution"?

First of all, let's try to understand the compiler warning a little better and look at the term *heap pollution*.
Essentially, heap pollution means that a variable holds a reference to an object that is not of the type that is indicated by the variable.

## Why can varargs lead to heap pollution?

```java
<T> String foo(T... things) {
    return things.getClass().getComponentType().getName();
}
<T> String bar(T thing) {
    return foo(thing);
}
```