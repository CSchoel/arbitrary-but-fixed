---
layout: post
title:  "Explaining AI with the k-nearest neighbors algorithm"
description: >
    Today the term artificial intelligence (AI) is ubiquitous.
    It is easy to marvel at the achievements of the latest Google project or to quiver in fear before the scenarios invoked by singularity doomsday priests.
    Probably only a very small proportion of the population actually has a realistic impression of what AI is and what it can and cannot do.
    With this post I want to make my contribution to change that using an AI algorithm that is so simple that everyone can understand it.
categories:
    - artificial intelligence
    - machine learning
---

<!-- From kNN to jMeans: just slap j random vectors with class 1 to j in the kNN -->

<!-- Why large amounts of data?: Because when your feature vector grows by one bit, you halve the percentage of the feature space that your samples cover. -->

## Why write a post about AI?

There are already countless answers to the question "What is artificial intelligence?" - most of them written by people that are far more experienced and/or intelligent than I am.
So why write the umpteenth blog post about it?
The honest answer is that I tried to find a good post about the topic online and was disappointed with the search results.
For my taste they were either too shallow to produce real understanding, leaving the reader with a large list of half-explained terms, or too technical to be approachable, focusing only on the tools and application that the writer is most enthusiastic about.

In this post I want to try to bridge that gap by using (and to some extend abusing) the example of a very simple AI algorithm.
At the end of this text I want you to truly and fully understand this algorithm so that you are able to use this understanding as a proxy for understanding other AI algorithms and approaches - and this should be true whether you are a computer scientist, a hairdresser, a physician or a baker.

## What is AI?

I could start this section by introducing a lot of fancy words that describe different kinds of artificial intelligence (AI) to carefully contrast the term with other related terms such as "machine learning" and with more philosophical approaches.
Instead I will just assume that for the layman AI means "the stuff that companies like Google do that detects faces, plays chess, drives cars, recommends movies on Netflix and powers Alexa and Siri".

All those highly successful and widely used AI systems are programs that make predictions or guesses about unseen data based on a knowledge base of existing data.
Take the example

<!--
- Netflix recommendations as 0/1 problem: will like / won't like
- 1st Idea: Neighbors may want to watch the same movies
- 2nd Idea: Use more than one neighbor

- the more data the better

- how to assess performance: separate knowledge base into test and train set
  - only result on unseen data is interesting

- bias

- local vs global optimum: k as (hyper)-parameter
  - increase by one until result becomes worse again

- neural networks are more sophisticated better classifiers, but still classifiers
  - thousands to millions of parameters
  - hundreds of thousands of features

mustererkennung statt echter intelligenz
wo wird das ausgeführt?
abstraktionsvermögen / generalisierung / extrapolation

-->