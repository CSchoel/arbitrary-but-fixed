---
layout: post
title: A checklist for building reusable, understandable and reproducible mathematical models
description: |
  Despite their increasing complexity, mathematical models ins systems biology are mostly still written with a single purpose in mind and with little regard to design goals such as reusability or understanability of the code.
  Things are changing, but we are still not there yet.
  This checklist can help you to make sure that you use the features of your modeling language to their fullest extent to be a part of the solution and not a part of the problem.
categories:
- modelica
- dynamical systems
---

In a recent paper I established a list of characteristics that modeling languages should exhibit to facilitate the reproduction, reuse, and understandability of mathematical models in systems biology.

## Short introduction to MoDROGH

**TODO: Write this**

## MoDROGH-Checklist

**TODO: Explain items in more detail**

### Modular

- [ ] Is the code separated into self-contained modules as far as possible?
- [ ] Does each module represent exactly one biological compartment or effect?
- [ ] Are the interfaces between modules biologically sound, meaning that they do not contain variables that require knowledge about implementation details of the component?
- [ ] Are all modules small enough to be understandable at first glance?
- [ ] Are the interfaces between modules clearly defined and use a minimal number of variables?
- [ ] Is the model code DRY?
- [ ] Are modules tested with unit tests as far as possible?

### Declarative

- [ ] Is the model mathematically sound and free of workarounds (i.e. code that is required to make the model compile, but that does not add information about the modeled system)?
- [ ] Are the equations structured with regard to their biological meaning instead of molding them into a specific format for implementation?
- [ ] Are implicit equations used wherever it is useful?
- [ ] Do all variables have proper SI units without unit prefixes?
- [ ] Are automatic variable consistency checks performed?
- [ ] If the language allows it, have all variables and components been annotated with ontological terms?

### Human-readable

- [ ] Do all variables and parameters have speaking names?
- [ ] Are all variables and parameters documented with a short sentence?
- [ ] Do all equations only have a low number of variables involved?
- [ ] Are all non-intuitive optimizations and workarounds documented?
- [ ] Were the documentation capabilities of the language used to their full potential?

### Open

- [ ] Can the model been downloaded and simulated with open-source tools?
- [ ] Does the download contain licensing information?
- [ ] Does the download include everything necessary to reproduce plots and other results?
- [ ] Is the code under version control?
- [ ] Does the code contain a human-readable changelog?
- [ ] Is there a way for other researchers to point out errors and suggest corrections?

### Graphical

- [ ] Does the model have a graphical representation?
- [ ] Does the graphical representation display all interactions between the individual modules in the model?
- [ ] Is the amount of modules shown at each hierarchical layer small enough to be understandable at first glance?
- [ ] Is each component represented with an intuitive symbol that either captures the biological appearance or the function of the component?
- [ ] Are components grouped visually according to their function and interaction?

### Hybrid

- [ ] Is it clearly indicated which variables are discrete and which are continuous?
- [ ] Is the transition between discrete and continuous parts sound?
- [ ] If the language allows it, have acausal connections been favored over causal input-output relationships?
