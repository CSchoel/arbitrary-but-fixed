---
layout: post
title:  "Unit tests for JShell code with the jdk.jshell module"
description: >
    Using the jdk.jshell module of the java API it is possible to evaluate jshell code from a normal java application.
    I did this to build a JUnit test for an e-learning platform and encountered some interesting quirks and an actual bug in the API.
date:   2018-10-14 15:07 +0100
categories:
    - teaching java jshell
---



Stack trace of JShell exception has wrong line number

For some multiline snippets the JShell produces the wrong line number in
the stack trace. This can either be observed directly in the JShell or
in EvalExceptions obtained by an instance of the class jdk.jshell.JShell.

Open a jshell console and type the following code

jshell> if (true) {
   ...>   int x = 10;
   ...>   int y = 10 / 0;}
|  java.lang.ArithmeticException thrown: / by zero
|        at (#1:1)

My original example was a snippet from a larger file which had leading
newlines (see test case below): "\n\nint y = 10 / 0;"


The exception should be reported on line 3 of this snippet.

For example, the following code works as expected:

jshell> if (true) {
   ...>   int x = 10;
   ...>   int y = 10 / 0;
   ...> }
|  java.lang.ArithmeticException thrown: / by zero
|        at (#2:3)

The only difference in this example is the additional line break before
the closing brace. However, beyond this example I could not identify any
pattern which code leads to errors and which does not.

The exception is reported on line 1 instead of line 3.

import jdk.jshell.JShell;
public class EvalLines {
    public static void main(String[] args) {
        JShell shell = JShell.create();
        shell.eval("\n\nint y =
10/0;").get(0).exception().printStackTrace();
        System.out.println("-----");
        System.out.println(shell.snippets().findFirst().get().source());
        System.out.println("-----");
    }
}


internal review ID : 9057623