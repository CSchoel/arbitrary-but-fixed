---
layout: post
title:  "What makes a \"good\" exercise?"
description: >
    There are good exercises that are fun and enlightening and bad exercises that are boring and tedious at best and confusing at worst.
    What separates the good from the bad and how can we make sure that our exercises are of the first type?
ref: exercise-tutorial
lang: en
categories:
    - teaching
    - tutorial
    - german
---

For my course in algorithms and data structures in summer semester 2017 I knew that I would not have the time to create both a completely fresh set of slides and a sufficient amount of mandatory exercises - let alone enough bonus exercises for the gamification concept that I had in mind.

My solution was to hire a lot of tutors and let *them* create the exercises.
I knew they could do it, since they were among the best students that I met in my previous semesters, but the task remains quite hard.
Especially since it is not so easy to define what makes one exercise good and another exercise bad.

For this purpose I chose to invest the time to write a tutorial.
I would like to share the result with you here.
The original version was of course in German, but I did my best to translate it to English.


## 0. Introduction

The creation of good exercise descriptions is among the hardest tasks of a teacher.
To be able to *create* an exercise, you need to have a much deeper understanding of the content than what is required to *solve* the exercise.
Usually you will achieve such a deep understanding only at the end of your studies, when you can look back at the topic with the knowledge that you have gained of all the surrounding areas.
Yet there are some rules and techniques that may help.

With this document I want to give you my best shot at creating a "tutorial" on how to create good exercises.
It is based on my own experience and ideals, which certainly are not universally valid for everybody.
I still hope that they may serve as an impulse for tutors and teachers that have no or only little experience in this regard.

***

## 1. Preliminary thoughts

### 1.1. What is a *good* exercise?

A good exercise...

* ... helps to understand the content instead of being just a check for correct understanding.
* ... clarifies the current lecture segment and prepares the student for the next segment.
* ... is formulated precisely without any ambiguities.
* ... is easy to comprehend.
* ... uses the same terms and definitions as the lecture.
* ... requires an understanding of the fundamental concepts, but not a replication of exact formulations, anecdotal knowledge, or individual opinions of the creator.
* ... is fun.
* ... is challenging, but not beyond the capabilities of students.
* ... is always only *good* for a certain group of students.

### 1.2. What should be the exercise type?

In general, we distinguish three types of exercises in teaching:

* **Reproduction exercises** only require to recall memorized knowledge.
* **application exercises** require the application of acquired techniques to a concrete sample case.
  It is not required to customize the technique.
  It simply suffices to act according to the memorized instructions.
* **transfer exercises** require to combine multiple techniques or to customize a technique so that it is applicable in the given situation.

This is an extremely simplified classification that is based on much more complicated models of human thinking and understanding from psychology.
It helps to coarsely determine in which area the exercise should be located.
A good exercise sheet usually begins with some few reproduction exercises, consists mainly of application exercises and also contains at least one transfer exercise.

### 1.3. What are the skills that the exercise should convey?

When creating an exercise, you should first ask yourself: "Why do I want my students to solve this exercise?"
If you do not know what you want to convey with the exercise it is hard to transport this unknown skills just by gut feeling.

Each lecture has it's learning goals and/or a list of skills that the students should acquire.
A good exercise is directly connected to at least one of these learning goals.
This does not mean that you have to slavishly constrict yourself to one slide that you try to turn in an exercise.
Most of the time it is even better if you can create an exercise that connects the knowledge from previous weeks with the knowledge that is currently covered in the lecture.
This is of course only possible if the exercise does not become too large or too confusing that way.

In any case you should just shortly note (with paper and pencil or in a text file) in bullet points what the exercise is about, before you start writing it.

### 1.4. What level of knowledge can be assumed?

If you think about what you want to teach your students you often already have beautiful ideas in mind that can showcase the application of these concepts.
However, these ideas are often not practical, because you cannot assume your own level of knowledge, but only that of your students.

Again it helps to actively think and take notes about the skills that your students (should) already possess.
You first assemble the tools that are available and *then* you start thinking about what you, or your students, can build with them.

Sometimes it is perfectly reasonable to introduce a new tool in the exercise description.
You should be able to explain this tool well enough with only a few sentences (and preferably with an example), so that your students can really understand and use it without any further help.
Alternatively it is also possible to split such an exercise in two parts:
"Research technique X and then apply it to problem Y."

### 1.5. How much time is the exercise allowed to take?

Even if you constrict yourself to concepts that are already known to your students, most of the "beautiful" exercises are still not "good" exercises, because they are simply too large.
It is very hard to guess, how much time an exercise will take for someone, who has little to no experience with the required concepts.

A *good* exercise therefore has been solved at least once by it's creator or by another test person.
The time needed by this person can be used as approximation for the time that a student will need.
If the test person is a student in the same field of study, who has taken the lecture already a few semesters ago, you can assume twice the original time.
As teacher or assistant with a bachelor's or master's degree you should rather multiply by three or even four.

It is often possible to reduce the size of an exercise by shortening it to a core task, that can be completed much faster than the original version.
Exercises also often become clearer that way, because unimportant and distracting side tasks are removed.
Sometimes, however, you have to realize that you simply misjudged the difficulty of an exercise and discard it - as nice as it may have sounded.

## 2. Draft

### 2.1. Brainstorming

The arguments mentioned above are reason enough to assume that most spontaneous ideas sadly will not lead to good exercise descriptions.
Therefore it is even more important to collect multiple ideas to begin with.
Most of all this prevents you from holding on too closely to a bad idea, just because you already invested so much time coming up with that idea.

My personal suggestion is therefore just to start with a list of bullet points that can lead to good exercise types and contents.
Additionally it always helps to ask somebody else for ideas, who is available.

### 2.2. Elaboration

When you have a list of possible exercise ideas, you can follow this pattern:

1. Take the most promising idea from your list.
2. Turn that idea into an exercise.
3. If new ideas arise, note them down, but continue with the current exercise for now.
4. If you get stuck, because the ideas does not work out so well, put it aside and start anew with step 1.
5. If the exercise is finished: Rinse and repeat. :wink:

In this description "to turn an idea into an exercise" means to put down the exercise text coarsely with bullet points and to flesh out code examples, interface specifications, and the like in the process.

## 3. Evaluation and Testing

### 3.1. Create a sample solution and estimate expenditure of time

Usually after step 2 you will still only have a vague idea how the solution of a student may actually look.
This means that you also cannot yet know what kind of misunderstandings you have to watch out for when formulating the exercise text and whether there may be some parts of the exercise where you have to reduce the complexity.

It is therefore a very good idea to write a sample solution *beforehand*.
Of course you will not always have the time for this, but I daresay that exercises that have a sample solution will always be better than exercises without sample solution - regardless of whether the students ever get to see this solution.

Additional tip: If you create a sample solution, you can stop the time it takes to create this solution to be able to estimate the time that the exercise will take for a student (see section 1.5.).

### 3.2. Create a scoring scheme

Even the best exercise is worthless if you cannot use a clear scoring scheme for it.
If the solutions of students differ too much it will be hard to give fair marks.
Therefore it is always important to ask yourself what is important about the exercise.
What exactly earns a point?
Which mistakes leads to penalties?
Which solutions will be accepted, and which won't?

It makes sense to have a weighted list of scoring criteria before handing out the exercise.
You will find this much easier if you have a sample solution, even if you still have to consider that there might be more than one path to a solution that a student may take.
You can even hand out the list of criteria to your students to make it transparent for them on what basis they are actually scored.

### 3.3. Determine the type of feedback

One last question you can and have to ask is which kind of feedback you want and can give to your students for their solutions.
If it is possible and you have the time to write long feedback texts, the exercise may be formulated more freely to allow for more creativity in the solutions.
If there will only be a decision about "passed" or "not passed", you should choose tighter bounds for the exercise and avoid any ambiguities in the text.
At this point you should assess if the extent of the exercise and feedback are matching up and adjust one of them if needed.

## 4. Wording

### 4.1. Unambiguous

You can very well argue that tasks in a real world jobs are probably not worded in a perfectly precise manner, but still a *good* exercise text does not leave any doubts about what is actually required from the student.
The ability to interpret the wishes of a client is an important social skill, but most lectures will focus on other learning goals.
Additionally it is not to be expected that every legitimate interpretation of an ambiguous exercise text will really require all the skills that should be tested.

Summing up, this means that you should take care to choose a precise wording and take precautions to avoid misunderstandings as well as alternative but undesired solutions.

There are a few basic tips that may help with this task:

* *Use the correct terms.* All the strange domain-specific words are there to make sure that both sides know exactly what the other person is talking about.
* *Avoid wrong or alternative uses of domain-specific terms at all costs*. As mentioned about, domain-specific terms usually have a clear definition. You cannot use these terms loosely in an exercise text.
* *Avoid using different terms for the same concept throughout the text.* Even if we do not talk about domain-specific terms, it can be confusing when a list is referred to as a "list", then as an "array" and then maybe as a "vector". If we are talking about array lists, all three terms are appropriate, but this does not make it evident that the author really means the same concept with each term. For German exercises you can also refer to the "exercise operators": The same task should use the same operator (see the [list from the Hessian cultural ministry](http://informatik.archenhold.de/bk14alle/dateien/operatorliste.pdf))

### 4.2. Understandable

The problem with precise and unambiguous wording is that often this goal will result in complicated sentences that you can only understand if you have a very deep understanding of the domain.
It does not help if the exercise text is perfect from the viewpoint of the author, but not at all understandable for a student.

The goal therefore is to find a balance between precision and understandability.
The following tips may help with that:

* *Only use the most important domain-specific terms.* You can expect the students to know the terms that have been explicitly discussed in the lecture and in other exercises. Everything else should be introduced very carefully.
* *Explain infrequent terms with an additional clause.* Often one or two additional words may suffice to make a particular wording much more understandable.
* *When in doubt, let somebody else read the text.* Your own words naturally sound understandable to you. The question is if other people share this assessment.

### 4.3. Correct

It is self-explanatory that exercise texts have to conform to the same requirements as slides or lecture nodes regarding correctness.
Yet, there will be situations where you will feel tempted to simplify a description in order to save some space.
To some extend this is OK and even unavoidable - you cannot confront your students with every exception of an exception - but you have to be very careful with this.

The following tips may help in this regard:

* *No sentence in an exercise text should contradict a sentence on a slide.*
* *Exceptions to a rule can be given as a hint box that is separate to the exercise text.* In this way you can still use the simplified and more understandable wording without confusing the student. Example: "Hint: You may ignore XYZ."
* *You should always have a small voice in your head that tries to disprove or trick you.* This may sound schizophrenic, but it helps. :wink: :water_buffalo:

### 4.4. Explanatory

As already mentioned, good exercise texts are part of the explanation of a topic themselves rather than being mere prompts.
Not every exercise text has to explain the main terms and concepts, but an explanation may, for example, simply be a good way to establish a connection to previous knowledge and therefore provide an easier entry point to the exercise.

Here, too, some tips:

* *"In the lecture you have learned that ..."* is an excellent introduction for a question. By repeating the explanation from the lecture you activate the memory of the student and can then continue to ask further questions - e.g. about facts that seem to contradict that explanation.
* *Multiple-choice answers with explanations set a good example.* In their answers to free text exercises, students are often content with the main fact itself without giving an explanation. Therefore it is helpful to set a good example by formulating possible answers in the same way in which you would like to see them from your students.

## 5. Refinement

Hardly any exercise is perfect in its first version.
Either it requires too much time or it is still somewhat confusing or it lacks some part of the content that it is supposed to cover.
This is normal and all right.
Most really good exercises arise from mediocre exercises that are shortened or extended or from the transfer of the exercise style into the topic of another exercise.

Therefore it always makes sense to look for suggestions in preexisting material.

***

## Checklist

I assume that nobody wants to read this document in full more than once.
Therefore I try to summarize the content here in a TLDR-variant as a checklist:

- [ ] Decide: Reproduction, application or transfer?
- [ ] Write down learning goals
- [ ] Write down what topics your students are already familiar with
- [ ] Determine desired expenditure of time
- [ ] Search for ideas in old exercises
- [ ] Brainstorming for new ideas
- [ ] Create a sample solution (measure actual expenditure of time)
- [ ] Coarse draft
- [ ] Determine scoring scheme and form of feedback
- [ ] Finalize draft: unambiguous, comprehensible, correct, explanatory
- [ ] Correct, reduce, improve

***

## Examples

### General Remark

The following examples all stem from real exercises.
Most of the time the wording is my own, but sometimes it is taken from other lecturers.
Of course my examples are the positive ones. :stuck_out_tongue:

### Example 1: The term *literal*

> Name 4 of the 8 primitive types in Java. Give an example, how a literal of the given type could look in correct Java syntax.

The important part is that the correct term *literal* is used in the exercise description.
In an older version the wording was the following:

> Name all 8 primitive types in Java and give an example of a legal value for each type.

If you only ask for a value it is not clear *how* this value should be written down.
For `float`, for example, `0,5` (following the German convention for writing floating point numbers) would be as correct as `0.5` or (the actual solution that was expected) `0.5f`.

### Example 2: Unambiguity in this text

The text that you are reading now had some problems regarding uniqueness in it's first (German) version.

># Wie schreibt man eine gute Übungsaufgabe?
>
>Das Formulieren von guten Übungsaufgaben gehört zu den schwierigsten Aufgaben eines Dozenten oder Tutoren. [...]
>
>Mit diesem Dokument möchte ich versuchen eine "Anleitung" zum Erstellen von guten Übungsaufgaben zusammenzustellen [...].

Translated this would read as follows:

># How do you write a good exercise?
>
>The wording of good exercise descriptions is among the hardest tasks of a teacher. [...]
>
>With this document I want to give you my best shot at creating a "tutorial" on how to create good exercises. 

What stands out for you in this text passage?
First, I talk abou *writing*, then about *wording* and finally about *creating* exercises.
I could make excuses that I did this to make the wording of the text more varied, but that was not the case.
I simply did not pay attention.
The problem is not really grave, but I tried to fix it in this version - especially since I actually used *wording* ambiguously both as a part of the exercise creation process and to refer to the whole process itself.

### Example 3: Ambiguous exercise description

>Look at the following Java classes:
>
>```java
>public class Human implements Named { [...] }
>public class Pet implements Named { [...] } 
>```
>
>Implement the interface Named in Java, that summarizes the commonalities of all named Objects.

The exercise appeared like this (of course with more content in the classes) in an OOP-exam.
We had to rule out the exercise, because the wording "Implement the interface" was ambiguous.
We meant that the students should provide the content of a file named `Named.java` that should contain an interface declaration.
However, you also could (and some students did) think, that you had to write a *new class* that also implements the interface `Named`.

### Example 4: More complicated than expected - Regex

>Write down a regular expression that can recognize e-mail addresses.

Sounds innocent enough, right?
However, this exercise [has no correct answer](http://www.regular-expressions.info/email.html) and the best possible answer looks like this:

```
\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*
 |  "(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]
      |  \\[\x01-\x09\x0b\x0c\x0e-\x7f])*")
@ (?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
  |  \[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}
       (?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:
          (?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]
          |  \\[\x01-\x09\x0b\x0c\x0e-\x7f])+)
     \])\z
```

### Exercise 5: More complicated than expected - Java

A popular minimal example for threads in Java is a chat server application.
It should not require that much more effort to write a server that sends pixel coordinates instead of chat messages letting the server display them in a window with a color that it assigns to the client, right?

Wrong again: However you put it, even the simplest (single threaded) Java client needs at least 100 lines of code.
And if you do not include the server with another 500 lines of code to the exercise, it is not possible to convey the main concepts of threading to the students.

### Example 6: Clarity by restriction

>Write a Java code fragment that outputs all divisors of a number.
>The number may be included directly as a literal in your code.

The second sentence is crucial - especially in an exam.
Otherwise, students could think that they would have to write additional code using a `Scanner` or parsing command line parameters.

### Example 7: Introducing a new concept within an exercise description

>## Exercise 6: Experimenting with varargs
>A varargs parameter allows to define a function with arbitrarily many parameters.
>As caller of the function you can simply input as many arguments as you want separated by a comma.
>The following example shows a function that calculates the sum of arbitrarily many integer values:
>
>```
>// code example
>```
>
>### 6.1 Min+Max
>Now write the varargs functions `min` and `max` that calculate the minimum and maximum of arbitrarily many integers.

Thanks to the previous explanation, students will (hopefully) be able to solve exercise 6.1 by transferring their knowledge about arrays and loops to the new concept *varargs*.

### Example 8: Hidden research exercise

>### Continue
>Complete the method safeSum that sums values of an array of type double so that entries with the value NaN are ignored.
>Use the `continue` statement.
>
>```
>double safeSum(double[] ar) {
>  double sum = 0;
>  for(int i = 0; i < ar.length; i++) {
>    
>    sum += ar[i];
>  }
>}
>```

The interesting part of this exercise is that it teaches a new concept without explaining it by confusing the students first.
Namely, adding `if (ar[i] == Double.NaN) continue;` does not solve the problem.
Only the students who search for the error by writing good test cases or asking questions will learn that comparisons with `NaN` will *always* evaluate to `false` - even with `Double.NaN == Double.NaN`.
This is the reason why you need the method `Double.isNaN` - a fact that the students will hopefully remember since the exercise presented them with exactly this problem.

### Example 9: Confusing terms

>A String array is passed to the method that should be tested. 
>Which parameters do you use to test the method?
>
>- [ ] a declared String array
>- [ ] an initialized String array
>- [ ] an initialized String array that has null values
>- [ ] a declared char array
>- [ ] an initialized Character array

The question is not bad per se.
The idea is good, but it is questionable if every student will understand what an "initialized array" is or if he or she understands that "declared" is synonymous with "not initialized" in this case.

You could improve the exercise by giving specific lines of code and ask if they constitute sensible test cases.

Additionally it is questionable if the exercise really transports the correct message to the students.
The question probably should teach to distinguish sensible from pointless test cases.
If this is the goal, it should and would have had to mention other corner cases, unnecessary variations or similar problems.

### Example 10: Too loose exercise

>Simulate an elevator in a skyscraper.
>The user should be able to press a button in each story to call the elevator.
>What does the elevator do if it is called to multiple stories at the same time?

This exercise stems from the current exercise pool for our bridging course.
It is not really a finished exercise, but more a suggestion - a coarse idea of a program that you could write.
If this exercise was used on an actual exercise sheet, grading it would be nearly impossible because there are no clear determining factors (how many stories, how long may a user wait, ...).