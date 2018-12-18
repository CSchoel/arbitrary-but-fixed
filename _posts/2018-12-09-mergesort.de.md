---
layout: post
title:  "Java Mergesort richtig plagiieren"
description: >
    Wenn du plagiierst, mach es wenigstens richtig! Die meisten Internetbeispiele für Mergesort in Java sind viel zu kompliziert geschrieben für einen Anfänger.
    Mit diesem Post will ich eine bessere Option anbieten - hoffentlich für das Verstehen des Algorithmus, zumindest aber für das Plagiieren.
ref: mergesort
lang: de
categories:
    - teaching
    - java
---

Die Implementierung von Mergesort in Java war in meinem Kurs "Algorithmen und Datenstrukturen" die Aufgabe, die am häufigsten plagiiert wurde.
Der Kollege, der die Veranstaltung im Wintersemester hält, macht gerade die gleiche Erfahrung.

Die Anzahl der Plagiate (10 bis 20 Prozent des Kurses) ist dabei schlimm genug.
Noch schlimmer ist aber, dass nicht einmal *guter* Code plagiiert wird.
Die meisten Beispiele, die man online findet, sind fehlerhaft oder viel zu kompliziert für eine\*n Anfänger\*in.

Aus einer Mischung von verzweifeltem Humor und leiser Hoffnung, vielleicht doch noch dem einen oder der anderen zu helfen, diesen Algorithmus wirklich zu *verstehen*, habe ich mir daher vorgenommen, einmal zu zeigen, wie man es (meiner Meinung nach) *richtig* macht - also sowohl das Plagiieren als auch die Implementierung von Mergesort als Java-Neuling.

So, und damit mir die potentiellen Plagiatoren jetzt nicht schon abspringen, gibt es hier fertig plagiierbaren Code.
Ein wunderschöner kompakter, verständlicher Mergesort in Java - sogar [als ausführbares JAR-Archiv zum Downoad](/assets/code/mergesort_readable.jar):

```java
package net.arbitrary_but_fixed.mergesort;
import java.util.Arrays;

public class Mergesort {
    public static void sort(int[] ar) {
        sort(ar, 0, ar.length);
    }
    public static void sort(int[] ar, int from, int to) {
        int remaining_length = to - from;
        // subarrays of size 1 and 0 cannot be unsorted
        if (remaining_length <= 1) return;
        int middle = (from + to) / 2;
        sort(ar, from, middle);
        sort(ar, middle, to);
        merge(ar, from, middle, to);
    }
    public static void merge(int[] ar, int from, int middle, int to) {
        int[] left = Arrays.copyOfRange(ar, from, middle);
        int[] right = Arrays.copyOfRange(ar, middle, to);
        int left_index = 0;
        int right_index = 0;
        for(int i = from; i < to; i++) {
            boolean more_left = left_index < left.length;
            boolean more_right = right_index < right.length;
            boolean left_smaller = more_left && more_right
                                && left[left_index] <= right[right_index];
            if (!more_right || left_smaller) {
                ar[i] = left[left_index];
                left_index++;
            } else {
                ar[i] = right[right_index];
                right_index++;
            }
        }
    }
    public static void main(String[] args) {
        int[] input = new int[]{10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
        sort(input);
        System.out.println(Arrays.toString(input));
    }
}
```

Liest Du immer noch weiter?
Gut! Wenn Du bis zum Ende durchhältst, gibt es unten noch ein Stück Code, dass sich perfekt auf die typischen Modifikationen anpassen lässt, die Dein\*e Dozent\*in vermutlich eingebaut hat, um Plagiate schwieriger zu machen. :wink:

## Nullte Regel des Plagiierens: Das Plagiat ist das Symptom, nicht die Krankheit.

Warum plagiiert jemand bei einer Hausübung?
*Willst* Du plagiieren, oder glaubst Du, dass Du es *musst*, um zu bestehen?
Ich persönlich glaube, dass fast immer letzteres der Fall ist.
Niemand, der problemlos in der Lage ist, eine Aufgabe auf normalem Wege zu lösen, entscheidet sich stattdessen, einfach eine Lösung zu kopieren.
Ich glaube also hinter dem Plagiat steht immer ein anderes Problem.
Vermutlich eins der folgenden:

* **Du besitzt tatsächlich nicht die Fähigkeiten, die Aufgabe zu lösen.**
    Vielleicht hast Du schon Schwierigkeiten mit Themen, die aus vergangenen Semestern vorausgesetzt werden; oder Du stößt einfach an eine Verständnisgrenze, wo Dir die informatisch-algorithmische Denkweise, die für die Lösung nötig wäre, zu fremd ist, um sie nachzuvollziehen.
    In diesem Fall ist die Frage angemessen: Ist Informatik der richtige Studiengang für dich?
    Also ist das *wirklich* ein Fach, für das Du dich begeisterst, und bei dem Du Dir vorstellen kannst, ein Leben lang damit zu arbeiten?
    Warum nicht Germanist\*in, Physiker\*in, Mechatroniker\*in oder Konditor\*in?
    Die Frage ist ernst und in keinster Weise abwertend gemeint.
* **Du hast die nötigen Fähigkeiten, aber Dir fehlt die Zeit.**
    Dann bekomm Dein Leben auf die Reihe!
    Ein Studium und die damit verbundene Selbstständigkeit bringt so viele neue persönliche Probleme mit sich.
    Klar, dass da mal das ein oder andere Modul auf der Strecke bleiben kann.
    Vielleicht müssen es nicht jedes Semester 30 Creditpoints sein?
    Überleg Dir Deine Prioritäten und gestalte Dein Studium entsprechend.
* **Du hast die Fähigkeiten und die Zeit, schaffst es aber nicht, die letzten Bugs in deinem Code zu beheben.**
    Das kann darauf hinweisen, dass Dir einfach (noch) die Techniken zum systematischen Debuggen fehlen.
    Informatik hat viel mit Frustrationstoleranz, richtigem (!) Googeln und akribischem Sezieren von Code zu tun.
    All diese drei Dinge wollen gelernt sein.
    Habe keine Angst, Deinen unfertigen, hässlichen Code jemandem zu zeigen - Deine\*m Dozent\*in eingeschlossen.
    Nur durch Fehler und Feedback kannst Du etwas dazulernen.

## Erste Regel des Plagiierens: Einfachheit ist Trumpf!

Genug der Moralpredigten!
Wir wollen einen Mergesort plagiieren und zwar richtig!

Warum denke ich, dass mein obiger Code dafür besser geeignet ist als der von [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/), [Vogella](http://www.vogella.com/tutorials/JavaAlgorithmsMergesort/article.html), [Baeldung](https://www.baeldung.com/java-merge-sort) oder [Java2Novice](http://www.java2novice.com/java-sorting-algorithms/merge-sort/)?
Zunächst einmal müssen wir klarstellen, was hier "besser" heißt: Mein Code ist nicht performanter oder wesentlich kürzer als andere Lösungen.
Ich habe aber versucht, ihn *verständlicher* für Java-Einsteiger zu schreiben.

Warum sollte man sich als Plagiator scheren, ob der Code, den man kopiert einfach oder kompliziert ist?
Zwei Gründe: Erstens kannst Du den Code sowieso nicht exakt so abgeben, weil Dein Dozent vermutlich eine leicht andere Schnittstelle fordert, oder eine Zeitmessung, oder oder oder.
Du musst ihn also genug verstehen, um ihn anpassen zu können.
Zweitens ist die Wahrscheinlichkeit, dass ein Plagiat auffällt, höher, je weniger der Code abgeändert wurde und je weniger er nach Deinem sonstigen Stil aussieht.
Retten kannst Du dich nur, indem Du eigene Anpassungen vornimmst, und nachher in der Lage bist, sauber zu erklären, was der Code tut und warum Du ihn so geschrieben hast, wie er da steht.

Um jetzt zu demonstrieren, warum ich meinen Code für einfacher halte, werde ich ihn erst erklären. Im nächsten Abschnitt hacke ich dann auf den Dingen herum, die die anderen Optionen aus dem Internet unnötig kompliziert bzw. auffällig schlecht machen.

### Erklärung: Sort und die Rekursion

Zur Auffrischung beginnen wir mit der Grundidee von Mergesort:

> Um eine Liste zu sortieren, teile sie in der Mitte, sortiere die linke Hälfte, sortiere die rechte Hälfte und füge beide sortierten Hälften zusammen (merge).

Diese rekursive Definition finden wir direkt im Code wieder:

```java
public static void sort(int[] ar, int from, int to) {
    // ...
    int middle = (from + to) / 2;
    sort(ar, from, middle);       // sortiere die linke Hälfte
    sort(ar, middle, to);         // sortiere die rechte Hälfe
    merge(ar, from, middle, to);  // füge beide Hälften zusammen
}
```

Warum funktioniert das?
Rekursion verbiegt auf den ersten Blick das Gehirn, aber es hilft enorm, wenn man sich einfach ganz, ganz dumm stellt.
Der Java-Compiler ist auch nicht schlauer, versprochen.
`sort(ar, 0, middle)` ist ein ganz normaler Methodenaufruf und vereinfacht kann man Methodenaufrufe so betrachten, als würde man den Code, der in der Methode steht, an die Stelle schreiben, wo sie aufgerufen wird.
Beginnen wir also mit dem folgenden Aufruf

```java
int[] input = {5, 4, 3, 2, 1};
sort(input, 0, 5);
```

dann wird das zu

```java
int[] input = {5, 4, 3, 2, 1};
sort(input, 0, 2); // (0+5)/2 == 2
sort(input, 2, 5);
merge(input, 0, 2, 5);
```

und das wird zu

```java
int[] input = {5, 4, 3, 2, 1};
// Auflösung von sort(input, 0, 2);
sort(input, 0, 1); // (0+2)/2 = 1
sort(input, 1, 2);
merge(input, 0, 1, 2);
// Auflösung von sort(input, 2, 5);
sort(input, 2, 3); // (2+5)/2 = 3
sort(input, 3, 5);
merge(input, 2, 3, 5);
// merge bleibt erst einmal stehen
merge(input, 0, 2, 5);
```

Hier sieht man schon, dass die Teilaufgaben trivial werden.
`sort(input, 0, 1)` heißt ja per Definition, dass wir alle Zahlen von Index 0 (inklusive) bis Index 1 (exklusive) im Array sortieren sollen.
Da der Index 1 schon nicht mehr mit dabei ist, bleibt nur noch eine Zahl übrig (nämlich die 5).
Das Sortieren von einer Zahl geht ziemlich schnell, denn wenn wir nur ein Element haben, kann auch nichts unsortiert sein.
Für `sort(input, 0, 1)` müssen wir also rein gar nichts machen.
Das gleiche gilt für `sort(input, 1, 2)` und `sort(input, 2, 3)`.
In unserem Beispiel erzeugt jetzt nur noch `sort(input, 3, 5)` einen weiteren rekursiven Aufruf, den wir auflösen müssen (weil hier noch die zwei Zahlen 2 und 1 zu sortieren sind).

```java
int[] input = {5, 4, 3, 2, 1};
merge(input, 0, 1, 2);
// Auflösung von sort(input, 3, 5);
sort(input, 3, 4); // (3+5)/2 = 4
sort(input, 4, 5);
merge(input, 3, 4, 5);
// schon bestehende merge-Aufrufe
merge(input, 2, 3, 5);
merge(input, 0, 2, 5);
```

Wie vorher fallen auch hier die weiteren Aufrufe von `sort` weg, weil nur noch eine einzige Zahl zu sortieren ist:

```java
int[] input = {5, 4, 3, 2, 1};
merge(input, 0, 1, 2); // merge von [5] und [4] zu [4,5]     => [4, 5, 3, 2, 1]
merge(input, 3, 4, 5); // merge von [2] und [1] zu [1,2]     => [4, 5, 3, 1, 2]
merge(input, 2, 3, 5); // merge von [3] und [1,2] zu [1,2,3] => [4, 5, 1, 2, 3]
merge(input, 0, 2, 5); // merge von [4,5] und [1,2,3]        zu [1, 2, 3, 4, 5]
```

Und schon ist auch die Rekursion verschwunden.
Übrig bleiben nur noch vier Aufrufe von `merge` hintereinander.
Die Kommentare hinter den Aufrufen zeigen, warum das funktioniert.
Die Methode `merge` fügt zwei bereits sortierte Abschnitte, die im Array nebeneinander liegen, mit einer Art Reißverschlussverfahren zu einem größeren sortierten Abschnitt zusammen.
Wir beginnen bei Listen der Länge eins und arbeiten uns langsam voran, bis die ganze Liste sortiert ist.

Ich habe die ersten Zeilen aus der Methodendefinition aus Platzgründen weggelassen.
Wir schauen sie uns jetzt aber noch einmal an:

```java
int remaining_length = to - from;
if (remaining_length <= 1) return;
```

Das ist die Erklärung, warum wir zum Beispiel `sort(input, 0, 1)` nicht weiter aufgelöst haben.
In diesem Aufruf ist `to - from` eben gerade `1 - 0` und damit kleiner gleich 1.
Die weiteren Zeilen der Methode kommen wegen dem `return` also nicht zum Tragen und daher endet hier auch die Rekursion.
Eine solche Abbruchbedingung ist für jede rekursive Methode essentiell.
Ohne geht es nicht.

### Erklärung: Merge und die Arbeitskopie

Bisher haben wir angenommen, dass `merge` einfach magisch das tut, was es tun soll:

> Füge den linken sortierten Bereich von `from` (inklusive) bis `middle` (exklusive) und den rechten sortierten Bereich von `middle` (inklusive) bis `to` (exklusive) zusammen, sodass am Ende der ganze Bereich von `from` (inklusive) bis `to` (exklusive) sortiert ist.

Dazu ist es erst einmal nötig, eine Arbeitskopie der zwei Bereiche zu erstellen, damit wir nicht teile des Arrays überschreiben, die wir danach aber gerne wieder im Ursprungszustand lesen würden:

```java
int[] left = Arrays.copyOfRange(ar, from, middle);
int[] right = Arrays.copyOfRange(ar, middle, to);
```

Wir könnten das zwar auch mit einer eigenen Schleife machen, aber warum sich den Aufwand machen und den Code verkomplizieren? Ein Hoch auf die Utility-Klassen [`Arrays`](https://docs.oracle.com/javase/10/docs/api/java/util/Arrays.html), [`Collections`](https://docs.oracle.com/javase/10/docs/api/java/util/Collections.html), [`Files`](https://docs.oracle.com/javase/10/docs/api/java/nio/file/Files.html) und Co!

Für unser Reißverschlussverfahren merken wir uns jetzt jeweils, wo wir uns in `left` und `right` gerade befinden.

```java
int left_index = 0;
int right_index = 0;
```

Und dann geht es schon los mit der (einzigen!) Schleife in der Methode, die man vereinfacht wie folgt verstehen kann:

```java
for(int i = from; i < to; i++) {
    ar[i] = // entweder das nächste Element von links oder von rechts
}
```

Wir belegen also jedes Element von `from` bis `to` mit einem neuen Wert, der entweder aus `left` oder aus `right` kommt.
Wichtig ist also nur noch die Entscheidung, wann wir den nächsten Wert aus `left` nehmen müssen und wann wir `right` als Quelle benutzen müssen.
Ich habe hier im Code absichtlich mehrere Boolesche Variablen eingeführt, um die Bedingung selbst etwas lesbarer zu machen.

```java
boolean more_left = left_index < left.length;
boolean more_right = right_index < right.length;
boolean left_smaller = more_left && more_right
                     && left[left_index] <= right[right_index];
if (!more_right || left_smaller) {
    ar[i] = left[left_index];
    left_index++;
} else {
    ar[i] = right[right_index];
    right_index++;
}
```

Wir nehmen das linke Element entweder, wenn es kleiner oder gleich dem rechten ist (`left_smaller`), oder, wenn überhaupt kein Element mehr auf der rechten Seite übrig ist (`!more_right`).
Natürlich ist die Frage, ob das linke Element kleiner als das rechte ist nur dann sinnvoll, wenn es auch auf beiden Seiten noch weitere Elemente gibt (`more_left` und `more_right`).

## Zweite Regel des Plagiierens: Lies den Kram wenigstens!

Wenn in einem Stück Code von Student\*in A ein `@author Student*in B` auftaucht, die Paketdefinition `package com.java2novice.sorting` lautet oder ausführliche englische Kommentare aus dem Original mitkopiert wurden, dann fühle ich mich als Dozent schon ein wenig beleidigt.
Wenn man schon plagiiert, dann kann man sich doch ein Mindestmaß an Mühe geben, das zu verschleiern.
Für wie blöd halten mich meine Studierenden eigentlich?

Darum die oberste Regel: **Lies den Kram, den Du kopierst wenigstens einmal durch!**
Du musst ja nicht alles begreifen, aber die offensichtlichsten Hinweise auf die Quelle kann man leicht entfernen.
Und wenn man dann von seine\*r Dozent\*in eingeladen und gefragt wird, was man sich denn bei dem Ausdruck `arr[r + q + 1 - j] = intArr[j];` gedacht hat, ist "Öhm, keine Ahnung? Aber es funktioniert!" nicht die beste Antwort, um den Kopf aus der Schlinge zu ziehen. :wink:

In diesem Zuge möchte ich mir jetzt einmal den Spaß machen, aufzulisten, wo die am häufigsten verwendeten Onlinequellen dem geneigten Plagiator diesbezüglich überall ein Bein stellen.
Dabei werde ich auch generelle stilistische Verbrechen auflisten, weil Plagiate eben nie wegen klaren Codezeilen auffallen, sondern wegen denen, die seltsam, unnötig oder fehlerhaft sind.

#### [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)

* Kein normal denkender Mensch schreibt seine Arraytypen in C-style, wenn er Anfänger\*innen das Programmieren in Java beibringt.
    `int L[] = new int [n1];` ist syntaktisch korrekt, aber moralisch höchst fragwürdig.
* Arrays von Hand kopieren ist spätestens seit Java 1.6 nur noch Studierendenschikane und `for`-Schleifen ohne geschweifte Klammern sind grob fahrlässig.

    ```java
    for (int i=0; i<n1; ++i) 
      L[i] = arr[l + i]; 
    ```
* Selbst ohne das Kopieren hat `merge` noch drei `while`-Schleifen statt einer `for`-Schleife.
    Das mag zwar ein sinnvoller Optimierungsschritt sein, aber im Sinne der [ersten Regel der Optimierung](http://wiki.c2.com/?RulesOfOptimization): Lass es!
* `arr[k] = L[i]; i++; k++;` - Alles klar, was hier passiert? Also mir ist zumindest klar, dass der Autor eine Allergie gegen Variablennamen mit mehr als einem Buchstaben und vermutlich gegen Semantik im Allgemeinen hat.
* Es gibt keinen vernünftigen Grund, warum `merge` und `sort` nicht `static` sein können und sollten.
* Das `if (l < r)` in `sort` verbirgt unnötigerweise, dass es sich dabei um eine Abbruchbedingung handelt. `if (...) return;` erreicht genau das gleiche, erzeugt aber keinen eingerückten Block (und damit keinen zusätzlichen mentalen Aufwand).

#### [Vogella](http://www.vogella.com/tutorials/JavaAlgorithmsMergesort/article.html)

* Zwei `while`-Schleifen statt einer `for`-Schleife.
* `i`, `j`, `k`, ... Ja, es sind Zählvariablen, aber manchmal verdienen auch Zählvariablen eine semantische Benennung.
    Besonders dann, wenn sie manuell hochgezählt werden!
* Der mitgelieferte JUnit-Test ist auch ein Paradebeispiel dafür, wie man einen JUnit-Test *nicht* schreiben sollte. `fail("Should not happen")` - Vielen Dank für die informative Fehlermeldung. :man_facepalming:
    Über die [Probleme mit der Zeitmessung](https://www.oracle.com/technetwork/articles/java/architect-benchmarking-2266277.html) im Test reden wir mal lieber gar nicht.
* Diese Implementierung hat einen Grund, warum die Methoden nicht `static` sind, aber keinen guten: Der Input-Array und seine Kopie werden als private Variablen mitgeschleift. :scream:
    Der Sinn dahinter ist auch hier wieder eine für den eigentlichen Zweck völlig unnötige Optimierung (weniger Array-Erzeugungen).
* Wieder ein `if (low < high)` statt einer sauberen Abbruchbedingung mit `return`.

#### [Baeldung](https://www.baeldung.com/java-merge-sort)

* `mergeSort` braucht die Länge des Arrays als Parameter?
    Das war aber in Java noch nie nötig. Da steckt noch jemand in C-Zeiten fest.
* `merge` hat viel zu viele unnötige Parameter, weil `mergeSort` ein paar Dinge tut, die `merge` eigentlich selbst tun sollte.
* Das übliche `i`/`j`/`k`-Debakel.
* `a[k++] = l[i++];` - kürzer als die anderen, aber nicht lesbarer.
    Für einen erfahrenen Programmierer mag das egal sein, aber ich behaupte für eine Erklärung für Anfänger\*innen ist es nicht klug, drei Zuweisungen in einer zu verstecken.
* Wieder drei Schleifen statt einer... hört endlich auf Beispielcode zu optimieren!

#### [Java2Novice](http://www.java2novice.com/java-sorting-algorithms/merge-sort/)

* In der `main`-Methode stimmt nicht mal die Einrückung.
* Unnötige Optimierung mit Arraykopie als Instanzvariable.
* Warum auch immer man die Länge eines Arrays nochmal in einer Variable speichern muss ...
* `lowerIndex + (higherIndex - lowerIndex) / 2` - I love it! Nicht mal Ausmultiplizieren können die Leute heute noch...
* `i`, `j` und motherfucking `k` ...
* Zwei Schleifen statt einer.
* Wieder `if (lowerIndex < higherIndex)` statt einem sauberen `return`.

#### [Javabeginners](https://javabeginners.de/Algorithmen/Sortieralgorithmen/Mergesort.php)

* Methoden sind nicht `static`.
* `sort` übernimmt keinen Array als Argument, gibt aber einen Array zurück.
    Wie soll ich diese Methode verwenden?

    ```java
    Mergesort.intArr = new int[]{5, 4, 3, 2, 1};
    int[] sorted = new MergeSort().sort(0, Mergesort.intArr.length);
    ```

    Seriously?
    Das dürfte das bescheuertste Interface für einen Sortieralgorithmus sein, das ich bisher gesehen habe - und ich schaue mir regelmäßig Code von Erst- und Zweitsemestern an!
    Besonders toll: Der Rückgabetyp suggeriert, dass ein neues Array erzeugt würde, was aber gar nicht der Fall ist.
* `if (l < r)` statt sauberem `return`.
* Hier haben wir die bisher härteste unnötige Optimierung.

    ```java
    for (j = q + 1; j <= r; j++) {
      arr[r + q + 1 - j] = intArr[j];
    }
    ```
    Ist klar, oder?
    Nicht?
    Lass uns das kurz einmal umschreiben:

    ```java
    for (j = middle; j < right; j++) {
        j0 = j - middle;
        arr[right - j0] = intArr[j];
    }
    ```

    Mit `middle = q + 1` und `right = r` haben wir hier den gleichen Code.
    Der ist zwar immer noch kompliziert, aber jetzt erkennt man wenigstens, dass hier der rechte Teilarray *rückwärts* in den temporären Array `arr` kopiert wird.
    Damit kann man sich dann in der Merge-Schleife die Abfrage sparen, ob noch Elemente im linken oder rechten Teilarray sind.
    Wenn das linke Array zuerst durchlaufen wird, springt der linke Index `i` auf das *größte* Element des rechten Arrays `arr[middle + 1]`.
    Daher wird die Abfrage `arr[i] <= arr[j]` so lange `false` bleiben, bis auch das rechte Teilarray komplett durchlaufen wurde.
    Anders herum gilt das gleiche, da der rechte Index `j` von rechts nach links läuft und damit beim größten Element des *linken* Arrays anhält.

    Ich will nicht lügen: Ich musste selbst auch einige Minuten lang konzentriert den Code analysieren, bevor ich diesen erklärenden Text schreiben konnte.

    Kleines Schmankerl: so viel Arbeit, um eine zusätzliche Abfrage in der Schleife zu sparen und dann kopiert der Autor trotzdem den *gesamten* Array in jedem Merge-Schritt, auch dann, wenn er nur eine Kopie von zwei Elementen braucht?
    Wirklich tolle Optimierungskünste!
    Das verschlechtert sogar die Effizienzklasse von O(n log n) auf O(n²). :man_facepalming:
* `i`, `j` und `k` sind besonders lustig, wenn ein Index davon auch noch während seiner Lebensdauer die Zählrichtung ändert.

#### [Dieses beliebige Gist vom Github-User Cocodrips](https://gist.github.com/cocodrips/5937371)

* Ok, hier müssen wir langsam Aufhören. Hier fehlt sogar die Klassendeklaration.
* Händisches Kopieren von Arrays.
* Zwei Schleifen statt einer.
* Methoden sind nicht `static` und dann auch noch package private. :scream:
* `if (low < high)` statt sauberem `return`.
* Auch diese\*r Kandidat\*in schießt sich mit der Effizienzklasse ab und landet in O(n²).

Wenn man sich die vier Beispiele so anschaut, bekommt man übrigens durchaus den Eindruck, dass die Hauptquellen für Plagiate auch untereinander tüchtig abgeschrieben haben. :wink:

## Dritte Regel des Plagiierens: Lies die verdammte Aufgabenstellung!

Wie, noch mehr Lesen?
Ja, Lesen hilft.
Die Deutschnote ist laut einer [didaktischen Studie](http://publikationen.ub.uni-frankfurt.de/frontdoor/index/index/docId/46847) ein ähnlich guter Prädiktor für den Erfolg im Informatikstudium wie die Note in Mathe oder Informatik.
Vielleicht, weil man Aufgabenstellungen erst einmal *lesen* können muss, bevor man sie lösen kann?

Was meine ich damit? Meistens ist sich die Person, die die Aufgabe gestellt hat, völlig bewusst, dass es im Internet hunderte verschiedene Mergesort-Implementierungen in Java zum Download gibt.
Die einfachste Lösung für das Problem ist es, kleine "Fallen" in die Aufgabenstellung einzubauen, sodass eine 1:1-Kopie eben nicht ausreicht.

Meistens handelt es sich dabei um Veränderungen, bei denen man Methodenaufrufe zählen oder eine Laufzeitmessung unternehmen muss.
(*Protip: Das Kopieren von exakten bis auf die Millisekunde identischen Laufzeiten ist ziemlich auffällig - ganz besonders dann, wenn auch noch Zeiten von einem Testfall aus dem Vorsemester aufgeschrieben werden, der in diesem Semester gar nicht mehr verlangt wird.*)

Die versprochene Variante, die Du weiter unten in diesem (zugegebenermaßen viel zu langen) Post findest, kann mit den meisten Änderungen dieser Art super umgehen.
Wenn das nichts hilft, musst Du eben doch Hand an den kopierten Code anlegen.
In der Regel sind auch nur ein paar Zeilen an der richtigen Stelle nötig (am Anfang oder Ende der Methoden).
Ein ganz klein wenig musst Du dafür aber schon kapieren, was die Methoden eigentlich machen.
Und das führt uns zum nächsten Punkt.

## Vierte Regel des Plagiierens: Wer gut plagiieren kann, braucht es eigentlich nicht.

Und wer es nicht gut kann, dem bringt es auch nichts, weil es nämlich sowieso auffliegt.
Das ist die traurige (oder aus Dozent\*innensicht tröstliche) Realität.

Ich schildere hier einmal, was es aus meiner Sicht braucht, um bei einem Plagiat wirklich sicher zu sein:
Der Code darf nicht 1:1 kopiert sein - auch nicht in größeren Teilen.
Das fällt sofort auf.
Ein einfaches Umbenennen von Variablen reicht auch nicht.
Variablennamen sind im Kopf des oder der Dozent\*in sowieso austauschbar und es gibt sehr zuverlässige [Plagiatssoftware](https://theory.stanford.edu/~aiken/moss/), die ebenfalls Namen ignoriert.
Das gleiche gilt auch für das Vertauschen von Zeilen, deren Reihenfolge unwichtig ist.
Entweder musst Du also wirklich einen Teil des Programms, den Du gut genug verstehst, nach deinem eigenen Stil neu schreiben, oder Du musst Code kopieren, der wirklich keine unnötigen oder stilistisch auffälligen Passagen besitzt - eben Code, bei dem es wirklich glaubhaft ist, dass zwei Studierende auf genau die gleiche Idee gekommen sind.
In letzterem Fall wird aber trotzdem die Plagiatssoftware oder der Spinnensinn des oder der Dozent\*in anschlagen.
In so einem Fall entscheiden wir normalerweise danach, ob der oder die Student\*in in der Lage ist, den Code zu erklären.

Unter dem Strich heißt das also, dass Du den Code entweder gut genug verstehen musst, um wesentliche Teile davon abzuändern, oder um ihn im Gesamten zu erklären.
Wenn Du das nicht kannst, ist das Risiko sehr hoch, dass das Plagiat auffällt und Du echte Probleme für Dein weiteres Studium bekommen kannst.
Wenn Du das aber kannst, dann behaupte ich an dieser Stelle einfach einmal, dass Du es auch schaffst, eine eigene Lösung für die Aufgabe zu schreiben, ohne zu plagiieren.

Was bleibt Dir also noch übrig, wenn das eben doch nicht der Fall ist?
Ich sehe drei mögliche Lösungen:

* Du setzt dich doch noch einmal an Deinen eigenen Code und versuchst mit Hilfe von Google, dem [Debugger deiner IDE](https://www.jetbrains.com/help/idea/debugging-your-first-java-application.html), der Hilfe eine\*r Kommiliton\*in und/oder meinen [nachfolgenden Tipps](#hilfe-zur-selbsthilfe) Deine Bugs zu beheben.
    Vielleicht hilft es sogar, einfach alles wegzuwerfen und noch einmal ganz von vorne anzufangen.
* Du lehnst Deine Lösung stark an eine der Internetlösungen an und weist im Code offen darauf hin (z.B. `\* Idee von http://arbitrary-but-fixed.net/... \*`).
    Damit handelt es sich um ein Zitat und kein Plagiat.
    Es kann sein, dass Du dafür weniger oder gar keine Punkte bekommst, weil es nicht Deine eigene Leistung ist, aber es kann nicht zu schlimmeren Folgen (Nichtbestehen des Arbeitsblattes, Eintrag in der Akte, Exmatrikulation) kommen.
* Du gibst eine unfertige Lösung ab.
    Dozent\*innen und Tutor\*innen sind keine Monster.
    Wir geben so viele Teilpunkte, wie wir irgendwie rechtfertigen können.
    Es muss nicht immer alles perfekt sein.

## Hilfe zur Selbsthilfe

Warum funktioniert jetzt also Deine eigene Mergesort-Implementierung nicht?
Das ist natürlich schwer zu sagen.
Vor allem ist das aber erst einmal ganz normal.
Mergesort gehört zu einem der ersten "größeren" Algorithmen, die man im Studium implementiert.
Da ist es nur logisch, dass man zu diesem Zeitpunkt noch kein Experte im Debuggen ist.

Daher habe ich hier ein paar Tipps zusammengetragen, die der eigenen Lösung vielleicht doch noch zum Durchbruch verhelfen können.

* **Du hast einen `StackOverflowError`?**
    Dann ist die Abbruchbedingung deiner Rekursion nicht vorhanden oder kaputt.
* **Du hast eine `ArrayIndexOutOfBoundsException`?**
    Dann gnade Dir [James Gosling](https://en.wikipedia.org/wiki/James_Gosling). :laughing:
    Diese Ausnahme kann viele Gründe haben, heißt aber immer, dass irgendwo eine Indexberechnung schief gegangen ist - vermutlich bei der oberen Grenze für den rechten Index oder den Gesamtindex in `merge`.
    Hier hilft vor Allem systematisches Debuggen: Such Dir einen möglichst einfachen Testfall, in dem das Problem auftritt, und verfolge Schritt für Schritt, was Dein Algorithmus tut und was eigentlich passieren sollte - notfalls auch mit Zettel und Stift.
    Beschränke dich zuerst nur auf einen einzelnen Aufruf von `merge` und teste den Aufruf von `sort` erst, wenn Du Dir sicher bist, dass `merge` sauber funktioniert.
* **Der Algorithmus hängt in einer Endlosschleife?**
    Dafür sind in der Regel nur `while`-Schleifen verantwortlich, deren Abbruchbedingung eben nie erfüllt wird.
    `for`-Schleifen sind als Schuldige unwahrscheinlicher, weil man dort meistens schon beim ersten Blick auf den Schleifenkopf merkt, wenn etwas verkehrt läuft.
    Rekursive Aufrufe *können* theoretisch auch eine Endlosschleife fabrizieren, aber dabei ist es viel wahrscheinlicher, einen `StackOverflowError` zu erzeugen (ich habe einmal so eine "Endlosschleife" gebaut, indem ich aus versehen beim ersten rekursiven Aufruf von `sort` immer bei `0` angefangen habe statt bei `from`).
* **Der Algorithmus läuft durch, sortiert aber nicht richtig?**
    Meistens liegt das daran, dass die Teilarrays `left` und `right` sich in Deiner Implementierung aus Versehen überlappen - zum Beispiel weil der Index `middle` auch zu `left` mit dazugezählt wird und nicht nur zu `right`.
    Eventuell kann hier irgendwo ein `+1` oder `-1` Wunder wirken.
    In jedem Fall aber gilt wie im vorherigen Fall: systematisches Debuggen an möglichst kleinen Beispielen mit möglichst wenig Methodenaufrufen.

Zum Abschluss hier noch zwei Beispiele, die man schnell auf dem Papier aufschreiben und dann im eigenen Code Schritt für Schritt mit Debugger oder Print-Anweisung nachvollziehen kann:

* Für `sort` kannst Du das Beispiel aus dem Anfang dieses Posts nehmen.
    Ich gehe dabei davon aus, dass Du den Aufruf `merge(ar, left, middle, right)` auch so definiert hast, dass der linke Teilarray von `left` bis `middle-1` läuft und der rechte von `middle` bis `right-1`.
    Wenn das der Fall ist, dann muss das Sortieren des Arrays `{5, 4, 3, 2, 1}` die folgende Sequenz von `merge`-Aufrufen produzieren:

    ```java
    merge(input, 0, 1, 2);
    merge(input, 3, 4, 5);
    merge(input, 2, 3, 5);
    merge(input, 0, 2, 5);
    ```

    Wenn das der Fall ist, liegt das Problem bei `merge` und nicht bei `sort`.
* Für `merge` schauen wir uns das Array `{5, 1, 4, 2, 3, 0}` an.
    Wenn wir `merge(input, 1, 3, 5)` aufrufen, sollten die Teilarrays `{1, 4}` und `{2, 3}` zu `{1, 2, 3, 4}` kombiniert werden und die `0` und die `5` sollten unverändert am Anfang bzw. Ende stehen bleiben.
    Um zu prüfen, ob das wirklich passiert, schreiben wir uns einfach in einer Tabelle auf, welche Werte die wichtigen Variablen nach jedem Durchlauf der Schleife in `merge` haben müssen:

     ```text
     i  left_index   right_index   ar
     -           0             0   {5, 1, 4, 2, 3, 0}
     1           1             0   {5, 1, 4, 2, 3, 0}
     2           1             1   {5, 1, 2, 2, 3, 0}
     3           1             2   {5, 1, 2, 3, 3, 0}
     4           2             2   {5, 1, 2, 3, 4, 0}
     ```

     Wenn das bei Dir genauso aussieht (oder entsprechend zu deiner Definition der Variablen), dann liegt das Problem bei `sort` und nicht bei `merge`.
* Sollten beide der obigen Tests für deinen Code funktionieren, kann es sein, dass du einen Fehler hast, der erst bei größeren Arrays oder einer bestimmten Zahlenreihenfolge auftritt.
     Wiederhole sie also einfach mit einem etwas größeren Array und/oder mit anderen Zahlen.

## Bonus: Die Königin der Mergesort-Plagiate

Hier wie versprochen der Code, der sich wunderbar auf alle Anforderungen von Dozen\*innen anpassen lässt (gerne auch wieder als [ausführbares JAR-Archiv](/assets/code/mergesort_listener.jar)):

```java
package net.arbitrary_but_fixed.mergesort;
import java.util.Arrays;

public class ListenerMergesort {
    public interface MergesortListener {
        default void callMerge(int[] ar, int from, int middle, int to) {}
        default void exitMerge(int[] ar, int from, int middle, int to) {}
        default void mergeStep(int i, int l, int r, int[] ar) {}
        default void callSort(int[] ar, int from, int to) {}
        default void exitSort(int[] ar, int from, int to) {}
    }
    public static void sort(int[] ar) {
        sort(ar, new MergesortListener(){});
    }
    public static void sort(int[] ar, MergesortListener listener) {
        sort(ar, 0, ar.length, listener);
    }
    public static void sort(
            int[] ar, int from, int to, MergesortListener listener
    ) {
        listener.callSort(ar, from, to);
        int remaining_length = to - from;
        // subarrays of size 1 and 0 cannot be unsorted
        if (remaining_length <= 1) { listener.exitSort(ar, from, to); return;}
        int middle = (from + to) / 2;
        sort(ar, from, middle, listener);
        sort(ar, middle, to, listener);
        merge(ar, from, middle, to, listener);
        listener.exitSort(ar, from, to);
    }
    public static void merge(
            int[] ar, int from, int middle, int to, MergesortListener listener
    ) {
        listener.callMerge(ar, from, middle, to);
        int[] left = Arrays.copyOfRange(ar, from, middle);
        int[] right = Arrays.copyOfRange(ar, middle, to);
        int left_index = 0;
        int right_index = 0;
        for(int i = from; i < to; i++) {
            boolean more_left = left_index < left.length;
            boolean more_right = right_index < right.length;
            boolean left_smaller = more_left && more_right
                                 && left[left_index] < right[right_index];
            if (!more_right || left_smaller) {
                ar[i] = left[left_index];
                left_index++;
            } else {
                ar[i] = right[right_index];
                right_index++;
            }
            listener.mergeStep(i, left_index, right_index, ar);
        }
        listener.exitMerge(ar, from, middle, to);
    }
    public static void main(String[] args) {
        int[] input;
        if(args.length > 0) {
            input = Arrays.stream(args).mapToInt(Integer::parseInt).toArray();
        } else {
            input = new int[]{5, 4, 3, 2, 1};
        }
        // Test for sort, print call hierarchy and intermediary results
        sort(input, new MergesortListener(){
            int sortDepth = 0;
            public void callSort(int[] ar, int f, int t) {
                for(int i = 0; i < sortDepth; i++) {
                    System.out.print("\t");
                }
                System.out.println(String.format("sort(ar, %d, %d)", f, t));
                sortDepth++;
            }
            public void exitSort(int[] ar, int f , int t) {
                sortDepth--;
            }
            public void callMerge(int[] ar, int f, int m, int t) {
                for(int i = 0; i < sortDepth; i++) {
                    System.out.print("\t");
                }
                String msg = String.format("merge(ar, %d, %d, %d)", f, m, t);
                System.out.println(msg);
            }
            public void exitMerge(int[] ar, int f, int m, int t) {
                for(int i = 0; i < sortDepth; i++) {
                    System.out.print("\t");
                }
                System.out.println(Arrays.toString(ar));
            }
        });
        System.out.println();
        // Test for merge, print inner variables
        System.out.println("  i   l   r   ar");
        input = new int[]{5, 1, 4, 2, 3, 0};
        merge(input, 1, 3, 5, new MergesortListener() {
            @Override
            public void mergeStep(int i, int l, int r, int[] ar) {
                System.out.println(String.format(
                        "%3d %3d %3d   %s", i, l, r, Arrays.toString(ar)
                ));
            }
        });
    }
}
```

Eigentlich ist das der gleiche Code wie am Anfang, aber ich habe einen kleinen [Listener](https://sourcemaking.com/design_patterns/observer) eingebaut.

```java
public interface MergesortListener {
    default void callMerge(int[] ar, int from, int middle, int to) {};
    default void exitMerge(int[] ar, int from, int middle, int to) {};
    default void mergeStep(int i, int l, int r, int[] ar) {};
    default void callSort(int[] ar, int from, int to) {};
    default void exitSort(int[] ar, int from, int to) {};
}
```

Dieses Interface definiert unsere Listener-Objekte, die Code enthalten können, um auf die jeweiligen Events zu reagieren.
`callMerge` wird am Anfang der Methode `merge` aufgerufen, `exitMerge` an deren Ende.
Für `sort` gibt es ebenfalls entsprechende Methoden.
Zu guter Letzt habe ich noch die Methode `mergeStep` hinzugefügt, die nach jedem einzelnen Schleifendurchlauf in `merge` aufgerufen wird.

Jetzt kann man beim Aufruf von `sort` oder `merge` ein entsprechendes Objekt (in der Regel als [anonyme Klasse](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)) mitgeben, das eine oder mehrere dieser Methoden implementiert und mit deren Hilfe diagnostische Ausgaben erzeugt oder Statistiken errechnet.
Das [`default`](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) und der leere Methodenkörper `{}` in der Interfacedeklaration sorgen dafür, dass man nicht immer jede Methode implementieren muss, sondern nur die, die man auch mit Inhalt füllen möchte.
Vor Java 8 musste man dafür eine separate [Adapter-Klasse](https://stackoverflow.com/questions/10170698/what-is-an-adapter-class) schreiben.

Die `main`-Methode von `ListenerMergesort` zeigt, wie man mit diesem Pattern wunderschön die Aufrufhierarchie von `sort` und die Funktionsweise von `merge` nachverfolgen kann:

```text
sort(ar, 0, 5)
	sort(ar, 0, 2)
		sort(ar, 0, 1)
		sort(ar, 1, 2)
		merge(ar, 0, 1, 2)
		[4, 5, 3, 2, 1]
	sort(ar, 2, 5)
		sort(ar, 2, 3)
		sort(ar, 3, 5)
			sort(ar, 3, 4)
			sort(ar, 4, 5)
			merge(ar, 3, 4, 5)
			[4, 5, 3, 1, 2]
		merge(ar, 2, 3, 5)
		[4, 5, 1, 2, 3]
	merge(ar, 0, 2, 5)
	[1, 2, 3, 4, 5]

  i   l   r   ar
  1   1   0   [5, 1, 4, 2, 3, 0]
  2   1   1   [5, 1, 2, 2, 3, 0]
  3   1   2   [5, 1, 2, 3, 3, 0]
  4   2   2   [5, 1, 2, 3, 4, 0]
```

Wenn bei Dir die Aufrufreihenfolge anders aussieht, gibt es vermutlich ein Problem in `sort` (oder du hast die Grenzen der Array-Hälften anders definiert).
Wenn der untere Teil anders aussieht, gibt es ein Problem in `merge` (wie im [vorherigen Abschnitt](#hilfe-zur-selbsthilfe) erklärt).

*Protip: Wenn Du so einen Listener in Deinen eigenen Code implementierst, kannst Du damit vermutlich Deinen Bugs sehr viel leichter auf die Schliche kommen.*

## Bonus 2: "Schöne" Mergesorts

Dieser Post ist sowieso schon viel zu lang.
Da kann ich mir auch noch den Spaß machen, ein paar weitere Implementierungen von Mergesort zu präsentieren - nur um zu zeigen, wie man es auch noch machen könnte:

### Mergesort mit Sublist

Die folgende Variante sortiert keine Arrays, sondern Listen.
Das Schöne an ihr ist, dass sie sich der Methode [`subList(int, int)`](https://docs.oracle.com/javase/10/docs/api/java/util/List.html#subList(int,int)) des Interface `List` bedient, die eine *Ansicht* der Liste erzeugt.
So lange man nur nichtstrukturelle Änderungen an der Liste vornimmt (also keine Werte löscht oder hinzufügt), werden diese Änderungen auch in die ursprüngliche Liste übernommen.
Dadurch muss man sich noch weniger Gedanken um die Berechnung von Indices und Grenzen machen als sonst.

```java
package net.arbitrary_but_fixed.mergesort;

import java.util.ArrayList;
import java.util.List;

public class ListMergesort {
    public static <T extends Comparable<T>> void sort(List<T> lst) {
        if (lst.size() <= 1) return; // nothing to sort
        int half = lst.size()/2;
        List<T> left = lst.subList(0, half);
        List<T> right = lst.subList(half, lst.size());
        sort(left);
        sort(right);
        merge(new ArrayList<>(left), new ArrayList<>(right), lst);
    }
    public static <T extends Comparable<T>> void merge(
            List<T> left, List<T> right, List<T> total
    ) {
        int leftI = 0;
        int rightI = 0;
        for(int i = 0; i < total.size(); i++) {
            boolean more_left = leftI < left.size();
            boolean more_right = rightI < right.size();
            boolean left_smaller = more_left && more_right
                    && left.get(leftI).compareTo(right.get(rightI)) <= 0;
            if (!more_right  || left_smaller) {
                total.set(i, left.get(leftI));
                leftI++;
            } else {
                total.set(i, right.get(rightI));
                rightI++;
            }
        }
    }
}
```

Ähnlich wie bei der ursprünglichen Variante wird hier eine Kopie der linken und rechten Liste für den `merge`-Schritt erstellt.
Das geschieht in diesem Fall mit einem Copy-Konstruktor ([`new ArrayList<T>(left)`](https://docs.oracle.com/javase/10/docs/api/java/util/ArrayList.html#%3Cinit%3E(java.util.Collection))).
Außerdem sieht man hier schön die Macht des Comparable-Interfaces.
Diese Methode funktioniert fast genauso wie die mit Int-Arrays, kann aber alles sortieren, was [`Comparable`](https://docs.oracle.com/javase/10/docs/api/java/lang/Comparable.html) ist.

### Swap + Rev - Variante

Hier kommen wir ins Reich der Optimierungen.
Wie ich schon sagte müssen wir hier die [drei Regeln der Optimierung](http://wiki.c2.com/?RulesOfOptimization) beachten:

1. Lass es!
2. Lass es ... erstmal. (für Experten)
3. Mach vorher ein Profiling!

Wir ignorieren Regel eins und zwei vorerst, da es mir nur um ein akademisches Beispiel geht und da wir auch sowieso schon scheinbar optimierte Varianten vorliegen haben.
Stattdessen möchte ich aber noch eine vierte Regel hinzufügen, die sich auch in diesem Projekt für mich als sehr wichtig herausgestellt hat:

<ol start="4"><li>Teste jede Änderung mit einem Benchmark!</li></ol>

Wir beginnen also mit der neuen Regel vier und schauen uns an, welche der bestehenden Varianten denn überhaupt die schnellste ist und wie schlimm die Perfomance der sauberen verständlichen Lösung eigentich im Vergleich aussieht.
Dazu habe ich den [Java Microbenchmarking Harness (JMH)](http://openjdk.java.net/projects/code-tools/jmh/) verwendet, weil [Benchmarks in Java](https://www.oracle.com/technetwork/articles/java/architect-benchmarking-2266277.html) ein Minenfeld sind.

<div class="bokeh-container"><script src="/assets/img/benchmark.js" id="f2085ffb-169c-45a3-b489-590df01e8d85"></script></div>

Und hier sieht man das Ergebnis von sinnlosem herumoptimieren.
Javabeginners und Cocodrips schießen sich sofort ins Aus, weil ihre Implementierungen durch einen dummen Fehler in O(n²) statt in O(n log n) liegen.
Alle anderen Implementierungen hängen erst einmal auf einem Klumpen.
Ich habe den Plot (mit [Bokeh](http://bokeh.pydata.org)) so gebaut, dass man mit dem Mausrad hineinzoomen kann.
Den Vergleich sieht man aber auch noch ein wenig besser, wenn man den Plot anders aufbaut.
Rufen wir uns kurz in Erinnerung, was die O-Notation bedeutet: Algorithmen in der gleichen Effizienzklasse unterscheiden sich (asymptotisch) nur durch einen konstanten Faktor.
Wir können uns also diesen Faktor einfach für alle O(n log n)-Implementierungen ansehen.

<div class="bokeh-container"><script src="/assets/img/factor.js" id="53d8be46-466e-4da8-9de0-4f7410cc456e"></script></div>

Hier sehen wir, dass meine lesbare Variante zwar tatsächlich die langsamste ist, aber die beste Variante (vogella) ist bei großen Arrays nur um den Faktor 1,28 schneller, was für die meisten Anwendungen vernachlässigbar sein dürfte.
Ich habe mich hier auf Tests mit Arrays mit zufälligem Inhalt beschränkt, weil das der "Standardfall" für das Sortieren ist.
Für aufsteigend oder absteigend sortierte Arrays sind die Unterschiede deutlich stärker ausgeprägt (Faktor 3,4 bzw. 1,8).
Das liegt daran, dass hier die innere Schleife schneller bearbeitet werden kann, wodurch der Overhead für die Arbeitskopien im Verhältnis stärker zu Buche schlägt.

Was können wir also herauskitzeln, wenn wir wirklich so schnell wie möglich werden wollen?
Ein schnelles Profiling (wieder mit JMH) zeigt, dass wir die meiste Zeit in der inneren Schleife in `merge` verbringen, aber auch einige Zeit durch die Garbage-Collection der Arbeitskopien verlieren.
Die folgende Variante nimmt sich dieser Probleme an und schafft ziemlich ordentliche Geschwindigkeiten ohne *allzu* unleserlich zu werden:

```java
package net.arbitrary_but_fixed.mergesort;

import java.util.Arrays;
import java.util.Random;

public class MergesortSwapRevIns {
    public static void sort(int[] ar) {
        sort(ar, 60); // determined by benchmarks => best speedup
    }
    public static void sort(int[] ar, int minSize) {
        sort(Arrays.copyOf(ar, ar.length), ar, 0, ar.length, true, minSize);
    }
    public static void sort(
            int[] src, int[] dst, int from, int to,
            boolean orderAsc, int minSize
    ) {
        if(to - from <= minSize) {
            InsertionSort.sort(dst, from, to, orderAsc);
            return;
        }
        int middle = (from + to) / 2;
        sort(dst, src, from, middle, true, minSize);
        sort(dst, src, middle, to, false, minSize);
        merge(src, dst, from, to, orderAsc);
    }
     public static void merge(
            int[] src, int[] dst, int from, int to, boolean orderAsc
    ) {
        int l = from;
        int r = to - 1;
        if (orderAsc) { // sort ascending
            for(int i = from; i < to; i++) {
                if (src[l] <= src[r]) {
                    dst[i] = src[l++];
                } else {
                    dst[i] = src[r--];
                }
            }
        } else { // sort descending
            for(int i = to-1; i >= from; i--) {
                if (src[l] <= src[r]) {
                    dst[i] = src[l++];
                } else {
                    dst[i] = src[r--];
                }
            }
        }
    }
}
```

Hier werden im Wesentlichen drei Tricks kombiniert:

1. Es wird ganz zu Beginn eine einzige Kopie des Input-Arrays erstellt.
    Beim ersten Aufruf von `sort` wird am Ende von der Kopie als Quelle (*source*, `src`) in das Original als Ziel (*destination*, `dst`) gemerged.
    Damit das funktioniert, müssen die zwei rekursiven Aufrufe aber ihr Ergebnis in `src` schreiben - die Rolle von Quelle und Ziel wird also vertauscht.
    Dieses Vertauschen geht so lange weiter bis wir die Rekursion vollständig aufgelöst haben.

    Durch diese Technik sparen wir uns den Code zum Kopieren der Arrayinhalte in `merge` und damit auch den Overhead vom Garbage-Collector.
    Ich habe mir diesen Trick nicht selbst ausgedacht, sondern bin irgendwo im Internet bei meinen Recherchen darüber gestolpert.
    Leider weiß ich aber nicht mehr wo.
    Wer mir da also helfen kann, der schickt mir bitte eine Mail, damit ich die Quelle hier ergänzen kann (Hat schon was ironisches in einem Post über Plagiate, oder? :sweat_smile:).
2. Die Grundidee von [Javabeginners](https://javabeginners.de/Algorithmen/Sortieralgorithmen/Mergesort.php) war gar nicht verkehrt.
    Das umgekehrte Kopieren der rechten Hälfte dient uns gewissermaßen als [Sentinel](https://en.wikipedia.org/wiki/Sentinel_value), der uns zwei Vergleiche in der inneren Schleife einspart.
    Da wir mit der Swap-Variante aus dem ersten Punkt aber schon alle Kopien vermieden haben, würden wir ja jetzt wieder Zusatzaufwand für das Umkehren der rechten Hälfte verbrauchen - Es sei denn, wir schreiben die Inhalte einfach schon in der richtigen Reihenfolge.
    Dazu habe ich einen weitereren Parameter `sortAsc` eingeführt (`true` steht für aufsteigendes Sortieren, `false` für absteigendes).
3. Bei der Diskussion über Sortieralgorithmen in Büchern und im Internet hört man oft, dass [Insertionsort](https://www.khanacademy.org/computing/computer-science/algorithms/insertion-sort/a/insertion-sort) für sehr kleine Arrays (deutlich weniger als 100 Elemente) schneller ist, als die komplizierteren rekursiven Algorithmen, weil er eben keinen Overhead durch rekursive Methodenaufrufe hat und sich außerdem durch eine sehr kompakte innere Schleife auszeichnet.
    Darum stoppt in dieser Variante die Rekursion bei Teilarrays der größe 60 und diese kleinen Reste werden mit Insertionsort sortiert.

Mit diesen drei Tricks erreichen wir einen Speedup-Faktor von 1,83, haben alle der Internetvarianten überholt und der Code ist (mit den entsprechenden Erklärungen) immer noch einigermaßen lesbar.

### Iterative Variante

Die folgende Variante von Mergesort funktioniert iterativ.

```java
package net.arbitrary_but_fixed.mergesort;
import java.util.Arrays;

// wir verwenden die merge-Methode aus der ersten Variante
import static net.arbitrary_but_fixed.mergesort.Mergesort.merge;

public class MergesortIterative {
    public static void sort(int[] ar) {
        for(int mergeSize = 2; mergeSize / 2 < ar.length; mergeSize *= 2) {
            for(int start = 0; start < ar.length; start += mergeSize) {
                merge(
                        ar, start,
                        Math.min(ar.length, start + mergeSize / 2),
                        Math.min(ar.length, start + mergeSize)
                );
            }
        }
    }
}
```

Sie sortiert das Array erst in Zweierblöcken, dann in Viererblöcken, dann in Achterblöcken und so weiter, bis die Blockgröße die Gesamtgröße des Arrays erreicht hat.
Interessanterweise bringt das in diesem Fall keinerlei Performancevorsprung vor den rekursiven Varianten - selbst wenn man die bereits erwähnten Performance-Tricks mit einführt.
Ich habe sie nur aufgeführt, um noch einmal eine ganz andere Variante zu zeigen und weil die Idee für die letzte Variante interessant ist.

### Mergesort auf Steroiden

Seht her, mein hochgezüchtetes Monstrum:

```java
package net.arbitrary_but_fixed.mergesort;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static net.arbitrary_but_fixed.mergesort.MergesortSwapRevIns.merge;

public class MergesortOnSteroids {
    private static class MergeRunner implements Runnable {
        int[] src;
        int[] dst;
        private int mergeSize;
        private int fromTask;
        private int toTask;

        public MergeRunner(int[] src, int[] dst, int mergeSize, int fromTask, int toTask) {
            this.src = src;
            this.dst = dst;
            this.mergeSize = mergeSize;
            this.fromTask = fromTask;
            this.toTask = toTask;
        }

        @Override
        public void run() {
            for(int i = fromTask; i < toTask; i++) {
                int from = i * mergeSize;
                merge(
                        src, dst, from,
                        Math.min(src.length, from + mergeSize / 2),
                        Math.min(src.length, from + mergeSize),
                        i % 2 == 0
                );
            }
        }
    }
    private static class InsertionRunner implements Runnable {
        int[] ar;
        int from;
        int to;
        int step;

        public InsertionRunner(int[] ar, int from, int to, int step) {
            this.ar = ar;
            this.from = from * step;
            this.to = to * step;
            this.step = step;
        }

        @Override
        public void run() {
            for(int i = from; i < to; i += step) {
                InsertionSort.sort(ar, i, Math.min(ar.length, i + step), (i / step) % 2 == 0);
            }
        }
    }
    public static void sort(int[] ar) {
        sort(ar, 64); // 64 was determined via benchmarks => best speedup
    }
    public static int divCeil(int a, int b) {
        return a / b + (a % b == 0 ? 0 : 1);
    }
    public static void awaitAll(List<Future<?>> futures) {
        try {
            for(Future<?> f: futures) {
                f.get();
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("runner thread terminated abnormally", e);
        }
    }
    public static void sort(int[] ar, int minSize) {
        int threads = Runtime.getRuntime().availableProcessors();
        ExecutorService pool = Executors.newFixedThreadPool(threads);
        List<Future<?>> futures = new ArrayList<>(threads);
        int nSorts =  divCeil(ar.length, minSize);
        int sortsPerThread = divCeil(nSorts, threads);
        for(int i = 0; i < nSorts; i+= sortsPerThread) {
            InsertionRunner r = new InsertionRunner(ar, i, Math.min(i + sortsPerThread, nSorts), minSize);
            futures.add(pool.submit(r));
        }
        awaitAll(futures);
        int iterations = (int)Math.ceil(Math.log(nSorts)/Math.log(2));
        int[] src = ar;
        int[] dst = Arrays.copyOf(ar, ar.length);
        if (iterations % 2 == 1) {
            int[] tmp = src;
            src = dst;
            dst = tmp;
        }
        for(int mergeSize = minSize * 2; mergeSize / 2 < ar.length; mergeSize *= 2) {
            int nMerges = divCeil(ar.length, mergeSize);
            futures.clear();
            int mergesPerThread = divCeil(nMerges, threads);
            for(int i = 0; i < nMerges; i+= mergesPerThread) {
                MergeRunner runner = new MergeRunner(src, dst, mergeSize, i, Math.min(i + mergesPerThread, nMerges));
                futures.add(pool.submit(runner));
            }
            awaitAll(futures);
            // switch source and destination
            int[] tmp = src;
            src = dst;
            dst = tmp;
        }
        pool.shutdown();
    }
}
```

Diese Mergesort-Variante bezieht ihre Energie aus der [dunklen Dimension von Dormamu](http://marvelcinematicuniverse.wikia.com/wiki/Dormammu).
Nein, nicht wirklich.
Aber sie ist das was passiert, wenn man aus Macht- bzw. Performancegier die Lesbarkeit völlig über Bord wirft.
Die Steroidvariante verbindet die drei bereits erwähnten Performancetricks mit dem Aufbau der iterativen Variante, um den Algorithmus möglichst gut zu parallelisieren.
In jeder Iteration wird das Array wieder in Blöcke gleicher größe geteilt und diese Blöcke werden mit Hilfe eines [`ExecutorService`s](https://docs.oracle.com/javase/10/docs/api/java/util/concurrent/ExecutorService.html) gleichmäßig auf mehrere Threads verteilt.
Per Default entspricht die Anzahl der Threads der Anzahl der Prozessoren des Systems.
Danach wartet der Hauptthread bis alle Teilprobleme gelöst wurden, um dann die Blockgröße zu verdoppeln und die Threads für die nächste Runde zu starten.
Damit erreichen wir auf einem i7-Prozessor einen Speedup-Faktor von 6,75.

### Fazit zur Optimierung

Ich habe versprochen, dass ich noch einmal auf die erste Regel der Optimierung eingehe.
Dazu möchte ich einfach ohne große Worte unsere bisher besten Varianten mit der Standardimplementierung von `Arrays.sort` bzw. `Arrays.parallelSort` vergleichen:

<div class="bokeh-container"><script src="/assets/img/api.js" id="59b1f3a8-f001-4c73-9f70-61caed47e31a"></script></div>

Wir sehen also, all die Mühe hat am Ende rein gar nichts für praktische Zwecke gebracht.
Die Implementierung in der Standardbbliothek ist immer noch wesentlich schneller.
Im single-threaded Fall liegt das hauptsächlich daran, dass ein [anderer Algorithmus](https://docs.oracle.com/javase/10/docs/api/java/util/Arrays.html#sort(int%5B%5D)) verwendet wird, [an dem die Autoren bis heute noch weiter arbeiten](http://mail.openjdk.java.net/pipermail/core-libs-dev/2018-January/051000.html).
Es handelt sich hier um einen Dual-Pivot-Quicksort, der aber auch wieder für kleinere Teilprobleme einen Insertionsort aufruft.
Im parallelisierten Fall wird (ab einer ausreichenden Problemgröße) zwar auch ein [merge-basierter Algorithmus](https://docs.oracle.com/javase/10/docs/api/java/util/Arrays.html#parallelSort(int%5B%5D)) verwendet, aber hier kommen viele weitere kleine Optimierungen zum Tragen, die den Code für Laien völlig unleserlich machen.
Für aufsteigend oder absteigend sortierte Arrays sieht der Fall übrigens noch einmal krasser aus.
Hier ist die API wegen zusätzlicher Optimierungen für genau solche Fälle ca. 20 mal so schnell wie unsere besten Implementierungen.
Es bleibt also beim Thema der Optimierung für uns Normalsterbliche bei der ersten und wichtigsten Regel: **Lass es!**