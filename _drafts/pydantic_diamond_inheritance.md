---
layout: post
title: How to handle diamond inheritance in Pydantic
description: >
    TODO
categories:
- python
tags:
- diamond inheritance
- multiple inheritance
- python
- pydantic
---

Python supports multiple inheritance, but 98% of the time you don't actually have to use it to solve everyday problems.
Therefore, it is not surprising that when you do, things usually don't go _quite_ as planned.

The same was true for a colleague of mine who wanted to create mixin-style subclasses that supply default arguments to its parent class.
The problem essentially boiled down to this:

```python
from pydantic import BaseModel

class Base(BaseModel):
    a: int
    b: int
    c: int

class X(Base):
    a: int = 1

class Y(Base):
    b: int = 2
    c: int = 3

class Surface(X, Y):
    pass

x = Surface()
```

The problem is diamond inheritance, isn't it? You have this, right?

Python can deal with this if you follow the MRO correctly, yes, but that also only works if the init methods of all classes are designed for cooperative inheritance, meaning each init method can handle the inputs the previous init provides it and provides the inputs the next init requires. Now for Pydantic, everything depends on when the checks are done. If you were to check only at AbstractClass, yes, everything would be fine. But within the init method of AbstractClassX or AbstractClassY (whichever comes first), you actually have an inconsistent state because there are some fields which are supposed to have values but those values will only be supplied in the next init method (which is hard for the current init method to know about). If all the init method does is storing the input values, that's fine. But if you want to do any calculations based on them, you do have a problem and Pydantic is right to complain about that. Example code:

```python
class Base:
    def __init__(self, a: int | None, b: int | None, c: int | None):
        print(f"Base({a}, {b}, {c})")


class X(Base):
    def __init__(self, a: int | None = 1, b: int | None = None, c: int | None = None):
        print(f"X({a}, {b}, {c})")
        super().__init__(a if a is not None else 1, b, c)


class Y(Base):
    def __init__(self, a: int | None = None, b: int | None = 2, c: int | None = 3):
        print(f"Y({a}, {b}, {c})")
        super().__init__(a, b if b is not None else 2, c if c is not None else 3)


class Surface(X, Y):
    def __init__(self):
        print("Surface()")
        super().__init__()


val = Surface()
```

This prints the following:

```plain
Surface()
X(1, None, None)
Y(1, None, None)
Base(1, 2, 3)
```

So `X.__init__` cannot access `a` and `b` yet. Also, we only get the right values in the base class because all classes know about each other and decided to play nice with each other.