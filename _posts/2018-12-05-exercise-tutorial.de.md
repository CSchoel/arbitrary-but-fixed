---
layout: post
title:  "Was macht eine \"gute\" Aufgabe aus?"
description: >
    Es gibt gute Aufgaben, die Spaß machen und erleuchten und schlechte Aufgaben, die bestenfalls langweilig und mühsam und schlimmstenfalls auch noch verwirrend sind.
    Was trennt die guten von den schlechten und wie können wir sicherstellen, dass unsere Aufgaben zu den ersteren gehören?
ref: exercise-tutorial
lang: de
categories:
    - teaching
    - tutorial
    - german
---

Ich wusste, dass ich für meinen Kurs "Algorithmen und Datenstrukturen" im Sommersemester 2017 nicht gleichzeitig einen kompletten Foliensatz und eine ausreichende Anzahl an Pflichtübungen erstellen konnte - ganz abgesehen von genügend Bonusaufgaben für das Gamificationkonzept, das ich mir überlegt hatte.

Daher habe ich eine größere Menge von Tutoren angestellt und *diese* die Übungen erstellen lassen.
Ich wusste, dass sie dazu in der Lage waren, weil sie zu den besten Studierenden gehörten, die ich in meinen vorherigen Semestern kennengelernt hatte.
Trotzdem blieb die Aufgabe natürlich herausfordernd - besonders, da es nicht so einfach ist zu definieren, was eine Aufgabe nun gut oder schlecht macht.

Aus diesem Grund habe ich mir die Zeit genommen, dieses Tutorial zu verfassen, was ich nun hier mit der Welt teilen möchte.
Dies ist die originale deutsche Version.
Ich habe das Dokument auch [möglichst wortgetreu ins Englische übersetzt]({{ site.baseurl }}{% post_url 2018-12-05-exercise-tutorial.en %}).

## 0 Einführung

Das Erstellen von guten Übungsaufgaben gehört zu den schwierigsten Aufgaben eines Lehrenden.
Um eine Aufgabe erstellen zu können, muss man den Inhalt, der damit vermittelt werden soll, weit besser verstanden haben als es nötig ist, um die Aufgabe nachher zu lösen.
Eigentlich stellt sich so ein tiefes Verständnis eher am Ende eines Studiums ein, wenn man noch einmal mit mehr Wissen über andere Teilbereiche des Faches zu den Grundlagen zurückkehrt.
Trotzdem gibt es ein paar Regeln und Techniken, die dabei helfen können.

Mit diesem Dokument möchte ich versuchen eine "Anleitung" zum Erstellen von guten Übungsaufgaben zusammenzustellen – soweit das überhaupt möglich ist. Ich gehe dabei einfach von meinen eigenen Erfahrungen und Vorstellungen aus. Diese haben sicherlich keine allgemeine Gültigkeit, helfen aber hoffentlich als gedanklicher Anstoß für Tutorinnen und Tutoren, die auf dem Gebiet noch keine oder nur wenig eigene Erfahrungen gesammelt haben.

***

## 1. Vorüberlegungen

### 1.1. Was ist überhaupt eine *gute* Aufgabe?

Eine gute Übungsaufgabe...

* ... hilft beim Verstehen der Inhalte, statt sie nur abzuprüfen.
* ... verdeutlicht den aktuellen Lernabschnitt und bereitet die Erkenntnis des nächsten Abschnitts vor.
* ... ist eindeutig und präzise formuliert.
* ... ist leicht zu verstehen.
* ... verwendet die gleichen Begriffe und Definitionen wie die Vorlesung/Übung.
* ... verlangt das Verständnis von Konzepten, aber kein auswendiges Wiedergeben von genauen Formulierungen, anekdotischem Wissen oder individuellen Meinungen des Fragestellers.
* ... macht Spaß.
* ... fordert ohne zu überfordern.
* ... ist immer nur für eine gewisse Gruppe von Studierenden *gut*.

### 1.2. Um welchen Aufgabentyp soll es sich handeln?

Grundsätzlich unterscheidet man in der Lehre drei Aufgabentypen:

* **Reproduktionsaufgaben** verlangen nur den Abruf von (auswendig) gelerntem Wissen.
* **Anwendungsaufgaben** verlangen die Anwendung von erlernten Techniken auf einen konkreten Beispielfall. Dabei muss die Technik nicht angepasst werden, sondern es reicht, die erlernten "Handlungsrezepte" auszuführen.
* **Transferaufgaben** verlangen es, mehrere Techniken zu verknüpfen oder eine erlernte Technik abzuwandeln, damit sie auf eine neue Problemstellung anwendbar ist.

Das ist ein sehr vereinfachtes Schema für deutlich kompliziertere Modelle des menschlichen Denkens und Verstehens, die aus der Psychologie stammen.
Es hilft aber, um grob zu verorten, in welchem Bereich sich die Aufgabe befinden soll, die man gerade ausarbeitet.
Ein gutes Übungsblatt beginnt üblicherweise mit ein paar wenigen Reproduktionsaufgaben, enthält einen relativ großen Anteil Anwendung und wenigstens eine Transferaufgabe.

### 1.3. Welche Fähigkeiten soll die Aufgabe vermitteln?

Zu Beginn der Erstellung einer Übungsaufgabe steht die Frage: "Warum stelle ich überhaupt diese Aufgabe?".
Wenn man sich nicht darüber bewusst ist, was man mit der Aufgabe vermitteln möchte, ist es auch schwer, diese unbekannten Inhalte, die man "nur so im Gefühl" hat, zu transportieren.

Jede Veranstaltung hat ihre Lernziele und/oder eine Liste von Kompetenzen, die die Studierenden erlangen sollen.
Eine gute Übungsaufgabe ist mit mindestens einem dieser Lernziele direkt verknüpft.
Die Aufgabe muss sich dabei nicht sklavisch nur an eine einzelne Folie halten.
Es ist sogar eher besser, wenn man eine Aufgabe stellen kann, die Wissen aus vorherigen Vorlesungswochen mit dem Wissen, das aktuell behandelt wird, verknüpft.
Das geht aber natürlich nur, wenn die Aufgabe dadurch nicht zu groß oder zu verwirrend wird.

In jedem Fall sollte man sich, bevor man eine Aufgabe ausarbeitet, einfach einmal auf ein Blatt Papier oder in eine Textdatei in Stichpunkten aufschreiben, worum es inhaltlich in der Aufgabe gehen soll.

### 1.4. Welche Vorkenntnisse können vorausgesetzt werden?

Wenn man sich überlegt, was man den Studierenden beibringen möchte, kommt man oft schon auf sehr schöne Ideen, die die Anwendung dieser Konzepte verdeutlichen könnten.
Oft sind diese Ideen dann aber in der Praxis doch nicht umsetzbar, weil man eben nicht von dem eigenen Wissensstand ausgehen darf, sondern nur von dem der Studierenden.

Hier hilft es wie im Kapitel zuvor, sich ganz klar zu überlegen und auch am besten aufzuschreiben, welche Fähigkeiten man schon voraussetzen kann.
Zuerst legt man sich also das Handwerkszeug zurecht, was man zur Verfügung hat, und dann erst überlegt man sich, was man bzw. die Studierenden damit schon bauen können.

Manchmal ist es im Sinne einer Transferaufgabe auch durchaus erlaubt, in der Aufgabenstellung ein neues Werkzeug einzuführen.
Dieses muss sich dann aber in ein paar wenigen Sätzen (und am Besten mit einem Beispiel) so gut erklären lassen, dass man es wirklich ohne weitere Hilfestellung verstehen kann.
Alternativ kann man eine solche Aufgabe auch in zwei Teile teilen: "Recherchieren Sie die Technik X und wenden sie die auf Problem Y an."

### 1.5. Wie viel Zeit darf das Lösen der Aufgabe kosten?

Selbst wenn man sich auf die Konzepte beschränkt, die den Studierenden schon bekannt sind, sind die meisten "schönen" Aufgaben immer noch keine "guten" Aufgaben, weil sie zu groß sind.
Es ist sehr schwierig abzuschätzen, wie lange jemand für eine Aufgabe braucht, der wenig bis gar keine Übung mit den verlangten Inhalten hat.

Eine *gute* Aufgabe wurde daher immer mindestens einmal auch vom Aufgabensteller oder einer anderen Testperson gelöst.
Die Zeit, die diese Person dafür gebraucht hat, kann man dann als Abschätzung für die Zeit verwenden, die Studierende für die Aufgabe benötigen werden.
Wenn man sich selbst im gleichen Studium befindet und das Fach schon einmal vor einem oder ein paar Semestern gehört hat, ist das Doppelte der eigenen Zeit ein guter Näherungswert.
Als Lehr- oder Hilfskraft mit einem abgeschlossenen Bachelor- oder Masterstudium sollte man eher das Dreifache oder sogar Vierfache annehmen.

Oft ist es möglich, eine Aufgabe zu verkleinern und auf einen essentiellen Kern zu reduzieren, der in deutlich weniger Zeit zu bewältigen ist als die ursprüngliche Version.
Solche Aufgaben werden durch diese Reduktion auch oft zusätzlich klarer, weil unwichtige und ablenkende Nebenaufgaben verschwinden.
Manchmal muss man aber auch tatsächlich einsehen, dass man sich mit der Schwierigkeit einer Aufgabe einfach verschätzt hat und die Idee wieder einmotten - so gut sie auch geklungen haben mag.

## 2. Konzeption

### 2.1. Brainstorming

Man kann aus den oben schon genannten Gründen davon ausgehen, dass die meisten spontanen Ideen leider nicht zu guten Aufgabenstellungen führen werden.
Umso wichtiger ist es, zu Beginn der Aufgabenkonzeption mehrere Ideen zu sammeln.
Das verhindert vor allem, dass man sich an einer eher ungeeigneten Idee festbeißt, weil man doch schon so viel Zeit gebraucht hat, sich diese Idee auszudenken.

Mein persönlicher Tipp ist es daher, einfach mit einer Liste von Stichworten zu starten, die gute Aufgabentypen und -inhalte ergeben könnten.
Dazu hilft es auch immer, einfach mal jemand anderen, der gerade anwesend ist, nach Ideen zu fragen.

### 2.2. Ausarbeitung

Wenn man die Liste möglicher Aufgabenideen zusammen hat, kann man nach dem folgenden Schema verfahren:

1. Suche dir die vielversprechendste Idee aus der Liste aus.
2. Versuch eine Aufgabe aus dieser Idee zu machen.
3. Wenn dir dabei eine neue Idee in den Sinn kommt, oder du eine andere Herangehensweise für eine bestehende Idee findest, notiere sie dir, mach aber erst einmal mit der aktuellen Aufgabe weiter.
4. Wenn du ins Stocken gerätst, weil die Idee doch nicht so gut funktioniert, lege sie beiseite und fange bei 1. an.
5. Wenn die Aufgabe fertig geworden ist: Freuen und von vorne anfangen. ;)

Dabei heißt "eine Aufgabe aus der Idee machen", dass man erst einmal nur grob in Stichpunkten den Aufgabentext formuliert und dabei Code-Beispiele, Interface-Vorgaben und ähnliches konkretisiert.

## 3. Bewerten und testen

### 3.1. Musterlösung erstellen und Zeitaufwand schätzen

Meistens hat man selbst nach Schritt zwei noch nur eine eher vage Vorstellung, wie die Lösungen von Studierenden aussehen könnten.
Das bedeutet auch, dass man noch gar nicht wissen kann, auf was für Missverständnisse man bei der Ausformulierung des Textes achten muss oder wo man vielleicht doch etwas Inhalt wegkürzen muss.

Daher bietet es sich an, *vorher* schon eine Musterlösung zu schreiben.
Das ist natürlich zeitlich nicht immer möglich, aber ich lehne mich einmal so weit aus dem Fenster zu sagen, dass Aufgaben, zu denen eine Musterlösung existiert, immer besser werden als Aufgaben ohne Musterlösung - egal ob die Studierenden diese Musterlösung je zu Gesicht bekommen.

Tipp am Rande: Wenn man schon eine Musterlösung erstellt, dann kann man auch gleich die Zeit dafür stoppen, um abzuschätzen, wie viel Zeit die Studierenden für ihre Lösung brauchen werden (siehe Abschnitt 1.5.).

### 3.2. Bewertungsschema erstellen

Selbst die beste Aufgabe ist nichts wert, wenn man kein klares Bewertungsschema anlegen kann.
Gehen die Lösungen von Studierenden zu weit auseinander, wird es schwer, faire Noten zu geben.
Zu den Vorüberlegungen zu einer Aufgabe gehört also immer auch die Frage, was einem wichtig ist.
Wofür gibt es Punkte?
Wofür gibt es Punktabzug?
Welche Lösungswege akzeptiere ich und welche nicht?

Es macht also durchaus Sinn, sich auch im Vorhinein schon eine Liste von Bewertungskriterien mit deren Gewichtung zu erstellen. Dies wird durch eine eigene Musterlösung deutlich erleichtert, auch wenn dann beachtet werden muss, dass es oft auch andere Lösungswege geben kann.
Diese so erstellte Liste kann man später sogar der Aufgabe beilegen, damit auch für die Studierenden transparent ist, was bewertet wird.

### 3.3. Form des Feedbacks festlegen

Eine letzte Frage, die man sich stellen kann und muss, ist die, welche Art von Feedback die Studierenden auf ihre Lösung erhalten werden.
Wenn es möglich und vom Zeitaufwand her machbar ist, längere Bewertungstexte zu schreiben, kann die Aufgabenstellung auch freier sein und mehr Kreativität zulassen.
Wenn es nur um "bestanden" oder "nicht bestanden" geht, sollte man der Aufgabe vielleicht lieber engere und eindeutigere Grenzen geben.
An diesem Punkt sollte reflektiert werden, ob der bisherige Aufgaben- und der geplante Feedbackumfang zusammenpassen und bei Bedarf eines davon anpassen.

## 4. Ausformulieren

### 4.1. Eindeutig

Auch wenn man durchaus argumentieren kann, dass Aufgabenstellungen in der realen Arbeitswelt auch nicht absolut präzise formuliert sein werden, lässt eine *gute* Aufgabenstellung trotzdem keine Zweifel daran, was man von Studierenden verlangt.
Das Interpretieren von Kundenwünschen ist ein wichtiger Social-Skill, steht in der Regel aber nicht im Vordergrund der Vorlesung.
Vor allem ist es auch nicht zu erwarten, dass jede legitime Interpretation der Aufgabenstellung am Ende wirklich die Fähigkeiten abverlangt, die in der Aufgabe gefragt sein sollten.

Unterm Strich heißt das also, man sollte darauf achten, sich präzise auszudrücken und Missverständnissen sowie alternativen, nicht erwünschten Lösungswegen vorzubeugen.

Es gibt ein paar grundlegende Tipps, die dabei helfen können:

* *Verwende die richtigen Fachbegriffe.* Das ganze Fachchinesisch ist ja dazu da, damit beide Seiten genau wissen, wovon die Rede ist.
* *Vermeide unbedingt falsche oder alternative Verwendungen von Fachbegriffen.* Fachbegriffe sind wie gesagt klar definiert. Diese Definition darf man auch in Aufgabenstellungen nicht verwässern.
* *Vermeide die Verwendung unterschiedlicher Formulierungen für die gleiche Sache.* Auch wenn es nicht um Fachbegriffe geht, kann es verwirren, wenn eine Liste z.B. einmal eine "Liste" ist, dann wieder ein "Array" und dann vielleicht noch ein "Vektor". Reden wir von Array-Listen, sind alle drei Bezeichnungen zutreffend, aber dass mit allen dreien das gleiche gemeint ist, ist dadurch nicht automatisch sicher. Hierbei sei an die Aufgabenoperatoren aus dem Abitur erinnert: Der gleiche Arbeitsauftrag sollte auch durch den gleichen Operator ausgedrückt werden (nachzuschlagen etwa [hier als Liste vom Hessischen Kultusministerium](http://informatik.archenhold.de/bk14alle/dateien/operatorliste.pdf)) 

### 4.2. Verständlich

Das Problem an eindeutigen und präzisen Formulierungen ist, dass dabei oft eher verklausulierte Sätze herauskommen, die man auch wirklich nur entschlüsseln kann, wenn man ein tiefes Verständnis der Fachsprache hat.
Es hilft nichts, wenn eine Aufgabenstellung für den Ersteller eindeutig ist, aber für einen Studierenden völlig unverständlich.

Es gilt daher einen schwierigen Balanceakt zu vollführen zwischen Präzision und Verständlichkeit. Dabei können die folgenden Tipps helfen:

* *Verwende nur die zentralen Fachbegriffe.* Was in der Vorlesung und Übung explizit besprochen wurde, kann vorausgesetzt werden. Alles andere sollte mit Vorsicht eingeführt werden.
* *Erkläre seltener verwendete Fachbegriffe mit Nebensätzen.* Oft reichen schon ein oder zwei zusätzliche Wörter, um eine Formulierung deutlich verständlicher zu machen.
* *Wenn du Zweifel hast, gib den Text jemand anderem zu lesen.* Für dich selbst ist alles, was du schreibst, verständlich. Die Frage ist, ob andere das auch so sehen.

### 4.3. Korrekt

Es erklärt sich von selbst, dass für Texte in Aufgabenstellungen die gleichen Korrektheitsansprüche gelten, wie für Texte auf Folien oder im Skript.
Trotzdem kommt man immer wieder einmal in Versuchung, einen Sachverhalt vereinfachend darzustellen, um Platz zu sparen.
Das ist in gewissem Umfang in Ordnung und sogar unvermeidlich - man kann Studierende nicht mit jeder Ausnahme der Ausnahme der Ausnahme konfrontieren - aber man muss damit sehr vorsichtig sein.

Die folgenden Tipps können dabei helfen:

* *Kein Satz in einer Aufgabenstellung sollte einem Satz auf einer Folie widersprechen.*
* *Ausnahmen kann man auch in einer Hinweis-Box separat zum Aufgabentext abhandeln.* Dadurch kann man trotzdem die einfachere und verständlichere Formulierung verwenden, aber verwirrt den Studierenden nicht. Beispiel: "Hinweis: Sie dürfen XYZ ignorieren."
* *Man sollte immer eine kleine Stimme im Hinterkopf haben, die versucht einen selbst zu widerlegen oder auszutricksen.* Klingt schizophren, ist aber hilfreich. :wink: :water_buffalo:

### 4.4. Erklärend

Wie schon einmal erwähnt, sind gute Aufgabentexte selbst Teil der Erklärung eines Sachverhalts und nicht bloße Aufforderungen.
Nicht jeder Aufgabentext muss noch einmal die verwendeten Begriffe und Konzepte erklären, aber eine Erklärung kann auch z.B. einfach eine sehr gute Anknüpfung an bekanntes Wissen geben und den Einstieg in eine Aufgabe erleichtern.

Auch hier ein paar konkretere Tipps dazu:

* *"In der Vorlesung haben sie gelernt, dass..."* ist eine super Einleitung für eine Frage. Durch die Wiederholung der Erklärung aus der Vorlesung aktiviert man die Erinnerung des Studierenden und kann dann weiterführende Fragen stellen - z.B. zu Sachverhalten, die im scheinbaren Widerspruch mit so einer Erklärung stehen.
* *Multiple-Choice-Antworten mit Erklärung setzen ein gutes Beispiel.* Studierende geben sich oft bei ihrer eigenen Antwort auf Freitextfragen mit dem Sachverhalt zufrieden, ohne eine Begründung anzugeben. Daher ist es nützlich, wenn man gleich mit gutem Beispiel vorangeht und die Antwortmöglichkeiten entsprechend so ausformuliert, wie man sie auch von den Studierenden gerne sehen würde.

## 5. Verfeinern

Kaum eine Aufgabe ist nach ihrer ersten Ausarbeitung perfekt. Entweder braucht sie zu viel Zeit, oder sie ist noch etwas verwirrend, oder es fehlt noch ein Teil dessen, was sie eigentlich beinhalten soll.
Das ist normal und in Ordnung.
Die meisten richtig guten Übungen entstehen dadurch, dass einem später einfällt wie man eine mittelprächtige Übung noch kürzen oder erweitern kann oder wie man in das gleiche Aufgabenschema eine andere Aufgabe einfügen kann.

Daher macht es auch immer Sinn, bei der Suche nach neuen Aufgaben erst einmal in Altbewährtem nachzusehen, ob man vielleicht eine Anregung findet.

***

## Checkliste

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
