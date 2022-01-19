---
layout: post
title: How to run unit tests for GUIs on GitHub actions
description: >
    Continuous integration servers are typically headless, meaning that they do not have a display attached.
    If you try to run any program that creates a GUI, you will get errors such as Java's java.awt.HeadlessException.
    This post tells you how to avoid that for Gradle tests with JUnit involving Java Swing applications in a GitHub actions workflow.
tags:
- headless
- swing
- awt
- gradle
- junit
- continuous integration
- gui
---

Building unit tests for GUIs is not entirely straightforward.
Usually, you want to separate your application logic from your GUI as much as possible precisely because this makes the code easier to test and debug.
However, what if the graphical display *is* the main part of the application?
This is true for [FCanvas](https://github.com/CSchoel/fcanvas/), a project that I started in my first years of teaching at the THM and now recently uploaded to GitHub.
