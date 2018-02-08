---
layout: post
title:  "The limits of anonymous Java classes"
description: >
    Anonymous Java classes have no name. This has some implications that can be confusing for .
date:   2017-12-15 00:24 +0200
categories: teaching java jshell
---

## Anonymous classes

Before there where lambda expressions in Java, the only way to (re-)define the behavior of an object on the fly where anonymous classes.
Especially when writing a graphical user interface, you would see a lot of code that looked like this:

```java
ActionListener test = new ActionListener() {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Hello Swing!");
    }
};
```

This defines and at the same time instantiates an *anonymous class* that is only used at this line of code and that implements the interface `ActionListener`.
In theory this has the same effect as declaring the class as a normal named class, either locally or even globally.

```java
class MyActionListener implements ActionListener {
    public void actionPerformed(ActionEvent e) {
        System.out.println("Hello Swing!");
    }
}
ActionListener test = new MyActionListener();
```

The only difference is that the class in our first example had no name and this fact has a few other implications, that may confuse Java novices.

## Anonymous constructors?

```

```

## Anonymous methods?

