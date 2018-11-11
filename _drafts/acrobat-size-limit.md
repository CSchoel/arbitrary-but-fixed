---
layout: post
title:  "Acrobat Reader has a maximum document size"
description: >
    Do you want to convert a large vector graphics file to PDF for printing? It should better not exceed 5080mm in width or height, or otherwise the Acrobat Reader will crop the edges when it is displayed.
categories:
    - private project
---

# The Problem

For a private project, I created a rather large SVG diagram that should be printed as a poster on DIN A0 paper.
When I used [Inkscape](https://inkscape.org/) to convert it to a PDF file for printing, the Adobe Acrobat Reader displayed the following (german) error message:

> Die Abmessungen dieser Seite liegen außerhalb des zulässigen Wertebereichs. Bestimmte Seiteninhalte werden unter Umständen nicht angezeigt.

Translated this states that the page dimensions exceed the allowed value range and that some content may not be displayed.

Indeed, the top part of the poster (including the title) where missing. So what was happening? At first I thought something was wrong with the SVG file that I created from a Ruby script. A simple test with [Sumatra PDF](https://www.sumatrapdfreader.org/free-pdf-reader.html), however, showed, that the problem was indeed not the SVG, Inkscape or even the PDF file. In this viewer, the whole poster was displayed without any errors. So the culprit has to be Acrobat Reader.

# Testing Acrobat Reader's size limit

I wanted to verify my hypothesis, so I tried cropping my file to different sizes before exporting it to PDF and indeed, a file with a height of 20000 produced the error and a file with a width of 2000 did not show any problems.
Unfortunately, my original SVG document did not specify any units, so the limit also had something to do with the translation of "pixels" to real-world units by Inkscape.

To make a more scientifically valid test case, I then created an SVG file that specified it's size in millimeters and that has a coordinate system that shows where exactly the cutoff happens.

<a href="/assets/img/measure_band.svg"><img style="background-color:white" src="/assets/img/measure_band_small.svg" alt="SVG coordinate system"/></a>

If you now save this SVG document as PDF in Inkscape and open the resulting file in Acrobat Reader, you can see that the document is cut off exactly at 5080mm for both dimensions.

Interestingly, googling this exact number also yields forum entries about the problem, while googling the error message did not turn up anything helpful for me.

Admittedly, you will rarely want to print something larger than 5 by 5 meters, but still this limit seems somewhat confusing, since it makes no sense for a freely scaleable vector graphic to have any hard size limits.

# The Solution

How do we get out of this without having to adjust the coordinates of the document? It turns out that there is an elegant solution using a SVG feature that I found somewhat redundant and confusing up until now: [the `viewBox` attribute](https://www.sarasoueidan.com/blog/svg-coordinate-systems/).

You can think about `viewBox` like this: The `height` and `width` attributes of the `<svg>` tag define the actual size of the paper you are drawing onto (e.g. in millimeters), while the `viewBox` defines your coordinate system on this sheet of paper. You can use a coordinate system of millimeters, setting `viewBox` to `0 0 width height` (which makes the attribute somewhat redundant), but you can, for example, also use `0 0 4 3` to easily arrange your content in four columns and three rows (e.g. an element with `x=2` will always be exactly at the start of the third column).

If you want your vector graphic to appear in different sizes at different places there is no real need to use this feature, since you will redefine the actual size of the image anyway at the site where it is used. However, for our case we can easily use it to change the real-world size of the document that Acrobat Reader sees without changing any coordinates in the document itself.

For this purpose, we define `width` and `height` to be smaller than the previous coordinate system (and, since we are at it, set them to the correct dimensions for DIN A0) and use the old dimensions as `viewBox`. In other words we change this

```xml
<svg width="15000" height="21213.2" version="1.1" xmlns="http://www.w3.org/2000/svg"> ... </svg>
```

to this

```xml
<svg width="841mm" height="1189mm" viewBox="0 0 15000 21213.2" version="1.1" xmlns="http://www.w3.org/2000/svg"> ... </svg>
```

Now the SVG uses the same coordinate system as before, but it will stay inside the 5m x 5m limit of Acrobat Reader for printing.

As a small final warning, keep in mind that this worked for me, because I did not use any units inside my SVG file. If you use, for example, a font size of `11pt`, the meaning of `pt` relative to the image size will change when you change the `width` and `height` of the document. Therefore, the [SVG spec recommends to only specify absolute units for `width` and `height`](https://www.w3.org/TR/SVG/coords.html#Units), and use `px` for other elements, unless you have a good reason.