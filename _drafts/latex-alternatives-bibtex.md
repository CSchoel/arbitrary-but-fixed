---
layout: post
title:  "LaTeX Alternatives: BibTeX versions"
description: >
    BibTeX can be a curse and a blessing at the same time for each thesis and scientific paper. In particular, beginners may be confused by the choices and the subtle differences between what is a bib-file, BibTeX, BibLaTeX and Biber. As I did before with LaTeX versions, I want to add a little bit of clarity to this confusion around BibTeX.
categories:
    - latex
    - latex alternatives
    - bibtex
---

Many students in technical courses around the world have cursed BibTeX—while silently also being very thankful for not having to create and manage a bibliography by hand.
When I was first introduced to the concept of automated reference management I could immediately see why it would make sense, but I was also quite confused what this magical [BibTeX](http://www.bibtex.org/) actually was.
Is it a file format, a software tool, a LaTeX package?
Is there a difference between BibTeX and BibLaTex?
Should I care?

Today we will try to shed a little bit of light on these questions as a followup to my recent [post about LaTeX versions]({% post_url 2020-02-16-latex-alternatives-versions %}).
There already is [an excellent StackExchange answer](https://tex.stackexchange.com/a/25702) by Alan Munn that discusses this topic, but I will try to add a little bit of my own perspective and opinion to give you a specific guideline what I think should be the best choice for you depending on your situation.

## BibTeX the file format vs BibTeX the software tool

First of all we need to clear up some confusion about terminology again.
The word "BibTeX" is both used to refer to a piece of reference management software and to the *file format* used by this software.

The BibTeX tool is intimately connected with the LaTeX macro package.
To understand what it is and does, let's follow a simple example from the code to the final PDF output:

```tex
\documentclass{article}
\begin{document}

BibTeX \cite{patashnik1988} is very good.

\bibliography{bib}{}
\bibliographystyle{plain}

\end{document}
```

This document uses the macros `\cite`, `\bibliography` and `\bibliographystyle` which are defined in LaTeX.
The `\bibliography` macro tells your TeX implementation that references are defined in a file called `bib.bib`, the `\cite` macro designates one specific entry of this `.bib` file that should be referenced in the text, and the `\bibliographystyle` macro designates a `.bst` file (in this case `bibtex/bst/base/plain.bst`) that defines how citations and bibliography entries should be formatted.

Creating `.bst` files is an entirely different beast, which we will not discuss here, since us ordinary mortals will hopefully never need to do that but can instead rely on predefined styles.
I refer the interested interested reader to [Tame the BeaST: The B to the X of BibTeX](http://tug.ctan.org/info/bibtex/tamethebeast/ttb_en.pdf) by Nicolas Markey, which does not only have the best name for a manual ever, but should also cover most if not all of your technical questions regarding BibTeX and `.bst` files.

Back to our example: We now know that our TeX engine will read our `.tex` file and determine that it needs the files `bib.bib` and `plain.bst`. The file `plain.bst` is contained in the LaTeX package, but `bib.bib` is a file that we need to provide ourselves.
This is the file format that is also often referred to as "BibTeX format".
It looks as follows:

```bibtex
@techreport{patashnik1988,
  title = {{{BibTeXing}}},
  author = {Patashnik, Oren},
  year = {1988},
  institution = {{Comprehensive TeX Archive Network}},
  number = {pkg/bibtex}
}
```

Entries always start with an `@` followed by the entry type and consist of an identifier like `patashnik1988` and a list of attributes as key-value pairs.
Each entry type has a list of mandatory attributes that are required to uniquely identify the document and a list of optional attributes that can provide additional information.
You may think of a `.bib` file as a database in text format.

Our LaTeX macros now produce another file with the extension `.aux` that is used as input for the BibTeX tool.

```tex
\relax 
\citation{patashnik1988}
\bibdata{bib}
\bibcite{patashnik1988}{1}
\bibstyle{plain}
```

As you can see this file again defines the citation keys, the `.bib` file and the `.bst` files to use, but now in a syntax that is to be read by the BibTeX tool.
The output of running `bibtex` once is then a `.bbl` file—you start to understand, why there are so many files popping up when you compile your LaTeX document, don't you?

```tex
\begin{thebibliography}{1}

\bibitem{patashnik1988}
Oren Patashnik.
\newblock {{BibTeXing}}.
\newblock Technical Report pkg/bibtex, {Comprehensive TeX Archive Network},
  1988.

\end{thebibliography}
```

This file again contains LaTeX code that is inserted at the position where you call the macro `\bibliography`.
You could actually now copy and paste the content of the `.bbl` file into the document and remove the `\bibliography` and `\bibliographystyle` commands.
Some scientific journals require you to do this so that your submission can consist of only a single file and the journal does not need to work out any issues with running BibTeX on your document.
Unfortunately they therefore require you to use a tool that has received only one major update since 1988 and offers no internationalization support whatsoever, but we get to that in a second.

So now that we have the `.bbl` file, your TeX engine needs to run again twice—once to incorporate the list of references in the document and a second time to tie the uses of `\cite` in the LaTeX-code to the respective entry in that reference list.
And this is the reason why the usual pipeline for compiling a LaTeX document with references is TeX-BibTeX-TeX-TeX.

So to sum up this means that we have a software tool called BibTeX that reads (among other files) reference information from a `.bib` file that is also often called a "BibTeX" file.
What makes matters worse is that not everything that ends with `.bib` is designed to be used as input for BibTeX.
Many different tools use this file format and sometimes allow different sets of entry types with different sets of mandatory and optional attributes.
We will get more into detail about that in the next section when we talk about BibLaTeX.

## Natbib vs BibLaTeX

On their own, the built-in LaTeX macros such as `\cite` actually are quite limited to the numerical reference style (e.g. `[1]`) or alphanumerical style (e.g. `[Pat88]`) that is prevalent in computer science and other technical domains.
LaTeX also only comes with three very basic styles `plain.bst`, `abbrv.bst` and `unsrt.bst` that only differ in the sorting and abbreviation of bibliography entries.
While BibTeX itself is flexible enough to also cover other citation styles such as author-year (e.g. `(Patashnik, 1988)`), this needs additional support in the form of `.bst` files that define the citation style and LaTeX macros that make using these styles more convenient.

There exist many packages that provide both such as `apalike` or `jurabib` and there even is a package called `custom-bib` that can generate `.bst` files based on a list of questions.
One of the most advanced and most widely used packages is `natbib` which especially provides support for author-year citations, which are common in the natural sciences.
It defines additional citation macros such as `\citet` for citing in text form (e.g. `Patashnik (1988)`) and `\citep` for citing in parentheses form (e.g. `(Patashnik, 1988)`) and provides settings for switching between these styles when using the default `\cite`.
It also has other macros such as `\citeauthor` which only prints the author or list of authors as it would appear in `\citet`, but without the year part.
This is useful when you want to have a citation style with parentheses, but still want to name the authors as part of a sentence.
For example, this

```tex
\citeauthor{smith2010} found that eating chocolate is good for your health \cite{smith2010}.
```

might become

```
Smith et al. found that eating chocolate is good for your health [1].
```

`natbib` defines its own version of the basic styles called `plainnat.bst`, `abbrvnat.bst` and `unsrtnat.bst`.
It also allows support for URL, DOI, and ISBN fields in `.bib` files, which is not included in standard LaTeX.
The `.bst` files generated by `custom-bib` are compatible with `natbib`, which means that there are [a lot of `.bst` files to choose from](https://www.google.com/search?q=%22The%20original%20source%20files%20were%22%20merlin.mbs%20%20with%20options%3a%22%20%2burl%3abst+site%3actan.org).

Up until now you may probably have found a style that works for you if you are looking to write a paper in computer science, engineering, math, or the natural sciences.
But what about other disciplines?
In the humanities, citations are much more involved, featuring footnotes instead of end notes, a citation style that involves the title of the cited work and a tracking of repeated citations of the same source which are then abbreviated by an *ibid.* instead of the title and author.
This is not possible by "just" extending the capabilities of LaTeX, but it requires a full rewrite of the LaTeX macros for reference management.

Luckily, the `biblatex` package does just that.
It was designed to do away with many of the shortcomings of traditional BibTeX, including missing support for internationalization (BibTeX is ASCII-only), the complicated and arcane details of defining bibliography styles in the `.bst` format, and missing convenience and customization features.
It still uses `.bib` files and can (for now) use the BibTeX tool, but it also includes its own Unicode-aware tool called Biber (which we will discuss in the next part) and allows to define citation styles with pure LaTeX code instead of `.bst` syntax.
The `.bib` files of BibLaTeX follow the same syntax, but the list of entry types and mandatory and optional attributes differs, with BibLaTeX usually providing more detailed information and support for modern publication aspects such as preprint servers.
BibLaTeX also defines many LaTeX macros and package options that make citations and customization of bibliography styles much more convenient.
Examples include options that control the number of authors shown before *et al.* is used, sorting mechanisms, punctuation, date formats or ibidem tracking.
Like `natbib`, BibLaTex also defines commands like `\citeauthor` and can even support all of the `natbib` commands with the package option `natbib=true`.
Also like `natbib`, it supports switching between citations styles based on package settings, but BibLaTeX's `\autocite` command handles many additional styles such as citations as footnotes or superscripts and is aware of punctuation.

The fact that citation styles are defined in LaTeX also adds an entirely different class of functionality:
BibLaTeX can transform and adjust the entries in your `.bib` file on the fly while loading it.
This removes a lot of the need to manually adjust `.bib` files that are created by other tools like [Zotero](https://www.zotero.org/).
For example, you can keep URLs for journal or conference articles, but when you use a verbose style that would unnecessarily include them in the bibliography, you do not have to remove them in the file but can instead add this piece of code to your LaTeX document.

```tex
\AtEveryBibitem{
  \ifentrytype{online}{}{ % if not @online
    \clearfield{url}
    \clearfield{urldate}
  }
}
```

To sum up, the only good reason to still use `natbib` over BibLaTeX is that you are forced to do so, because your journal either requires you to [copy and paste the `.bbl` file](https://tex.stackexchange.com/questions/12175/biblatex-submitting-to-a-journal) into the manuscript file or simply provides a citation style that is only compatible with `natbib`.
Of course the grim reality is sometimes, that even journals focusing on engineering use [styles that contain practices that have been deprecated for decades](https://tex.stackexchange.com/questions/427680/in-ieeetran-why-does-fontspec-package-automatically-change-the-font-type-once) or they might not even be compatible with `natbib` or BibLaTeX at all, forcing you to fall back to standard LaTeX support for citations.

## BibTeX vs Biber

In the last section about BibLaTeX we already learned that BibTeX has some limitations, especially regarding internationalization, and that BibLaTeX therefore provides Biber as an alternative to the BibTeX tool.
In fact, BibLaTeX will probably [drop support for the BibTeX backend](https://tex.stackexchange.com/a/37156) in future versions.
Now there you have another confusing name similarity for future LaTeX users!

To get a little bit more into detail we have to keep in mind that BibTeX is now 35 years old.
In 1985, internationalization was no big issue in the computer industry and running on pure 7 bit ASCII-code was fine.
The same is true for not supporting e.g. humanities-style citations, because in 1985, the the group of people in the humanities who would generally be interested in a tool like LaTeX and BibTeX was probably tiny to nonexistent.
For a long time, BibTeX was a very stable and invaluable tool for many scientists and also for more and more journals, but it has failed to keep up with time.
The only major update it received since 1988 was an improvement for printing URLs in 2010.
Although numerous features have been proposed for version 1.0, it has not yet been released, and the world has moved on without, or rather around, BibTeX.

An replacement called `bibtex8` was developed which at least provides support for 8-bit character sets such as Latin-1.
However, with the advent of Unicode-aware TeX engines such as XeTeX and LuaTeX this is still not satisfactory, which is one of the reasons that lead to the development of Biber.

Biber can (currently) only be used in conjunction with BibLaTex.
It provides full Unicode support in `.bib` files including Unicode keys and labels for entries.
It even supports other input formats such as Zotero RDF, Endnote XML and RIS.
Its sorting mechanism is also fully Unicode aware and it has [many other improvements](https://tex.stackexchange.com/a/37156) such as powerful cross reference capabilities.
One of the more interesting improvements is also the so called `sourcemap` option that allows to transform a `.bib` file while reading it.
It is similar to what you can do with macros such as `\AtEveryBibitem` in BibLaTex, but it is still more powerful since you can, for example, use full Perl 5.14 regular expressions to identify fields that should be changed.

To sum up, I think there is no denying that BibLaTeX and Biber are the future of reference management in the LaTeX world.
They provide good support for all languages and scientific domains, are highly and easily customizable, and convenient to use.
Of course, BibTeX has the advantage of being around for much longer and therefore having more widespread support.
Every system that supports LaTeX, also supports BibTeX.
From my experience, this is only an issue due to the extremely slow evolution of publishing software used by scientific journals.
Everybody else has moved on and all modern systems and platforms support XeTeX or LuaTeX with BibLaTeX and Biber.
For example, this is also true for reference management software like [Zotero](https://www.zotero.org/) with the [BetterBibTeX](https://retorque.re/zotero-better-bibtex/) addon and [JabRef](https://www.jabref.org/).


## TL;DR

As with the [post about LaTeX versions]({% post_url 2020-02-16-latex-alternatives-versions %}), I again want to give you a short personal recommendation which of the mentioned alternatives for reference management you should use based on your situation.

If you can freely choose, I would suggest using BibLaTeX with Biber and with the XeTeX or LuaTeX engine to have full Unicode support throughout your whole document and to enjoy the latest development and customization and convenience features.
If compatibility is an issue, you should instead stick with PdfTeX and the classic 7-bit BibTeX version for maximum support.
If possible, see if you can at least get support for `natbib`, which will make your life a little easier.

In any way you should be aware, that BibTeX and BibLaTeX are completely different systems with a different purpose and that both define a different set of entry types and attributes for `.bib` files.
This is the reason why some tools such as Zotero and JabRef distinguish between a BibTeX and a BibLaTeX format for their databases.
A BibTeX database will have less features, must be written in plain ASCII with LaTeX macros, and struggle with modern concepts such as preprints, but it will be supported by all tools and journals that support LaTeX.
A BibLaTeX database will have all the aforementioned features, but due to compatibility issues with decades old publishing software it might be necessary to convert it with [a Biber configuration file](https://users.aalto.fi/~mkouhia/2016/biblatex-to-bibtex-conversion/) before submitting your paper to a journal server.