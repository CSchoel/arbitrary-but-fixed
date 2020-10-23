---
layout: post
title:  "Event synchronization in Modelica models with noise"
description: >
    The Modelica standard library comes with basic noise models using pseudorandom numbers.
    They are easy to integrate into a model, but have some caveats when the sample period of the noise perfectly aligns with another event.
categories:
    - modelica
---

## Noise in the Modelica Standard Library

Recently, I wanted to extend my implementation of a [model of the human baroreflex](https://github.com/CSchoel/shm) with a noise term using Gaussian white noise.
I was happy to learn that there is already an implementation for normal distributed noise in `Modelica.Blocks.Noise`, which also already covers the issue that noise in a mathematical model should still be deterministic to be able to test the model reliably.

In principle, a model with a noise term looks as follows:

```modelica
model MyModel

    model InnerModelWithNoise
        Modelica.Blocks.Noise.NormalNoise generator(samplePeriod=0.1);
        Real someVar(start=0, fixed=true);
    equation
        der(someVar) = generator.y;
    end InnerModelWithNoise;

    inner Modelica.Blocks.Noise.GlobalSeed globalSeed(fixedSeed=42);
    InnerModelWithNoise m;

    ...
end MyModel;
```

Since pseudorandom noise is in itself always discrete, because it is based on imperative algorithms that generate sequences of random numbers, the noise generator `generator` needs the `samplePeriod` parameter to determine how often a new number should be drawn from the desired distribution.
The value that you want here depends on the time scale at which your system operates, but it should be fixed and should not simply be set to the step size of the simulation, because then your simulation output would become highly dependent on the step size.

Another peculiarity of noise in a mathematical model is the issue I mentioned above: The noise stil has to be deterministic.
Otherwise, it would not be possible to design model tests with known expected output, which are crucial for debugging.
This can be achieved by determining a seed for the generator, which is an integer value that is used to determine the starting point of the sequence.
The noise models in the Modelica Standard Library conveniently use the `inner` and `outer` keywords to collect all noise models in the system to a `GlobalSeed` model, which defines such a seed at a global scale.
Each individual noise model has its own local seed, which is combined with the global seed to produce the actual seed used for the random number generator.
This local seed can either be set via the parameter `fixedLocalSeed` or (as is the case in the above example) it can be determined automatically by using the function `impureRandomInteger`.

## Noise activated by a trigger

So why is all this important to know?
Well, in my example I did not need noise that is generated at fixed time intervals, but noise that is activated by a trigger signal.
Something like this equation:

```
when trigger then
    x_noise = x0 + generator.y;
end when;
```

This is again quite simple with the only obvious problem of determining a good value for `samplePeriod`, which must always be smaller than the distance between trigger signals but not so small as to slow down the simulation due to the exessive amount of events introduced.

However, it turns out that there is an additional caveat, since my simulation ran fine for small time periods, but suddenly produced the following error message after 170 seconds:

```verbatim
DASKR-- TOUT (=R1) TOO CLOSE TO T (=R2) TO START INTEGRATION
```

At first I was quite confused what was going on, but from the error message I figured that this could have something to do with two events being too close to each other or rather even aligning perfectly at the same time.
To test my hypothesis, I changed the `samplePeriod` from `0.1` to `0.10001` to make a perfect alignment less likely and indeed the error vanished and I was able to simulate my model for 1000 seconds without any errors.

## Open questions

I am still not sure which event caused the alignment, since the model is quite large and has a lot of event triggers.
I also do not know if this only occurs in OpenModelica and if this is a compiler bug or an actual implementation problem that must be avoided with workarounds like the one described above.
In theory, it should be possible to test this with a minimal example using only one event trigger and only one call to the `sample()` function, as I do not think that there is something special about the noise models apart from calling `sample()`.
However, I currently do not have the time for this and for my use case I am satisfied with the solution I found.
Should you, dear reader, come across a similar problem and find out more than me, please let me know. :slightly_smiling_face:
