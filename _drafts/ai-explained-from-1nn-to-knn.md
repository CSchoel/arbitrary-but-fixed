---
layout: post
title: 'AI for laypersons: From one to k nearest neighbors'
description: >
  In the first post of the 'AI for laypersons' series, I introduced a very simple AI based on the nearest neighbor algorithm.
  In this post, I want to elaborate on this first example to arrive at a fully-fledged algorithm that is actually used for solving AI problems in the real world.
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

Result:
* `Label`: the most fitting label for the query (either "spam" or "ham")

Steps:
1. For all labeled emails in the database, calculate the number of matching words between that email and the query.
2. Find the database entry with the maximum number of matching words.
3. Output the label attached to this database entry.

## Going into detail

This kind of human-readable algorithm description is called "pseudocode", because it is not quite real code, but also more formal and precise than our messy everyday language.
There are no rules for writing pseudocode, other than that it should be free of any ambiguities and make it obvious how to derive real machine-readable code from it.
Now as a layperson you may be asking what is "real code", and depending on who you ask, you might get quite different opinions.
Here, I will again use the simple definition that code is "text that a programmer has to type in order to produce an executable application".
Today's programmers have powerful libraries at hand that can perform such complex tasks like "download a file", or "show a button with the text 'OK' on the screen" with a single command.
However, for tasks where no library exists - such as developing fancy new spam detectors - they have to use the basic building blocks of programming languages.
In essence these are the following three concepts:

* Perform some basic arithmetic operations (addition, subtraction, multiplication, ...) on values stored in named variables
* Branch between two alternative sets of instructions based on some numerical comparison of values (equal, less, greater, ...)
* Repeat a set of instructions in a loop until some condition is satisfied (e.g. the end of a list has been reached)



## Getting more generic

## From 1 to k

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
- k-NN
- Data: More is better
  - show performance gain with increasing amount of data
  - feature vector grows by one bit => percentage of feature space covered by samples is halved
  - => massive amounts of data required for complex problems
- Performance metrics
  - accuracy
  - precition/recall
  - sensitivity/specificity
  - f-measure
  - confusion matrix
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