---
layout: post
title: 'The pitfalls of using proper SI units: Nominal values in Modelica'
description: 'Using proper SI units without unit prefixes avoids order of magnitude
  errors and increases interoperability between models. However, they can also bring
  some pitfalls with them. In this post I explain how to avoid one of these pitfalls
  in Modelica by using nominal values.

  '
categories:
- modelica
- dynamical systems
math: true
date: 2020-12-23 12:58 +0100
---
Using SI units in a mathematical model is good, using them without unit prefixes ("kilo", "milli", ...) is even better, because it means that two separately developed models are more likely to be compatible with each other.
Additionally, it avoids all kinds of order of magnitude errors that can occur because of missing or wrong conversion factors.
Modelica facilitates this with the [`SIUnits` package](https://build.openmodelica.org/Documentation/Modelica.SIunits.html) in the Modelica Standard Library, which defines all SI units defined in the [ISO 31](https://en.wikipedia.org/wiki/ISO_31) standard.
However, I recently noticed that there are also some pitfalls connected to having extreme differences in the order of magnitude of variable values in your model.
In this post I want to highlight one such issue and give you a recipe how to solve it in a Modelica model.

## Discretization inaccuracies for variables with small order of magnitude

The first issue occurs only when you have extremely low variable values.
In an electrophysiological model of the rabbit AV node, I needed to observe a an amount of $Ca^{2+}$ ions that could become as low as $10^{-21}$ mol, i.e. only a few hundred individual ions.
I only noticed the resulting inaccuracies in the model, because I could compare it to a different version using concentrations instead of substance amounts.
The concentrations remained on the order of $10^{-4} \frac{\text{mol}}{\text{m}^3}$, while otherwise representing the exact same biological system.
If you compare the two lines in the following plot, you can see that the model using substance amounts (red) shows an overshoot due to discretization errors.

<div class="bokeh-container"><script src="/assets/img/cadiff.js" id="aa59bc6f-89a5-4f82-aadf-0d752232f7a6"></script></div>

## Managing discretization errors in solvers

In solvers with adaptive step sizes, such as DASSL and CVODE, these discretization errors are controlled by setting a `tolerance` parameter, which defines a relative tolerance ensuring that

$$
\frac{|\text{approximated} - \text{accurate}|}{\max(|\text{approximated}|, |\text{accurate}|)} < \text{tolerance}
$$

where `approximated` is the value obtained with a high step size (i.e. low accuracy) and `accurate` is the value obtained with a lower step size (i.e. higher accuracy).
This works well for most cases, but when either `approximate` or `accurate` approach zero, the above formula for the relative error approaches infinity, requiring ever smaller step sizes and slowing down the integration unnecessarily.
The solution is then to use an additional absolute tolerance that can be used to determine how close to zero the value has to be that the relative tolerance should no longer be used.
The check then becomes

$$
\frac{|\text{approximated} - \text{accurate}|}{\max(|\text{approximated}|, |\text{accurate}|)} < \text{relTol} \vee |\text{approximated} - \text{accurate}| < \text{absTol}
$$

with `relTol` being the relative tolerance and `absTol` being the absolute tolerance.
As a side note, this is equivalent to the behavior of the function `math.isclose()` in the Python standard library.
The corresponding [PEP 485](https://www.python.org/dev/peps/pep-0485/) is an interesting read, which explains, for example, why using the maximum instead of the minimum has benefits in certain corner cases.

## Nominal values to the rescue

The question that remains is how to choose `absTol`, because unlike for `relTol`, it is not sensible to use a single value for all variables, since different variables may have different orders of magnitude.
Here, the solution is to annotate the variables in question with a *nominal* value that defines the usual order of magnitude that this variable will attain.
The absolute tolerance can then, for example, be computed for each variable as

$$
\text{absTol} = \text{nominal} \cdot \text{relTol} / 100
$$

In a concrete example in Modelica this nominal value may be given as follows:

```modelica
Modelica.SIUnits.AmountOfSubstance ca(nominal = 1e-21);
```

This tells the solver to use a smaller absolute tolerance for the variable `ca` than for other variables, which by default have a nominal value of 1.
In most models, it should suffice to determine the nominal value of connector variables, since nominal values are propagated to other variables as far as possible.
For example, if we introduce two additional variables like this

```modelica
Modelica.SIUnits.Volume vol(nominal = 1e-17);
Modelica.SIUnits.Concentration ca_con = ca / vol;
```

then `ca_con` will have a nominal value of $10^{-21} / 10^{-17} = 10^{-4}$.
If you want, you can use [this example model](https://github.com/CSchoel/inamo/blob/main/bugreports/CaDiffusionSimple.mo) to examine the difference between using the nominal value `1e-21` for the two variables ending with `_amount` and simply using the default value of 1.
