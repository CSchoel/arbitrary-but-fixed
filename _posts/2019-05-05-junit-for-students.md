---
layout: post
title:  "How to (not) write unit tests for your students"
description: >
    Writing unit tests is hard, writing unit tests that give good feedback for programming novices is even harder.
categories:
    - teaching
    - java
---

## The pros and cons of unit tests in computer science education

Should we use automatic tests as a basis to grade the homework of computer science students?
In my experience, teacher's opinions on this question range between two extremes.

On the one hand, studying should be about *understanding* the subject through continuous learning effort, not about getting things right the first time.
No unit test can tell you that you are "almost there" or praise you for small improvements.
It will simply tell you if your solution to a particular problem is correct - "Yes" or "No".
And even this answer can be misguiding.
I have seen students that passed all unit tests but one look at the code made it clear that there were still some serious misunderstandings of the exercise and the concepts that were being tested.
I have also seen students where (almost) all unit tests failed - not because they did not understand what they were doing, but because there was some minor but hard to find bug in a single method.

On the other hand you will also find the attitude that computer science is all about *exact* solutions and we should therefore demand this level of accuracy from very early on.
No one cares if a list is "almost sorted".
It is either sorted or it is not.
Apart from that unit tests also simply allow for testing a large number of students on an individual basis instead of doing group assignments where weak students may deceive themselves and others about their actual performance.

I think both sides have valid arguments.
At the end it is all about what kind of feedback the unit tests provide, how it is presented and how directly or indirectly they are used for grading.
I strongly believe that unit tests can facilitate understanding, since they are an (albeit very strict) teacher that you can take home with you and that will still give you immediate feedback at 3 am.
To achieve this potential, the unit tests have to be (mostly) accessible for the students and your grading tool has to accept unlimited submissions before the deadline.
Additionally I think that unit tests should only ever serve as a first indicator of performance, but the ultimate grading decision should be made by a human (teacher or tutor).
This alleviates the inherent unfairness of unit tests and prevents any cheating in the form of very specialized submissions that only solve the examples given in the test cases and not the general problem.

With this we arrive at the main question of this article: What makes a good unit test that will be seen by your students as a helpful companion and not as a scornful adversary?

## Cautionary tales of bad unit tests

We learn by our failures and this is also true in this case.
For a course in algorithms and data structures, I let my tutors create some exercises with accompanying unit tests for me.
Both some of the tests and some of the submissions of my students can serve as a cautionary tale of what *not* to do when designing tests for an educational setting.

### Tale 1: Thanks for nothing

A unit test for a merge sort implementation contained this following gem

```java
assertTrue(
    "An array of size " + length + " was sorted incorrect",
    Arrays.equals(correctArray, array)
);
```

Now don't get me wrong: The tutor who wrote this test probably never had a proper introduction for unit tests and due to a lack of time I myself also failed to give them this introduction.
It is not my intent to criticize the person, but the code and see what we can learn from this example.

First of all, the code tests a very complicated recursive function with a single assert statement.
There can be hundreds if not thousands of different reasons why it may fail, but if it does, all the information you get is that "An array of size 500 was sorted incorrect\[ly\].".
This leaves a lot of questions unanswered:

* What does "incorrectly" mean? Is it sorted in reverse order, up to a certain point or completely unchanged?
* What does the array look like, that had to be sorted?
* What does my resulting array look like?

If you are familiar with JUnit, you might think that there is an easy solution to this problem - that is using JUnits own method `assertArrayEquals`.

```java
assertArrayEquals(
    "An array of size " + length + " was sorted incorrect",
    correctArray, array
);
```

This is only partly true.
`assertArrayEquals` will only report the first index where the arrays differ.
This is a totally sound choice by the library, as you might call this method with huge arrays.
However, for testing a merge sort implementation, it would be preferable to see the whole array to get an idea what might be going wrong.
This is further hindered by the poor choice for `length` in the original test.
The test was called with `length` values of 0, 1, 500 and 10000.
Notice the lack of any test with an array that has more than one element and would still fit on an 80 character command line.

### Tale 2: Total success, but still a failure

Our next enlightening example is provided by a student, not a tutor.
The exercise in question was to write an depth first iterator class for a general tree interface.
The unit tests had trees of different sizes, structures and component types.
It was ensured that multiple iterators would not interfere with each other, that an iterator did not change the tree it was iterating over and that calling `next()` too often would result in an exception.

Everything seems fine.
This should ensure that any solution that passes the unit tests must be somewhat sensible, right?
Wrong.
Unfortunately we had several students that did not understand the concept of an iterator at all.
What they did was performing a full depth first traversal *in the constructor* of the iterator adding all nodes found into a standard `java.util.ArrayList` that was stored inside the iterator.
The students simply used the existing iterator implementation and forwarded the calls of their iterator to the one that was returned by `java.util.ArrayList.iterator`.

This solution passed all tests but at the same time showed that the students utterly failed to achieve the actual learning goal - maybe also because the unit test seemed to endorse their misguided approach.

### Tale 3: There can be only one (solution)

The third example shows what can happen if a unit test is too strict.
The students had to implement a binary search tree and provide methods to add and remove arbitrary elements while keeping the tree sorted.
In this scenario, removing a node with two children is the most complicated part of the exercise.
This operation can be realized with several strategies:

* Remove the node and re-insert the root nodes of the orphaned subtrees at the correct position.
* Use the maximum of the left subtree as value for the node that would be removed. Then remove the duplicate value from the left subtree.
* Same as above, but with the minimum of the right subtree.

All three strategies lead to a correct binary search tree, but with varying structures.
Unfortunately, the unit test required that the resulting tree must have the *same* structure as the sample solution.
This was extremely frustrating for students since they could have a perfectly valid solution that would not pass the unit test.
Their only chance to solve this issue on their own was to reverse engineer a working solution from the unit test.

### Tale 4: Equal but not

Even if unit tests are all sensible, they can still be confusing.
In the exercise in question students had to write their own implementation of a linked list.
This also included own implementations of the standard methods for Java-Objects such as `equals(Object)`, `hashCode()` and `toString()`.

There were some unit tests that checked whether these methods were correctly implemented and other tests that *used* them to test the functionality of other methods as in the following example.

```java
ImmutableList<Integer> lst = new Cons<>(5, new Nil<>());
assertEquals(lst, new Nil<Integer>().cons(5));
```

If this test fails, you may see some confusing error messages:

* ```verbatim
    java.lang.AssertionError:
    Expected :linkedlist.Cons@39c0f4a
    Actual   :linkedlist.Cons@42e26948
    ```

    This does not tell you anything, other than that you should implement a `toString` method so that you can see what is going on.

* ```verbatim
    java.lang.AssertionError:
    Expected :Cons(5, Nil)
    Actual   :Cons(5, Nil)
    ```

    This might hint at a missing or incorrect `equals` method, but this is not apparent for a programming novice.

The problem here was that accidentally the tests for `toString` and `equals` were run last and the students had to scroll past several of these confusing messages to get some feedback that was actually helpful.

## General rules for good unit tests

Now that we have seen what can go wrong, it is time to think about what we can do better.
Some of the following solutions were my own ideas, but some were also suggestions by my tutors and students and have already been implemented in my current algorithms and data structures course at the THM.

### Lessons from Tale 1

#### Use test-driven design and look at your own mistakes

Test-driven design (TDD) is like healthy eating.
We all know it would probably be better for us, but we ignore that because we want fast and satisfying results.
The thing with writing unit tests for educational purposes, however, is that you have to do the tests either way, so you may also write them *before* you write the sample solution.

The obvious benefit of this approach is that you can test your sample solution while you build it, which gives you a far more realistic estimate of typical errors that students may run into than when you artificially add those errors to a working solution.
Additionally, you are now able to directly assess the usefulness of the feedback that your tests provide.
Do you have enough information to find the bug from the error message alone?
If not, before using the Debugger or printing additional information, maybe have a look at your tests and see if *they* can be augmented to provide more feedback.

#### Give more feedback than usual

This seems obvious, but don't just rely on the standard `assertXYZ` variants that test frameworks like JUnit provide.
They are designed for quick and precise correctness tests.
What students need, however, is an *explanation* what went wrong and how they may be able to fix this.
This can be achieved by providing additional information that experienced programmers would usually get from the debugger such as input and output variable values.
Usually this will involve a formatted error message using basic methods like `assertTrue` or `fail`.
Additionally the error message itself can contain hints to what the test is actually about and what are common causes for failing, such as the following example:

```java
double[][] content = new double[][]{ {1}, {2}, {3} };
DoubleMatrix mat = new TwoDimDoubleMatrix(content);
content[0][0] = 100;
String msg = "The constructor of TwoDimDoubleMatrix seems to create an " +
    "alias by just using the argument array to store its data instead of " +
    "copying it."
assertEquals(msg, 1, mat.get(0, 0), delta);
```

Here the `assertEquals` may look strange on its own, but the message clearly states that this is about avoiding [aliasing](https://en.wikipedia.org/wiki/Aliasing_(computing)) in the data structure.

#### Provide a deep inspection of data structures in error messages

This is a more specific case of the last lesson.
If the output that a test provides is not just a number but some kind of data structure, it may be helpful to allow the student to inspect the full structure in the error message.
One simple example is using something like `assertEquals(Arrays.toString(arA), Arrays.toString(arB))` instead of `assertArrayEquals(arA, arB)` for testing a sorting algorithm with a small array of Integers.

### Lessons from Tale 2

#### Anticipate structural mistakes

This one is tricky, but try to think about common mistakes that students may make when solving the exercise - and especially those mistakes that will not affect the result itself.
Some of these mistakes may be avoided by a hint in the exercise text, others may be caught by the following lesson.

#### Provide guiding restrictions

If you can identify possible errors that a standard unit test will not catch, because they do not directly affect the result of methods but only the code structure or memory management, it may be helpful to add some guiding restrictions to the unit test

For example, in some cases it may be interesting to do a very coarse performance check or add a timeout to the unit test to ensure that a solution is in O(n) and not in O(n²).
You can also use meta programming features such as the Java reflection API to check that a data structure only has fields with sensible types.
If you are lucky, you may have also access to meta programming features or a library for static code analysis that provides access to the abstract syntax tree to allow things like white- or blacklisting calls to specific methods or classes.

### Lessons from Tale 3

#### Only test what is *essential* for a correct solution

As always in software design, it is crucial to fully understand your problem domain and in this case it is crucial to have a very clear definition of what is an acceptable solution and what is not.
Unit tests in an educational setting should precisely test the features that are required for every possible solution that can be labeled "correct" and not more.

Considering the example from Tale 3 this means that when you want your students to write a remove method for a binary search tree, you should test that the result contains all values that it previously contained, that it does not contain the removed value and that it is still a binary search tree - not more and not less.

When in doubt, try to think about an unconventional but correct solution to the problem and test whether your unit tests would also accept this solution.
If not, make the unit tests less restrictive.

### Lessons from Tale 4

#### Fix the order of your unit tests

Yes, you can do that.
And yes, you should, because it provides a guideline that the student can follow on his way to a solution.
You can suggest which unit test is the easiest and has the fewest dependencies and should therefore be solved first.
You can also push complicated tests or tests for very specific edge cases to the back of the list so that students are not confused by them when they first start solving the exercise.

In JUnit this can be achieved with the following pattern:

```java
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MyTest {
    ...
}
```

You can then start the method names of all your tests with `t00`, `t01` and so on and the tests will always be presented in alphabetical order.

#### Avoid dependencies between tests if possible

If a test fails, it should be clear which method is responsible for that.
You should avoid cases where an error in one method can result in the failure of the test for another method.
This is of course not always possible or sensible.
If your students write a data structure with getters and setters for internal variables, these methods will probably be called in most unit tests.
For other methods, however, it will probably often be possible to avoid unnecessary dependencies by restricting oneself to use only the basic functionality of the class that is being tested.

## Conclusion

I think this article has shown both the good and the damage that unit tests can do in an educational setting.
As always it is all about the context and more specifically about the quality of the feedback that you provide to your students.
If done wrong, unit tests are annoying and unfair.
If done right, unit tests can almost serve as a personal mentor that helps students to understand a problem, nudges them in the right direction and reassures them that their solution really is correct.