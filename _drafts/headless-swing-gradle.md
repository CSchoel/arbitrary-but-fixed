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

## The problem: Headless GUI testing

Building unit tests for GUIs is not entirely straightforward.
Usually, you want to separate your application logic from your GUI as much as possible precisely because this makes the code easier to test and debug.
However, what if the graphical display *is* the main part of the application?
This is true for [FCanvas](https://github.com/CSchoel/fcanvas/), a project that I started in my first years of teaching at the THM and now recently uploaded to GitHub.
FCanvas is a library that allows programming novices to draw on a canvas and create simple animations, so the core functionality is closely tied to what can be seen on the canvas.

While brushing the dust off the project I also wanted to add a few unit tests to ensure that none of my refactoring attempts would introduce any bugs or visual glitches.
And since I love a good CI/CD pipeline, I also wanted to add respective GitHub actions workflows.
I already had a hunch that those two things in combination might be a problem, and sure enough my unit test, which ran fine on my local machine, threw the following exception in GitHub actions:

```verbatim
java.lang.ExceptionInInitializerError
    at de.thm.mni.oop.fcanvas.FCanvasTest.testRectangle(FCanvasTest.java:20)

    Caused by:
    java.awt.HeadlessException:
    No X11 DISPLAY variable was set,
    but this program performed an operation which requires it.
        at java.desktop/java.awt.GraphicsEnvironment.checkHeadless(GraphicsEnvironment.java:166)
        at java.desktop/java.awt.Window.<init>(Window.java:553)
        at java.desktop/java.awt.Frame.<init>(Frame.java:428)
        at java.desktop/java.awt.Frame.<init>(Frame.java:393)
        at java.desktop/javax.swing.JFrame.<init>(JFrame.java:180)
        at de.thm.mni.oop.fcanvas.FCanvasGUI.<init>(FCanvasGUI.java:18)
        at de.thm.mni.oop.fcanvas.FCanvas.<clinit>(FCanvas.java:85)
        ... 1 more
```

The culprit was a call to `new FCanvasGUI();`, because `FCanvasGUI` inherits from `JFrame`, [whose constructor](https://docs.oracle.com/en/java/javase/17/docs/api/java.desktop/javax/swing/JFrame.html#%3Cinit%3E()) can throw the `java.awt.HeadlessException`, which we see here.
The term "headless" means that no display device is attached to the machine that runs the Java code, which in consequence means that there is no way to actually *display* the `JFrame` we have just created.

## Solution 1: Avoid code that can throw java.awt.HeadlessException

Searching for the term "headless" in the [Oracle documentation](https://www.oracle.com/technical-resources/articles/javase/headless.html) reveals that this affects all graphical components except for `Canvas`, `Panel`, and `Image`.
My simple test for drawing a rectangle on a `JPanel` could therefore also be performed in headless mode if I skip the creation of the `JFrame` in which the panel is displayed.
However, I also plan to add fancier tests down the road, which will involve simulating user input through [`java.awt.Robot`](https://docs.oracle.com/en/java/javase/17/docs/api/java.desktop/java/awt/Robot.html), so this was not an option for me.

## Solution 2: Create a dummy display

Instead, I searched for a way to fix the issue on the side of the operating system.
Surely Linux programmers have found some way to run X11-applications on a headless server, right?
Right!
There is the [X virtual framebuffer (Xvfb)](https://linux.die.net/man/1/xvfb), which holds an image buffer in memory that behaves like an X server display but does not require an actual display device.

Xvfb comes with a simple tool `xvfb-run`, which runs a single command with such an Xvfb server and closes the server right after the command exits.
The solution for my GitHub workflow was therefore simply to install the `xvfb` package using `apt install xvfb` and then exchanging `./gradlew build` with `xvfb-run ./gradlew build`.
Works like a charm. 🎉

## Notes

While searching for these solutions I came across a few misleading tips, which I want to discuss here in order to save you the trouble should you run into the same issues.

### Running a gradle task through `xvfb-run` vs running `xvfb-run` from within gradle

Searching for the terms "xvfb" and "gradle" leads to [an Ask Ubuntu answer](https://askubuntu.com/questions/748321/how-to-run-gradle-run-through-xvfb) that states the following:

> You likely don't want to run a gradle task through Xvfb, but rather execute something within an X Windows Virtual Frame Buffer FROM a gradle task.

The context is using `xvfb-run` for a `gradle run` configuration, not for `gradle test` or `gradle build`.
In that context the suggestion is somewhat sensible: Gradle *itself* does not need the display, only the sub-process that it starts does.
Nonetheless, I thought that there might be some deeper meaning to why simply using `xvfb-run` directly with gradle would be a bad idea (the answer unfortunately does not explain this).
Maybe the display is not properly passed through to sub-processes?
Maybe `xvfb-run` only works with programs that actually ask for a display or there is some other incompatibility with the `gradle` executable?

Nope!
None of this is true.
The only downside of using `xvfb-run` for the whole gradle task is that the framebuffer will exist for a slightly longer duration than it is needed.
So in the sense of simplicity over premature optimization you can quote me on this: "You likely *do* want to run a gradle task through Xvfb." 😉

### Don't blindly use examples from man pages

Due to the aforementioned Ask Ubuntu answer, I first tried to avoid `xvfb-run` and instead set up xvfb manually.
The first example in the man page for xvfb (or at least the version that is [online on die.net](https://linux.die.net/man/1/xvfb)) is the following:

```bash
Xvfb :1 -screen 0 1600x1200x32
```

The problem with that is the `x32`, which sets the color depth to 32 bit.
While there are pixel formats with 32 bit, they technically only use 24 bits for the color information and the last 8 bits for transparency.
Therefore, `Xvfb` crashes with the following error message:

```
Fatal server error:
Couldn't add screen 0
```

If, for some reason, you want to set up `Xvfb` manually without `xvfb-run`, you can do the following:

```bash
export DISPLAY=:1
Xvfb :1 -screen 0 1600x1200x16 &
# your call using the Xvfb display goes here
killall Xvfb
```

Which would look like this in a GitHub actions workflow:

```yaml
- name: Setup xvfb for screen 0
  run: Xvfb :1 -screen 0 1600x1200x16 &
- run: # your program call goes here
  env:
    DISPLAY: :1
- name: Tear down xvfb
  run: killall Xvfb
```
