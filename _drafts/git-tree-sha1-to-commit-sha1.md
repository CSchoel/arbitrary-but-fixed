---
layout: post
title:  "How to get a git commit hash from a tree hash"
description: >
    Julia uses git tree hashes to designate the version of a package in a git repository. What are those and how can we find the commit hash to identify the version on GitHub?
categories: git julia
---

## Git commit hashes

You probably know that git uses SHA-1 hashes to identify a commit along with its full history of commits.
This is a neat trick to ensure that you can absolutely be sure that two versions of a repository contain the exact same files with the exact same history.
You can see these hashes in your git log or on GitHub and they are commonly used to identify versions of a repository that have no corresponding tag.
They look like this `e78e40aa4a2c03bf469ef842d37ec5eeaf49f37b`, but usually a prefix like `e78e40a` is enough to uniquely identify them since there are already over 200 million of these prefixes and SHA-1 ensures a quite even distribution of hashes across these possibilities.

## Git hashes in Julia's package manager

However, recently I stumbled upon another kind of hash that git uses and that can *also* be used to identify the current version of a repository.
In many of my Modelica projects, I need the latest version of my Julia package [MoST.jl](https://github.com/THM-MoTE/ModelicaScriptingTools.jl), which leads to entries like the follwing in the `Manifest.toml` that Julia uses to identify the versions of all packages installed for the current project.

```toml
[[ModelicaScriptingTools]]
deps = ["CSV", "DataFrames", "Documenter", "Markdown", "OMJulia", "PyCall", "Test", "ZMQ"]
git-tree-sha1 = "950e41b2d5a6aacd24d541cb95a172b0bc2a0230"
repo-rev = "main"
repo-url = "https://github.com/THM-MoTE/ModelicaScriptingTools.jl.git"
uuid = "9bd7ba1c-b518-491f-8f72-7efe190322aa"
version = "1.1.0"
```

The interesting part here is the `git-tree-sha1` entry, which has clearly something to do with Git and with SHA-1, but what does the `tree` mean?
This question became important for me, because I wanted to identify the *actual* version of my package that I used to produce the results for one of my papers.
I knew I had this information stored in the `Manifest.toml`, so I did not bother to write it down at the time.
This meant I was left with the task to obtain the SHA-1 hash identifying the commit version from this ominous "tree" hash.

## Git tree hashes

It turns out that Git uses hashes for a lot of things and it also always uses SHA-1.
The "tree" hashes are used to capture the contents of a directory tree including file contents and usage rights.
Each commit actually has *three* SHA-1 hashes associated with it:

* The *commit hash* identifies the current commit with all of its history.
* The *parent hash* is a pointer to the parent of the current commit.
* The *tree hash*, which is used by Julia, captures the state of the whole directory tree of all the files in the repository.

## Getting the commit hash associated with a tree hash

You can see these, by using `git log --pretty=raw`, which gives an output like the following:

```git
commit a8a3dd68a37e21b1c2c835b7797e004940b2d9e6
tree 950e41b2d5a6aacd24d541cb95a172b0bc2a0230
parent 17577427038d695c4bce8696f36d2df726eb1c4d
author Christopher Schölzel <christopher.schoelzel@gmx.net> 1615040546 +0100
committer Christopher Schölzel <christopher.schoelzel@gmx.net> 1615040546 +0100

    adds documenter key for deploying docs

...
```

So one easy way to get the commit hash associated to a particular tree hash is to use

```bash
git log --pretty=raw | grep -B 1 <tree-hash>
```

Note that the association of tree hashes to commit hashes is not unique.
If, for example, a commit reverts the changes of the previous commit, the new tree hash will be the same as the tree hash before the first commit.

## Why use tree hashes to identify a commit?

Now the only question that remains is why the heck does Julia's package manager use tree hashes instead of commit hashes, when only the latter can be used to uniquely identify the package version on GitHub, for example?

The answer is as simple as it is unpleasant: Because people like to rewrite history far more than they should.
The main advantage of tree hashes is that they stay the same after `git rebase` has been used to "clean up" the history (which in my opinion is more accurately described as *messing up* the history 99% of the time).
So if a Julia package developer rebases their repository, the `Manifest.toml` file of all people using this package stays valid as long as there is some commit in the new repository history that provides the exact same file content.
This is, of course, perfectly safe for the sake of identifying a dependency to a precise version of a package to install, but it's one of these features where you are kinda doing it wrong if you need it.