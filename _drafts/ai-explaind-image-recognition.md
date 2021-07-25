---
layout: post
title: 'AI for laypersons: Image recognition with nearest neighbors'
description: >
  In the first post of the 'AI for laypersons' series, I introduced a very simple AI based on the nearest neighbor algorithm.
  In this post, I want to show that the same idea can also be applied to image data - for example the MNIST database for recognizing handwritten digits.
math: true
categories:
- AI for laypersons
tags:
- artificial intelligence
- machine learning
- image recognition
---

## Recap

In the [last post]({% post_url 2021-05-30-ai-explained-with-k-nearest-neighbors %}) we constructed our very first AI algorithm that was able to mimic the human decision whether a newly received email is unwanted "spam" or benign "ham".
We also established that the technical term "algorithm" actually only means a step-by-step description of how to translate input values into output values.
For our spam detection algorithm we needed to find the database entry that has the maximum number of matching words between itself and the email that needs to be decided upon.
Then we could just look up whether that database email was considered "spam" or "ham" and copy the same label for our output.

This algorithm was effective, but it only detected spam, so how could we possibly use it as a proxy for understanding all the different and complex AI systems out there?
Well, in fact the *nearest neighbor* algorithm that we used as the basis for our spam detection AI, can be applied to a wide range of problems.
In this post, I want to show you how it can be used for a problem that has nothing at all to do with spam detection, and that is image recognition.

## A new task: Image recognition

Imagine you work in mail distribution center and have to find a way to sort letters by the handwritten zip codes on letter envelopes.
This can and has for a long time been done by manual labor, but I imagine this is not anybody's dream job.
Instead, it would be nice if we could just pass the mail through a scanner, and then use a computer program to automatically extract the zip code from the scanner image.
There are a whole lot of messy details in this process: The program needs to align the image, find the area on the envelope where the address is written, find the zip code within the address and separate the code into individual digits that it then needs to recognize.
To keep things simple, we only focus on the last step: Recognizing a handwritten digit from a black and white scanner image.

Some examples may look like this (which are converted samples from an actual AI dataset called [MNIST](http://yann.lecun.com/exdb/mnist/index.html) by Corinna Cortes, Christopher JC Burges, and Yann LeCun):

![MNIST_bw_0_3](/assets/img/MNIST/MNIST_bw_0_3.png) 
![MNIST_bw_0_10](/assets/img/MNIST/MNIST_bw_0_10.png) 
![MNIST_bw_0_25](/assets/img/MNIST/MNIST_bw_0_25.png) 
![MNIST_bw_0_28](/assets/img/MNIST/MNIST_bw_0_28.png) 
![MNIST_bw_0_55](/assets/img/MNIST/MNIST_bw_0_55.png) 
![MNIST_bw_0_69](/assets/img/MNIST/MNIST_bw_0_69.png) 
![MNIST_bw_0_71](/assets/img/MNIST/MNIST_bw_0_71.png) 
![MNIST_bw_0_101](/assets/img/MNIST/MNIST_bw_0_101.png) 
![MNIST_bw_0_126](/assets/img/MNIST/MNIST_bw_0_126.png)
![MNIST_bw_0_136](/assets/img/MNIST/MNIST_bw_0_136.png)

![MNIST_bw_1_74](/assets/img/MNIST/MNIST_bw_1_74.png)
![MNIST_bw_1_900](/assets/img/MNIST/MNIST_bw_1_900.png)
![MNIST_bw_1_3124](/assets/img/MNIST/MNIST_bw_1_3124.png)
![MNIST_bw_1_3906](/assets/img/MNIST/MNIST_bw_1_3906.png)
![MNIST_bw_1_5254](/assets/img/MNIST/MNIST_bw_1_5254.png)
![MNIST_bw_1_6901](/assets/img/MNIST/MNIST_bw_1_6901.png)
![MNIST_bw_1_8488](/assets/img/MNIST/MNIST_bw_1_8488.png)
![MNIST_bw_1_8682](/assets/img/MNIST/MNIST_bw_1_8682.png)
![MNIST_bw_1_9540](/assets/img/MNIST/MNIST_bw_1_9540.png)
![MNIST_bw_1_9931](/assets/img/MNIST/MNIST_bw_1_9931.png)

![MNIST_bw_2_646](/assets/img/MNIST/MNIST_bw_2_646.png)
![MNIST_bw_2_1224](/assets/img/MNIST/MNIST_bw_2_1224.png)
![MNIST_bw_2_1722](/assets/img/MNIST/MNIST_bw_2_1722.png)
![MNIST_bw_2_3511](/assets/img/MNIST/MNIST_bw_2_3511.png)
![MNIST_bw_2_6418](/assets/img/MNIST/MNIST_bw_2_6418.png)
![MNIST_bw_2_6785](/assets/img/MNIST/MNIST_bw_2_6785.png)
![MNIST_bw_2_7986](/assets/img/MNIST/MNIST_bw_2_7986.png)
![MNIST_bw_2_8102](/assets/img/MNIST/MNIST_bw_2_8102.png)
![MNIST_bw_2_8198](/assets/img/MNIST/MNIST_bw_2_8198.png)
![MNIST_bw_2_9477](/assets/img/MNIST/MNIST_bw_2_9477.png)

![MNIST_bw_3_699](/assets/img/MNIST/MNIST_bw_3_699.png)
![MNIST_bw_3_1607](/assets/img/MNIST/MNIST_bw_3_1607.png)
![MNIST_bw_3_2441](/assets/img/MNIST/MNIST_bw_3_2441.png)
![MNIST_bw_3_2770](/assets/img/MNIST/MNIST_bw_3_2770.png)
![MNIST_bw_3_4443](/assets/img/MNIST/MNIST_bw_3_4443.png)
![MNIST_bw_3_4509](/assets/img/MNIST/MNIST_bw_3_4509.png)
![MNIST_bw_3_4613](/assets/img/MNIST/MNIST_bw_3_4613.png)
![MNIST_bw_3_4990](/assets/img/MNIST/MNIST_bw_3_4990.png)
![MNIST_bw_3_7849](/assets/img/MNIST/MNIST_bw_3_7849.png)
![MNIST_bw_3_9882](/assets/img/MNIST/MNIST_bw_3_9882.png)

![MNIST_bw_4_65](/assets/img/MNIST/MNIST_bw_4_65.png)
![MNIST_bw_4_774](/assets/img/MNIST/MNIST_bw_4_774.png)
![MNIST_bw_4_1542](/assets/img/MNIST/MNIST_bw_4_1542.png)
![MNIST_bw_4_1701](/assets/img/MNIST/MNIST_bw_4_1701.png)
![MNIST_bw_4_4324](/assets/img/MNIST/MNIST_bw_4_4324.png)
![MNIST_bw_4_4483](/assets/img/MNIST/MNIST_bw_4_4483.png)
![MNIST_bw_4_5631](/assets/img/MNIST/MNIST_bw_4_5631.png)
![MNIST_bw_4_5720](/assets/img/MNIST/MNIST_bw_4_5720.png)
![MNIST_bw_4_5956](/assets/img/MNIST/MNIST_bw_4_5956.png)
![MNIST_bw_4_9350](/assets/img/MNIST/MNIST_bw_4_9350.png)

![MNIST_bw_5_797](/assets/img/MNIST/MNIST_bw_5_797.png)
![MNIST_bw_5_1940](/assets/img/MNIST/MNIST_bw_5_1940.png)
![MNIST_bw_5_4131](/assets/img/MNIST/MNIST_bw_5_4131.png)
![MNIST_bw_5_4583](/assets/img/MNIST/MNIST_bw_5_4583.png)
![MNIST_bw_5_7241](/assets/img/MNIST/MNIST_bw_5_7241.png)
![MNIST_bw_5_7451](/assets/img/MNIST/MNIST_bw_5_7451.png)
![MNIST_bw_5_7888](/assets/img/MNIST/MNIST_bw_5_7888.png)
![MNIST_bw_5_9013](/assets/img/MNIST/MNIST_bw_5_9013.png)
![MNIST_bw_5_9814](/assets/img/MNIST/MNIST_bw_5_9814.png)
![MNIST_bw_5_9877](/assets/img/MNIST/MNIST_bw_5_9877.png)

![MNIST_bw_6_2471](/assets/img/MNIST/MNIST_bw_6_2471.png)
![MNIST_bw_6_2654](/assets/img/MNIST/MNIST_bw_6_2654.png)
![MNIST_bw_6_3121](/assets/img/MNIST/MNIST_bw_6_3121.png)
![MNIST_bw_6_5303](/assets/img/MNIST/MNIST_bw_6_5303.png)
![MNIST_bw_6_5916](/assets/img/MNIST/MNIST_bw_6_5916.png)
![MNIST_bw_6_5958](/assets/img/MNIST/MNIST_bw_6_5958.png)
![MNIST_bw_6_5963](/assets/img/MNIST/MNIST_bw_6_5963.png)
![MNIST_bw_6_6002](/assets/img/MNIST/MNIST_bw_6_6002.png)
![MNIST_bw_6_6020](/assets/img/MNIST/MNIST_bw_6_6020.png)
![MNIST_bw_6_6038](/assets/img/MNIST/MNIST_bw_6_6038.png)

![MNIST_bw_7_141](/assets/img/MNIST/MNIST_bw_7_141.png)
![MNIST_bw_7_262](/assets/img/MNIST/MNIST_bw_7_262.png)
![MNIST_bw_7_370](/assets/img/MNIST/MNIST_bw_7_370.png)
![MNIST_bw_7_1260](/assets/img/MNIST/MNIST_bw_7_1260.png)
![MNIST_bw_7_3594](/assets/img/MNIST/MNIST_bw_7_3594.png)
![MNIST_bw_7_3969](/assets/img/MNIST/MNIST_bw_7_3969.png)
![MNIST_bw_7_4530](/assets/img/MNIST/MNIST_bw_7_4530.png)
![MNIST_bw_7_4730](/assets/img/MNIST/MNIST_bw_7_4730.png)
![MNIST_bw_7_5999](/assets/img/MNIST/MNIST_bw_7_5999.png)
![MNIST_bw_7_9302](/assets/img/MNIST/MNIST_bw_7_9302.png)

![MNIST_bw_8_947](/assets/img/MNIST/MNIST_bw_8_947.png)
![MNIST_bw_8_1687](/assets/img/MNIST/MNIST_bw_8_1687.png)
![MNIST_bw_8_2038](/assets/img/MNIST/MNIST_bw_8_2038.png)
![MNIST_bw_8_3987](/assets/img/MNIST/MNIST_bw_8_3987.png)
![MNIST_bw_8_4389](/assets/img/MNIST/MNIST_bw_8_4389.png)
![MNIST_bw_8_5343](/assets/img/MNIST/MNIST_bw_8_5343.png)
![MNIST_bw_8_7735](/assets/img/MNIST/MNIST_bw_8_7735.png)
![MNIST_bw_8_7921](/assets/img/MNIST/MNIST_bw_8_7921.png)
![MNIST_bw_8_8065](/assets/img/MNIST/MNIST_bw_8_8065.png)
![MNIST_bw_8_8408](/assets/img/MNIST/MNIST_bw_8_8408.png)

![MNIST_bw_9_1045](/assets/img/MNIST/MNIST_bw_9_1045.png)
![MNIST_bw_9_1554](/assets/img/MNIST/MNIST_bw_9_1554.png)
![MNIST_bw_9_2089](/assets/img/MNIST/MNIST_bw_9_2089.png)
![MNIST_bw_9_2387](/assets/img/MNIST/MNIST_bw_9_2387.png)
![MNIST_bw_9_2916](/assets/img/MNIST/MNIST_bw_9_2916.png)
![MNIST_bw_9_3369](/assets/img/MNIST/MNIST_bw_9_3369.png)
![MNIST_bw_9_4325](/assets/img/MNIST/MNIST_bw_9_4325.png)
![MNIST_bw_9_6000](/assets/img/MNIST/MNIST_bw_9_6000.png)
![MNIST_bw_9_6895](/assets/img/MNIST/MNIST_bw_9_6895.png)
![MNIST_bw_9_7952](/assets/img/MNIST/MNIST_bw_9_7952.png)

The "intelligent" decision we are looking for in this situation is to take one of these images and recognize which number is shown on it.
For most of the above examples, this would be simple for a human, but there are also some instances that are a little more tricky:

* ![MNIST_bw_7_1260](/assets/img/MNIST/MNIST_bw_7_1260.png) could be both a 1 or a 7.
* ![MNIST_bw_3_4990](/assets/img/MNIST/MNIST_bw_3_4990.png) is somewhere between a 2 and a 3.
* ![MNIST_bw_8_947](/assets/img/MNIST/MNIST_bw_8_947.png) might be confused for a 9 instead of an 8.


## How computers see images

In order to automate this digit recognition task, we need to know how images are represented in a computer.
You probably already know this, but to start from the beginning: Digital images are made up of small squares with uniform color and size, which are called *pixels* (short for "picture element").
To build up a whole image, these pixels are arranged in a regular grid of rows and columns.
The images above all have 28 rows and 28 columns of pixels, which each can be either fully black or fully white.
Let's scale up one of these images to ten times it's size to actually see the pixels.

![Enlarged version of MNIST_bw_1_3906](/assets/img/MNIST/MNIST_bw_1_3906_280x280.png)

Now we are still talking about images in terms of colors and geometric terms instead of text or numbers that a computer can read and manipulate.
One simple way of storing the above image in a machine-readable format is to create a text file and write a zero for each white pixel and a one for each black pixel, arranged in rows and columns and separated by spaces:

```
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0
0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0
0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
```

If you squint your eyes a little, you can even still see the picture, but now it is just a bunch of zeros and ones.
This image format is called a [Portable BitMap (PBM)](https://en.wikipedia.org/wiki/Netpbm#PBM_example), and it can actually be read by open-source image editing tools like [GIMP](https://www.gimp.org/).
If you want to, you can try it out by downloading [the above PBM image](/assets/img/MNIST/MNIST_bw_1_3906.pbm).

The image formats that you are used to, like JPEG, PNG, or GIF, are much more complicated, but this is just because they are designed to save storage space.
Whenever images are displayed on the screen or opened in an image editor, it is in some bitmap-like format.

## Comparing images

Not that we know how to read images into a computer program, we can start thinking about how to adjust our nearest neighbor algorithm to cope with 28x28 pixel images of digits.
First, let's start by revisiting our spam detection algorithm:

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


There are a few things that we have to change to make this work with images.
First, we have different inputs and outputs now.
The `Database` is now a list of labeled images, where the label is the digit shown in the image.
The `Query` is an unlabeled image that has to be recognized.
And finally, the output is again a `Label`, but instead of only two options we now have to choose one of ten different labels that correspond to the ten digits from zero to nine.

Moving to the steps of the algorithm, the "number of matching words" is, of course, meaningless for images.
However, we can match something else to find the "nearest neighbor" of an image: The pixels.
We can count the number of matching *pixels* by moving through both pictures at the same time, starting at the top left, and moving in "reading" order from left to right and from top to bottom.
Every time the pixels at corresponding positions of the two images match, we increase the count of matching pixels by one.
When we reach the bottom right of the image, we will have the total number of matching pixels between both images.

To see that this works, let's look at a small example with tiny 3x4 pixel images:

```verbatim
[Database entry 1:]

Label: 1

0 1 0
0 1 0
0 1 0
0 1 0


[Database entry 2:]

Label: 7

1 1 1
0 0 1
0 0 1
0 0 1


[Query image:]

1 1 1
0 0 1
0 1 0
1 0 0
```

We have two images in the database of the digits one and seven, both consisting of straight lines.
The query image that we want to know about is another seven, but this time with a slanted lower line.
Our AI now compares the query image to both database images to find the following:

```verbatim
Matches for entry 1:
0 1 0     1 1 1      x ✓ x
0 1 0  =  0 0 1  ->  ✓ x x
0 1 0     0 1 0      ✓ ✓ ✓
0 1 0     1 0 0      x x ✓

  Total number of matching pixels: 6


Matches for entry 2:
1 1 1     1 1 1      ✓ ✓ ✓
0 0 1  =  0 0 1  ->  ✓ ✓ ✓
0 0 1     0 1 0      ✓ x x
0 0 1     1 0 0      x ✓ x

  Total number of matching pixels: 8
```

Since database entry 2 has more matching pixels than database entry 1, our AI correctly chooses to copy the label of entry 2 and decides that the query image is a seven and not a one.

Now that we know that our idea works, the only thing that is left to do is to turn it into a new formal algorithm description:

### Algorithm: Simple digit recognizer

Inputs:

* `Database`: list of labeled images
* `Query`: unlabeled image that should be recognized

Output:

* `Label`: the most fitting label for the query (0-9)

Steps:

1. For all labeled images in the database, calculate the number of matching pixels between that image and the query.
2. Find the database entry with the maximum number of matching pixels.
3. Output the label attached to this database entry.

As you can see, we only hat to change a few words.
The resulting algorithm is still a nearest neighbor algorithm, it only needed to be adapted to find "neighbors" of *images* instead of *emails*.

Again, we have turned the human task "recognize the handwritten number in this image" into a set of instructions for a machine that is now able to mimic this human decision-making process and thus can be considered an AI.
This also means that all implications that we have drawn for the spam detection algorithm are also valid for image recognition tasks.
The facial recognition algorithm that tags people in Facebook photos follows the same basic laws as our digit recognition AI: It can only recognize new images based on existing images in its database.
For example, if the database has too few images of women or black people, the AI will be sexist or racist, providing a better service to white males, which are better represented in the dataset.
Of course, Facebook uses more complicated algorithms than the nearest neighbor approach, but no amount of math can change the fact that any AI will only be as good as the data it has been trained on.
We will go into detail on this issue in one of the next posts, but first we will take a little more time to explore the variety of possible application areas of the nearest neighbor algorithm.
