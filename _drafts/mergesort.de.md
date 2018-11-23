---
layout: post
title:  "Java Mergesort richtig plagiieren"
description: >
    If you plagiarze, you can at least do it properly! Most online examples for the mergesort algorithm in Java are much too complicated to be really understandable for a beginner. With this post I want to provide a better option - hopefully for understanding the algorithm, but at least for plagiarizing it.
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
Die meisten Beispiele, die man online findet, sind fehlerhaft oder viel zu kompliziert für einen Anfänger.

Aus einer Mischung von verzweifeltem Humor und leiser Hoffnung, vielleicht doch noch dem ein oder anderen zu helfen, diesen Algorithmus wirklich zu *versehen* habe ich mir daher vorgenommen, einmal zu zeigen wie man es (meiner Meinung nach) *richtig* macht - also sowohl das Plagiieren als auch die Implementierung von Mergesort als Java-Neuling.

So, und damit mir die potentiellen Plagiatoren jetzt nicht schon abspringen, gibt es hier fertig plagiierbaren Code.
Ein wunderschöner kompakter verständlicher Mergesort in Java - sogar [als ausführbares JAR-Archiv zum Downoad]():

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
        sort(ar, 0, middle);
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
            boolean left_smaller = more_left && more_right && left[left_index] < right[right_index];
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
        int[] input;
        if(args.length > 0) {
            input = Arrays.stream(args).mapToInt(Integer::parseInt).toArray();
        } else {
            input = new int[]{10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
        }
        sort(input);
        System.out.println(Arrays.toString(input));
    }
}
```

Liest Du immer noch weiter?
Gut! Wenn Du bis zum Ende durchhaltest, gibt es unten noch ein Stück Code, dass sich perfekt auf die typischen Modifikationen anpassen lässt, die Dein Dozent vermutlich eingebaut hat, um Plagiate schwieriger zu machen. :wink:

## Erste Regel des Plagiierens: Einfachheit ist Trumpf!

Warum halte ich meinen obigen Code für besser als den von [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/), [Vogella](http://www.vogella.com/tutorials/JavaAlgorithmsMergesort/article.html), [Baeldung](https://www.baeldung.com/java-merge-sort) oder [Java2Novice](http://www.java2novice.com/java-sorting-algorithms/merge-sort/)?
Zunächst einmal müssen wir klarstellen, was hier "besser" heißt: Mein Code ist nicht performanter oder wesentlich kürzer als andere Lösungen.
Ich habe aber versucht, ihn *verständlicher* für Java-Einsteiger zu schreiben.
(Und seien wir mal ehrlich: Für eine performante Version nehme ich eine fertige Library und [Code-Golf](https://en.wikipedia.org/wiki/Code_golf) führt selten zu schönen Lösungen.)

Die beste Möglichkeit, diese Einfachheit zu demonstrieren, ist aus meiner Sicht, den Code und damit den Algorithmus zu erklären.

### Erklärung: Sort und die Rekursion

Zur Auffrischung beginnen wir mit der Grundidee von Mergesort:

> Um eine Liste zu sortieren, teile sie in der Mitte, sortiere die linke Hälfte, sortiere die rechte Hälfte und füge beide sortierten Hälften zusammen (merge).

Diese rekursive Definition finden wir direkt im Code wieder:

```java
public static void sort(int[] ar, int from, int to) {
    // ...
    int middle = (from + to) / 2;
    sort(ar, 0, middle);
    sort(ar, middle, to);
    merge(ar, from, middle, to);
}
```

Warum funktioniert das?
Rekursion verbiegt auf den ersten Blick das Gehirn, aber es hilft enorm, wenn man sich einfach ganz ganz dumm stellt.
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
Das Sortieren von einer Zahl geht ziemlich schnell, denn wenn wir nur ein Element haben kann auch nichts unsortiert sein.
Für `sort(input, 0, 1)` müssen wir also rein gar nichts machen.
In unserem Beispiel erzeugt jetzt nur noch `sort(input, 3, 5)` einen weiteren rekursiven Aufruf, den wir auflösen müssen. (Weil hier noch die zwei Zahlen 2 und 1 zu sortieren sind.)

```java
int[] input = {5, 4, 3, 2, 1};
merge(input, 0, 1, 2);
// Auflösung von sort(input, 3, 5);
sort(input, 3, 4); // (3+5)/2 = 4
sort(input, 4, 5);
merge(input, 3, 4, 5);
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

Ich habe ersten Zeilen aus der Methodendefinition aus Platzgründen weggelassen.
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

> Füge den linken sortierten Bereich von `from` (inklusive) bis `middle` (exklusive) und den rechten sortierten Bereich von `middle` (inklusive) bis `to` (exklusive) zusammen, so dass am Ende der ganze Bereich von `from` (inklusive) bis `to` (exklusive) sortiert ist.

Dazu ist es erst einmal nötig, eine Arbeitskopie der zwei Bereiche zu erstellen, damit wir nicht teile des Arrays überschreiben, die wir danach aber gerne wieder im Ursprungszustand lesen würden:

```java
int[] left = Arrays.copyOfRange(ar, from, middle);
int[] right = Arrays.copyOfRange(ar, middle, to);
```

Wir könnten das zwar auch mit einer eigenen Schleife machen, aber warum sich den Aufwand machen und den Code zu verkomplizieren? Ein Hoch auf die Utility-Klassen [`Arrays`](https://docs.oracle.com/javase/10/docs/api/java/util/Arrays.html), [`Collections`](https://docs.oracle.com/javase/10/docs/api/java/util/Collections.html), [`Files`](https://docs.oracle.com/javase/10/docs/api/java/nio/file/Files.html) und Co!

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
Ich habe hier im Code absichtlich mehrere boolesche Variablen eingeführt, um die Bedingung selbst etwas lesbarer zu machen.

```java
boolean more_left = left_index < left.length;
boolean more_right = right_index < right.length;
boolean left_smaller = more_left && more_right && left[left_index] < right[right_index];
if (!more_right || left_smaller) {
    ar[i] = left[left_index];
    left_index++;
} else {
    ar[i] = right[right_index];
    right_index++;
}
```

Wir nehmen das linke Element entweder wenn es kleiner ist als das rechte (`left_smaller`), oder wenn überhaupt kein Element mehr auf der rechten Seite übrig ist (`!more_right`).
Natürlich ist die Frage, ob das linke Element kleiner als das rechte ist nur dann sinnvoll, wenn es auch auf beiden Seiten noch weitere Elemente gibt (`more_left` und `more_right`).

### Übliche Probleme

Wenn das ganze so einfach ist, warum bist Du dann überhaupt hier?
Vermutlich, weil die Theorie eben schnell erklärt und auch vermutlich verstanden ist, aber in der Praxis dann doch `ArrayIndexOutOfBoundsException`s und `StackOverflowError`s links und rechts an einem vorbeifliegen, wenn man sich an einer eigenen Implementierung versucht.
Das ist auch ganz normal.
Mergesort gehört zu einem der ersten "größeren" Algorithmen, die man im Studium implementiert.
Da ist es nur logisch, dass man zu diesem Zeitpunkt noch kein Experte im Debuggen ist.

Daher habe ich hier ein paar Tipps zusammengetragen, die der eigenen Lösung vielleicht doch noch zum Durchbruch verhelfen können.

* Du hast einen `StackOverflowError`?
    Dann ist die Abbruchbedingung deiner Rekursion nicht vorhanden oder kaputt.
* Du hast eine `ArrayIndexOutOfBoundsException`?
    Dann gnade dir James Gosling. :laughing:
    Diese Ausnahme kann viele Gründe haben, heißt aber immer, dass irgendwo eine Indexberechnung schief gegangen ist - vermutlich bei der oberen Grenze für den rechten Index oder den Gesamtindex in `merge`.
    Hier hilft vor Allem systematisches Debuggen: Such dir einen möglichst einfachen Testfall, in dem das Problem auftritt, und verfolge Schritt für Schritt, was dein Algorithmus tut und was eigentlich passieren sollte - notfalls auch mit Zettel und Stift.
    Beschränke dich zuerst nur auf einen einzelnen Aufruf von `merge` und teste den Aufruf von `sort` erst, wenn du dir sicher bist, dass `merge` sauber funktioniert.
* Der Algorithmus läuft durch, sortiert aber nicht richtig?
    Meistens liegt das daran, dass die Teilarrays `left` und `right` sich in Deiner Implementierung aus versehen überlappen - zum Beispiel weil der Index `middle` auch zu `left` mit dazugezählt wird und nicht nur zu `right`.
    Eventuell kann hier irgendwo ein `+1` oder `-1` Wunder wirken.
    In jedem Fall aber gilt wie im vorherigen Fall: Systematisches Debuggen an möglichst kleinen Beispielen mit möglichst wenig Methodenaufrufen.

### Lästereien

Jetzt muss ich aber noch ein wenig über die Lösungen meckern, die online zu finden sind und die immer wieder als Plagiate eingereicht werden:

#### [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)

* Kein normal denkender Mensch schreibt seine Arraytypen in C-style, wenn er Anfängern das Programmieren in Java beibringt.
    `int L[] = new int [n1];` ist syntaktisch korrekt, aber moralisch höchst fragwürdig.
* Arrays von Hand kopieren ist spätestens seit Java 1.6 nur noch Studierendenschikane und For-Schleifen ohne geschweifte Klammern sind grob fahrlässig.

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
* Der mitgelieferte JUnit-Test ist auch ein Paradebeispiel dafür, wie man einen JUnit-Test *nicht* schreiben sollte. `fail("Should not happen")` - Vielen Dank für die informative Fehlermeldung. :facepalm:
    Über die [Probleme mit der Zeitmessung](https://www.baeldung.com/java-jvm-warmup) im Test reden wir mal lieber gar nicht.
* Diese Implementierung hat einen Grund, warum die Methoden nicht `static` sind, aber keinen guten: Der Input-Array und seine Kopie werden als private Variablen mitgeschleift. :scream:
    Der Sinn dahinter ist auch hier wieder eine für den eigentlichen Zweck völlig unnötige Optimierung (weniger Array-Erzeugungen).
* Wieder ein `if (low < high)` statt einer sauberen Abbruchbedingung mit `return`.

#### [Baeldung](https://www.baeldung.com/java-merge-sort)

* `mergeSort` braucht die Länge des Arrays als Parameter?
    Das war aber in Java noch nie nötig. Da steckt noch jemand in C-Zeiten fest.
* `merge` hat viel zu viele unnötige Parameter, weil `mergeSort` ein paar Dinge tut, die `merge` eigentlich selbst tun sollte.
* Das übliche `i`/`j`/`k`-Debakel.
* `a[k++] = l[i++];` Kürzer als die anderen, aber nicht lesbarer.
    Für einen erfahrenen Programmierer mag das egal sein, aber ich behaupte für eine Erklärung für Anfänger ist es nicht klug, drei Zuweisungen in einer zu verstecken.
* Wieder drei Schleifen statt einer... hört endlich auf Beispielcode zu optimieren!

#### [Java2Novice](http://www.java2novice.com/java-sorting-algorithms/merge-sort/)

* In der `main`-Methode stimmt nicht mal die Einrückung.
* Unnötige Optimierung mit Arraykopie als Instanzvariable.
* Warum auch immer man die Länge eines Arrays nochmal in einer Variable speichern muss ...
* `lowerIndex + (higherIndex - lowerIndex) / 2` - I love it! Nicht mal Ausmultiplizieren können die Leute heute noch...
* `i`, `j` und motherfucking `k` ...
* Zwei Schleifen statt einer.
* Wieder `if (lowerIndex < higherIndex)` statt einem sauberen `return`.

Wenn man sich die vier Beispiele so anschaut bekommt man übrigens durchaus den Eindruck, dass die vier Hauptquellen für Plagiate auch untereinander tüchtig abgeschrieben haben. :wink:

## Zweite Regel des Plagiierens: Lies den Kram wenigstens!

## Dritte Regel des Plagiierens: Lies die verdammte Aufgabenstellung!

## Vierte Regel des Plagiierens: Wer gut plagiieren kann, braucht es eigentlich nicht.

Und wer es nicht gut kann, dem bringt es auch nichts, weil es nämlich sowieso auffliegt.

## Bonus: "Schöne" Mergesorts

```java
package net.arbitrary_but_fixed.mergesort;
public class Mergesort {
    public static <T extends Comparable> void sort(List<T> lst) {
        if (lst.size() <= 1) return; // nothing to sort
        int half = lst.size()/2;
        List<T> left = lst.subList(0, half);
        List<T> right = lst.subList(half, lst.size());
        sort(left);
        sort(right);
        mergeInto(new ArrayList<T>(left), new ArrayList<T>(right), lst);
    }
    public static <T extends Comparable> void merge(List<T> left, List<T> right, List<T> total) {
        int leftI = 0;
        int rightI = 0;
        for(int i = 0; i < total.size(); i++) {
            boolean more_left = leftI < left.size();
            boolean more_right = leftR < left.size();
            boolean left_smaller = more_left && more_right && leftI.compareTo(right) < 0;
            if (left_smaller || ! more_right) {
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