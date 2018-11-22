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

Liest Du immer noch weiter? Gut! Wenn Du bis zum Ende durchhaltest, gibt es unten noch ein Stück Code, dass sich perfekt auf die typischen Modifikationen anpassen lässt, die Dein Dozent vermutlich eingebaut hat, um Plagiate schwieriger zu machen. :wink:

## Erste Regel des Plagiierens: Einfachheit ist Trumpf!

Warum halte ich meinen obigen Code für besser als den von 

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