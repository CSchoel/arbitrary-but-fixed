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
       calculate-interest.
           DISPLAY "Please enter starting balance:"
           ACCEPT balance.
           PERFORM 10 TIMES
               MULTIPLY balance BY 1.01 GIVING balance
               DISPLAY "New balance: " balance
           END-PERFORM.
```

### Hierarchy

You probably already noticed in the hello world example that COBOL code has a document-like hierarchy.
There are `DIVISION`s, and `SECTION`s that seem to structure the code.
In fact, there are the following hierarchical levels:

* Divisions
* Sections
* Paragraphs
* Sentences
* Statements

Divisions, sections, and paragraphs have pre-defined names and structures, with the exception of sections and paragraphs in the `PROCEDURE DIVISION`, which can be named freely by the programmer.
Sentences are groups of statements (which again have pre-defined structures) that are terminated with a dot.
One effect of this hierarchy is that the definition of variables (which are called _data items_ in COBOL) in the `WORKING-STORAGE SECTION` of the `DATA DIVISON` is separated from the code in the `PROCEDURE DIVISION`.

### Data items

The `WORKING-STORAGE SECTION` looks bizarre from the standpoint of modern programming languages:

```cobol
      * level             signed
      * |   name          |digit
      * |   |             || 7 times
      * |   |             || | decimal point
      * |   |             || | |
       01 balance PICTURE s9(7)V99.
```

The number in the beginning is called the level.
A level of 01 designates an elementary data item.
A higher number would be used for an aggregate data item that belongs to a group item of the next lower level above it.
This allows to define and reference nested data types of arbitrary complexity.
We'll go into a bit more detail about that later.

The name of the data item is pretty self-explanatory, but the `PICTURE` seems weird again.
COBOL actually never forces you to think in binary or any low-level data types for that matter.
Instead, you define your data types by their "picture", i.e. by the format how you would write them in a text file.
The syntax for this picture part almost looks like a form of proto-regex:

* `s` denotes a sign (either the character `+` or `-`).
* `9` denotes a single decimal digit.
* `(7)` repeats the character in front of it 7 times.
* `V` denotes where the decimal point is placed.

With that, the picture `s9(7)V99` stands for a signed 7-figure number with two decimal places - a pretty reasonable data item for the account balance of most people.

### Procedures

Our example program has a single procedure defined by the named paragraph `calculate-interest`.
Naming the paragraph is only necessary if we aim to call it as a subprocedure later in the code.
By default, the first paragraph (named or unnamed) of the `PROCEDURE DIVISION` will be called as the main procedure.

Inside a procedure, you can create sentences out of an arbitrary number of statements.
The statements that we use here are:

* `DISPLAY some-value some-other-value ...` to display an arbitrary number of values as a concatenated string on the terminal.
* `ACCEPT data-item` to read user input and store it in a data item. Note how the `PICTURE` definition of that item gives you input validation for free.
* `PERFORM 10 TIMES [...] END PERFORM` to repeat the statements in `[...]` in a loop.
* `MULTIPLY x BY y GIVING z` to multiply the value of `x` by `y` and store the result in `z`.

As already mentioned, COBOL uses many more keywords and statements than most modern programming languages, so learning to program in COBOL consists largely of searching for the right keywords and associated statements.
There are also the classical named functions that we are more used to, but those will be covered in the next section.

## Solving a non-trivial problem in COBOL

This solves the first part of [day 2 from Advent of Code 2024](https://adventofcode.com/2024/day/2).

```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. AoC-2024-Day2.
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT input-file
           ASSIGN TO "input"
           ORGANIZATION IS LINE SEQUENTIAL.
       DATA DIVISION.
       FILE SECTION.
       FD input-file.
       01 input-file-line PICTURE x(1024).
       WORKING-STORAGE SECTION.
       01 FILLER PICTURE a.
           88 at-eof VALUE 'Y' FALSE 'N'.
       01 line-cursor PICTURE 999.
       01 previous-line-cursor PICTURE 999.
       01 number-pair.
           02 previous PICTURE 999.
           02 current PICTURE 999.
       01 line-length PICTURE 999.
       01 FILLER PICTURE a.
           88 all-increasing VALUE 'Y' FALSE 'N'.
       01 FILLER PICTURE a.
           88 all-decreasing VALUE 'Y' FALSE 'N'.
       01 safe-count PICTURE 999.
       01 difference-safe PICTURE a.
           88 difference-is-safe VALUE 'Y' FALSE 'N'.
       01 difference PICTURE 999.
       PROCEDURE DIVISION.
       parse-file.
           OPEN INPUT input-file.
           PERFORM UNTIL at-eof
               READ input-file INTO input-file-line
               AT END
                   SET at-eof TO TRUE
               NOT AT END
                   PERFORM process-line
               END-READ
           END-PERFORM.
           DISPLAY "Total count of safe sequences: " safe-count.
           CLOSE input-file.
           STOP RUN.
       process-line.
           MOVE FUNCTION LENGTH(FUNCTION TRIM(input-file-line))
           TO line-length.
           MOVE 1 TO line-cursor.
           SET all-increasing TO TRUE.
           SET all-decreasing TO TRUE.
           SET difference-is-safe TO TRUE.
           PERFORM UNTIL line-cursor GREATER line-length
               MOVE line-cursor TO previous-line-cursor
               PERFORM read-next-number
               PERFORM check-if-increasing
               PERFORM check-if-decreasing
               PERFORM check-difference
           END-PERFORM.
           IF (all-increasing OR all-decreasing) AND difference-is-safe
               ADD 1 to safe-count.
       read-next-number.
           MOVE current TO previous.
           UNSTRING input-file-line
           DELIMITED BY " " INTO current
           WITH POINTER line-cursor.
       check-if-increasing.
           IF previous-line-cursor IS GREATER THAN 1
           AND previous IS GREATER THAN current
               SET all-increasing TO FALSE.
       check-if-decreasing.
           IF previous-line-cursor IS GREATER THAN 1
           AND previous IS LESS THAN current
               SET all-decreasing TO FALSE.
       check-difference.
           COMPUTE difference EQUAL FUNCTION ABS(previous - current).
           IF previous-line-cursor IS GREATER THAN 1
           AND (
               difference IS LESS THAN 1
               OR difference IS GREATER THAN 3
           )
               SET difference-is-safe TO FALSE.
```

### Reading an input file

### Defining a condition name

### Defining a group item

### Calling a subprocedure

### Overview of program logic

## Learnings and outlook