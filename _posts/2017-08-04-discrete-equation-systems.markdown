---
layout: post
title:  "Discrete equation systems in OpenModelica"
date:   2017-08-03 16:51:28 +0200
categories: jekyll update
---

## The Problem

When you compile the following model, the OMC will fail with the message `Sorry - Support for Discrete Equation Systems is not yet implemented`.

    model DiscreteEqMinimal
      Real last(start=1, fixed = true);
    equation
      when time > last + 1 then
        last = time;
      end when;
    end DiscreteEqMinimal;

The context in which I originally encountered this error was the introduction of a refractory period. I needed a way to express that a signal would only be passed along if a certain amount of time had passed since the last signal.

### Why does it fail?

The interesting part of this Model is, of course, the `when`-equation.

    when time > last + 1 then
      last = time;
    end when;

What is interesting about this equation is that the condition for the event is based on the value of the variable `last`, which is also the variable that is changed inside the when statement.

Why could this be a problem? Well, basically we have created an event that invalidates itself. Remember that Modelica has no notion of an *assignment* of a variable. Equations are mathematical constructs and mathematically speaking a condition that does not hold anymore right at the moment when it becomes true is somewhat of a contradiction, right?

## The Solution

The solution to this problem is painfully simple, considering that I did not find it for several months and used an ugly workaround additional continuous real variables instead (after all the compiler said that it could not handle *discrete* equation systems).

    when time > pre(last) + 1 then
      last = time;
    end when;

That is it. The simple use of `pre()` solves the ambiguous contradictory state because now there is a clear distinction between the value at the time when the event was triggered (`pre(last)`) and the new value that the variable will have after the event (`last`). The event does no longer invalidate itself, because even when the value of `last` is changed, the value of `pre(last)` stays the same.
