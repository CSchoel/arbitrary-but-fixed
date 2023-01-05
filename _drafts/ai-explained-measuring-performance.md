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
  - f-measure
  - confusion matrix
-->

## Accuracy

Think about a very simple AI that classifies emails into benign "ham" or unwanted "spam", very much like the one we built in a [previous article]({% post_url 2021-05-30-ai-explained-with-k-nearest-neighbors %}):
How do we measure how good our AI performs?

Up until now, we just looked at a few examples manually and 