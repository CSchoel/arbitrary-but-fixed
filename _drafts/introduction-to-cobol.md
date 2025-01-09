---
layout: post
title:  "COBOL quick start guide"
description: >
    Ever wondered what all the fuss is about with COBOL? Why it is regarded as
    such an obscure language that's difficult to learn and responsible for
    legacy code that virtually nobody can maintain today? Or maybe you are like
    me and read a book about Grace Hopper and now want to take a peak at how
    programming looked like during her time? Either way, this is the post for
    you.
tags:
    - COBOL
    - teaching
lang: en
---

<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/styles/dark.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-cobol/dist/cobol.min.js"></script>
<script>
// Only apply Highlight.js to COBOL code
hljs.configure({languages:["cobol"], cssSelector:"code.language-cobol"})
hljs.highlightAll();
</script>

## Why COBOL?

COBOL is like a dragon. Every programmer has heard of it, and that it is formidable.
We've heard stories about people fighting the beast, but very few of us have actually seen a live COBOL program out in the wild.
If that isn't reason enough to be intrigued, maybe its historical sgnificance brought you here, wondering about how programming was like in the days of [Grace Hopper](https://de.wikipedia.org/wiki/Grace_Hopper) - inventor of the first compiler, rear admiral, and DPMA man of the year 1969, who democratized coding, was a passionate teacher and genuinely kept her staff happy as a manager.
Whatever your angle is, I assume you have a reason for being here, so I won't jabber any longer about why COBOL is still interesting.

## Why this guide?

A lot of people have written amazing and detailed COBOL guides and here I am, having solved one exercise of [Advent of Code](https://adventofcode.com/) 2024 in COBOL.
Why should you listen to me introducing a language I barely know?
The short answer is that the COBOL guides I found value precision and proper contextualization over speed.
This is the opposite: If you want to spend no less than 30 minutes but be able to write a rudimentary COBOL program after that, I'm here for you.

## Hello world

Enough of the introduction. I promised speed, so here is "Hello World" in COBOL:

```cobol
000001 IDENTIFICATION DIVISION.                                         HELLO
000002 PROGRAM-ID. HelloWorld.                                          HELLO
000003 PROCEDURE DIVISION.                                              HELLO
000004     DISPLAY "Hello World!".                                      HELLO
```

If you want to run this, you can install [GnuCOBOL](https://gnucobol.sourceforge.io/) and run the following:

```bash
cobc -xjO hello.cob
```

## COBOL file format

The above hello world program is written in _fixed format_, which was used for COBOL programs prior to 2002.
There is also a _free format_ now, which removes the restrictions about which _columns_ source code has to start (and end) in.
However, for the purpose of this guide, we go old-school because that's more fun.

In _fixed format_, the actual _code_ resides in columns 8-11 (Area A) and 12-72 (Area B).
This seems crazy from today's coding standards, but was actually pretty reasonable back in the day.
You see, each of these lines of code would be written on a punchcard—yes, just one line of code per punchcard.
Why punchcards? Because they were way cheaper than any form of electronic storage back in the day.
So imagine you've finally written your 300 LOC program.
You're on the way to the computer room to test it, but on the way you bump into a colleague, also holding a stack of 300 punchcards.
The cards go flying all over the place and now what?
Don't fret! COBOL has you covered (if you followed best practices, that is).
You can just stack them in any order, put them into a sorting machine, and instruct it to first sort by column 73-80 (Program Name Area) and then by column 1-6 (Sequence Number Area).
Voilà, now both of your programs are in the right order again, and can be separated from each other!
Today, we don't need this anymore, and we can just leave these areas empty, but I'm sure this feature saved countless work hours.

The only things _we_ need to remember now are these:

* Column 7 can be used to designate a line as a comment (`*`) or code that's only used for debugging (`d`). There are a few other symbols that appear here, but they are not relevant for this guide.
* Actual code starts in Area A (column 8), or sometimes Area B (column 12).
* Code must end on column 72. Everyting beyond that will be ignored.

## COBOL syntax

You might have already noticed that the hello world program above only uses characters that we would also use when writing text in English.
This is very much by design.
Grace Hopper herself heavily pushed for using English over symbols because she wanted to democratize programming and make it more accessible.

It's important to keep that in mind, because unlike most modern programming languages, COBOL doesn't aim to have a minimal number of syntactic elements and keywords (`if`, `for`, ...).
Instead, it provides a plethora of keywords, which sometimes consist of more than one word and can have alternatives, to make code sound as natural as possible to a non-technical person that just writes their first program.

Time for another example: Let's calculate how a user-defined amount of money grows with 1% interest over 10 years:

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. Interest.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 balance PICTURE s9(7)V99.
       PROCEDURE DIVISION.
           DISPLAY "Please enter starting balance:"
           ACCEPT balance.
           PERFORM 10 TIMES
               MULTIPLY balance BY 1.01 GIVING balance
               DISPLAY "New balance: " balance
           END-PERFORM.
```