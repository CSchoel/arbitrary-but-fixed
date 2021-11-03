---
layout: post
title: 'AI for laypersons: Stock price prediction with nearest neighbors'
description: 'In the first post of the ''AI for laypersons'' series, I introduced
  a very simple AI based on the nearest neighbor algorithm. In this post, I want to
  show that the same idea can also be applied to prediction tasks such as the
  prediction of stock prices.'
categories:
- AI for laypersons
tags:
- artificial intelligence
- machine learning
- image recognition
---

<!--
Stock market prediction (prediction)
  - prediction problem
  - "distance" of two lists of integers (~> euclidean distance)
  - heterogeneous data (take date into account for summer/winter changes)
-->

## Recap

In this series we have previously classified emails in "spam" and "ham" and recognized hand-drawn digits from images.
In both cases, we used the nearest neighbor algorithm, which simply finds the "most similar" example from a large database and copies the label ("ham"/"spam" or the digits from 0 to 9) attached to that element as classification output.

One interesting observation was that the only difference between the spam detection AI and the image recognition AI was the data that we used.
For emails, we counted the number of matching words to measure similarity and for images we counted the number of matching pixels.
In this post, I want to give another example of the broad applicability of this approach by looking at stock market prediction.

## A new task: Stock market prediction

Today I will teach you how to get rich quick—just kidding, *please do not use the techniques presented here for actual stock trading*.
That being said, it *is* interesting to think about the problem how one could predict the price of a stock on the following day given the price history over the last five, ten, or five hundred days.
After all, very real money is being made with artificial intelligence in this area.

Our data might look as follows:



## Predicting numbers instead of classes

## Neighbors of data series