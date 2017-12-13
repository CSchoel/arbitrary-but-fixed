---
layout: post
title:  "Serialization and caching in Java"
description: >
    Do you try to send serialized Java objects down a stream and don't get the same objects out at the other end? If yes, this post is for you. ;)
date:   2017-11-21 16:02 +0200
categories: java serialization caching stream
---

Note: The problem is that serialized objects are assumed to be immutable and are therefore cached. If an object has the same reference as a cached object it is assumed to be identical.