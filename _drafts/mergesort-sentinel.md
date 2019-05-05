---
layout: post
title:  "Beware of sentinels in merge sort"
description: >
    Some authors (including CLRS) suggest that the merge function in a merge sort implementation can be sped up by adding a sentinel to the list.
    While this is technically correct (the best kind of correct), it requires that a sentinel value can be chosen that is guaranteed to never occur as a regular value.
    This is impossible for any general purpose, real world implementation.
categories: teaching java algorithms
---