---
layout: post
title: Explaining default hash functions including the huse of the prime number 31 in the String and Arrays classes in Java
description: >
    Ever looked at default implementations of hash functions and wondered: Why prime numbers? Why 31 specifically? And why do we multiply multiple times with the same prime number? If so, this post is for you.
tags:
- polynomial rolling hash
- prime number
- hash function
- hash table
---

## Prerequisites: What is a hash table?

A hash table allows storing and retrieving values, which are identified by associated keys.
They are the data structure behind the types that we known as map, dict, or hash.
The main idea of a hash table is to calculate an integer value for each key that can be used to determine the index where the associated value should be stored in an array.
This magic integer is called a hash and the array structure in which the values are stored is sometimes called a table - hence the name hash table.
Since the number of elements to be stored is usually smaller than the maximum integer value, the actual array index is determined by using the modulo operation to obtain `index = hash(key) % size`.

The main difficulty in finding a good `hash()` function is that the range of available hashes is limited by the number of possible (positive) integer values while the theoretical number of possible key objects is often infinite or at least much larger.
Take the example of using strings as keys: A string can have aribitrary length, but there are only 2<sup>31</sup> possible different results of `hash(s)`.
This implies that *some* Strings will need to have the exact same hash value and will therefore be put into the same index in the hash table, even though they are completely different.
Even if two different strings have a different hash value, they can still end up with the same index through the modulo operation.
For example, lets say the string `"foo"` has a hash of 5 and the string `"bar"` has a hash of 9.
If both strings are put into a hash table of size 4, they both are assigned the index 1 since `5 % 4 = 1` and `9 % 4 = 1`.

There are different possibilities to solve these collisions, the most common of which is called *separate chaining*.
It works by actually storing a linked list in each of the entries of the array and chaining the values that are assigned to the same index in this list.
Each time you retrieve a value from the hash table you then have to do a sequential search in this "bucket" of values.
Regardless of which mechanism is used to avoid collisions, a high number of collisions in a hash table will mean more searching and therefore a slower access to the individual values.
A good hash function is therefore one that minimizes collisions by spreading out hash values as uniformly as possible across the integer value range, avoiding any clusters of similar keys that end up with the same hash value.

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