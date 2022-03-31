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
That being said, it *is* interesting to think about the problem how one could predict the price of a stock on the following day or in the following week given the price history.
After all, very real money is being made with artificial intelligence in this area.

Our data might look as follows:

|Date|Value \[\$\]|
|----|-----|
|2022-03-01|50|
|2022-03-07|54|
|2022-03-14|60|
|2022-03-21|59|
|2022-03-28|57|
|2022-04-05|58|

In this case we see the price of a single share of a company's stock[^1] change from week to week.
I have chosen weeks instead of days here because then we do not have to consider that markets are closed on the weekend.
In principle, however, we could also formulate this problem for daily or monthly prices.

To earn money with stock trading, you have to buy shares of a stock when they have a low value and then sell them when their value has risen.
The core question we have to ask is therefore: "What will the price of the stock be next week?"
This prediction of a future trend is the inherent risk in stock trading and the attack point that we want to tackle with our AI.

## Data series as database entries

The first difference that you might notice between this task and the previous ones is that our dataset is no longer composed of individual items that are independent of each other.
Instead, it is now a series of interconnected data points.
This poses the question what kind of "neighbors" we might consider in our nearest neighbor approach.

In principle, we want to predict an unknown, future share value based on a history of known, past share values.
The easiest way to transform the data series given above into a list of individual database entries that we can use for the nearest neighbor approach is therefore to only consider, for example, the history of the last three weeks.
We can then split the data series into subseries of four successive weeks, where the values at the first three weeks are the database entry and the value at the fourth week is the "label" that we want to predict:

| Database entry | Label |
| -------------- | ----- |
| 50, 54, 60 | 59 |
| 54, 60, 59 | 57 |
| 60, 59, 57 | 58 |

In this table I have used overlapping individual histories (week 1–3, week 2–4, and week 3-5) to obtain as many database entries as possible.

## Neighbors of data series

Now that we know how our database entries look, the question remains how to determine the similarity between two of these entries in order to find our beloved nearest neighbors.
In our previous examples, we always just counted the number of matching items (words, pixels) between the two database entries.
Since our database entries now consist of arbitrary numbers, that does not work anymore.
Instead, we have to calculate how close these numbers are to each other.
The easiest way to do so is to take the absolute difference between them, that is, subtract the one from the other and if the result is negative, just flip the sign to obtain a positive number.
For example, the individual differences between the numbers in the first two database entries would look like this:

| | Entry 1 | Entry 2 | Abs. diff. |
|-| ------- | ------- | ---------- |
| last week | 50 | 54 | \|50 - 54\| = \|-4\| = 4 |
| 2nd last week | 54 | 60 | \|54 - 60\| = \|-6\| = 6 |
| 3rd last week | 60 | 59 | \|60 - 59\| = \|1\| = 1

The smaller these differences are, the higher the similarity between the two entries.
However, each difference still consists of three numbers.
Is a difference of (4, 6, 1) larger or smaller than a difference of (3, 5, 2)?
To answer this problem we need to condense the difference down to a single number, for example by simply taking the sum of the individual differences.
For our example, we can then say that 4 + 6 + 1 = 11 is indeed larger than 3 + 5 + 2 = 10.

In a real application, one would use more complex formulas such as the [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance#Higher_dimensions), but for our purposes this simple sum of differences is perfectly fine.

## Predicting numbers instead of classes

When discussing our database format, I have put the term "label" in quotes, since we actually do not want to predict distinct labels (such as "ham", "spam", "digit 1", or "digit 2") but an arbitrary number.
After a week the share value could drop to zero, or it could double or quadruple.
While some answers are of course more probable than others, the theoretical number of possibilities is endless.

How can we deal with this infinite number of possible labels?
The answer is surprisingly simple: We do the same as before.
Once we have found the nearest neighbor to a given series of share values, we simply copy the share value at the fourth week as our prediction.

This has the disadvantage that we will never produce any numbers that are not already in the database, but this can be compensated by having a really large database with a good coverage of different cases, which we would need anyway to make good predictions.
Alternatively, we could also store trends (by how much did the value rise/fall between weeks) instead of absolute values, which would also allow us to predict an infinitely rising or falling trend, but for now we just want a simple solution that works.

## Putting together the algorithm

With this, we have all the information that we need to build an AI using the nearest neighbor approach to predict a share value based on a three-week history:

### Algorithm: Simple share value predictor

Inputs:

* `Database`: list of three-week share value histories with separate fourth-week value
* `Query`: a three-week share value history

Output:

* `Prediction`: the most likely share value in the next week

Steps:

1. For all histories in the database, calculate the sum of absolute differences between that history and the query.
2. Find the database entry with the smallest sum of differences.
3. Output the fourth-week value attached to this database entry.

Again, we have successfully converted the human task "Find the share price that this stock will have next week." into a set of instructions that can be automatically performed by a computer.
While you will definitely not get rich quick with this particular algorithm, real trading algorithms do follow the same principle to get as much information out of existing historical data in order to predict share values in the future—and they are as susceptible to unforeseen patterns that do not appear in their database.

If you imagine a much more sophisticated algorithm than this one running on years and years of data from thousands of stocks, maybe also analyzing the behavior of other traders and then making sub-second decisions, it is easy to see why high-frequency trading is so effective at making the rich even richer and why people who do not have access to these tools tend to lose out in comparison.

To paint a less bleak picture, we have unlocked a whole new class of problems that we can now tackle with our AI approach, namely all problems that require us to predict a numeric value that depends on a list of other numeric values.
This general task is called [regression analysis](https://en.wikipedia.org/wiki/Regression_analysis), and it can also, for example, be used to predict crop yield in agriculture or the effect of medication on blood pressure based on patient-specific data.

## Beyond one week

You might have already asked yourself what we would do if we wanted to predict the share price for a duration of more than one week into the future.
For this, we basically have two possible approaches:

1. We can predict more than one week by storing more values in the "label" part of our database.
  Instead of just the fourth-week value we could also store the value for the fifth, sixt week, and so on.
  This approach increases the problem that we only can predict trends that we have already seen as we now have even more possible outputs and need even more data in the database.
2. We can simply run our algorithm multiple times.
  If we predicted the value 59 for the history [50, 54, 60], we can then see what our AI yields for the new query [54, 60, 59].
  This does not require to change the algorithm or to acquire more data, but it also means that our errors will accumulate, and our predictions will get increasingly unreliable the longer the desired output.

## Next steps

We have now seen that the nearest neighbor algorithm is very flexible and in principle behaves similar to state-of-the-art machine learning approaches across a large variety of tasks.
To dive deeper into the core principles of artificial intelligence, we just need to take one additional step moving from one to an arbitrary number k of neighbors to obtain the k-nearest neighbor algorithm.
This will be established in the next post in this series.

---

[^1]: If you are as unfamiliar with stock market terms as me before I wrote this post: A company's stock encompasses an arbitrary number of shares (some companies could have a total of 1000 shares, others a total of 50000), which represent a share (hence the name) of the company itself.
