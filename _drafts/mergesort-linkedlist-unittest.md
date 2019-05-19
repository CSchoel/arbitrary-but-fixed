---
layout: post
title:  "Tricks for unit tests: Merge sort with a doubly linked list"
description: >
    In a previous article I identified guidelines for improving unit tests in an educational setting. This post is a case study in which I try to follow these guidelines for a exercise where students should write an in-place merge sort for a custom doubly linked list.
categories:
    - java
    - teaching
---

TODO: needs proof reading
TODO: add tests as JAR for download

Previously I talked about [guidelines for good unit tests in an educational setting]({{ site.baseurl }}{% post_url 2019-05-05-junit-for-students %}).
In this post I mainly talked about cautionary tales, but this time I want to try to give you a positive example how these guidelines can be applied to increase the usefulness of a unit test both for students and for teachers.

## The exercise

In my current algorithms and data structures course I wanted to change the exercise about merge sort, since it was very hard for many students and very [easy to plagiarize]({{ site.baseurl }}{% post_url 2018-12-09-mergesort.de %}).
I wanted to tackle both of these problems: Make the problem more manageable for a struggling student and make it harder to simply copy an online solution.
In the real world one of the main application areas of merge sort are sequential data structures that can only be accessed from one end, such as linked lists.
Here, merge sort usually outperforms quick sort and other options.
Additionally, while a merge sort for arrays is very hard to implement without copying the array, this becomes almost trivial for linked lists, since only the links between elements have to be altered.

So the exercise I came up with was to implement merge sort, but for a custom doubly linked list structure and as an in-place algorithm that only allocates O(1) additional space (not counting the O(log n) space required for the recursion stack).

Solutions for this exercise can also be found online, but you have to use a larger google query (`java merge sort doubly linked list` instead of `java merge sort`) and as of this writing the first three search results all have major problems disqualifying them for a copy-and-paste-plagiarism.

* [GeeksForGeeks](https://www.geeksforgeeks.org/merge-sort-for-doubly-linked-list/) and [Techie Delight](https://www.techiedelight.com/sort-doubly-linked-list-merge-sort/) use a recursive implementation of the merge step, which is very elegant but fails with a `StackOverflowError` for large lists, because it requires O(n) stack space.
* The answers to this [question on StackOverflow](https://stackoverflow.com/questions/2938495/sorting-a-doubly-linked-list-with-merge-sort) either do not operate in-place or do not show the code for the custom list classes.

## The unit test

Let's start by remembering the guidelines we established:

1. Use test-driven design and look at your own mistakes
2. Give more feedback than usual
3. Provide a deep inspection of data structures in error messages
4. Anticipate structural mistakes
5. Provide guiding restrictions
6. Only test what is *essential* for a correct solution
7. Fix the order of your unit tests
8. Avoid dependencies between tests if possible

For the discussion of the unit tests I will follow this structure and explain how I tried to implement each of these lessons.

### 1. Use test-driven design and look at your own mistakes

OK, I admit: I did *not* use a fully test-driven approach as I should have.
The reason for this is laziness and impatience.
I wanted to see quickly if the exercise could work, but  as we will see later the full suite of unit tests was quite complex and took about 500 lines of code - compared to 50 lines of code that were required for a working solution.
What I *did* do however, was to implement a few rudimentary tests and take note of my mistakes:

* My first approach did the split correctly, but failed to combine the sorted sublists and therefore just returned the minimum of the list.
* Somewhere in the middle of fixing the first error, I produced a list that could not be printed because the link structure contained an infinite loop.
* In the first *working* solution, I forgot to update the link to the last element in the list, leading to a wrong backward traversal.
* I accidentally broke the in-place property by creating a dummy object for each of my merge calls resulting in O(n) memory allocated in the heap.

This already gives us a few important hints for the unit tests:

* Do not assume that the links form a correct list structure. Instead prepare for loops and other problems.
* Always traverse the list from both sides.
* You can break the in-place property in more subtle ways than copying the list.

### 2. Give more feedback than usual

The minimal feedback for this exercise would be to just compare a forward traversal of the expected list and the actual resulting list.
However, as we have seen before, an additional backward traversal can reveal errors that would not be obvious during a forward traversal.
Even more importantly, the student should not just get a timeout error for loops in his link structure, but there should also be a error message that specifically targets this case.

We can even go a step further.
A student may "break" the list in any possible way with wrong or missing links.
This is where a *class invariant* comes in handy.
Students should get a notice every time their resulting list hurts any of the following conditions:

* **Link symmetry:** If a node a links to a node `a.next == b`, then it must hold that `b.prev == a`. Equivalently if `a.prev == b` then it must hold that `b.next == a`.
* **First is first:** If `first != null` then ist must hold that `first.prev == null`.
* **Last is last:** If `last != null` then ist must hold that `last.next == null`.
* **First to last:** The node last must be reachable by following next links from first (and vice versa).

### 3. Provide a deep inspection of data structures in error messages

The previous lesson directly leads us to an idea how the deep inspection of our doubly linked list should look.
In my head or on paper I visualize correct and broken list structures as nodes with arrows that represent the `next` and `prev` references.
However, as the following example of an incorrect link shows, it is not easy do this visualization in a plain text message in an exception:

```verbatim
      ________
     ↓        |
a ⇄ b ⇄ c → d ⇄ e
```

In the worst case we would have to draw an arbitrary graph of degree two as ASCII/Unicode-art which might be a bit of an overkill.

Therefore I returned to the first lesson and experimented with a simplified notation that would reveal such errors when both a forward *and* a backward traversal is shown.
The result for the wrong link shown above was the following:

```verbatim
Forward:  [a ⇄ b ⇄ c → d ⇄ e]
Backward: [a ⇄ b ← d ⇄ e]
```

This takes a little more time to visualize in your head than the full "drawing", but all the information is there:
From the forward traversal you can see that node `c` links to `d`, but the back link is different.
From the backward traversal you can infer that the back link that was missing in the forward traversal links to node `d` instead of `c`.

In fact, we can visualize all violations of the class invariant using this notation:

* Broken forward links without matching back links

    ```[a⇄b→c]```
* Broken backward links without matching forward links

    ```[a⇄b←c]```
* Backward link in `first`

    ```x←[a⇄b⇄c]```
* Forward link in `last`

    ```[a⇄b⇄c]→x```
* Last element not reachable by forward links from first element

    ```[a⇄b```
* First element not reachable by backward links from last element

    ```b⇄c]```
* Infinite loop while following forward or backward links

    ```[a⇄b⇄c⇄∞```

The code to produce this representation is actually quite simple.
Here is the implementation of the forward traversal:

```java
protected String checkForward(DoublyLinkedNode<E> asFirst, DoublyLinkedNode<E> asLast) {
    if (asFirst == null) { return "[]"; }
    StringBuilder sb = new StringBuilder();
    Set<DoublyLinkedNode<E>> visited = new HashSet<>();
    DoublyLinkedNode<E> cur = asFirst;
    while (cur != null && !visited.contains(cur)) {
        if (cur == asFirst) { sb.append("["); }
        sb.append(cur.content.toString());
        if (cur == asLast) { sb.append("]"); }
        visited.add(cur);
        if (cur.next != null) {
        sb.append(cur.next.prev == cur ? ARROW_BOTH : ARROW_RIGHT);
        }
        cur = cur.next;
    }
    if (cur != null) { sb.append(INFINITY); }
    return sb.toString();
    }
```

The key idea is that we keep track of visited nodes with a `HashSet` to avoid running in an infinite loop.
We only follow `next` links and use the `prev` links to check if the connection is bidirectional.
To produce the error message, the resulting string is then checked for inconsistencies, such as `[` and `]` not being in the string or not being the first/last character or the occurrence of the characters `→`, `←` or `∞`.
This allows us to give both the representation and a concrete list of error messages as feedback.

The whole check is available as a public method `checkClassInvariant()` in the doubly linked list implementation with a protected variant that allows to choose different nodes as substitute for `first` and `last` and to disable boundary checks, so that the students can also call the method from *within* their own methods to check at which point exactly the class invariant is broken.

### 4. Anticipate structural mistakes

We mostly addressed this point by checking the class invariant of our doubly linked list after sorting.
However, we can also already anticipate some additional mistakes.
Students may...

* ... accidentally produce an algorithm that does not run in O(n log n).
* ... allocate more heap space than allowed.
* ... write an entirely different sorting algorithm.

We will address all these points in the next section.

### 5. Provide guiding restrictions

We want the algorithm to run in O(n log n).
Time measurements in Java are a can of worms, but since we are only concerned with big O notation, we do not need accurate measurements.
Sorting a list of 100,000 elements should take less than a second with an O(n log n) algorithm, while any O(n²) algorithm should take multiple minutes.
This distinction is good enough and it also allows us to find the students that copied the recursive solutions found online and therefore allocate O(n) stack space.

Providing a restriction of the heap space is a little more tricky.
One thing we can do is to keep track of the number of node objects that are created by adding a static counter variable to the node class that is incremented each time the constructor is called.

> Side note: If the tests are in the same package as the list implementation but the student solution is not, you can use the package private visibility to make the counter accessible to the tests but not to the student code.

This however only captures space allocated by node objects.
A student could still store some information in a `LinkedList` or `ArrayList` or any other data structure.
If this structure is only accessible via the stack, it is not possible to find them via the reflection API.
Fortunately, we again only need a very rough solution.
We can simply use `Runtime.getRuntime().freeMemory()` to get an estimate of the unused heap space before and after the sort operation.

But wait, what about garbage collection‽
Shouldn't objects that only live on the stack be garbage collected when the method ends and its stack frame is deleted?
Before Java 9 this would be a real concern.
If the garbage collector really decides to run right after the sort method we would not be able to detect that there ever where additional objects on the heap.
Fortunately for us, since Java 9 the default garbage collector is [G1](https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573) which is optimized for low latency and does not run in big chunks.
So even if the memory can be freed right after the sort method is called, there will still be *some* objects left when we do our second call to `Runtime.getRuntime().freeMemory()`.

With this technique the unit test was able to detect the O(n) dummy objects that I initially created, even if most of them where created in the first calls to the merge function on very small sub-lists and could have been garbage collected while the merge function worked upwards to larger chunks of the list.

Finally, the last restriction that we have to put into place concerns the type of algorithm used.
A `sort()` method without any parameters does not leave any possibility to test what happens inside, but on the other hand, specifying an exact call structure for the merge function could be a little too restricting.
I therefore chose to overload the sort method with an additional listener parameter that had the following structure.

```java
public interface MergeSortListener<E> {
  default void split(
    DoublyLinkedList.DoublyLinkedNode<E> left, int nLeft,
    DoublyLinkedList.DoublyLinkedNode<E> right, int nRight) {}

  default void startMerge(
    DoublyLinkedList.DoublyLinkedNode<E> left, int nLeft, DoublyLinkedList.DoublyLinkedNode<E> right, int nRight
  ) {}

  default void finishMerge(
    DoublyLinkedList.DoublyLinkedNode<E> newStart, int n
  ) {}
}
```

With this it was possible to check the internal call structure - and thus provide additional feedback for students.

I implemented a simple listener that visualizes the structure of the split and merge operations by collecting information in the `split()` and `finishMerge()` steps in an internal list of `StringBuilders`.
The idea is that for each call to `split()` you will go one level deeper in the call hierarchy while each `finishMerge()` takes you one step back up.
This allows the listener to keep track of the level where an operation takes place leading to the following string representation when the list `[c, a, f, e]` is sorted.

```verbatim
[c, a][f, e]
[c][a][f][e]
[a, c][e, f]
[a, c, e, f]
```

### 6. Only test what is *essential* for a correct solution

I already said that I refrained from restricting the signature of the merge function, because I wanted to leave some design space for my students.
This is also critical for the test for the right call structure in the previous methods.
Do you split the list `[a, b, c, d, e]` into `[a, b, c] [d, e]` or into `[a, b] [c, d, e]`?
Both choices result in valid merge sort implementations and I would not want my students to get an error message just because they chose a different path than my sample solution.
Therefore the structural test is only performed for lists of length 2<sup>n</sup> where no uneven split should ever occur.

Another point where I consciously allowed for different solutions was the test for the in-place property.
I could have restricted the calls to the constructor of the node object to zero, but allowed one object instead, so that implementations that use a dummy object to save some lines of code still remain valid.

### 7. Fix the order of your unit tests

My unit tests used the following order:

1. Empty list
2. List with one string
3. List with two strings
4. Check call structure for list with four strings (without class invariant check)
5. Check result for the same list again *with* class invariant check but without listener
6. List with four times the same string
7. List with five strings
8. List with ten integers
9. List with 40 random integers
10. List with 1000 random integers
11. List with 100,000 random integers with timeout of 1s and without correctness check
12. List with 100,000 random integers that only checks number of nodes allocated and free heap space

As you can see the golden thread runs from fast and easy tests to slow and hard ones.
Unless otherwise stated tests 1-9 use the class invariant checks for additional guidance, but for tests 10-12 these checks are disabled for performance reasons.
The lists in 1-9 also have in common that they can be viewed in total when printed to a console window of an IDE on a widescreen display.
Therefore the checks for list equality also use the string representation of the list.
Test 10, however, is to large for the string representation to be meaningful, so the test is done in the same style as `assertArrayEquals` reporting the index of the first difference in the actual and expected lists.

### 8. Avoid dependencies between tests if possible

The last section already gives an impression of how I tried to separate different concerns.
For example test 4 is all about call structure and not the class invariant, test 6 is only about duplicate values, test 8 about integers.

Specifically I chose not to test the correctness of the sorted lists in test 11 and 12, because that is not the point of the tests.
I also separated the speed and heap space tests to ensure that a student whose code is too slow but runs in-place also gets the right feedback.

## Conclusion

Again this post has become larger than originally anticipated.
I hope it can give some inspiration how to implement the ideas from [my previous post]({{ site.baseurl }}{% post_url 2018-12-09-mergesort.de %}).
All in all I am quite happy with the new version of the exercise and I am excited to receive feedback from my students.