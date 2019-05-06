---
layout: post
title:  "Causes for NoSuchMethodErrors in Java"
description: >
    The NoSuchMethodError in Java is a rare beast. You will probably not encounter it unless something is off at the bytecode level. In this post I want to explain possible causes for this exception.
categories:
    - java
    - teaching
---

Today's guest is `java.lang.NoSuchMethodError`.
It is rarely encountered in the wild, but if it is, it can lead to a lot of confusion.
This was also the case in my current algorithms and data structures course.
I use an e-learning tool where students submit JAR archives with both bytecode and source code that are tested against a set of unit tests.
Students are able to download the unit tests from the website so that they can quickly test their code at home.
Naturally they assume that unit tests that work locally will also work on the server.
The only exception should be if the student accidentally changes the unit test on their machine by some automatic procedure of their IDE.

Today, however, one of my students encountered the following error message, that I could not replicate by downloading his solution and testing it locally.

```verbatim
java.lang.NoSuchMethodError: de.thm.mni.aud.OneDimDoubleMatrix.multiply(Lde/thm/mni/aud/OneDimDoubleMatrix;)Lde/thm/mni/aud/DoubleMatrix;
```

To understand what was happening we need a little context about the exercise.
The students should implement two different data structures for the same abstract data type - namely a `OneDimDoubleMatrix` using a one-dimensional array and a `TwoDimDoubleMatrix` using a two-dimensional array that both implemented the following interface:

```java
public interface DoubleMatrix {
  double get(int y, int x);
  double unsafeGet(int y, int x);
  void set(int y, int x, double value);
  void unsafeSet(int y, int x, double value);
  DoubleMatrix add(DoubleMatrix other);
  DoubleMatrix multiply(DoubleMatrix other);
  int columns();
  int rows();
}
```

We can get a first hint at what may have gone wrong from the description of the error class in the Java API.

>Thrown if an application tries to call a specified method of a class (either static or instance), and that class no longer has a definition of that method.
>
>Normally, this error is caught by the compiler; this error can only occur at run time if the definition of a class has incompatibly changed.

As the description states, you should usually not see any `NoSuchMethodError`s in your code, because a missing method leads to an error at *compile time*.
So the existence of this error hints at some error at bytecode level.
Somehow there must be code that was compiled when the method existed and some other code that was compiled without this method existing that clashes.

From the error message we can conclude that method in question is `OneDimDoubleMatrix.multiply(OneDimDoubleMatrix)`.
Here it is important to be exact and to note that this is a different method than `OneDimDoubleMatrix.multiply(DoubleMatrix)`.
Both methods have the same name but a different parameter type.
This is a classic example of method overloading.

Indeed the sample solution that was used to compile the test classes on the server has both methods.
The first method is required to fulfill the contract of the interface.
The second method is there to provide better performance when a `OneDimDoubleMatrix` is multiplied with another `OneDimDoubleMatrix`.
The students do not *have* to implement this method, but without it they will probably fail the speed test that showcases the performance benefits of a one-dimensional array versus a two-dimensional array due to [paging](https://en.wikipedia.org/wiki/Paging).

Now the actual error lies in the processing of the code on the server:

1. Compile the test classes once using the sample solution.
2. Extract the student JAR to folder `exercise/studentname/src`.
3. Recompile the student code (without tests) to `exercise/studentname/out`.
4. Copy the compiled test classes to `exercise/stuentname/out`.
5. Run the test classes with the class path `exercise/studentname/out`.

This means that the student code and the tests are never compiled *together*.
When compiling the tests, the compiler notices the existence of `multiply(OneDimDoubleMatrix)` and links the calls in the bytecode for the tests to this method.
When the student compiles their tests locally, however, there will be no such method and the compiler will link `multiply(DoubleMatrix)` instead.
The bytecode of the solution is the same in both cases, but the bytecode of the tests is different and this is what causes the `NoSuchMethodError`.

The solution is simple: **Assure that code that is run together is also compiled together.** Or more general: Don't mix bytecode of different versions of a program.
For this specific case this means that we had to change the pipeline on the server to the following scheme:

1. Extract the student JAR to folder `exercise/studentname/src`.
2. Copy the source code of the tests to folder `exercise/studentname/src`.
3. Recompile the student code *with* the tests to `exercise/studentname/out`.
4. Run the test classes with the class path `exercise/studentname/out`.