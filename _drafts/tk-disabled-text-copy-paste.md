---
layout: post
title: 'Allowing copy and paste shortcuts in disabled (read-only) text widget in Tcl/Tk'
description: >
    The shortcuts CTRL-C and CTRL-V should work in every Tk text widget whether it is disabled or not.
    However, a disabled "read-only" text widget currently allows these copy-paste shortcuts on some
    but not all platforms.
tags:
- tcl/tk
- Python
- GUI
---

## The Problem

I wanted to write a simple Tk application that would assist my students in running unit tests for their exercises in an introductory Python course.
I choose Tk, because it can be accessed from the Python standard library with the `tkinter` module, which would allow my students to run the app without installing additional Python packages.
Inside the app, I needed a `Text` widget to display the standard output and standard error streams of the unit test process.
The students should be able to copy text from this widget into a search engine to learn about the meaning of Python error messages, but they should not be able to alter the content of the widget accidentally by typing something into the widget.
Like most GUI toolkits, Tk allows to "disable" widgets so that they do not react to user input.

However, from there on it got a little more complicated.
First, the `insert()` method used for setting the content of the text widget programmatically also becomes disabled when the widget state is set to `"disabled"`.
This can be fixed by wrapping calls to `insert()` with an activation and deactivation call as follows:

```python
text_widget.config(state="normal")
text_widget.delete("1.0", "end")
text_widget.insert("1.0", res)
text_widget.config(state="disabled")
```

Once this was fixed, however, my tutors noticed that copying text with the usual shortcut CTRL-C did not work in Ubuntu.
The curious thing: It *did* work on my Manjaro machine.
What could be the reason of this platform dependent behavior?

## Things I learned along the way

Before I tell you about the solution, I want to share a few discoveries with you that I made along the way:
My first instinct was check whether removing the lines containing `.config(state="disabled")` would remove the problem.
According to my tutor it did not, so I searched for the problem online learning that...

* ... there might be an [issue related to language settings](https://stackoverflow.com/q/40946919),
* ... there is an [issue involving `ScrolledText`](https://stackoverflow.com/q/68964581),
* ... there are a lot of [solutions for building a read-only `Text` widget](https://www.delftstack.com/howto/python-tkinter/how-to-make-tkinter-text-widget-read-only/), but all of them somehow feel wrong.

It seemed like disabling all keybindings manually by binding them to a function that returns `'break'` might be an easy solution, but this seemed a little too hacky for me, so I went on to do some research on the interna of Tk.

The first interesting thing that I found was a mention of a file called `tk.tcl`, which apparently is responsible for setting up the key bindings for copy-paste commands.
I did find the file at `/usr/lib/tk8.6/tk.tcl` in Manjaro and `/usr/share/tcltk/tk8.6/tk.tcl` in Ubuntu and by looking at the contents I could confirm that...

* ... the only variable that controls how the "virtual event" `<<Copy>>` is set up, is `tk windowingsystem`, which can be `x11`, `win32`, or `aqua`,
* ... if you put `puts "<insert frustrated slur here>"` somewhere into the file, you are indeed insulted by every Tk app you start afterwards, including `git gui`,

To find an easier way to check the value of `tk windowingsystem` than meddling with the `tk.tcl` file, I then searched for a way to execute Tcl/Tk commands.
It turns out that there are two shells `tclsh` and `wish`, the former being a REPL for plain Tcl and the latter already including the Tk library.
In `wish`, you can then simply type `tk windowingsystem` and as suspected it returned `x11` for both Linux systems, ruling out the `tk.tcl` file as possible culprit.

Since the next possible offender was `ScrolledText`, I looked at the [source code for the `tkinter.scrolledtext` module](https://github.com/python/cpython/blob/3.10/Lib/tkinter/scrolledtext.py) and found out that the relevant class is only a little more than 20 lines of code, which in passing alleviated my concerns how hard it would be to write a version of `ScrolledText` that used themed `ttk` widgets.

## The solution

After a lot of back and forth changing search terms, I finally arrived at a [StackOverflow post](https://stackoverflow.com/a/10817982) that mentioned the following with regard to using the disabled state for a read-only widget.

> On some platforms, you also need to add a binding on <1> to give the focus to the widget, otherwise the highlighting for copy doesn't appear:
>
> ```python
> text_widget.bind("<1>", lambda event: text_widget.focus_set())
> ```

Having set up a VM with a vanilla Ubuntu installation in the meantime, this led me to re-investigate the issue regarding the disabled state again myself.

Sure enough, the copy-paste problem *did* vanish when I disabled the two relevant lines that set the disabled state.
So there is another lesson in passing here: If you can only communicate via text, make absolutely sure that what you *think* is being tested is actually what is being tested.
Back to the problem, I re-enabled the code lines that set the disabled state and used the suggestion from Bryan Oakley from StackOverflow instead and it did also work.

So the problem was solved, but I was still not satisfied, because I wanted to know the *cause* of this difference.
Who is responsible here? Is it Tk, is it Linux? Are there really such fundamental differences between Ubuntu and Manjaro?
My journey took me to the release notes of Tcl/Tk and I found the following bullet point in the [notes for version 8.6.11]((https://sourceforge.net/projects/tcl/files/Tcl/8.6.11/tcltk-release-notes-8.6.11.txt/view)):

> * Allow for select/copy from disabled text widget on all platforms

So it *was* just a bug in Tk after all and the suggested fix to set the focus when the mouse button is clicked is the correct solution. Whew!
Sure enough, I checked the package versions and my Manjaro used version `8.6.11.1-1` of the `tk` package while Ubuntu used version `8.6.9+1`. 
As a last bit of information, if you want to find out your Tk version from *within* a Tk app, you can query `root.tk.call("info", "patchlevel")` where `root` is your root-level `Tk` object.

I hope you enjoyed this little murder mystery as much as I did, even if it was just the copy-paste function that was murdered and at the end of the day it turned out that it only did not find the way home, since it was lacking focus. 😆
