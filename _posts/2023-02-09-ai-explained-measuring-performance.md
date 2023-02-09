---
layout: post
title: 'AI for laypersons: Measuring classification performance'
description: In this post you will learn how to measure the performance of an AI that
  classifies text or images into categories.
categories:
- AI for laypersons
tags:
- artificial intelligence
- machine learning
date: 2023-02-09 20:40 +0100
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

Until now, we just looked at a few examples manually and determined whether we felt that the outcome was correct.
This works if our question is just "Can the AI distinguish between a typical 'Nigerian prince' spam mail and a genuine mail to a friend from Nigeria?".
But what if the question becomes "Can the AI detect all kinds of typical spam mails that are in my inbox?" or if we also want to check for the kind of spam our friends and colleagues are getting?
The more general we want our AI to be, the more examples we will need to check.
Wouldn't it be great if we could just automate this?
After all, all we need for that a list of emails for which we already know whether they are "spam" or "not spam".
This is the same kind of labeled data that we needed for building our AI in the first place.
To distinguish both datasets, we will call the data we use for testing the *test set*.

Having this data lets us rephrase the question to "What percentage of these examples does the AI get right?".
This measure is called *accuracy*, and it can be calculated simply like this:

1. Classify all example emails in the test set with the spam detection AI.
2. Count how often the AI outputs the right choice of "spam" or "not spam".
3. Divide that number by the total number of examples in the test set.

The possible outcomes are between 0 (the AI does not get any of the examples right → 0% accuracy) and 1 (the AI gets every example right → 100% accuracy).
In general, an AI with 80% accuracy is better than an AI with 70% accuracy, for example.

## A cautionary note about data separation

In the previous example, I just assumed that we do not use the *same* data for building the AI and for testing it.
Let's have a brief look at why we do this and what will go wrong if we fail to separate between *training* and *test* data:

Remember the instructions for our spam detection AI:

> 1. For all labeled emails in the database, calculate the number of matching words between that email and the query.
> 2. Find the database entry with the maximum number of matching words.
> 3. Output the label attached to this database entry.

What happens if we try to classify an email that was already in the database?
Well, the maximum possible number of matching words between one text and another is of course _all_ the words in the text.
So if we ask the AI for the best label for an entry that it has already stored in its database, it will always find the exact copy of that entry and output the label attached to that copy.
In other words: If we use our _training_ data to calculate accuracy, we will end up with 100% accuracy.
Always.
By definition.

The same is true for many other algorithms that you can use to build an AI.
This is why AI researchers and developers always stash away a part of their data as _test_ data that the AI is never allowed to see until the time comes to evaluate its performance.

## Different kinds of errors

Let's say we have two separate spam classification AIs with 70% accuracy.
Can there still be differences between them?

Well, let's have a look at the different _kinds_ of errors our AI can make by going through all possibilities:

* _True positive_: If it classifies a mail as spam that actually was a spam mail, that's good. No error here.
* _False positive_: If it classifies a mail as spam that actually was not spam, that's one error to make. The AI was too eager in finding spam.
* _False negative_: If it classifies a mail as not spam that actually was spam, that is also an error, but in the opposite direction. It was too lazy and did not catch all the spam mails.
* _True negative_: If it classifies a mail as not spam that actually was not spam, that's fine again.

So, we end up with two kinds of errors: "eagerness errors" and "laziness errors".
As you may have noticed, one of the two is a little more dangerous:
Being too lazy just means we still have to delete a few spam mails ourselves.
Being too _eager_ might mean that a mail from our Nigerian friend or maybe from the company in Nigeria where we applied for a job lands in the spam folder, and we might never notice it.

This leads to two new questions about the AI's performance:

1. What percentage of the examples that end up in the spam folder actually are spam.
2. What percentage of the spam mails that I receive in my inbox will be sent to the spam folder.

The first measure is called _precision_ and the second is called _recall_.
As you might already have guessed, they can be calculated as follows:

**Precision**

1. Count the number of emails that get a "spam" label from the AI and actually are spam.
2. Count the number of emails that get a "spam" label from the AI, regardless of whether they were spam or not.
3. Divide the number from step 1 by the number of step 2.

**Recall**

1. Count the number of emails that get a "spam" label from the AI and actually are spam.
2. Count the number of emails that are spam, regardless of whether the AI classifies them as such.
3. Divide the number from step 1 by the number of step 2.

To put it in simple terms, higher precision means less eagerness errors and higher recall means less laziness errors.

Precision and recall are, however, not the only measures that help to distinguish between those two kinds of errors.
Imagine a medical setting where you test for a disease like COVID-19:
On the one hand, you want to know how good the test is at detecting sick people as sick.
But on the other hand, you also want to know how good it is at detecting _healthy_ people as healthy.

For the first part, you can just use recall because that is exactly what recall measures: The percentage of all sick people that will test positive.
In this setting, this is called _sensitivity_, however, because it measures how _sensitive_ the test is to finding the disease.

For the second part, we use a different measure that we call _specificity_.

**Specificity**

1. Count the number of healthy people who are tested negative.
2. Count the number of healthy people in the whole test group, regardless of whether they were tested negative.
3. Divide the number from step 1 by the number of step 2.

Again, you can think of a test that is more _specific_ of having less eagerness errors and a test that is more _sensitive_ of having less laziness errors.
It is just a slightly different definition and terminology that helps to make the right decisions in a medical setting.

It is important to note here that both for precision and recall and for sensitivity and specificity, only knowing _one_ of these two measures will tell you nothing about the actual quality of the AI or COVID-19 test.
This is because you can easily cheat them by just classifying every sample as spam/sick (100% recall, 100% sensitivity) or classifying every as no spam/healthy (100% specificity).
Precision is a little harder to trick, since we would divide by zero if we classify every sample as spam.
However, that just means we need to find that one spam mail that we are really sure about, and we still can get 100% precision.

## Dealing with more than two categories

Until now, we only looked at the spam example, where there was only a yes/no decision to make by our AI.
How about the [image classification task]({% post_url 2021-09-23-ai-explained-image-recognition %}) where we tried to recognize handwritten digits from 0 to 9?
Here, we have ten possible classification outcomes and ten possible _true_ labels.

We can still calculate the overall accuracy, which tells us how close we are to our goal in a single number.
We can also calculate precision and recall for each digit, which will tell us which digit we recognize too often or too seldom.
However, there is a new question that becomes interesting: "Which digit is confused with which?".
If our AI sometimes confuses a 1 with a 7 or an 8 with a 0, that might be acceptable, but if it starts confusing a 4 and a 1 really often, something weird is going on.

To diagnose these issues, we can just count:

1. How often does the AI classify a 0 as a 0?
2. How often does the AI classify a 0 as a 1?
3. How often does the AI classify a 0 as a 2?
4. ...
5. How often does the AI classify a 1 as a 0?
6. How often does the AI classify a 1 as a 1?
7. ...

And so on. This gives us 100 numbers for all the ten times ten possible outcomes.
To visualize this, you can build what is called a _confusion matrix_ that puts the label predicted by the AI (`p:`) on the columns and the true class label (`t:`) on the rows of a table.
The result looks like this.

|      |  p:0 |  p:1 |  p:2 |  p:3 |  p:4 |  p:5 |  p:6 |  p:7 |  p:8 |  p:9 |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
|  t:0 |  967 |    1 |    1 |    2 |    0 |    1 |    5 |    0 |    2 |    1 |
|  t:1 |    0 | 1126 |    3 |    1 |    0 |    1 |    1 |    0 |    3 |    0 |
|  t:2 |    3 |    2 | 1001 |    8 |    1 |    0 |    3 |    6 |    8 |    0 |
|  t:3 |    0 |    0 |    1 | 1002 |    0 |    1 |    0 |    1 |    5 |    0 |
|  t:4 |    3 |    1 |    2 |    2 |  955 |    2 |    6 |    1 |    3 |    7 |
|  t:5 |    3 |    1 |    0 |   37 |    1 |  833 |    9 |    0 |    6 |    2 |
|  t:6 |    4 |    3 |    1 |    1 |    1 |    3 |  941 |    0 |    4 |    0 |
|  t:7 |    2 |    9 |    8 |    5 |    0 |    0 |    0 |  988 |    8 |    8 |
|  t:8 |    3 |    1 |    3 |   10 |    3 |    2 |    2 |    3 |  946 |    1 |
|  t:9 |    3 |    8 |    0 |   10 |    8 |    8 |    1 |    4 |    5 |  962 |

To look for mistakes, we search for the largest numbers outside the diagonal, since the diagonal shows us the samples that were classified _correctly_.
For this particular classifier, we can see that the most common mistake is to predict a 3 (`p:3`) for images that actually showed a 5 (`t:5`).
If we roughly calculate the sum over the rows, we can also see that the dataset used for the test contained fewer examples for the digit 5 than for the digit 3.
If the same was true for the training data, this might already indicate why the AI makes exactly this kind of mistake.
It could be that it just hasn't seen enough examples of the digit 3.
When it is in doubt, it errs on the side of the class label that is more likely to occur in the data.

As you can see, confusion matrices may be confusing (heh) to look at at first, but they can tell you a lot about the performance of an AI that is supposed to classify data into multiple options.

## Final remarks

Let's sum up what we have learned:

* There are automatic measures that can tell you how good an AI is.
* Some of these measures (_accuracy_) are just one number, others are number pairs (_recall/precision_, _sensitivity/specificity_).
    Never trust anyone, who just boasts a high score in _one_ of the numbers belonging to a pair!
* When you want to look at what kind of errors an AI used for classification makes in detail, you can build a _confusion matrix_.
* It's important not to test an AI on the data it has already seen when it was trained, since that makes it easy for the AI to cheat.

Even if you won't remember any more details from this post than those bullet points, you are already in a powerful position to judge AI systems.
You know what numbers to look out for, be suspicious if they are not or only partly reported, and can compare different AIs with each other based on those numbers.
