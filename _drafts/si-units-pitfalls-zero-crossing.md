---
layout: post
title: "The pitfalls of using proper SI units: Nominal values and zero crossings in Modelica"
description: >
    Using proper SI units without unit prefixes avoids order of magnitude errors and increases interoperability between models.
    However, they can also bring some pitfalls with them.
    In this post I explain how to avoid those in Modelica by using nominal values and paying special attention to zero crossings.
categories:
- modelica
- dynamical systems
math: true
---

## Keeping zero crossings in the tolerance

There is one problem that cannot be solved with nominal values in the current version 1.16.0 of OpenModelica.

I opened a corresponding [bug report](https://github.com/OpenModelica/OpenModelica/issues/6970), because I do believe that the issue can be avoided when nominal values are given for the relevant variables.