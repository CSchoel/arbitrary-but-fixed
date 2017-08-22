---
layout: post
title:  "Discrete equation systems in OpenModelica"
description: >
    When OpenModelica complains that "Support for Discrete Equation Systems is not yet implemented", your problem may have actually be that you don't distinguish properly between variable values before and after an event.
date:   2017-08-20 21:16:00 +0200
categories: jekyll update
---

## A bit of background

The first problem that I want to discuss in this blog deals with the implementation of mathematical models in the language [Modelica](http://modelica.org).

For my PhD thesis I reimplemented a mathematical model of the human heart in Modelica.
The problem occurred in the sinus node, the main pacemaker of the heart.
The sinus node triggers a contraction at a certain base frequency which can be increased or decreased by signals from the autonomic nervous system.
However, there is a threshold to this frequency which is given by the refractory period that has to pass before a new signal can be generated.

To implement this refractory period I therefore needed a way to express that a signal would only be passed along if a certain amount of time had passed since the last signal.


## The problem

My first attempt to implement this behavior was something along the lines of the following example.

```modelica
model DiscreteEqMinimal
  Real last(start=1, fixed = true);
equation
  when time > last + 1 then
    last = time;
  end when;
end DiscreteEqMinimal;
```

When you compile this model with the [OpenModelica](http://openmodelica.org) compiler, it fails with the message `Sorry - Support for Discrete Equation Systems is not yet implemented`.
The message is actually somewhat misleading, but let's first have a closer look at the problem.


### Why does it fail?

The interesting part of this Model is, of course, the `when`-equation.

```modelica
when time > last + 1 then
  last = time;
end when;
```

What is interesting about this equation is that the condition for the event is based on the value of the variable `last`, which is also the variable that is changed inside the when statement.

Why could this be a problem? Well, basically we have created an event that invalidates itself. Remember that Modelica has no notion of an *assignment* of a variable. Equations are mathematical constructs and mathematically speaking a condition that does not hold anymore right at the moment when it becomes true is somewhat of a contradiction, right?

## The solution

The solution to this problem is painfully simple, considering that I did not find it for several months and used an ugly workaround additional continuous real variables instead (after all the compiler said that it could not handle *discrete* equation systems).

```modelica
when time > pre(last) + 1 then
  last = time;
end when;
```

That is it. The simple use of `pre()` solves the ambiguous contradictory state because now there is a clear distinction between the value at the time when the event was triggered (`pre(last)`) and the new value that the variable will have after the event (`last`). The event does no longer invalidate itself, because even when the value of `last` is changed, the value of `pre(last)` stays the same.

## Lesson learned

As always, you have to think like a mathematician when building Modelica models, not as a computer scientist.
Events that are triggered by `when` can introduce discontinuities, but they do not invalidate the mathematical rules that a variable cannot have two values at the same time.
At an event there are always two states: The current state, right at the time of the event; and the previous state, an infinitesimal amount of time *before* the event.

So, if anything goes wrong in a `when`-equation, and especially if you encounter the aforementioned error message, ask yourself for each of your variables: Do you mean `x` or should it actually be `pre(x)`.