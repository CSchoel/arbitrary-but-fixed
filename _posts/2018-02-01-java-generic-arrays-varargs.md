---
layout: post
title:  "Generic Java arrays and varargs heap pollution"
description: >
    When working with generic classes and varargs parameters in Java, you may get a message warning you of "possible heap pollution", but what does that actually mean and how concerned should you be?
date:   2018-02-01 10:33 +0100
categories:
    - teaching
    - java
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

With generics it is actually fairly easy to achieve heap pollution:

```java
List<Double> lst = new ArrayList<>();
lst.add(3.5);
List<Integer> lsti = (List<Integer>)(List) lst;
```

Now we have a variable of the type `List<Integer>` that actually holds a value of the type `List<Double>`.
The compiler (or the JShell) rightfully issues a warning that the cast `(List)` is unchecked.
You can use the code above, because the information about the generic type is erased during runtime, but you can run into unexpected exceptions.
Let's assume that our `lsti` is passed to some other unsuspecting part of our code, where we want to extract a value:

```
jshell> Integer x = lsti.get(0);
|  java.lang.ClassCastException thrown: java.base/java.lang.Double cannot be cast to java.base/java.lang.Integer
|        at (#15:1)
```

The return type of the method `get()` in `List<Integer>` is `Integer`, so we had no reason to expect something else.
Yet still we got a `Double`.

## Why can varargs lead to heap pollution?

So far so good (or bad), but in our previous example the problem was the cast to the raw type `List`.
We do not do any casts in our varargs example, so how should this lead to heap pollution?

At this point I would like to present a challenge to my readers:
Give me an example of heap pollution through a varargs parameter that does *not* result in another warning other than the initial warning about the varargs parameter itself.
I have yet to find such an example, so I will present you one that at least does not use any explicit casts.

```java
<T> String foo(T... things) {
    return things.getClass().getComponentType().getName();
}
<T> String bar(T thing) {
    return foo(thing);
}
```

Here, the definition of `bar` issues the following warning:

```
|  Warning:
|  unchecked generic array creation for varargs parameter of type T[]
|      return foo(thing);
|             ^--------^
|  modified method bar(T)
```

This points us to the reason why varargs parameters can be problematic.
At runtime, a varargs parameter behaves like an ordinary array.
This means that the compiler has to generate code for our method `foo` that will generate an Array of type `T[]`.
Also you can see from the above example that Arrays - unlike Lists or other generic classes - keep track of their component type during runtime.

For example, if you write `foo(7)` somewhere in your code, the compiler will actually translate this to `foo(new Integer[]{7})`.
In this simple case this is no problem and the resulting array will have the correct component type:

```
jshell> foo(7)
$34 ==> "java.lang.Integer"
```

As the warning for `bar` suggests, it gets more interesting if the component type is again generic, that is if the compiler cannot determine the concrete type of the varargs parameter at the call site.

```
jshell> bar(7)
$36 ==> "java.lang.Object"
```

The call to `foo` within `bar` has one parameter of type `T`, so the compiler would have to translate the call to `foo(new T[]{thing})`.
If you have ever written a generic array list in Java, you know that this is not possible, since the parameter `T` is erased at runtime, but the array needs to know it's component type.

```
jshell> <T> T[] genAr() { return new T[3]; }
|  Error:
|  generic array creation
|  <T> T[] genAr() { return new T[3]; }
|                           ^------^
```

The only[^1] solution to this dilemma is to actually use an array of type `Object[]` and to cast it to `T[]` (which only works, because `T[]` is erased to `Object[]` at runtime).
Back to our example of `foo` and `bar` this means that we now have a compiler-generated call `foo((T[])new Object[]{thing})`.
And *this* leads to heap pollution, because when we call `bar(7)` we expect `things` to be an `Integer[]`, but we actually have the type `Object[]` which is not a subtype of `Integer[]`.

To make the example complete, we can now generate a class cast exception due to this heap pollution (again with a piece of code that issues two separate warnings):

```java
<T> T[] polluter(T... things) {
    return things;
}
<T> T[] caster(T thing) {
    return polluter(thing);
}
```

We return the array generated for the varargs parameter and therefore expose our polluted variable.
It would be perfectly sane to assume that the following code cannot fail due to a class cast exception, but it does:

```
jshell> Double[] ar = caster(3.5);
|  java.lang.ClassCastException thrown: java.base/[Ljava.lang.Object; cannot be cast to java.base/[Ljava.lang.Double;
|        at (#48:1)
```

And there you have it: Heap pollution caused by a varargs parameter.

[^1]: Actually you can use the static Method `newInstance(Class<?>,int)` of the class `java.lang.reflect.Array` to generate an Array of an arbitrary component Type at runtime, but you have to change your signature, because you need a reference to the class object of the component Type.
This is the reason why the generic version of the Method `toArray(T[])` of the Interface `List` needs an Argument of type `T[]`.
It needs to infer the component type at runtime from the existing Array.

## The solution

So what is the solution for this dilemma?
I think this can be summed up in two simple rules:

1. If you can avoid it, do not use varargs parameters with generic types (or cast an Object array to an array of a generic type).
2. If you cannot avoid it, make sure not to expose the varargs parameter (or the generic array) to any other method or class.
