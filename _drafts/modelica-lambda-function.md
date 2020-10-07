---
layout: post
title:  "Emulating lambda expressions, and higher order functions in Modelica"
description: >
    Lambda expressions are a useful tool to customize a generic function by fixing some of the parameters with values from the current scope.
    In mathematical modeling, this can be extremely useful to define instances of generic fitting functions that can be reused instead of duplicating the function equation.
    This pattern is not directly supported in Modelica, but it can be emulated quite easily.
date:   2020-10-07 20:33 +0100
categories:
    - modelica
    - systems biology
---

## Lambda expressions help representing fitting functions

Most mathematical models used in biology are fitted to experimental data by using generic fitting functions such as the exponential function or the [generalized logistic function](https://en.wikipedia.org/wiki/Generalised_logistic_function).
This leads to a lot of duplication in equation lists and model code, and sometimes also to confusion whether an equation represents a physical law or an arbitrarily chosen fitting function.

As a computer scientist, my thoughts immediately went to lambda expressions, which could be used to customize a generic implementation of these fitting funtions.
In Python, for example, one might want to define a fitting function like this:

```python
alpha = lambda v : generalized_logistic_fit(
    v, y_max=1491, x0=-0.0946, sx=77.52, se=323.3
)
```

This quickly defines the new function `alpha` as an instance of a generalized logistic function with a specific set of arguments for the fitting parameters of this function.
In the following code, the fitting function can be called, for example, as `alpha(v)` or `alpha(v - v_eq)` or whatever is required for the model equation.
In contrast, without the lambda equation we would either have to write this

```python
generalized_logistic_fit(
    v - v_eq, y_max=1491, x0=-0.0946, sx=77.52, se=323.3
)
```

or even this, which is usually what you see in papers in systems biology

```python
1491 / (323.3 * exp(-77.52 * (v - v_eq + 0.0946)) + 1)
```

Clearly this can become confusing very quickly if different variations of fitting functions are used and these fitting functions may appear in more complicated equations.

## Emulating Lambda expressions in Modelica

So now that we have established that lambda expressions would be quite helpful in mathematical modeling, the question is how to implement them.
First of all, we need to be able to store a function as the value of a variable, i.e. functions must be first class citizens in the language.
Luckily, Modelica follows the concept that *everything* is a class and therefore the `function` construct is also just a special variant of `class`, which does allow quite a bit of tinkering.

```modelica
function alpha = generalized_logistic_fit(
    y_max=1491, x0=-0.0946, sx=77.52, se=323.3
)
```

In this example we exploit the short-hand notation for defining a new class (in this case a function) as modified version of another class.
For `function` classes in particular, Modelica follows the definition that all parameters, which are assigned a value become optional parameters, even if they were mandatory in the original function definition.
This means that we can now call the function as `alpha(v)` or `alpha(v - v_eq)`, exactly as in Python.

Unfortunately, this pattern is limited to assigning fixed values to parameters of existing functions.
The following python example cannot be replicated this way:

```python
alpha = lambda v: exp_fit(v, sy=0.6, sx=-100) + exp_fit(v, sy=0.3, sx=-1.4)
```

## Higher order functions in Modelica

To overcome the aforementioned limitation, we need to explicitly define a new function.
However, if there is only a limited set of possible combinations of the "primitive" fitting functions in our model, we can also define these combinations as higher order functions, i.e. functions that take other functions as parameters.

In python this might look as follows:

```python
fsum = lambda v,a1,a2: a1(v) + a2(v)  # <- this is the higher order function
alpha = lambda v: fsum(
    v,
    lambda v: exp_fit(v, sy=0.6, sx=-100),
    lambda v: exp_fit(v, sy=0.3, sx=-1.4)
)
```

To replicate the same behavior in Modelica, we can use the keywords `replaceable` and `redeclare`:

```Modelica
function fsum
  input Real x;
  output Real y;
  replaceable function fa = exp_fit;
  replaceable function fb = exp_fit;
algorithm
  y := fa(x) + fb(x);
end fsum;
function alpha = fsum(
    redeclare function fa = exp_fit(sy=0.6, sx=-100),
    redeclare function fb = exp_fit(sy=0.3, sx=-1.4)
);
```

This definition is more verbose than the Python version, but it accomplishes the same goal:
We have a generic higher order function `fsum` that can add the result of two arbitrary functions that can be given as an argument to `fsum`.
It might be overkill to use this for a simple sum, but for an expression like `fa(v) / (fa(v) + fb(v))` it can already be quite helpful, since it removes the need to duplicate the equation and/or arguments for `fa` and it avoids obfuscation of the equation by lengthy emulations of lambda equations.

## The limits of replaceable functions in OpenModelica

As you can imagine, tricks like these are not (yet 😉) that common in mathematical modeling and so it is no suprise that compilers are not fully equipped to deal with corner cases that only arise in situations like these.

OpenModelica, specifically, has an issue where parameters declared with the `inner` keyword cannot be used within a redeclaration:

```modelica
inner parameter SI.Voltage v_eq = 0.08;
function foo = fsum(
    redeclare function fa = exp_fit(sy=0.6, sx=-100, x0=v_eq),
    redeclare function fb = exp_fit(sy=0.3, sx=-1.4, x0=v_eq)
)
```

In this case, the compiler would complain that it cannot find the parameter `v_eq`.
A workaround for this is to define a corresponding `outer` variable in `fsum`, like this:

```modelica
function fsum
  input Real x;
  output Real y;
  replaceable function fa = exp_fit;
  replaceable function fb = exp_fit;
  outer parameter SI.Voltage v_eq;
algorithm
  y := fa(x) + fb(x);
end fsum;
function alpha = fsum(
    redeclare function fa = exp_fit(sy=0.6, sx=-100),
    redeclare function fb = exp_fit(sy=0.3, sx=-1.4)
);
```

This concludes our expedition into the emulation of lambda expressions in Modelica.
For me, this technique was quite useful in the [Modelica implementation of a large action potential model](https://github.com/CSchoel/inamo) and I hope it will be useful for others too.