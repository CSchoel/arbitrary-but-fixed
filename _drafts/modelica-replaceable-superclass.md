---
layout: post
title:  "Replaceable superclass in OpenModelica"
description: >
    In Modelica you can declare parts of a class as replaceable. The Modelica specification does not allow for the superclass to be replaceable, but interestingly the OpenModelica compiler does not implement this restriction. In this post I will investigate if this can lead to any problems.
date:   2018-10-14 15:07 +0100
categories:
    - modelica
---
