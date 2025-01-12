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
Naming the paragraph is only necessary if we aim to call it as a procedure later in the code.
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

We could end our quick-start instructions here, but I think the step from a toy example to one that solves an actual non-trivial task still brings a lot of insights with a good cost-benefit ratio.
The following COBOL program solves the first part of [day 2 from Advent of Code 2024](https://adventofcode.com/2024/day/2).

The problem we want to solve is to read a text file with a list of numbers on each line, separated by spaces and count how many of those are "safe".
A list is safe if:

* The numbers are sorted in ascending or descending order.
* And the absolute difference between adjacent numbers is between 1 and 3 (inclusive).

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

The first challenge that we haven't tackled yet is file access.
The definition of what file is accessed is handleed in the `INPUT-OUTPUT SECTION` of the `ENVIRONMENT DIVISION`:

```cobol
       FILE-CONTROL.
           SELECT input-file
           ASSIGN TO "input"
           ORGANIZATION IS LINE SEQUENTIAL.
```

All of this is pretty straightforward:
We give our file the name `input-file`, provide the file name on the local file system (`"input"`), and tell COBOL that it should read the file line by line.
If you're wondering "how else would I read a file?", consider that COBOL mostly operates on fixed-length records.
This has the benefit of allowing random access to files, skipping to the nth record in the file in O(1) instead of having to read O(n) variable-width lines.
In that regard, our file structure is the worst case scenario from an efficiency perspective.

There is one more part of the definition in the `FILE SECTION` of the `DATA DIVISION` that is a little less straightforward:

```cobol
       FD input-file.
       01 input-file-line PICTURE x(1024).       
```

Here, we first define what type of tile `input-file` is.
The type `FD` designates a normal file used for reading and writing data.
Another alternative would be `FS`, which designates a file that is used as a working memory area for COBOL's sorting and merging functionality.
The next line, defines a data item that represents one record from the file.
As our file has `ORGANIZATION IS LINE SEQUENTIAL`, we effectively define what data type should be used for reading a line.
As we want to be agnostic about line size and content, we just pick 1024 alphanumerical characters.
The downside of this is obviously that if a line is less than 1024 characters long, we will still fill 1024 bytes of memory padded with spaces.

The code for actually reading a line from the file has again an interesting property:

```cobol
       READ input-file INTO input-file-line
       AT END
           SET at-eof TO TRUE
       NOT AT END
           PERFORM process-line
       END-READ
```

As you can see, the `READ` statement has an option to execute other statements depending on whether there was something to read or we already reached the end of the file.
Here, we use this to set the condition `at-eof`, which controls the outer loop of the program.
But more on conditions in the next section.

### Defining a condition name

Let's look a bit closer at the definition of `at-eof`:

```cobol
       01 FILLER PICTURE a.
           88 at-eof VALUE 'Y' FALSE 'N'.
```

The first thing that's new is the `FILLER` in place of the name of the top-level data item.
This is just a way of saying that we will never access that data item itself, so it doesn't need a name.
We still need to give it a picture, which is just one alphabetic character.

Now it gets interesting: The second line defines a subitem with level 88.
Normally, you can only use levels 01 through 49, but there are a few special levels in COBOL.
Level 88 is used for defining so-called "condition names", which can be used as booleans.
If set to `TRUE`, a condition name will assume the value given after `VALUE` (or the first possible value in case a range of values is specified instead).
If set to `FALSE`, it assumes the value given after `FALSE`.
So essentially, we have an alphabetic data item that can either be `Y` or `N`, but we can use `at-eof` directly in place of a condition in an `IF` or `UNTIL`, and we can assign it to `TRUE` or `FALSE` with the `SET` statement.

### Defining a group item

We've seen the special level 88 for condition names, but we haven't seen a true group item yet:

```cobol
       01 number-pair.
           02 previous PICTURE 999.
           02 current PICTURE 999.
```

Here, `number-pair` is a group item and `previous` and `current` are its subitems.
The level `02` for the subitems is arbitrary.
The only rule is that the level has to be larger than the parent item and both subitems have to have the same level.
With this, we have a `number-pair` consiting of two numbers.
If we wanted to swap pairs around as a whole, we could access `number-pair` directly, but for the purpose of this task we actually don't need that.
I just created the group item for learning purposes.
You can access the subitems just by their name, but in case you would have subitems with the same name in differently named group items, you could also reference them explicitly as `previous OF number-pair`, for example.

### Calling a procedure

In the code for reading a line from our file, you might have already noticed the `PERFORM process-line` statement.
This is how you call a procedure in COBOL.
As long as it's in the same file, there is no need to pass any arguments, as all data is shared between procedures.
This makes it harder to track which procedure is responsible for changing which data items, but it allows you to divide your code into procedures at virtually zero cost:
Just add one line in Area A that introduces a new paragraph and thus gives the procedure a name.

In this program, we make heavy use of this feature to make the code more readable.
For example, consider the loop over the numbers in a line:

```cobol
           PERFORM UNTIL line-cursor GREATER line-length
               MOVE line-cursor TO previous-line-cursor
               PERFORM read-next-number
               PERFORM check-if-increasing
               PERFORM check-if-decreasing
               PERFORM check-difference
           END-PERFORM.
```

If all the procedures were written out here instead of calling them, the code would become quite convoluted.
There is the downside of losing track where the data item `line-cursor` in the loop condition is changed, but to some degree such problems can be alleviated by choosing speaking names for the procedures.

As you might have noticed, procedures are not the only way of breaking down code into smaller elements.
COBOL has functions, which are called similar to how we are used to in modern languages.
For example, `FUNCTION TRIM(input-file-line)` calls the function `TRIM` and passes `input-file-line` as an argument.
You can, of course, define your own functions in COBOL, but this is beyond the scope of this quick start guide.

### Overview of program logic

With all the syntactic peculiarities out of the way, let's briefly discuss what the program actually does:

* The main loop `PERFORM UNTIL at-eof` just ensures that `process-line` is called for each line in the input file.
* `process-line` reads the numbers found in the line one by one into the `number-pair` data item to check for each pair whether one of the safety conditions is violated.
* `read-next-number` advances the `line-cursor` by reading the next number in the line and storing it in `current` while saving the previous content of `current` in `previous` to do the comparions later on.
  * I admit that it took me a while to find out that `UNSTRING` is the statement I needed here.
* `check-if-increasing` and `check-if-decreasing` update the data items `all-increasing` and `all-decreasing` if they find a pair of numbers that violates the condition that the numbers in the line are sorted in ascending or descending order respectively.
* `check-difference` calculates the absolute difference between the numbers in the pair and sets `difference-is-safe` to false if the difference is too small or too large.
* Based on the values of `all-increasing`, `all-decreasing`, and `difference-is-safe`, the counter `safe-count` is incremented if the line violated none of the safety conditions.
* At the very end, we use `DISPLAY` to print the final value of `safe-count` and thus solve the Advent of Code exercise.

## Learnings and outlook

So, what have we learned?
By this point, you are no more of a COBOL expert than I am.
You understood a very basic program that can be solved with a handful of lines in Python or Ruby, and we haven't even touched on any advanced concepts such as copybooks, tables, or sorting.
However, I hope that now that the very basic questions are out of the way, you are able to dig into the [GnuCOBOL Programmer's Guide](https://gnucobol.sourceforge.io/HTML/gnucobpg.html) or your COBOL manual of choice to find the statements you need for your program.
And I hope that this will be much quicker for you than if you had to start reading that fine but long document from the beginning.

Alternatively (or maybe additionally), I hope you just had a bit of fun with a quirky old language and maybe learned to appreciate where it got its quirks from.
Maybe COBOL doesn't look so much like a dragon now but more like a bear.
Sure, it can still kill you, and you might not want to get _too_ close to it, but you can see how it has its place in nature.
If you just let it sleep and don't disturb it too much, it'll probably be okay.

<div id="punchcards"></div>

Code <input type="text" value="000001 Hello world!" id="pc_text" oninput="updatePunchcard();" style="width:300px;"/>
Card punch <select id="pc_key_punch" oninput="updatePunchcard();">
    <option value="IBM_029_EL">IBM 029 arrangement EL</option>
    <option value="IBM_029_H">IBM 029 arrangement H</option>
</select>
<input type="checkbox" checked=1 id="pc_print" oninput="updatePunchcard();"/> Print text

<script>
// Reference for IBM 029 card punch, arrangement EL and H:
// http://bitsavers.informatik.uni-stuttgart.de/pdf/ibm/punchedCard/Keypunch/029/GA24-3332-6_Reference_Manual_Model_29_Card_Punch_Jun70.pdf
var IBM_029_EL_punches_by_char = {}
var IBM_029_H_punches_by_char = {}
// digits
for(var i=0; i <=9; i++) {
    IBM_029_EL_punches_by_char[i] = [i];
}
// latin alphabet
for(var i=1; i <=9; i++) {
    IBM_029_EL_punches_by_char["ABCDEFGHI"[i-1]] = [-2, i];
    IBM_029_EL_punches_by_char["JKLMNOPQR"[i-1]] = [-1, i];
    if (i == 1) { continue; }
    IBM_029_EL_punches_by_char["STUVWXYZ"[i-2]] = [0, i];
}
for(var k of Object.keys(IBM_029_EL_punches_by_char)) {
    IBM_029_H_punches_by_char[k] = IBM_029_EL_punches_by_char[k];
}
// Special characters (EL)
IBM_029_EL_punches_by_char["&"] = [-2]
IBM_029_EL_punches_by_char["-"] = [-1]
IBM_029_EL_punches_by_char["/"] = [0, 1]
for(var i=-2; i <= 1; i++) {
    var extra = i == 1 ? [] : [i];
    IBM_029_EL_punches_by_char[".$,#"[i+2]] = [8, 3].concat(extra);
    IBM_029_EL_punches_by_char["<*%@"[i+2]] = [8, 4].concat(extra);
    IBM_029_EL_punches_by_char["¢! :"[i+2]] = [8, 2].concat(extra);
    IBM_029_EL_punches_by_char["()_'"[i+2]] = [8, 5].concat(extra);
    IBM_029_EL_punches_by_char["+;>="[i+2]] = [8, 6].concat(extra);
    IBM_029_EL_punches_by_char['|¬?"'[i+2]] = [8, 7].concat(extra);
}
// Special characters (H)
IBM_029_H_punches_by_char["+"] = [-2]
IBM_029_H_punches_by_char["-"] = [-1]
IBM_029_H_punches_by_char["/"] = [0, 1]
for(var i=-2; i <= 1; i++) {
    var extra = i == 1 ? [] : [i];
    IBM_029_H_punches_by_char[".$,="[i+2]] = [8, 3].concat(extra);
    IBM_029_H_punches_by_char[")*('"[i+2]] = [8, 4].concat(extra);
}
// space
IBM_029_EL_punches_by_char[" "] = []
IBM_029_H_punches_by_char[" "] = []
function hole_coordinates(row, column) {
    var x = 22.5;
    var dx = 8.715;
    var y = 69;
    var dy = 25.17;
    x += column * dx;
    y += row * dy;
    return [x, y];
}
function punch(row, column) {
    var coords = hole_coordinates(row, column);
    var x = coords[0];
    var y = coords[1];
    var w = 6;
    var h = 15;
    return `<rect height="${h}" width="${w}" x="${x}" y="${y}" style="fill-opacity:0.5"/>`
}
function punchcard(content, punches_by_char, show_text) {
    content = content.substring(0,80);
    var svg_header = '<svg width="740" height="327" xmlns="http://www.w3.org/2000/svg">'
    var svg_content = '<image height="327" width="740" href="/assets/img/IBM5081_1000.png" />'
    for(var i = 0; i < content.length; i++) {
        var c = content[i];
        if (show_text) {
            var text_x = hole_coordinates(0, i)[0] + 0.5;
            svg_content += `<text x=${text_x} y=13 style="font-size:8px;">${c.toUpperCase()}</text>`
        }
        if (c.toUpperCase() in punches_by_char) {
            for(const p of punches_by_char[c.toUpperCase()]) {
                svg_content += punch(p, i);
            }
        } else {
            // mark column red to signal error
            svg_content += `<rect x=${hole_coordinates(0, i)[0]} y=0 height=327 width=6 fill="red"/>`
        }
    }
    var svg_footer = "</svg>"
    return svg_header + svg_content + svg_footer;
}
function updatePunchcard() {
    pc = document.getElementById("punchcards");
    pc_text = document.getElementById("pc_text");
    pc_key_punch = document.getElementById("pc_key_punch");
    pc_print = document.getElementById("pc_print");
    var punches_by_char = {};
    if (pc_key_punch.value == "IBM_029_EL") {
        punches_by_char = IBM_029_EL_punches_by_char;
    } else if (pc_key_punch.value == "IBM_029_H") {
        punches_by_char = IBM_029_H_punches_by_char;
    }
    pc.innerHTML = punchcard(pc_text.value, punches_by_char, pc_print.checked)
}
updatePunchcard();
</script>