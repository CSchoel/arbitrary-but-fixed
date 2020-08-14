---
layout: post
title:  "LaTeX Alternatives: BibTeX Part 1, Terminology"
description: >
    BibTeX can be a curse and a blessing at the same time for each thesis and scientific paper.
    In particular, beginners may be confused by the choices and the subtle differences between what is a bib-file, BibTeX, BibLaTeX and Biber.
    This is part one of a series of posts that try to clarify the terminology and technological differences of tools related to BibTeX.
    This part specifically deals with the ambiguous use of the term BibTeX.
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

I originally planned this as one single post, but it turns out there is enough to say about BibTeX to make a small series out of this.
Therefore this post will only focus on the terminological confusions arount the term "BibTeX".

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
  title = {% raw %}{{{BibTeXing}}}{% endraw %},
  author = {Patashnik, Oren},
  year = {1988},
  institution = {% raw %}{{Comprehensive TeX Archive Network}}{% endraw %},
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
\newblock {% raw %}{{BibTeXing}}{% endraw %}.
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
We will get more into detail about that in one of the followup posts where I discuss BibLaTeX.
