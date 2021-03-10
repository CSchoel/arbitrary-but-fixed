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