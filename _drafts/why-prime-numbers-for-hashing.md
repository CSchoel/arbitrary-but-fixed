---
layout: post
title: Why do we use prime numbers in hash functions?
description: >
    Ever looked at default implementations of hash functions and wondered: Why prime numbers? Why 31 specifically? And why do we multiply multiple times with the same prime number? If so, this post is for you.
tags:
- polynomial rolling hash
- prime number
- hash function
- hash table
---

## Prerequisites

A hash table allows storing and retrieving values, which are identified by associated keys.


## The Question

In order to use a new custom data type as key in a hash function, we need to know how to calculate the hash code of an instance of that data type.
Finding a good hash function is hard, and usually the best bet is to resort to using predefined functions in the standard library to just combine hash codes of the more primitive values that make up the state of the object.

In Java, the standard way is to use `Objects.hashCode(Object ...)`, which redirects calls to `Arrays.hashCode(Object[])`:

```java
public static int hashCode(Object a[]) {
    if (a == null)
        return 0;

    int result = 1;

    for (Object element : a)
        result = 31 * result + (element == null ? 0 : element.hashCode());

    return result;
}
```

And that is where we have our question for today: Why does the function look like this? Why the magic number 31, and why the successive multiplication of the whole result by that number?

## Non-Answers

I noticed that searching for this question online yields a lot of answers which are either false, incomplete, or assume too much mathematical background knowledge. Examples include...

* ... suggesting that we use a [prime number as the *bucket size* of the hash table](https://programming.guide/prime-numbers-in-hash-tables.html), which is cumbersome since hash tables would need a list of prime numbers to choose their bucket size from;
* ... capitulating before the question and stating that "The advantage of using a prime is less clear, but it is traditional.", which is [apparently true for *Effective Java 2nd Edition*](https://stackoverflow.com/a/3613764)
* ... just stating that it is good to [keep the number of prime factors low to avoid collisions](https://medium.com/swlh/why-should-the-length-of-your-hash-table-be-a-prime-number-760ec65a75d1);
* ... stating that [31 is chosen because it is close to the number of letters in the latin alphabet](https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/), which is utter nonsense;
* ... claiming that the [product of a prime with any other number has the best chance of being unique](https://computinglife.wordpress.com/2008/11/20/why-do-hash-functions-use-prime-numbers/), whatever that means;

Best answer: https://stackoverflow.com/questions/3613102/why-use-a-prime-number-in-hashcode