---
layout: post
title: 'The pitfalls of using proper SI units: Zero crossings in OpenModelica'
description: 'Using proper SI units without unit prefixes avoids order of magnitude
  errors and increases interoperability between models. However, they can also bring
  some pitfalls with them. In this post I explain how to avoid those in OpenModelica
  by paying special attention to zero crossings.

  '
categories:
- modelica
- dynamical systems
math: true
date: 2021-01-19 19:25 +0100
---
In light of my [recent post about pitfalls with using proper SI units in mathematical models]({{ site.baseurl }}{% link _drafts/si-units-pitfalls-nominal-values.md %}), I want to highlight another of these issues, which is probably specific to OpenModelica.
As mentioned in the previous post, it is indeed a very good idea to use SI units, preferrably without unit prefixes, in a mathematical model and Modelica provides excellent support for those with the [`Modelica.SIUnits` package](https://build.openmodelica.org/Documentation/Modelica.SIunits.html).
However, there are some peculiarities when one ventures beyond the kilo and the milli down to the pico or possibly even zepto.

## Why did the continuous variable cross the x-axis?

The title is not the beginning of a bad joke, I promise.
Suppose you are interested in the [current-voltage characteristic](https://en.wikipedia.org/wiki/Current%E2%80%93voltage_characteristic) of an electrical component.
More specifically, you want to observe the *maximum current* during a stimulation period for stimulations with different voltages.
A naive Modelica implementation of this may look as follows:

```modelica
model IVRelation
    MysteryComponent componentX;
    SimulationProtocol stim;
    Modelica.SIunits.Current i_max(start=0, fixed=true);
equation
    i_max = max(componentX.i, pre(i_max));
    connect(stim.p, componentX.p);
    connect(stim.n, componentX.n);
end IVRelation;
```

This would ensure that `i_max` is updated whenever the value of `componentX.i` is greater than the previous maximum.
However, if we assume that `componentX.i` starts at a low value and then raises steadily, this introduces the problem that each integration step during the initial rise of the current will force an event.
In fact, you can decrease the step size as far as you want, there will always be an event at an earlier point in time.
Advanced solvers with adaptive step sizes like DASSL and CVODE therefore will slow down significantly as the step size has to be reduced until the absolute difference between the current in the last and the current step is below the simulation tolerance.

To overcome this, we can try to remember our calculus lessons.
Wasn't there a better way to find extrema?
Ah yes, the derivative has to be zero!

```modelica
model IVRelation
    MysteryComponent componentX "the component we want to observe";
    SimulationProtocol stim "some component determining input voltage";
    Modelica.SIunits.Current i_max(start=0, fixed=true);
equation
    when der(componentX.i) < 0 then
        i_max = max(componentX.i, pre(i_max));
    end when;
    connect(stim.p, componentX.p);
    connect(stim.n, componentX.n);
end IVRelation;
```

This looks much better.
We still have the same equation, but now it only triggers when the sign of the derivative changes from nonnegative to negative.
However, we still run into problems if our currents are only in the range of a few picoamperes - at least in OpenModelica.
When we simulate this model in OpenModelica version 1.16.0, `i_max` will stay zero for the whole simulation duration.
You can observe this yourself with [this very simple toy model](https://github.com/CSchoel/inamo/blob/main/bugreports/ZeroCrossing.mo)).
This is because its values lie below the absolute tolerance value, which is $\text{relTol} \cdot \text{nominal} / 100 = 10^{-8}$ by default.

## Keeping zero crossings within the tolerance

In [the last post]({{ site.baseurl }}{% link _drafts/si-units-pitfalls-nominal-values.md %}), we learned that the solution for this situation should be to assign a nominal value to `componentX.i`.
We can do this by changing the component definition to

```modelica
MysteryComponent componentX(i.nominal=1e-12) "the component we want to observe";
```

but this does not change the simulation result.
I opened a corresponding [bug report](https://github.com/OpenModelica/OpenModelica/issues/6970), because I do believe that the issue can be avoided by using nominal values.
However, there is a simple workaround that you can use for the meantime.
By changing the `when` condition to

```modelica
when der(componentX.i) * 1e12 < 0 then
    ...
end when;
```

you can bring the absolute value of the derivative back into the range where the zero crossing is properly detected by the solver.

## All events based on continuous variables are reduced to zero crossings

In general, Modelica transforms any event trigger that includes continuous variables into a zero crossing equation.
For example, if you have the following condition

```modelica
when x > a * b then
    ...
end when;
```

this is transformed into zero-crossing form, which may look like this

```modelica
Real temp = x - a * b;
...
when temp > 0 then
    ...
end when;
```

Therefore, until [this issue](https://github.com/OpenModelica/OpenModelica/issues/6970) is fixed, it might be advisable to divide all variables used in event triggers by their respective nominal values—or at least keep an eye open for this issue when using variables with low nominal values.