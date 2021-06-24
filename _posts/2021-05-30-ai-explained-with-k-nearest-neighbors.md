---
layout: post
title: Explaining AI for laypersons using the k-nearest neighbors algorithm
description: >
  Today the term artificial intelligence (AI) is ubiquitous. It is easy
  to marvel at the achievements of the latest Google project or to quiver in fear
  before the scenarios invoked by singularity doomsday priests. Probably only a very
  small proportion of the population actually has a realistic impression of what AI
  is and what it can and cannot do. With this post I want to make my contribution
  to change that using an AI that is so simple that everyone can understand
  it.
categories:
- artificial intelligence
- machine learning
date: 2021-05-30 20:38 +0200
---
## Why write a post about AI?

There are already countless answers to the question "What is artificial intelligence?"—most of them written by people that are far more experienced than I am.
So why write the umpteenth blog post about it?
The answer is that I tried to find a good introductory text about the topic for my students online and was disappointed with the search results.
For my taste, they were either too shallow to produce real understanding, leaving the reader with a large list of half-explained terms, or too technical to be approachable, focusing only on the tools and applications that the writer is most enthusiastic about.

This post is the first in a series with which I hope to bridge that gap by using (and to some extent abusing) the example of a very simple AI.
At the end of this first post, I want you to truly and fully understand how this AI works whether you are a computer scientist, a hairdresser, a physician or a baker.
With the whole series, I want to enable you to use the simple method behind it as a proxy for understanding other AI systems, approaches, and general questions and issues.

## What is AI?

I could start this section by introducing a lot of fancy words that describe different kinds of artificial intelligence (AI) to carefully contrast the term with other related terms such as "machine learning" and with more philosophical approaches.
Instead, I will just assume that for the layperson AI means "the stuff that companies like Google do that detects faces, plays chess, drives cars, recommends movies on Netflix, and powers Alexa and Siri".

All those highly successful and widely used AI systems are programs that make predictions or guesses about some real-world problem based on a set of existing examples.
These predictions and guesses should be "intelligent" in the sense that they emulate the choices a skilled human being would make.

## A typical AI problem

To make this a little more concrete, think about your mail inbox and that nice Nigerian prince that wants to share his inherited fortune with you.
Most humans know that mails from nice Nigerian princes are usually just scams to get your money (sorry to all honest Nigerian princes out there 🙈), but how do we teach this knowledge to a machine?
After all we do not want to delete all those spam emails by ourselves!
There are a lot of ways to do this.
For example, we could set up a rule to delete all mails that contain the words "Nigerian" and "prince".
But what if you want to talk to your Nigerian friend about Prince Harry and the latest gossip about the British royals?
This example shows that such simple keyword-based rules are not "intelligent" at all, but rather stupid.
I am sure most of you will easily recall a moment where your spam filter accidentally flagged an email that was obviously not spam—or the other way around.
As it turns out, acting "intelligent" is quite hard for a machine.

The basic idea of AI is that this elusive "intelligence" can be harnessed from existing data.
Each time you flag an email as spam, leave it in your inbox, or rescue that email address validation link from your spam folder, you generate examples of the human decisions that an AI spam filter should mimic.
These examples contain two components: An email, and a *label*, which is the result of your decision if that mail was either "spam" or "not spam" (also called "ham").
It is important to have this label, because this is where information about "intelligence" is stored.

## Comparing emails

Once we have a set of labeled data, we can rephrase our initial task from "classify whether this email is spam or not" to "decide the label of this email like humans did in these previous examples".
This is, of course, still not understandable for a machine.
For some spam mails, a lookup in our data set might be enough, because we already received the exact same email, but usually there is a little variance in spam in order to avoid detection by such simple means.
Therefore, we cannot avoid dealing with some form of uncertainty and as we all learned in school, uncertainty can best be tackled by statistics.
For our task this means that we do not look for exact matches in the database, but rather for *similar* emails, and we have to find some kind of statistic calculations that expresses the similarity of two emails as a number.
Expressing similarity between texts is in itself a highly complex task that requires a lot of intelligence, but there is a simple approach that we can take as first approximation:
Just count the number of words that both emails have in common.

Consider this example:

```
[Database entry 1:]

Label: spam
Subject: Need trustworthy business partner

I am Mohammed Abacha, prince of Nigeria. I am the son of the late Nigerian
Head of State who died on the 8th of June 1998. I have secretly deposited
the sum of $30,000,000.00 with a security firm abroad. I shall be grateful
if you could receive this fund into your Bank account for safekeeping.


[Database entry 2:]

Label: ham
Subject: The tabloids are at it again

This is a great one: Woman&home titles "Meghan Markle and Prince Harry
weren't in 'great shape' mentally - reveals Tom Bradby who interviewed them
on Africa tour". And in that SAME article talking about mental health, they
end with "In other royal news, the Duchess of Cambridge stuns in red as she
steps out in London to promote photography book launch." Can you believe
it?! In other news ;), how are things in Nigeria?


[New email:]

Label: ???
Subject: The Guardian Nigeria

I just learned that Nigeria has a newspaper called "The Guardian Nigeria".
You don't find Prince Harry on the front page here, but you sure do find
him: https://guardian.ng/tag/prince-harry/ :D
```

In this example, our simple AI would find the following sets of matching words (assuming we split by punctuation and whitespace and transform letters to lowercase).

```
Matches entry 1: ["the", "nigeria", "i", "a", "you", "prince", "on"]
Matches entry 2: ["the", "nigeria", "that", "a", "you", "prince", "harry", "on"]
```

With this, we have seven matches for database entry one and eight matches for database entry two.
Since the second entry has more matching words and was labeled as "ham" in the database, our spam detection AI will correctly copy this label for our friend's email about the Guardian Nigeria.
As it turns out, `"harry"` was our savior after all.

<!-- TODO: introduce acronym AI -->
<!-- TODO: algorithm part not understanable enough -->
<!--   - Steps hard to follow -->

## My first AI algorithm

With this example, we have defined our first AI algorithm.
In fact, let's look a little closer at the word "algorithm".
It is used a lot in conjunction with AI or with any complex automated system—often to the point that it sounds a little arcane and ominous.
However, at the end of the day an *algorithm* is nothing more than a formal set of instructions that have to be carried out to calculate a result.
Our algorithm in this article could be described as follows:

1. At the beginning, set the maximum number of matching words to zero
2. For all labeled emails in the database:
    1. Calculate the number of matching words between the input email and the database email
    2. If that number is higher than the current maximum
        1. update the maximum number of matching words
        2. store the label of the database email as result
3. Output the label currently stored as result

This algorithmic definition can directly be translated into code that can be understood by a computer.
We therefore have turned the instruction for the human task "decide whether this email is spam or not" into a set of instructions for a machine that can now mimic human decisions—we have created our first actual artificial intelligence.
There is, of course, a lot of room for improvement, and we will discuss some approaches in the next posts.
However, if we generalize our approach by replacing the term "maximum number of matching words" with "maximum similarity" or "minimum distance", we obtain the so-called *nearest neighbor* algorithm.
This algorithm is a standard tool in any AI researcher's inventory and if you do not only look at the single closest match but at the *k* closest matches (*k* just being any number like 5 or 100) you get the [*k-nearest neighbors*](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) algorithm, which often already is surprisingly accurate even for complex tasks.

This also highlights a curious fact about this algorithm:
Notice that the instructions do not contain any information describing the nature of what a spam email actually looks like.
We could use the very same algorithm to distinguish between "work" and "private" mail, by simply using a different database with a different set of labels.
The algorithm itself is very generic and all the "intelligence" comes from the data.
This is true for almost any artificial intelligence currently out there on the consumer market.
Sef-driving cars drive based on sensory data collected from humans driving these vehicles in test scenarios;
Alexa's and Siri's speech recognition is based on human speech samples that were manually transcribed by other humans;
and maybe the fact that computers can beat top-level players at chess isn't that mind-boggling anymore when you consider that those computers were able to use data from thousands of the world's best chess players—probably even including the very players they were able to beat.

If you could follow my explanation to this point, let me congratulate you and formally bestow you the title "apprentice AI researcher".
If not, I would be very grateful if you could email me and tell me which parts you did not understand—ideally with a suggestion of how the text could be improved.
