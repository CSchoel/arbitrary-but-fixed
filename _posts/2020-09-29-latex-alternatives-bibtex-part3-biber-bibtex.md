---
layout: post
title: 'LaTeX Alternatives: BibTeX Part 3, BibTeX vs Biber'
description: 'BibTeX can be a curse and a blessing at the same time for each thesis
  and scientific paper. In particular, beginners may be confused by the choices and
  the subtle differences between what is a bib-file, BibTeX, BibLaTeX and Biber. This
  is part one of a series of posts that try to clarify the terminology and technological
  differences of tools related to BibTeX. This part specifically deals with the difference
  between the BibTeX and the Biber engine for reference management.

  '
categories:
- latex
- latex alternatives
- bibtex
date: 2020-09-29 19:34 +0200
---
In my small series on BibTeX I already covered confusions around the [use of the term "BibTeX"]({% post_url 2020-06-28-latex-alternatives-bibtex-part1-terminology %}) for either a tool or a file format as well as the packages [Natbib and BibLaTeX]({% post_url 2020-08-14-latex-alternatives-bibtex-part2-natbib-biblatex %}) that can facilitate the handling and styling of citations and bibliographies in LaTeX documents.
Today we continue the series by looking at the BibTeX engine, its limitations, and the Biber engine as an alternative.

## BibTeX vs Biber

In the last post about BibLaTeX we already learned that BibTeX has some limitations, especially regarding internationalization, and that BibLaTeX therefore provides Biber as an alternative to the BibTeX tool.
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