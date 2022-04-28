---
layout: post
title: Why 31? — Explaining the use of prime numbers in Java hash functions
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
They are the data structure behind the types that we know as map, dict, or hash.
The main idea of a hash table is to calculate an integer value for each key that can be used to determine the index where the associated value should be stored in an array.
This magic integer is called a hash and the array structure in which the values are stored is sometimes called a table—hence the name hash table.
Since the number of elements we want to store is usually smaller than the maximum integer value, the actual array index is determined by using the modulo operation to obtain `index = hash(key) % size`.

The main difficulty in finding a good `hash()` function is that the range of available hashes is limited by the number of possible (positive) integer values while the theoretical number of possible key objects is often infinite or at least much larger.
Take the example of using strings as keys: A string `s` can have aribitrary length, but there are only 2<sup>31</sup> possible different results of `hash(s)`.
This implies that *some* Strings will need to have the exact same hash value and will therefore be put into the same index in the hash table, even though they are completely different.
Even if two different strings have a different hash value, they can still end up with the same index through the modulo operation.
For example, lets say the string `"foo"` has a hash of 5 and the string `"bar"` has a hash of 9.
If both strings are put into a hash table of size 4, they both are assigned the index 1 since `5 % 4 = 1` and `9 % 4 = 1`.

There are different possibilities to solve these collisions, the most common of which is called *separate chaining*.
It works by actually storing a linked list in each of the entries of the array and chaining the values that are assigned to the same index in this list.
Each time you retrieve a value from the hash table you then have to do a sequential search in this "bucket" of values.
Regardless of which mechanism is used to avoid collisions, a high number of collisions in a hash table will mean more searching and therefore a slower access to the individual values.
A good hash function is therefore one that minimizes collisions by spreading out hash values as uniformly as possible across the integer value range, avoiding any clusters of similar keys that end up with the same hash value.

## The question

To use a particular data type as a key in a hash table, we need a hash function for that particular data type.
Finding a good hash function is hard, and usually the best bet is to resort to using predefined functions in the standard library.
However, it is never a good idea to blindly trust an algorithm without having a general understanding how it works and why we should use it in place of other alternatives.
At the very least, this knowledge will help to anticipate and debug issues that may occur in our application.

In Java, two methods are therefore of particular interest:

* `String.hashCode()` implements the hashing function for the data type `String`, which is both often used as key for hash tables and is very flexible since it can have an arbitrary length.
    Ignoring particularities like internal caching of hash codes and the Java 9 feature to compact strings to store them in latin-1 encoding if possible, we arrive at `StringUTF16.hashCode(byte[])`:

    ```java
    public static int hashCode(byte[] value) {
        int h = 0;
        int length = value.length >> 1; // two bytes per character
        for (int i = 0; i < length; i++) {
            h = 31 * h + getChar(value, i);
        }
        return h;
    }
    ```
* `Objects.hash(Object ...)` is a helper method for Java developers who want to overwrite `Object.hashCode()` for their custom data types.
    Instead of creating a hashing function from scratch, developers can simply pass all components of the object that are relevant for equality as argument to the helper method.
    It then delegates its work to `Arrays.hashCode(Object[])`:

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

As you can see, both methods essentially use the same idea of multiplying the parts of the objects successively with the prime number 31.
So our questions for today are:
Why the successive multiplication?
Is it important that 31 is a prime number?
And why the magic number 31 in particular?

<!--
Possible tests:
- words (german / english)
- dates (as three integers)
- colors (as ARGB, but with A = 0 and with shortened hex code)
- points (two ints within 1024 x 786)

Bad links:

Why primes
- https://theknowledgeburrow.com/why-are-prime-numbers-better-for-hashing/
- https://stackoverflow.com/questions/1145217/why-should-hash-functions-use-a-prime-number-modulus

Why 31?
- https://stackoverflow.com/questions/1835976/what-is-a-sensible-prime-for-hashcode-calculation
- https://www.baeldung.com/java-hashcode
- https://yeahexp.com/why-does-string-hashcode-in-java-use-31-as-multiplier/

Good links:

Why prime numbers in general
- https://stackoverflow.com/questions/1145217/why-should-hash-functions-use-a-prime-number-modulus
- https://stackoverflow.com/questions/3613102/why-use-a-prime-number-in-hashcode
- https://cs.stackexchange.com/questions/11029/why-is-it-best-to-use-a-prime-number-as-a-mod-in-a-hashing-function
- https://medium.com/swlh/why-should-the-length-of-your-hash-table-be-a-prime-number-760ec65a75d1
- https://archive.org/details/B-001-001-250/page/523/mode/2up?q=prime

Why 31?
- https://stackoverflow.com/questions/299304/why-does-javas-hashcode-in-string-use-31-as-a-multiplier/299748
- https://arxiv.org/pdf/2008.08654.pdf
- https://stackoverflow.com/a/35304979
- https://bugs.java.com/bugdatabase/view_bug.do?bug_id=4045622

Tests
- https://blog.birost.com/a?ID=01800-b514fa4b-3924-499a-81de-7430e470fea7
- https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247490895&idx=3&sn=e732a4dfc36e68a4685a737b10eef88f&chksm=eb539879dc24116f350d3c31adba9281efe11e93252d1532a50f406d01030eb23349bd389a44&scene=21#wechat_redirect
-->

## Non-answers

I noticed that searching for this question online yields a lot of answers which are either false, incomplete, or assume too much mathematical background knowledge. Examples include...

* ... suggesting that [the multiplication is important since it scales up values](https://programming.guide/prime-numbers-in-hash-tables.html), which is moot since scaling a number that is distributed over a small range of possible values does not increase that number of possible values;
* ... using phrases like ["because of the nature of maths"](https://stackoverflow.com/q/1145217) in the explanation;
* ... saying that actually [larger primes are better, because they are less likely to produce collisions with small numbers](https://stackoverflow.com/questions/1835976/what-is-a-sensible-prime-for-hashcode-calculation), which ignores the fact that the modulo operation can also introduce collisions even if the hash codes of all keys in the hash table are unique; 
* ... suggesting that we use a [prime number as the *bucket size* of the hash table](https://theknowledgeburrow.com/why-are-prime-numbers-better-for-hashing/), which is cumbersome since hash tables would need a list of prime numbers to choose their bucket size from;
* ... capitulating before the question, stating that "The value 31 was chosen because it is an odd prime." (all primes other than two are odd) and "The advantage of using a prime is less clear, but it is traditional." as is [true for *Effective Java 2nd Edition*](https://www.google.de/books/edition/Effective_Java/ka2VUBqHiWkC?hl=en&gbpv=1&dq=prime%20traditional&pg=PA48&printsec=frontcover&bsq=prime%20traditional), which sadly is one of the [most cited](https://stackoverflow.com/a/3613764) [references](https://stackoverflow.com/a/299748) [on the topic](https://www.baeldung.com/java-hashcode);
* ... explainig the choice of 31 with the fact that [multiplication with 31 can be expressed as a bit shift and a subtraction](https://www.baeldung.com/java-hashcode), which has some truth in it but still does not explain why 31 and not another Mersenne prime like 127 or 8191, which have the same property;
* ... just stating that it is good to [keep the number of prime factors low to avoid collisions](https://medium.com/swlh/why-should-the-length-of-your-hash-table-be-a-prime-number-760ec65a75d1);
* ... stating that [31 is chosen because it is close to the number of letters in the latin alphabet](https://www.geeksforgeeks.org/string-hashing-using-polynomial-rolling-hash-function/) or [because it is close to the 32 bits of the int data type](https://yeahexp.com/why-does-string-hashcode-in-java-use-31-as-multiplier/), which both is utter nonsense;
* or claiming that the [product of a prime with any other number has the best chance of being unique](https://computinglife.wordpress.com/2008/11/20/why-do-hash-functions-use-prime-numbers/), whatever that means.

All these non-answers serve to show that this is an area where computer scientists tend to be out of their comfort zone, because it involves number theory, i.e. hardcore math.
I do not think that anyone in the above examples is to blame for not knowing a better answer.
After all, they are programmers and computer scientists and not mathematicians, but I do question the hubris of giving such shallow answers instead of owning up to the fact that you just do not know.
Put this way, the answer from *Effective Java* might be the most honest one.

There *are* also good answers that explain parts of the problem really well:

* The StackOverflow user advait shows an example how a [prime modulus yields a more uniform distribution than a non-prime modulus](https://stackoverflow.com/a/3613423).
* [Steve Jessop](https://stackoverflow.com/a/1147232) and [ILMTitan](https://stackoverflow.com/a/3613382) clarify that the mathematical property that we want does not require either the multiplication factor or the number of buckets to be prime, but just that both are coprime, meaning that they have orthogonal prime factorizations, i.e. no common divisor other than 1.
* [JohnZaj](https://stackoverflow.com/a/300111) gives a reference to an experiment testing which multiplication factors result in the least collisions for a list of 50,000 English words, in which 31 is one of the winners.
* [David Ongaro](https://stackoverflow.com/a/35304979) and [Flow](https://stackoverflow.com/a/44508855) both demonstrate that they have mastered necromany to level 100 by conjuring up an [old JDK bug report](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=4045622) in which Joshua Bloch explains his reasoning for choosing the prime 31 in the implementation of `String.hashCode()`, which turns out to be part empirical testing and part literature research.
* [coolblog](https://mp.weixin.qq.com/s?__biz=MzI3ODcxMzQzMw==&mid=2247490895&idx=3&sn=e732a4dfc36e68a4685a737b10eef88f&chksm=eb539879dc24116f350d3c31adba9281efe11e93252d1532a50f406d01030eb23349bd389a44&scene=21#wechat_redirect) published a Chinese blog article in which they perform an experiment using 230,000 english words, also finding that 31 as a multiplier gives good results.


However, I did not find any single source that pieces these bits of information together to a fully comprehensive answer.

## Ask a mathematician

As a teacher at the THM, I wanted to do better for my students and therefore did the only thing that came to my mind after the internet and books failed me: ask a mathematician.
The following explanation is therefore fully owed to Prof. Dr. Bettina Just, who sacrificed her coffee break to change my view of prime numbers in hashing forever by drawing a few numbers on a whiteboard from the top of her head.
Any errors and obscurities in this explanation of course remain entirely my own.

Let's start by what Prof. Just wrote on the whiteboard on that fateful day:

| x| x * 5| x * 7|
|-:|-----:|-----:|
|1|5|7|
|2|10|14|
|3|15|21|
|4|20|28|
|5|25|35|
|6|30|42|
|7|35|49|
|8|40|56|
|9|45|63|

The thing that you should note is what the multiplication with 5 and 7 does to *the last digit* of x, i.e. the result of x % 10.
For the factor 5, which is *not* coprime to the modulus 10, the last digit can only be either 0 or 5 meaning that we lost some diversity.
For 7, which *is* coprime to 10, we get all the values we had before from 1 to 9—just in a different order.

It turns out that this is a general mathematical property that is true whenever the multiplicative factor and the modulus are coprime.
I will not pretend to understand the deeper mathematical reason behind this or attempt to provide a proof here.
Instead I will just leave you with [this StackExchange question](https://math.stackexchange.com/questions/3619509/coprime-group-element-multiplication), and the reference to [Euler's theorem](https://en.wikipedia.org/wiki/Euler%27s_theorem), which I believe implies this unnamed theorem, and which is interestingly also central for the [RSA algorithm](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) used for encrypted communication.
Putting aside the mathematical origins, let's try to state our key theorem in a more understandable way:

> Theorem: If a and n are coprime, then multiplying all possible (nonzero) values of x % n = 1, 2, 3, ...., n-1 with a and again applying the modulus n to the result yields a permutation of these values.

Or in even less mathematical terms:

> Multiplying x with a number a that shares no divisors with n "shuffles" the possible outcomes of x % n.

Going back to our hash function, this means that multiplying a key value with a number coprime to the number of buckets will never make the distribution of values into buckets less uniform.

Ok, this means that we do no harm with the multiplication, but what *good* does it actually do?
To explore this question, we must first take a look at the algorithm in which this multiplication takes place.

## Benefits of polynomial rolling hashes

The algorithm that we see both in `String.hashCode()` and `Objects.hash(Object...)` is called a [polynomial rolling hash](https://en.wikipedia.org/wiki/Rolling_hash#Polynomial_rolling_hash).
It is used to calculate hashes of composite objects in a way that each component has an equally important influence on the hash value.
To understand how it does this and why this is imporant, we first look at the following prototype:

```java
public static void hash(int[] data, int p) {
    hash = 1
    for(int x: data) {
        hash = hash * p + x;
    }
}
```

At first glance it is odd that the whole `hash` is successively multiplied with `p`, but this becomes easier to see if we write down the result for `data.length = 3`:

```java
hash(data) = ((1 * p + data[0]) * p + data[1]) * p + data[2]
           = data[2] + p * data[1] + p * p data[0] + p * p * p
```

So what `hash(int[], int)` is doing is actually just building a polynomial in which the elements of `data` are the coefficients and `p` is the base.
We could write this in a more straightforward way, but exponentiation is more expensive than multiplication and since hash tables are often used for performance reasons and we have to build a hash each time we retrieve a value from the table, we want to save a little time here.

So why are polynomials a good idea?
To understand this, let us first look at the most naive solution we could think of.
Essentially, we want to reduce an array of numbers to a single number.
So why not just take the sum of the elements?

The main issue here is that addition is a commutative operation. a + b is the same as b + a, which means that the order of the elements does not matter for the end result.
If we think about hashing strings, all anagrams will collide with each other, since, for example, the string "one" will have the same hash value as the string "neo".
Additionally, if the range of possible values for the individual elements is smaller than the range of integers, a sum does not grow quickly enough to yield a good distribution of hash values across the integer range.
This is again the case for strings.
For ASCII strings of length 4, we have 128 possible characters with a maximum sum of 4 · 127 = 508, but we have 128<sup>4</sup> = 268,435,456 possible four-character strings, which means an expected collision rate of at least 1 - 508 / 268,435,456 = 99.9998%.

This is where the polynomial rolling hash comes in.
By using polynomials, we both avoid the commutativity of addition because each summand is multiplied with a different value before summation, and even when the data only consists of very small values, the exponentiation quickly spreads these values over the integer range.

Now for the choice of `p`, remember our theorem:

> Multiplying x with a number a that shares no divisors with n "shuffles" the possible outcomes of x % n.

Here, `p` is the factor a and the amount of buckets in the hash table is n.
To choose a good value for `p`, we have to know how the scaling of the hash table is implemented.
If we don't, the safest bet is a prime number, since it will not share any divisors other than itself with any other number.

Since we are in Java, we can look up the implementation of `HashMap<K,V>`, which always uses powers of two as the table length.
The reason for this is that instead of using the modulo operator we can just calculate `(n - 1) & h` when `h` is the hash value.
Since n = 2<sup>e</sup>, the binary representation of `n - 1` are zeros followed by a series of `e` ones and the bitwise and operator gives us just the last `e` bits of the hash.

This also means that the only restriction we have to follow for `p` is that it cannot be even.
All odd numbers will be coprime to 2<sup>e</sup> for all e.

## Remaining sources of collisions

By now we have ensured that neither the multiplicative factor nor the table size may introduce any particular pattern of collisions.
Assuming a uniform distribution of the content of the `data` array across the possible number of options (be it 128 ASCII chars, 2<sup>16</sup> UTF-16 chars, or 2<sup>32</sup> integers), this would give us a perfect hash function with minimal collisions.

The only remaining point of concern is our data itself.
Remember that multiplication with a number coprime to the number of buckets does not make the spread across buckets *worse*, but it also cannot do anything if the spread was already bad *before* the multiplication.
For example, if we would start with `hash = 0` instead of `hash = 1`, we would be able to easily produce collisions if all elements of `data` were divisible by two for all or at least many of the elements that we want to store.
By starting with `hash = 1` we add the summand p<sup>data.length</sup> to the calculation, which cannot be divisible by two.

At this point we have ruled out easily *predictable* patterns of our data that may cause collisions, but in real data there might be all kinds of *unpredictable* patterns.
Unless we run tests with a particular `p` and a particular data set that is representative of real world applications, we cannot be sure that the hash function really works well for our use case.

Just to give you an example of what kind of patterns we might be talking about, the letter 'e' is far more likely to occur in an english text than the letter 'k'.
For texts in other languages the probability distribution might be similar or entirely different.
And what about other kinds of data such as file system paths, points in a 2D coordinate system, or dates?
All of these are not uniformely distributed by any means, so some choices for `p` might work well and others quite poorly.

## History of 31

This brings us to the magic number 31.
As already hinted at, you can read up the whole history of how this number was proposed by Joschua Bloch in an [old JDK bug report](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=4045622).
In short, there are two main arguments: One is the previous use of 31 by other programmers, and the other is a test performed by Bloch himself.

The references for the choice of the number 31 go back to Kerninghan and Ritchies "The C programming language", but when Bloch called them and asked them about its origin, neither of the authors could remember it.

Since Bloch was aware that 31 was by far not the only candidate, he performed tests evaluating collision probabilities with the following kind of data:

> * All of the words and phrases with entries in Merriam-Webster's 2nd Int'l Unabridged Dictionary (311,141 strings, avg length 10 chars).
> * All of the strings in /bin/*, /usr/bin/*, /usr/lib/*, /usr/ucb/* and /usr/openwin/bin/*  (66,304 strings, avg length 21 characters).
> * A list of URLs gathered by a web-crawler that ran for several hours last night (28,372 strings, avg length 49 characters).

The composite number 33 performed a little better than the prime 31, but since Bloch was unsure about the mathematical foundations, he was more comfortable choosing the candidate that was indeed a prime number.

Let's put aside for a minute that this testing procedure leads to a preferential treatment of English speaking countries over others and Linux users over Windows users, and just acknowledge that choosing any single number that would work well for all application scenarios across all existing and future Java applications is an extremely hard problem.
It may very well be that choosing a number that "works well enough" for some popular applications might be the best that Bloch could do in this situation.

However, while this is true for `String.hashCode()` it *does* seem that the 31 was copied over to `Object.hash()` without much thought or testing.
After all, we should assume different patterns to occur in arbitrary composite objects than in strings, which are heavily shaped by natural and formal languages.

## Bonus: Evaluating different primes

Other people have already tried to come up with "better" primes than 31.
In general I find the quest for the best prime number for a general hash function moot, because—as explained earlier—different application scenarios will have different patterns leading to a different performance of individual prime numbers.

However, there are a few questions left that still tickled me:

* Do larger prime numbers really perform better than smaller ones?
* Do Mersenne primes perform better in speed and/or collision avoidance than other primes?
* Will the prime 31 perform as well for strings in other languages as it does for English?

So in a small myth busting experiment, I put together a few very small test cases which I think are fairly realistic keys for a hash table:

* The 1000 most common English words
* The 1000 most common German words
* 100000 random pixels in a 1024x768 pixel image consisting of two integers for the x- and y-coordinate
* the same pixels, but converted to strings of the form `"(x, y)"`
* 10000 random dates between 1983 and 2022 consisting of three integers for year, month, and day
* the same dates, but converted to strings in ISO 8601 format (`"YYYY-MM-DD"`).

For the pixel example I also assessed the performance of a custom hash function that just adds the coordinates after shifting the y coordinate left by 10 bits, effectively just enumerating the pixels line by line.

To make the comparison as realistic as possible, I calculated the number of buckets as the lowest power of two such that the stored values fill only 75% of the available space at maximum.
In Java this is assured by the "load factor" in the HashMap implementation.
I also did not use the polynomial rolling hash directly, but applied a second hash function that XORs the hash with itself shifted by 16 bits to the right as in the protected method `HashMap.hash(Object)`.
Unlike Bloch, I did not calculate the average number of items per bucket in the hash table but the collision percentage, because this allows comparison across different tests with different table sizes.

I also performed a very crude performance test by running the whole simulation once to ensure that the JVM is warmed up and then taking time measures with `System.nanoTime()`, since I did not want to set up a [JMH](https://github.com/openjdk/jmh) project for such a small test.

Let's have a first look at the prime values below 50 to see how the prime 31 performs in comparison to its direct neighbors:

<div class="bokeh-container"><script src="/assets/img/prime31_1_50.js" id="prime31_1_50"></script></div>

The dotted vertical lines show prime numbers and the solid vertical lines indicate the Mersenne primes 3, 7, and 31.
The colored lines represent the different test scenarios and the faded area in the background is the result of the crude performance test.

We can see a few things here that were expected and also a few that were surprising.
For one, the prime 31 seems to be neither a particularly bad nor a particularly good candidate for our test cases.
If we had to determine a "winner" in this range, it would probably be the prime 29 due to its exceptional performance for the date test.

Both the raw versions of the date and points tests show symptoms of having a too narrow value range when the multiplicative factor is small.
Most surprisingly, converting dates and points to strings yields much better hashing performance in both cases.
Even the custom idea of just enumerating pixels performs well but still worse than the string variant.
Memo to myself: Stop scolding students for implementing `hashCode()` as `return this.toString().hashCode()`.

Another result that is surprising at first glance is that we actually don't see more collisions for even factors as we would have predicted.
However, this can be explained by the second hash function applied by `HashMap`, which unfortunately makes our results less predictable.
I have run the test without it and the result is indeed much more jagged with worse performance for even factors.

Finally, there is no noticeable performance gain in terms of computation speed when using Mersenne primes.
This can be explained by the fact that the Java compiler does not automatically perform the required optimization step to transform the multiplication into a shift and subtract operation.
Looking a little closer into this, there is a [JDK bug report about changing the code to improve the performance of `String.hashCode()`](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6506618), but it turns out that the performance gain on modern machines is a whooping 0.01%.
Myth busted!

The only myth that remains is that larger primes would perform significantly better.
For this, let's redo this calculation around the other Mersenne primes within the integer range: 127, 8191, 131071, 524287, and 2147483647.

<div class="bokeh-container"><script src="/assets/img/prime31_102_152.js" id="prime31_102_152"></script></div>

<div class="bokeh-container"><script src="/assets/img/prime31_8166_8216.js" id="prime31_8166_8216"></script></div>

<div class="bokeh-container"><script src="/assets/img/prime31_131046_131096.js" id="prime31_131046_131096"></script></div>

<div class="bokeh-container"><script src="/assets/img/prime31_524262_524312.js" id="prime31_524262_524312"></script></div>

<div class="bokeh-container"><script src="/assets/img/prime31_2147483597_2147483647.js" id="prime31_2147483597_2147483647"></script></div>

And for good measure one that is quite large but not near any power of two:

<div class="bokeh-container"><script src="/assets/img/prime31_993922790_993922840.js" id="prime31_993922790_993922840"></script></div>