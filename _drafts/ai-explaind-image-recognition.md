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
For our spam detection algorithm this looked as follows:

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

## A new task: Image recognition

Now we want to apply the same idea to a new problem:
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
