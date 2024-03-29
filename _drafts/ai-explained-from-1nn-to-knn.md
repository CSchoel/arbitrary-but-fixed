---
layout: post
title: 'AI for laypersons: From one to k nearest neighbors'
description: >
  In the first post of the 'AI for laypersons' series, I introduced a very simple AI based on the nearest neighbor algorithm.
  In this post, I want to elaborate on this first example to arrive at a fully-fledged algorithm that is actually used for solving AI problems in the real world.
math: true
categories:
- artificial intelligence
- machine learning
---

## Recap

In the [last post]({% post_url 2021-05-30-ai-explained-with-k-nearest-neighbors %}) we constructed our very first AI algorithm that was able to mimic the human decision whether a newly received email is unwanted "spam" or benign "ham".
We also established that the technical term "algorithm" actually only means a step-by-step description of how to translate input values into output values.
For our spam detection algorithm this looked as follows:

### Algorithm: Simple spam detector

Inputs:

* `Database`: list of labeled emails
* `Query`: unlabeled email that should be classified

Output:

* `Label`: the most fitting label for the query (either "spam" or "ham")

Steps:

1. For all labeled emails in the database, calculate the number of matching words between that email and the query.
2. Find the database entry with the maximum number of matching words.
3. Output the label attached to this database entry.

## Getting more generic

As already hinted at in the previous post, we can transform this description into a general purpose AI algorithm by replacing the term "maximum number of matching words" with "minimum distance":

### Algorithm: Nearest neighbor classifier

Inputs:

* `Database`: list of labeled samples
* `Query`: unlabeled sample that should be classified

Output:

* `Label`: the most fitting label for the query (any of the labels in the database)

Steps:

1. For all labeled samples in the database, calculate the distance between that sample and the query.
2. Find the database entry with the minimum distance to the query.
3. Output the label attached to this database entry.

The basic idea remains the same with the main difference being that "samples" can be data shaped in any way and that labels can also vary freely.
The only difficulty may be how to properly define the "distance" between two samples, which is required to find the sample with minimal distance - the "nearest neighbor" that gives the algorithm its name.
To give a specific example, you could use this algorithm for speech recognition using small audio files of fixed length as samples and recognized words as labels.
As audio files are just a very long list of numbers that constitute a waveform, you could define the distance between two audio files to be the sum of the differences between these individual numbers.
Alternatively, you could also use a more involved definition like transforming both audio files into the frequency spectrum and comparing the dominant frequencies.
Like with audio files, you could use a nearest neighbor algorithm to recognize handwritten digits by using image files as samples and the digit that is seen in the image as label.
Here, a simple distance function might sum up the differences per pixel like we did for the audio files.

Going back to our spam filter example, we would use the following mapping:

| General term | Specific term                     |
| ------------ | --------------------------------- |
| sample       | email text                        |
| label        | "spam" or "ham"                   |
| distance     | number of matching words times -1 |

Here you see a common adjustment that is often made in nearest neighbor algorithms:
For our emails, it is easier to define a measure for "similarity" than for "distance".
In such cases, we need a trick that turns small similarities into large distances and large similarities into small distances.
The multiplication with -1 does just that.

As a last remark before we move on, I have called this algorithm a "classifier", without defining the term.
A classifier is nothing more than an algorithm, which assigns labels to unlabeled data.
Most AI problems are classification problems, as "intelligent" choices often just require to recognize instances of a class of items like recognizing spoken words, or recognizing that an image shows a dog rather than a cat.


## Going into detail

Let's have a more detailed look at the distance within the nearest neighbor algorithm.
You probably have already noticed that this is where the magic happens. 🔮
Each nearest neighbor algorithm needs a sub-algorithm that defines the distance between two samples.
Only when we choose a good distance algorithm can we expect "intelligent" choices from the nearest neighbor classifier.

Luckily, there is a pretty generic distance algorithm that works for all samples that are "just a bunch of numbers", which, as we have seen, is true for a surprisingly large variety of data types such as images and audio files.
This distance algorithm is called the *euclidean distance*, because it is based on euclidean geometry.
This is the same kind of math that you use to calculate the distance between two points in two or three dimensions - only that we are not in two- or three-dimensional, but in n-dimensional space.
If this sounds overly technical that is because it is.
n-dimensional space sounds cool, but in essence the algorithm is not much more complicated than our idea of taking individual differences and summing them up.
In fact, we do just that, but we take the square of the differences before we do the summing.
Before you get too many flashbacks to your last math lesson, let's just do a quick example:

$$\begin{aligned}
a = (1, 2, 3, 3)\\
b = (5, 2, 4, 5)
\end{aligned}$$

$$\begin{aligned}
edist(a, b) & = (1-5)^2 + (2-2)^2 + (3-4)^2 + (3-5)^2 \\
            & = 16 + 0 + 1 + 4\\
            & = 21
\end{aligned}$$

Here you have a sample $a$ and a sample $b$, which are both a list of four numbers.
The function $edist$ calculates the euclidean distance by taking the difference between the first element of $a$ and the first element of $b$, squaring the result, and then adding similar terms for the second, third, and fourth elements of both lists.

To get the *real* euclidean distance, you would have to take the square root of the final result, but since this does not change the ordering of how near a sample is to the query, we can just omit that.
AI math is chill like that. ❄️

This example would work quite the same way if $a$ and $b$ were image files.
You would just have to list the color values (usually numbers between 0 and 255) of each pixel starting with the red channel of the pixel in the upper left of the image, followed by its green channel value, its blue channel value, then the three channels of the pixel to the right, and so on, until you reach the right edge of the image and start again at the second row of pixels below the first.
Et voilà, your pretty picture of your dog is now just a very long list of ugly numbers, and you can determine the euclidean distance between that picture of your dog and your friend's picture of their cat.

Another example where the euclidean distance can be applied is our spam detection algorithm.
It may not seem obvious, but there is also a way to turn text documents into just a bunch of numbers.
Actually, this approach is the basis for any kind of indexing used by your operating system or search engines like google to quickly search through enormous amounts of documents.
To do this, we need to restrict ourselves to a fixed number of words.
In practice, it would be sensible to use the 1000 or maybe 10.000 most common english words, but for the sake of this example let's just choose the three words "prince", "nigeria" and "harry".
An email is then just represented by three numbers p, n, and h, where p is one if "prince" occurs in the email and zero otherwise, while n is one if "nigeria" is present in the email and zero otherwise, and for h it is the same with the word "harry".
Using this transformation, the emails in the previous post would become the following:

```
[Database entry 1:]

Label: spam
Data: [1, 1, 0]


[Database entry 2:]

Label: ham
Data: [1, 1, 1]


[New email:]

Label: ???
Data: [1, 1, 1]
```

All the gossip is gone, but our classification still works:

$$\begin{aligned}
edist(entry1, query) & = (1-1)^2 + (1-1)^2 + (0-1)^2\\
                     & = 0 + 0 + 1\\
                     & = 1
\end{aligned}$$

$$\begin{aligned}
edits(entry2, query) & = (1-1)^2 + (1-1)^2 + (1-1)^2\\
                     & = 0 + 0 + 0\\
                     & = 0
\end{aligned}$$

Entry 2 has the minimum euclidean distance, and therefore we decide to correctly label the email of our friend from Nigeria about the Guarian Nigeraia as "ham".
Only this time, our savior is not `"harry"`, but the last `1` in the query data (which of course is just `"harry"` in disguise 😉).

This representation of text as numbers already hints at a more sophisticated version of our spam detector:
Instead of just using the index list to store whether a word is present (1) or not (0), we could also store the *count* how often the word was found, which would enable us to distinguish between frequent words, which are probably important for the message content, and infrequent words, which might only be anecdotal references.
To not put undue emphasis on common but "uninteresting" words like "a" or "the", we would then ignore these words and do not use them to build our index lists.
As already mentioned, most if not all search engines perform this kind of indexing and distance calculation.
In fact, we could turn our nearest neighbor spam detection algorithm into a search engine, by using a short search string as query instead of a full email and outputting the email text itself instead of its label.

## From 1 to k

Now that you know all about euclidean distances in  n-dimensional space and can shine with your knowledge at any dinner table, the only step that remains is to make the step from 1 to k neighbors:

### Algorithm: K-nearest neighbors classifier

Inputs:

* `Database`: list of labeled samples
* `Query`: unlabeled sample that should be classified

Output:

* `Label`: the most fitting label for the query (any of the labels in the database)

Steps:

1. For all labeled samples in the database, calculate the distance between that sample and the query.
2. Find the k database entries with the least distance to the query.
3. Count how often each possible label occurs within these k nearest neighbors.
4. Output the label with the highest voting count.

The main change is that we now not only keep one nearest neighbor, but the k nearest neighbors.
As it is often with neighbors, they do not have to agree on a single decision.
We now can have k conflicting labels from which we have to choose one.
This is done by a so-called *majority voting*, in which each neighbor casts a vote for their label, and we then select the label that received the most votes.
Of course, we have to break ties somehow, but these details are not important for the general idea of the algorithm.

The beauty of this variant of the nearest neighbors algorithm is that it protects us against bad apples in our data.
Since the labels stem from human decisions, they are subject to human error.
But even without errors there may be instances of "exceptional" samples - for example, a "ham" email that is surrounded by very similar "spam" emails.
An example could be a system administrator that receives a forwarded spam email of an employee who wants to know whether the spam email contains malicious code.
The email itself is not spam, but it *contains* a full spam email in verbatim.
What is the "correct" label in this case?

Real world problems are full of these examples and therefore the k-nearest neighbor algorithm offers some welcome robustness.
If the sysadmin mail sits in the database with the "ham" label, and our AI is asked to classify a new spam email that is very similar to the forwarded spam, it may find that its nearest neighbor is the sysadmin mail and falsely output the "ham" label.
A 5-nearest neighbor classifier would instead see that while there is one very close example of "ham", there are also four examples of "spam" that are only a little more distant.
Through majority voting, it would correctly label the newly received spam email as "spam".

## Remarks about real-world application

I have already hinted at the fact that the k-nearest neighbor (k-NN) algorithm is part of every AI researchers toolkit.
That is mainly, because it is extremely simple to write up a k-NN algorithm for almost any problem and therefore get a first glimpse at what can be achieved with a given dataset.
If a k-NN classifier performs reasonably well, there is hope that a more sophisticated algorithm will perform even better.
If, however, it does not pick up any usable pattern, there may be a problem with the data itself.

Apart from a quick diagnostic tool, a k-NN classifier can also simply be "good enough" for a problem.
With a clever implementation there are surprisinly many instances where choosing a more sophisticated classifier yields little to no improvement.
However, such a "clever" implementation has to iron out several issues in our current definition that have to do with large databases:

* Since we only need to keep the k minimal distances in mind, there is no need to actually *store* the calculated distances for each sample in the database.
* In the majority voting, we also do not have to store counts for every possible lables, but just for the labels that have at least one vote.
* The major downside of the k-NN algorithm is that is becomes slow with large databases, because calculating the distance to millions of entries is time-consuming.
    This can be counteracted by a smarter way of organizing the database.
    Instead of just a list of samples, it can be structured for easier access, much like a telephone book or a map. If you search for a restaurant in London, you do not have to start from the arctic, circling your way around the globe towards the antarctic, but you can use the nature of your query to quickly narrow down the search space. Similarly, you would not start at the front of a telephone book when you search for a "Zacharias Ziegler" or a "Madison Meriwether", but you could narrow down the possible pages because you have an intuition about how human names are distributed along the alphabet.
    For data that is a large list of numbers, there is a standard solution that is called a [k-d tree](https://en.wikipedia.org/wiki/K-d_tree).
    Although it is quite involved and most certainly beyond the scope of this article, I have to drop a link here, because it is such a game changer for the speed achievable with a k-NN algorithm.

<!--
NOTE: Maybe this should be an ipython notebook?
  - or each post should be accompanied by one?

Examples (should be applications of AI that everyone is familiar with)

- Spam filter (0 = no spam, 1 = spam)
  - transformation of email to (relative) word counts
    - easier first step: just set of words (there/not there)
    - even easier: just select 5 words, which seem important
  - "distance" = percentage of words occurring in both e-mails
- Netflix recommendations (0 = won't like, 1 = will like)


Topics (each could be one post):

- 1-NN
- MNIST (recognition)
  - introduce MNIST problem
  - analogy with spam detection: count number of matching pixels instead of matching words
- Stock market prediction (prediction)
  - prediction problem
  - "distance" of two lists of integers (~> euclidean distance)
  - heterogeneous data (take date into account for summer/winter changes)
- Performance metrics
  - accuracy
  - precition/recall
  - sensitivity/specificity
  - f-measure
  - confusion matrix
- Data: More is better
  - show performance gain with increasing amount of data
  - feature vector grows by one bit => percentage of feature space covered by samples is halved
  - => massive amounts of data required for complex problems
- k-NN (optional)
  - k as means against overfitting!
- The problem of Generalization vs Overfitting
  - separate knowledge base into test and train set
  - only result on unseen data is interesting
  - what is truly unseen? (unseen date?, unseen sender?, ...)
  - think about variance to be expected in real world vs variance in training set
- Bias (never trust your data)
  - uneven distribution of samples per class
  - what if we filter out E-mails from dyslexics or foreign speakers?
  - who decides what is spam? (Ground truth)
- local vs global optimum: k as (hyper)-parameter
  - increase by one until result becomes worse again
- unsupervised learning with kMeans
  - From kNN to jMeans: just slap j random vectors with class 1 to j in the kNN
- ANNs for dummies
- similarities between ANNs and kNN
  - both are classifiers (input vector -> class)
  - both rely on data
- differences between ANNs and kNN
  - number of parameters/features
  - black box
  - training effort / required hardware

-->