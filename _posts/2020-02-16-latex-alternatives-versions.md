---
layout: post
title:  "Latex Alternatives: Latex versions"
description: >
    LaTeX is not LaTeX. There is MikTeX, Live TeX, LaTeX2e, pdflaTeX, LaTeX3, XelaTeX, LualaTeX, ... Aaaaah! If you are as confused as I was when I got into laTeX, this post is for you.
categories:
    - latex
    - latex alternatives
---

Have you recently (or not so recently) started using LaTeX and wondered, whether you should be using MikTeX, Live TeX, LaTeX2e, pdfLaTeX, LaTeX3, XeLaTeX, LuaLaTeX (or maybe it's LuaTeX), or something else?
If all those options don't make any sense to you and you don't feel much wiser after googling "Which LaTeX version should I use?", or if exactly this search has brought you here, then this post is for you.

Here I will try to untangle all the different technicalities and confusions surrounding the ambiguous term "LaTeX version".

## TeX and LaTeX

The first thing that may cause confusion is the distinction between TeX and LaTeX.
In short, TeX is the actual *language* that we write our documents in.
The TeX standard defines the basic concepts such as the facts that things that start with a `\` are treated as command sequence or that curly braces `{}` group tokens together, basic rules of command expansion, and about 300 low-level commands called *primitives*.
Effectively, every TeX document is treated as a stream of tokens where some of these tokens are macros with special meaning.
What makes this language extremely difficult to understand and parse is the fact that almost every syntactic aspect of the language can be changed from within a document.
This is also the reason why seemingly every problem you may have with TeX documents can be solved with a few lines of cryptic code copied from Stack Overflow.

As you may guess, nobody wants to write pure TeX. Even Donald Knuth did not intend that the language was used like this by end users.
He defined another 600 more high-level commands which are now called ["Plain TeX"](https://en.wikibooks.org/wiki/LaTeX/Plain_TeX).
Yes, even the terms "TeX" and "Plain TeX" do not refer to the same thing.
I know, its like nobody *wants* us to understand this system.

But wait, it gets worse. Since Plain TeX is still quite low-level, almost everybody uses additional *macro packages*.
Here, there are effectively two choices, both of which are *compatible* with Plain TeX (i.e. they include the Plain TeX commands):

* [*LaTeX*](https://www.latex-project.org/) is the most widely used macro package. Its purpose is to provide high-level abstractions for the low-level TeX primitives and Plain TeX commands so that you can focus on defining the *content* of a document instead of its *layout*. This is where commands like `\documenttype`, `\usepackage` or `\section` are defined.
* [*ConTeXt*](https://wiki.contextgarden.net/What_is_ConTeXt) goes in the opposite direction, providing detailed commands for typesetting, which makes it more interesting for desktop publishing.

In short you can say if LaTeX is an alternative to Microsoft Word, ConTeXt is an alternative to Adobe InDesign. If you want to *think* about your design, you may want to use ConTeXt.
If you want to create beautiful documents without having to make every typographical decision by yourself, you will probably be better off with LaTeX.

## Ambiguity of the term "LaTeX version"

Let's go back to the core question: "Which LaTeX version should I use?"
It turns out that this question is quite ambiguous, because when people say "LaTeX version" they may refer to one of three totally different things:

* The actual version of the *LaTeX macro package* that is being used to write a document.
* The kind of *typesetting engine* that is used to produce the output file from your LaTeX source file.
* The kind of *TeX distribution* you are using that contains implementation of both the *typesetting engines* and the *macro packages* for your operating system along with additional tools.

In the following sections I will discuss these three choices in detail.
I could also go into detail about versions of the actual *TeX language*, but as we will see in the following, this choice is usually never discussed as the end user does not have to think about it.

## Versions of the LaTeX macro package

Like all software, LaTeX is under continuous development.
The main versions that people may refer to on the internet are:

* *LaTeX2e* is the current version of LaTeX.
    It has been around since 1994, but still gets new features and bugfixes.
    This is most definitely the version you are already using.
* *LaTeX3* is a new version of LaTeX with a lot of fundamental changes and improvements.
    Development started in 1990, but there is still no official stable release. However, the most useful features slowly creep into *LaTeX2e* via the packages [`expl3`](https://ctan.org/pkg/expl3), which provides access to the low-level programming interface of LaTeX3, and the collection [`l3packages`](https://ctan.org/pkg/l3packages), which provides the higher-level commands that are interesting for end users. Although these packages are still labeled as "experimental" they are pretty stable.

Usually you will not have to worry about the LaTeX version at all, as you will be simply using the latest version of LaTeX2e shipped with your LaTeX distribution.
If you [write a LaTeX package](https://en.wikibooks.org/wiki/LaTeX/Creating_Packages) yourself and you use some cutting-edge features, you may want to use the command `\NeedsTeXFormat{LaTeX2e}{YYYY/MM/DD}` where you can specify the minimum version of LaTeX2e that your package needs to run according to the date-based versioning scheme of LaTeX2e.
As a side note, the same holds true for packages, which can be [required to be of a certain minimum version](https://tex.stackexchange.com/questions/47743/require-a-certain-or-later-version-of-a-package) by a second optional argument to `\usepackage[options]{name}[YYYY/MM/DD]` or `\RequirePackage` respectively.

## Typesetting engines that translate LaTeX documents

OK, so now we have a LaTeX document and we know what version of the LaTeX macro package we are using.
Now we have to think about which engine we want to use to create our documents.
A *LaTeX engine* is a piece of software that takes your LaTeX document as input and produces an output that is usually either a DVI or a PDF document.
It does all the typesetting tasks like hyphenation, layout of mathematical formulas and so on.
The [*device independent file format* (DVI)](https://de.wikipedia.org/wiki/Device_independent_file_format) is an intermediary format that is usually again translated to PostScript or PDF.
We will now look at the main engines available for LaTeX.

* [*TeX*](https://ctan.org/pkg/tex) is not only the name of the language itself but also the name of the original engine written by Donald Knuth.
    It produces DVI images and is limited to 8-bit inputs, allowing 256 different characters in the text input.
* [*e-TeX*](https://ctan.org/pkg/etex) is an extension of *TeX* that adds additional primitives to make the live of a TeX programmer easier.
    Since 2017 LaTeX2e officially *requires* the additional e-TeX primitives.
* [*pdfTeX*](https://ctan.org/pkg/pdftex) is another extension of *TeX* that incorporates the e-TeX extensions and skips the intermediate DVI format to directly produce PDF documents.
    This is not only a convenience feature but it also allows to support some micro-typography features that make documents even more beautiful.
    pdfTeX is probably the most used TeX engine today.
* [*XeTeX*](https://ctan.org/pkg/xetex) (not to be confused with the now obsolete bidirectional engines [TeX--XeT](https://ctan.org/pkg/tex--xet) or [XeT-TeX](https://ctan.org/pkg/xet-tex) - seriously, what were they thinking?) is an answer to the 8-bit limitation that all the aforementioned engines suffer from.
    XeTeX incorporates both e-TeX extensions and pdfTeX's micro-typography but at the same time has full support for Unicode and modern font formats.
* [*LuaTeX*](https://ctan.org/pkg/luatex) is an extension of pdfTeX that uses [Lua](https://www.lua.org/) as embedded scripting language.
    Like XeTeX it uses Unicode and is able to use modern font formats.
    The declared goal of LuaTeX is to keep the core engine as small as possible and to delegate as much work as possible to Lua code.
    One of the less obvious advantages of LuaTeX is that you can get some advanced packages like the `graphdrawing` library for [TikZ](http://www.texample.net/tikz/examples/) that use sophisticated layout algorithms that would be very cumbersome to write in (La)TeX.
    On the downside, LuaTeX can be a bit slow to compile large documents (up to tens of seconds).

Maybe you have noticed that all these engines only have "TeX" in their name, but not "LaTeX".
That is, because, as we learned earlier, LaTeX is just a macro package written in TeX (or since 2017 more precisely e-TeX).
This means that an engine only has to support (e-)TeX primitives and is then automatically capable of loading LaTeX.
For all of the aforementioned engines (with the exception of TeX) there exists a variant of the compiler that uses Plain TeX and one that also loads LaTeX.
So when you are, for example, running the command `pdflatex`, you are invoking the *PdfTeX engine* with support for the *LaTeX macro package*.

If you are free to chose, I would suggest using either XeTeX, if you have no programming experience and no need for things like the `graphdrawing` library, or LuaTeX, if you like being able to hack a few lines of Lua into your documents to make them even more fancy.
In my opinion, the only reason to go back to pdfTeX and the awkward hacks and packages required for Unicode input and support for custom fonts is that you are writing an article for a journal that requires it.

## TeX distributions

When you have chosen a TeX engine that fits your needs, the next step is to find a *TeX distribution* to get an implementation of that engine running on your system. The main three distributions are the following:

* [*TeX Live*](https://www.tug.org/texlive/) was originally developed for Unix operating systems but is now also available on Windows.
    It is the default choice for all major Linux distributions.
    Although TeX Live includes it's own package manager `tlmgr`, it is highly recommended to let the package manager of your Linux distribution handle the selection and update of packages, because the different managers will not play nice together.
    There are usually a lot of packages named `texlive-something` from which you need to select what you want.
    This can be a bit difficult, since you have to find out in which TeX Live package actually contains the LaTeX package that you currently want to install.
    From my experience this means that most users will just install `texlive-full`, giving them access to all LaTeX packages on [CTAN](https://ctan.org/) with the downside of having to install some 5 GB of LaTeX code, Fonts and binaries.
    Thankfully, on ArchLinux you can get that down to around 1.8 GB with the `texlive-most` package that should also contain everything you will probably ever need.
* [MacTeX](http://www.tug.org/mactex/) contains a TeX Live system for macOS as well as some other Mac-specific utilities.
* [MiKTeX](https://miktex.org/about) was mainly developed for Windows, although it is now also available on Mac and some Linux distributions.
    It provides GUIs for most Settings and allows to install required packages on the fly during compilation of a document, which avoids the troubles of having to look up how to install a missing package.
    On Windows the user experience is quite frictionless which makes it a good default choice.

Here, the choice is as easy as it gets.
If you do not have any special requirements, just choose the default distribution for your operating system - TeX Live for Linux, MacTeX for macOS, and MiKTeX for Windows.

## TL;DR

I think posts about choices for the perfect LaTeX setup may become a series on this blog.
In these posts I want to take you on the journey I made when I encountered the question which of the alternatives you should use, but I also want to give you my (subjective) conclusion as a short recommendation of what setup worked best for me.

So for the question "Which version of LaTeX should I use?" I give you the following advice:

1. Do not waste any thoughts on your version of the TeX language or the LaTeX macro package.
    You are already using the right versions.
2. Use LaTeX, not ConTeXt, unless you are a designer and are not satisfied with the customization options of LaTeX.
3. Use the `lualatex` compiler. If it is too slow or you encounter any other problems, use `xelatex`. If your journal or somebody else forces you to, use `pdflatex`.
4. Choose your distribution based on your operating system: [TeX Live](https://www.tug.org/texlive/) with the `texlive-full` or `texlive-most` packages for Linux, [MacTeX](http://www.tug.org/mactex/) for macOS, and [MiKTeX](https://miktex.org/about) for Windows.
