---
layout: post
title:  "What makes a \"good\" exercise?"
description: >
    There are good exercises that are fun and enlightening and bad exercises that are boring and tedious at best and confusing at worst.
    What separates the good from the bad and how can we make sure that our exercises are of the first type?
date:   2017-11-14 16:02 +0200
categories:
    - teaching
    - tutorial
    - german
---

For my course in algorithms and datastructures in summer semester 2017 I knew that I would not have the time to create both a completely fresh set of slides and a sufficient amount of mandatory exercises - let alone enough bonus exercises for the gamification concept that I had in mind.

My solution was to hire a lot of tutors and let *them* create the exercises.
I knew they could do it, since they were among the best students that I met in my previous semesters, but the task remains quite hard.
Especially since it is not so easy to define what makes one exercise good and another exercise bad.

For this purpose I chose to invest the time to write a tutorial.
I would like to share the result with you here.
The original version was of course in german, but I did my best to translate it to english.


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
* *Avoid using different terms for the same concept throughout the text.* Even if we do not talk about domain-specific terms, it can be confusing when a list is referred to as a "list", then as an "array" and then maybe as a "vector". If we are talking about array lists, all three terms are appropriate, but this does not make it evident that the author really means the same concept with each term. For german exercises you can also refer to the "exercise operators": The same task should use the same operator (see the [list from the hessian cultural ministry](http://informatik.archenhold.de/bk14alle/dateien/operatorliste.pdf))

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

Ich gehe davon aus, dass niemand den Nerv hat, dieses Dokument mehr als einmal ganz durchzulesen. Daher versuche ich den Inhalt hier noch einmal in einer TLDR-Variante als Checkliste zusammenzufassen:

- [ ] Entscheidung: Reproduktion, Anwendung oder Transfer?
- [ ] Lernziele aufschreiben
- [ ] Vorhandene Vorkenntnisse aufschreiben
- [ ] Zeitlichen Soll-Aufwand bestimmen
- [ ] In alten Aufgaben nach Ideen suchen
- [ ] Brainstorming nach neuen Ideen
- [ ] Musterlösung erstellen (zeitlichen Ist-Aufwand festhalten)
- [ ] Grobe Ausarbeitung
- [ ] Bewertungskriterien und Feedbackform festlegen
- [ ] Ausformulierung: eindeutig, verständlich, korrekt und erklärend
- [ ] Korrigieren, reduzieren, verbessern

***

## Beispiele

### Allgemeiner Hinweis

Die folgenden Beispiele sind alle aus echten Aufgaben entnommen. Meistens handelt es sich dabei um meine eigenen Formulierungen, manchmal aber auch um die von anderen Lehrenden. Natürlich sind meine immer nur die Positivbeispiele. :stuck_out_tongue:

### Beispiel 1: Der Begriff *Literal*

>Nenne 4 der 8 primitiven Typen von Java. Gib jeweils ein Beispiel an, wie ein Literal des entsprechenden Typs in korrekter Java-Syntax aussehen könnte.

Wichtig ist hier, dass tatsächlich der korrekte Begriff *Literal* verwendet wird. In einer älteren Version lautete die Aufgabe in etwa wie folgt:

> Nenne die 8 primitiven Typen von Java und gib für jeden Typ ein Beispiel für einen legalen Wert an.

Wenn nur nach dem Wert gefragt wird, ist nicht klar, *wie* dieser Wert aufgeschrieben werden soll. Für `float` wäre also `0,5` genau so korrekt gewesen wie `0.5` oder (was als einziges dem entspricht, was *gemeint* war) `0.5f`.

### Beispiel 2: Eindeutigkeit in diesem Text

Dieser Text hatte in seiner ersten Version ein Problem mit der Eindeutigkeit. 

># Wie schreibt man eine gute Übungsaufgabe?
>
>Das Formulieren von guten Übungsaufgaben gehört zu den schwierigsten Aufgaben eines Dozenten oder Tutoren. [...]
>
>Mit diesem Dokument möchte ich versuchen eine "Anleitung" zum Erstellen von guten Übungsaufgaben zusammenzustellen [...].

Was fällt bei dieser Textpassage auf? Ich rede einmal vom *Schreiben*, dann vom *Formulieren* und dann wieder vom *Erstellen* von Übungsaufgaben.
Ich könnte mich damit herausreden, dass ich das gemacht habe, um die Formulierungen im Text abwechslungsreicher zu gestalten, aber das war nicht der Fall.
Ich habe schlicht und ergreifend nicht darauf geachtet.
Das Problem ist noch nicht so schlimm, aber trotzdem habe ich versucht, es in dieser Version zu beheben - zumal das *Formulieren* wirklich missverständlich einmal als Teilbegriff und einmal für das gesamte Erstellen von Übungsaufgaben verwendet wurde.

### Beispiel 3: Uneindeutige Aufgabenstellung

>Gegeben seien die folgenden Java-Klassen:
>
>```java
>public class Mensch implements Benannt { [...] }
>public class Haustier implements Benannt { [...] } 
>```
>
>Implementieren Sie das Interface Benannt in Java, das die Gemeinsamkeiten aller benannten Objekte zusammenfasst.

Diese Aufgabe tauchte so (natürlich mit ein wenig mehr Inhalt in den Klassen) in einer OOP-Klausur auf.
Wir mussten die Aufgabe streichen, weil die Formulierung "Implementieren Sie das Interface" missverständlich war.
Gemeint war natürlich den Inhalt der Datei `Benannt.java` anzugeben, die eine entsprechende Interface-Deklaration enthalten sollte.
Man hätte die Aufgabe aber auch so interpretieren können (und manche Studierenden haben das getan), dass man noch eine *Klasse* schreiben sollte, die ebenfalls `Benannt` implementiert.

### Beispiel 4: Komplizierter als gedacht - Regex

>Geben Sie einen regulären Ausdruck an, der E-Mail-Adressen erkennen kann.

Klingt unschuldig als Aufgabe, oder? Diese Aufgabe hat aber [keine korrekte Lösung](http://www.regular-expressions.info/email.html) und die bestmögliche Lösung sieht so aus:

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

### Beispiel 5: Komplizierter als gedacht - Java

Ein beliebtes Minimalbeispiel für Threads in Java ist ein Chatserver.
Es sollte doch nicht sehr viel mehr Aufwand sein, einen Server zu schreiben, der statt Chatnachrichten Pixelkoordinaten an den Server schickt, sodass der Server diesen Pixel auf seinem Display-Fenster mit einer dem Client zugewiesenen Farbe füllt, oder?

Wieder einmal falsch gedacht: Wie man es auch dreht und wendet, selbst der einfachste (single-threaded) Java-Client braucht dazu mehr als 100 Zeilen Code und, wenn man den Server mit weiteren 500 Zeilen nicht zur Aufgabe mit dazu nimmt, kann man mit der Aufgabe die Grundkonzepte des Threading nicht sinnvoll vermitteln.

### Beispiel 6: Klarheit durch Einschränkung

>Schreiben Sie ein Java-Programmfragment, das alle Teiler einer ganzen Zahl ausgibt.
>Die Zahl darf dabei direkt als Literal im Code angegeben werden.

Der zweite Satz ist entscheidend – insbesondere wenn es sich um eine Klausur handelt. Ansonsten könnten Studierende auf die Idee kommen, sie müssten mit einer `Scanner`-Klasse oder Kommandozeilenparametern hantieren.

### Beispiel 7: Einführung eines neuen Konzepts in einer Aufgabenstellung

>## Aufgabe 6: Experimente mit Varargs
>Ein Varargs-Parameter stellt eine Möglichkeit dar, eine Funktion mit beliebig vielen Parametern zu definieren.
>Als Benutzer der Funktion kann man einfach normal mit Komma getrennt so viele Argumente übergeben wie man möchte. Als Entwickler der Funktion geht man mit dem Varargs-Parameter um wie mit einem normalen Array.
>Das folgende Beispiel zeigt eine Funktion, die die Summe von beliebig vielen Integer-Werten bildet:
>
>```
>// Code-Beispiel
>```
>
>### 6.1 Min+Max
>Schreiben Sie nun selbst zwei Funktionen `max` und `min` mit Varargs-Parameter, die das Maximum und das Minimum von beliebig vielen ganzen Zahlen bestimmen können.

Dank der vorherigen Erklärung sind Studierende (hoffentlich) in der Lage, die Aufgabe 6.1 zu lösen, indem sie ihr bisheriges Wissen über Arrays und Schleifen auf das für sie neue Konzept *Varargs* transferieren.

### Beispiel 8: Versteckte Rechercheaufgabe

>### Continue
>Vervollständigen Sie die Methode safeSum, die die Werte eines Arrays vom Typ double aufsummiert, so dass Einträge mit dem Wert NaN ignoriert werden.
>Verwenden Sie dazu eine `continue`-Anweisung;
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

Das Besondere an dieser Aufgabe ist, dass sie ein neues Konzept beibringt, ohne es zu erklären, indem Sie die Studierenden zuerst einmal verwirrt.
Das Einfügen von `if (ar[i] == Double.NaN) continue;` löst das Problem nämlich nicht.
Nur wer durch gutes Testen oder Nachfragen die Ursache für den Fehler sucht, wird erfahren, dass Vergleiche mit `NaN` *immer* `false` ergeben - selbst bei `Double.NaN == Double.NaN`.
Deshalb braucht man die Methode `Double.isNaN` - ein Fakt an den die Studierenden sich hoffentlich erinnern, weil die Aufgabe sie genau vor dieses Problem gestoßen hat.

### Beispiel 9: Begriffsverwirrung

>Die zu testende Methode bekommt als Parameter ein String-Array übergeben. Mit welchen Parametern testen Sie die Methode ?
>
>- [ ] Mit einem deklarierten String-Array
>- [ ] Mit einem initialisierten String-Array
>- [ ] Mit einem initialisierten String-Array, welches null-Werte besitzt
>- [ ] Mit einem deklarierten char-Array
>- [ ] Mit einem initialisierten Character-Array

Diese Frage ist nicht per se schlecht.
Die Idee ist gut, aber es ist fragwürdig, ob sofort jeder Studierende versteht, was ein "initialisiertes Array" ist oder versteht, dass "deklariert" in diesem Fall mit "nicht-initialisiert" gleichzusetzen ist.

Man könnte die Aufgabe verbessern, indem man konkrete Codezeilen angibt und fragt, ob es sich bei diesen Aufrufen um sinnvolle Testfälle handelt.

Außerdem ist bei dieser Frage zweifelhaft, ob wirklich die richtige Botschaft bei den Studierenden ankommt.
Die Frage sollte vermutlich als Ziel haben, sinnvolle von weniger sinnvollen Testfällen zu unterscheiden.
Da hätte man auf jeden Fall noch auf andere Randfälle bzw. eben auf unnötige Variationen gleicher Fälle oder ähnliches eingehen können und müssen.

### Beispiel 10: Zu freie Aufgabe

>Simuliere einen Aufzug in einem Hochhaus. Der Benutzer soll in jedem Stockwerk auf einen Knopf drücken können, um den Aufzug zu rufen. Was macht der Aufzug, wenn er zu mehreren Stockwerken gleichzeitig gerufen wird?

Diese Aufgabe stammt aus der aktuellen Aufgabensammlung für den Brückenkurs. Sie ist eigentlich keine fertige Aufgabe, sondern mehr eine Anregung - eine grobe Idee, was für ein Programm man schreiben könnte.
Würde diese Aufgabe so auf einem tatsächlichen Übungsblatt auftauchen, wäre eine Bewertung fast unmöglich, weil es keinerlei klare Rahmenbedingungen gibt (Wie viele Stockwerke? Wie lange darf ein Benutzer maximal warten? ...).