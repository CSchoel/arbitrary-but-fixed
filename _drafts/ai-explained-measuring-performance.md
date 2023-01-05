---
layout: post
title: 'AI for laypersons: Measuring classification performance'
description: In this post you will learn how to measure the performance
  of an AI that classifies text or images into categories.
categories:
- AI for laypersons
tags:
- artificial intelligence
- machine learning
---
<!--
- Performance metrics
  - accuracy instead of manual inspection
  - importance of a train/test split
  - error types: TP, TN, FP, FN
  - precition/recall to distinguish between error types
  - sensitivity/specificity
  - f-measure?
  - confusion matrix
-->

## Accuracy

Think about a very simple AI that classifies emails into benign "ham" or unwanted "spam", very much like the one we built in a [previous article]({% post_url 2021-05-30-ai-explained-with-k-nearest-neighbors %}):
How do we measure how good our AI performs?

Up until now, we just looked at a few examples manually and determined whether we felt that the outcome was correct.
This works if our question is just "Can the AI distinguish between a typical 'Nigerian prince' spam mail and a genuine mail to a friend from Nigeria?".
But what if the question becomes "Can the AI detect all kinds of typical spam mails that are in my inbox?" or if we also want to check for the kind of spam our friends and colleagues are getting?
The more general we want our AI to be, the more examples we will need to check.
Wouldn't it be great if we could just automate this?
After all, all we need for that a list of emails for which we already know whether they are "spam" or "not spam".
This is the same kind of labeled data that we needed for building our AI in the first place.
To distinguish both datasets, we will call the data we use for testing the *test set*.

Having this data lets us rephrase the question to "What percentage of these examples does the AI get right?".
This measure is called *accuracy* and it can be calculated simply like this:

1. Classify all example emails in the test set with the spam detection AI.
2. Count how often the AI outputs the right choice of "spam" or "not spam".
3. Divide that number by the total number of examples in the test set.

The possible outcomes are between 0 (the AI does not get any of the examples right → 0 % accuracy) and 1 (the AI gets every example right → 100% accuracy).
In general, an AI with 80% accuracy is better than an AI with 70% accuracy, for example.

## A cautionary note about data separation

In the previous example, I just assumed that we do not use the *same* data for building the AI and for testing it.
Let's have a quick look at why we do this and what will go wrong if we fail to separate between *training* and *test* data:

TODO

## Different kinds of errors

## Dealing with more than two categories