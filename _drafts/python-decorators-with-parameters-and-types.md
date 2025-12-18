---
title: Implementing Python decorators with parameters and type hints
lang: en
description: >
     Have you wondered how Python libraries can provide decorators which can both be used with and without parameters?
     I haven't. Until I tried to implement one myself.
categories:
    - python
    - type system
---

Python decorators are a mighty tool to create frameworks and hide the complexity of using them.
From built-ins like `@dataclass` and `@classmethod` to pytest's `@fixture` or pydantic's `@field_validator`, we use them regularly, but we rarely have to think about how they work exactly.

Recently, I wanted to implement a decorator that re-tries any function with an (optional) exponential backoff.
Obviously, the settings for the backoff should be configurable, but users shouldn't _have_ to do that if they are fine with the defaults.

Essentially, I wanted both of the following applications to work:

```python
@retrying
def may_fail_occasionally(*args, **kwargs):
     ...

@retrying(max_retries=10, initial_sleep=0.1)
def may_also_fail_occasionally(*args, **kwargs):
     ...
```

This looks innocent enough, right?
I'm sure you've seen decorators with and without parameters before.
Let's start with the first case without parameters.
An implementation may look like the following:

```python
def retrying(f):
    max_retries = 5
    initial_sleep = 1
    multiplier = 2
    max_sleep = 15 * 60
    def wrapper(*args, **kwargs):
        exceptions = []
        sleep_time = initial_sleep
        for i in range(max_retries):
             try:
                 return (f(*args, **kwargs), exceptions)
                 sleep_time = min(max_sleep, sleep_time * multiplier)
                 sleep(sleep_time)
             except Exception as e:
                 exceptions.append(e)
    return wrapper
```

## Type hints

So far so well, but let's look at the types a bit more in detail.
As you can see, I've decided to modify the return type of the wrapped function, adding the exceptions that we silently ignored as a second return value.
It would be nice if we could indicate that in the function signature with proper type hints.
For that, we have to think a bit more about what a decorator _is_.
Essentially, we have a higher-oder function that takes a function `f` as argument and returns a modified version of that function:


```python
P = ParamList("P")
R = TypeVar("R")

def retrying(f: Callable[P, R]) -> Callable[P, tuple[R, list[Exception]]]:
    ...
```

We use the handy `TypeVar` and `ParamList` classes to indicate that we keep the parameters and return type of the wrapped function intact, just adding something to the latter.

## Adding parameters to the mix

Now that we have covered the case without paramers, we just need to move the local variables like `initial_sleep` into the function signature, and we're good, right?

Unfortunately, that's wrong.
Consider our use case again:

```python
@retrying
def may_fail_occasionally(*args, **kwargs):
     ...

@retrying(max_retries=10, initial_sleep=0.1)
def may_also_fail_occasionally(*args, **kwargs):
     ...
```

In the decorator application `@retrying`, the `retrying` refers to the _function_ itself.
We now want to replace that by something like `@retrying(max_retries=10)`, which is a function _call_.
So if we want to have parameters in our decorator, we need to build a function A that takes the parameters as an input and returns a function B that takes a function C as an argument and returns a modified version of C. 😵‍💫
With that, our return type changes to the following:

```python
Callable[
    [Callable[P, R]],
    Callable[P, tuple[R, list[Exception]]]
]
```

Now we're in Haskell-level type signature land. :laughing:
Armed with that information, let's re-implement `retrying` with parameters while keeping the types straight (buckle in!).


```python
# Function A
# Returns the actual decorator.
def retrying(max_retries: int=5, initial_sleep: int=1, multiplier: int=2, max_sleep: int=15 * 60) -> Callable[
    [Callable[P, R]],
    Callable[P, tuple[R, list[Exception]]]
]:
    # Function B
    # The decorator, very similar to our initial version or retrying.
    def decorator(f: Callable[P, R]) -> Callable[P, tuple[R, list[Exception]]]:
        # Function C
        # The wrapper that replaces the function the decorator is applied to.
        def wrapper(*args, **kwargs) -> tuple[R, list[Exception]]:
            exceptions = []
            sleep_time = initial_sleep
            for i in range(max_retries):
                try:
                    return (f(*args, **kwargs), exceptions)
                    sleep_time = min(max_sleep, sleep_time * multiplier)
                    sleep(sleep_time)
                except Exception as e:
                    exceptions.append(e)
        return wrapper
    return decorator
```

Yeah, what the fuck, right?
We only wanted to have a decorator with parameters and what we had to implement is essentially a decorator factory which returns a decorator that is itself a factory for creating wrapper functions.
It looks crazy, but that's what has to go on under the hood to make this work.

At this point, you might be tempted to just keep the factory monster we have right now, use `@retrying()` instead of `@retrying` to apply the decorator and call it a day.
But we don't do things halfway on this blog, so please fasten your seatbelts and brace yourself for a rough landing.
We're going to marry the two versions of the decorator into one. ✈️

## Supporting both use without and with parameters

We have two type signatures for the `retrying` function now, which we need to support both in one function.
Fortunately Python has the `@overload` decorator for that since version 3.5:


```python
@overload
def retrying(f: Callable[P, R]) -> Callable[P, tuple[R, list[Exception]]]:
    ...

@overload
def retrying(max_retries: int=5, initial_sleep: int=1, multiplier: int=2, max_sleep: int=15 * 60) -> Callable[
    [Callable[P, R]],
    Callable[P, tuple[R, list[Exception]]]
]:
    ...
```

Now we have some type hints that don't _immediately_ make the eyes of our users bleed, but how do we get those types together for the actual implementation?
Is there a way?
Fortunately, yes.
Since `f` is provided as a positional argument, and we want our optional parameters to be supplied as keyword arguments, we can even have a super clean definition using the `*` in the argument, which enforces that all parameters after it must be supplied as keyword arguments.


```python
def retrying(
    f: Callable[P, R] | None = None,
    *,  # everything after this _must_ be given as keyword argument
    max_retries: int=5,
    initial_sleep: int=1,
    multiplier: int=2,
    max_sleep: int=15 * 60
) -> Callable[
    [Callable[P, R]],
    Callable[P, tuple[R, list[Exception]]]
] | Callable[
    P,
    tuple[R, list[Exception]]
]:
    def decorator(f: Callable[P, R]) -> Callable[P, tuple[R, list[Exception]]]:
        def wrapper(*args, **kwargs) -> tuple[R, list[Exception]]:
            exceptions = []
            sleep_time = initial_sleep
            for i in range(max_retries):
                try:
                    return (f(*args, **kwargs), exceptions)
                    sleep_time = min(max_sleep, sleep_time * multiplier)
                    sleep(sleep_time)
                except Exception as e:
                    exceptions.append(e)
    if f is None:
        # no function argument given => we are called with parameters
        return decorator
    # function argument is there => we are called without parameters
    # => we need to return the wrapper directly instead of the decorator
    return decorator(f)
```

There we are. Safe and sound in decorator land. Please clap for the captain. ✈️ :laughing:

If we call `retrying(f)`, as python will do internally when we use the decorator `@retrying` without parameters, we essentially get the same solution as we had in the first version of the implementation:
We define a decorator function, but immediately apply that function, essentially stripping away the extra layer again.
If we call `retrying(initial_sleep=10)` instead, which is what happens when we use the decorator `@retrying(initial_sleep=10)`, we use the extra wrapping layer to provide the decorator function as a closure that already encapsulates the value we gave for the extra argument `intial_sleep`.

## Final remarks

I have mixed feelings about types like `Callable[[Callable[P, R]], Callable[P, tuple[R, list[Exception]]]] | Callable[P,tuple[R, list[Exception]]`.
Let's be honest: Nobody will understand this type when they come across it in the code or in an error message of the type checker.
Even in functional programming languages, this is the point where I would say "Just let me put `auto` as the type and figure it out yourself!".
However, spending some time to think about the actual type that is returned by the decorator was what ultimately helped me to understand why I had to implement it that way and that, yes, there just is no easier way.
So I think I'm still in favor of typing everything you can, but I do understand if you don't want to touch types like that with a 10-foot pole. 🙈