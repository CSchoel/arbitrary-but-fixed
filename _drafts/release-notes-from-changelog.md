---
layout: post
title: Automatically generate release notes from your changelog
description: |
  Automatically generating releases from git tags is nice, but how to ensure that your release notes stay meaningful?
  If you already keep a changelog for your project, there is a quick solution for this with just a few bash commands.
categories:
- DevOps
- shell
---

## A bit of context

Recently I began dabbling more and more with continuous integration and deployment for my research projects.
This also included the need to generate GitHub releases from a GitHub Actions script due to two reasons:

* [Zenodo](https://zenodo.org/), which I use to archive my work and make it citeable, can automatically archive every GitHub release of your project, but it must be a full release, not just a tag.
* For some of my projects, I need to generate ZIP artifacts in order to make all data in subprojects available as a single download (which unfortunately does not work together with Zenodos GitHub integration due to [zenodo/zenodo/#1235](https://github.com/zenodo/zenodo/issues/1235)).

Fortunately, generating releases with GitHub Actions is quite easy with [actions/create-release](https://github.com/actions/create-release).
However, I was left with one problem: What do I put in the release body?

## The problem

The most obvious solution for releases targeted at Zenodo seemed to just include the `README.md` using the `body_path` parameter instead of adding the release text statically with the `body` parameter.
However, throwing copies of the whole `README.md` around each time a new release is created is both a bit verbose and also unhelpful, if you really just want to know what's new in the current release.

I already do [keep a changelog](https://keepachangelog.com/en/1.0.0/), but, again, using the whole `CHANGELOG.md` in `body_path` seems equally overkill.
I also do not want to make the changelog layout any more complicated, as I barely keep up with maintaining the thing as it is.

So we are left with the following requirements for our automatically generated release body:

* Include a brief explanation what the project is about. This is required for Zenodo, as the latest release note might be the first impression that users get from the project.
* Add the relevant sections from the `CHANGELOG.md` without changing anything about the layout of the file.
* If possible, the solution should work for any repository, so that I can simply slap this on all of my projects without wasting much thought about it.

## The solution

As you have probably guessed this is one of these instances where the answer lies in the ubiquitous question "Can't we do that with `sed` or `awk` somehow?".
First, we need the static part that describes the project in a few sentences.
You could probably extract this from the first paragraph of the `README.md`, but this is a little tricky, because if you only count newlines, you might get the status buttons instead of the first *text* paragraph, but you also cannot be sure that all of your repositories will have status buttons. 
Therefore, I chose the boring solution of just adding a `RELEASE_HEAD.md` to the repository, which contains the heading and project description.

The next step is to get the relevant part of the `CHANGELOG.md`.
Fortunately, if you follow the proposed structure on [keepachangelog.com](https://keepachangelog.com/en/1.0.0/), this part is quite easy to identify:
It will start at a line starting with `## [X.Y.Z]` and end at the next line that starts with `## ` (notice the space after the hashes, `X.Y.Z` is the version number of the current release).
Let's call these lines `start` and `end` to make the `sed` command that we are concocting a little easier to understand.

The simplest version of the command that I stumbled upon through Google was

```bash
sed -ne "/start/,/end/ p" CHANGELOG.md
```

which just prints the lines between `stard` and `end`, but also includes the lines `start` and `end` themselves.
Nice, so we just need to remove the last line—or actually the last two lines, since the second last line should be empty.
Easy, right?
Surprisingly, this is not that trivial with a *single* `sed` call, so we need to pipe the result into `head -n -2`.
This opens up another problem, because the *pipe* output of our `sed` call is different from its *print* output.
The `p` command prints all the lines we want, but in a pipe we just get the unchanged file as output, because we did not change anything in the file.
Bash scripting: Gotta love it!
The solution looks like this:

```bash
sed -e "/start/,/end/ ! d" CHANGELOG.md
```

We replaced `p` with `! d`, which first inverts the selection and then deletes the selected lines, and drop the `-n` argument to see the actual output.
The result can finally be piped into `head -n -2` and then be appended to our content in `RELEASE_HEAD.md`.
Of course, we also need to automatically find the current version tag, but fortunately this is available (with a little extra work) in the environment variable `GITHUB_REF`.
The relevant parts of the resulting GitHub Actions script look as follows:

```yaml
- name: Set env # required to get 'vX.Y.Z' instead of 'refs/tag/vX.Y.Z'
  run: echo "RELEASE_VERSION=${GITHUB_REF#refs/*/}" >> $GITHUB_ENV

- name: Extract changelog for release version
  run: |
    cp RELEASE_HEAD.md RELEASE.md
    printf "\n" >> RELEASE.md
    sed -e "/^## \\[${RELEASE_VERSION:1}\\]/,/^## / ! d" CHANGELOG.md | head -n -2 >> RELEASE.md

- name: Create Release
  id: create_release
  uses: actions/create-release@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # provided by Actions
  with:
    tag_name: ${{ github.ref }}
    release_name: Release ${{ github.ref }}
    body_path: RELEASE.md
    draft: true
    prerelease: false
```

This script just assumes that your headings in `CHANGELOG.md` will have the form `## [X.Y.Z]` (optionally followed by something else), your version tags have the form `vX.Y.Z`, and your repository contains a file called `RELEASE_HEAD.md`.
Otherwise it should be pretty much universally applicable.