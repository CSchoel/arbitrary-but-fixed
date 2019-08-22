---
layout: post
title:  "Beware of sentinels in merge sort"
description: >
    Some authors (including CLRS) suggest that the merge function in a merge sort implementation can be sped up by adding a sentinel to the list.
    While this is technically correct (the best kind of correct), it requires that a sentinel value can be chosen that is guaranteed to never occur as a regular value.
    This is impossible or at least impractical for any general purpose, real world implementation.
categories: teaching java algorithms
---

Since [my first post on merge sort]({{ site.baseurl }}{% post_url 2019-05-05-junit-for-students %}) I wanted to talk about a misleading suggestion that sometimes pops up in online discussion and is even mentioned in the [CLRS](https://en.wikipedia.org/wiki/Introduction_to_Algorithms): Speeding up merge sort by introducing a sentinel value.

The CLRS variant of the algorithm looks as follows:

```verbatim
MERGE(A, p, q, r)
    n1 ← q − p + 1
    n2 ← r − q
    create arrays L[1..n1 + 1] and R[1..n2 + 1]
    for i ← 1 to n1
        do L[i] ← A[p + i − 1]
    for j ← 1 to n2
        do R[j] ← A[q + j]
    L[n1 + 1] ← ∞
    R[n2 + 1] ← ∞
    i ← 1
    j ← 1
    for k ← p to r
        do if L[i] ≤ R[j]
            then A[k] ← L[i]
                i ← i + 1
            else A[k] ← R[j]
                j ← j + 1
```

Here the crucial part is `L[n1 + 1] ← ∞` and `R[n2 + 1] ← ∞`.
∞ is defined as a sentinel value that is greater than any number in the array.
If `i` reaches the end of the left array, `L[i]` will become ∞ and `L[i] ≤ R[j]` will always be false unless `R[j]` is also ∞, in which case the loop stops, because all elements from `L` and `R` have been processed.
If `j` reaches the end of the right array, the behavior is similar.
`R[j]` becomes ∞ and `L[i] ≤ R[j]` will be true for the remainder of the loop.

Without the sentinel, the if condition would have to be `j > n2 or (i <= n1 and L[i] ≤ R[j])` requiring three instead of one comparative operation in the main loop.

In theory this sounds like an easy way to improve the algorithm, but does it make sense in a practical application?
How would the algorithm look in Java?

```java
public static void merge(int[] ar, int from, int middle, int to) {
    int[] left = new int[middle - from + 1];
    int[] right = new int[to - middle + 1];
    System.arraycopy(ar, from, left, 0, left.length - 1);
    System.arraycopy(ar, middle, right, 0, right.length - 1);
    left[left.length - 1] = Integer.MAX_VALUE;
    right[right.length - 1] = Integer.MAX_VALUE;
    int left_index = 0;
    int right_index = 0;
    for(int i = from; i < to; i++) {
        if (left[left_index] <= right[right_index]) {
            ar[i] = left[left_index++];
        } else {
            ar[i] = right[right_index++];
        }
    }
}
```

That is the most straightforward implementation and it has one important shortcoming.
CLRS define the sentinel "so that whenever a card with ∞ is exposed, it cannot be the smaller card unless both piles have their sentinel cards exposed."
In other words the sentinel value must not occur in the input array.
However, `Integer.MAX_VALUE` is a perfectly valid integer value.
If you test the algorithm with the following example

```java
int[] input = new int[]{
    1, 2, 3, 4, 5,
    1, 2, 3, Integer.MAX_VALUE, Integer.MAX_VALUE
};
merge(input, 0, 5, input.length);
```

it will produce a good old `ArrayIndexOutOfBoundsException`:

```verbatim
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 6
	at net.arbitrary_but_fixed.mergesort.MergesortCLRS.merge(MergesortCLRS.java:27)
	at net.arbitrary_but_fixed.mergesort.MergesortCLRS.main(MergesortCLRS.java:38)
```

Could we have chosen another value as the sentinel?
The answer is no, because every possible combination of ones and zeros gives a valid integer value.
This also true for any other primitive type in Java, maybe with the exception of `float` and `double` where we could construct a special `NaN` with some payload in the mantissa that cannot occur naturally.
For reference types, a sentinel would have to be given by the caller of our merge sort implementation since we cannot know if `null` is acceptable (because treating `null` as infinity could mask `NullPointerException`s) or how to create an instance of the given class.

To go back to our initial question we can conclude that the idea of using a sentinel value is impossible or at least impractical if we do not restrict the range of possible values beyond the data type.
It is certainly beneficial for some special use cases, but disqualifies for any general purpose library implementation.

Even for the special use cases the benefit of the sentinel idea is limited, since we can achieve the same result with a different trick as outlined in ["Algorithms" by R. Sedgewick and K. Wayne](https://algs4.cs.princeton.edu/22mergesort/).
The authors use a single auxiliary array that is shared between calls instead of the two arrays `L`/`left` and `R`/`right` and suggest to copy the right half in decreasing order.
Now, if the last element of the left array is chosen in the main loop, the left index will point to the first and thus *largest* element of the right array.
All subsequent comparisons will choose to take the next element from the right array unless there are only elements left that are equal to the highest element of the right array.
If the last element of the *right* array is chosen first, the right index will point to the largest element of the *left* array and the previous observation holds analogously.
The resulting merge sort variant is no longer stable, but also requires only one comparative operation in the main loop.

```java
public static void merge(int[] ar, int[] aux, int from, int middle, int to) {
    System.arraycopy(ar, from, aux, from, middle - from);
    for(int i = 0; i < to - middle; i++) { aux[middle + i] = ar[to - 1 - i]; }
    int left_index = from;
    int right_index = to - 1;
    for(int i = from; i < to; i++) {
        if (left[left_index] <= right[right_index]) {
            ar[i] = left[left_index++];
        } else {
            ar[i] = right[right_index--];
        }
    }
}
```

The resulting code is even shorter than the CLRS variant with sentinels.
