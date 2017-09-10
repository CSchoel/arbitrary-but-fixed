---
layout: post
title:  "Spurious extra space after social media icons in Jekyll's Minima theme"
description: >
    The current version of the Minima theme for Jekyll has some additional space between the social media icons and the account name that is not specified in the stylesheet. The reason for this is simple, but not obvious.
date:   2017-08-20 21:16:00 +0200
categories:
    - web design
---

When I created this blog, I wanted to add some small changes to the default Jekyll theme called Minima.
One of these changes was that I added an additional social media link for my ResearchGate account.
I created a small image for the logo and added it to the template with the same markup as the other icons.

This is the original template for the integration of the Github account:

{% raw %}
```liquid
<a href="https://github.com/{{ include.username }}"><span class="icon icon--github">{% include icon-github.svg %}</span><span class="username">{{ include.username }}</span></a>
```
{% endraw %}

And this is my template for integrating a ResearchGate account:

{% raw %}
```liquid
<a href="https://www.researchgate.net/profile/{{ include.username }}"><img class="icon icon--rg" src="{{ "assets/rg.png" | relative_url }}" alt="Research gate"/><span class="username">{{ include.displayname }}</span></a>
```
{% endraw %}

The only difference is the use of an `<ìmg>` tag instead of the `<span>` that surrounds the SVG file. We have the CSS-class `icon` for padding and positioning relative to the account name and the image is 16x16 pixels, just as the SVG for the Github icon. So this should work out fine, right?

However, the result actually looked like this:

<ul class="social-media-list">
  <li>
    <a href="https://github.com/CSchoel"><span class="icon icon--github"><svg viewBox="0 0 16 16" width="16px" height="16px"><path fill="#828282" d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"/></svg>
    </span><span class="username">CSchoel</span></a>
  </li>
  <li>
    <a href="https://www.researchgate.net/profile/Christopher_Schoelzel2"><img class="icon icon--rg" src="{{ "/assets/rg.png" | relative_url }}" alt="Research gate"/><span class="username">C. Schölzel</span></a>
  </li>  
</ul>

There is more space after the Github icon than after the ResearchGate icon.

## It's not the CSS

Where does this additional space come from? It has to be some margin or padding of one of the elements, right?
Wrong again.
The `<svg>` element is 16x16 pixel wide as it should be and the only margin or padding involved are 10 pixels of padding to the right of the `<span>` element surrounding the Github icon and the `<img>` element for the ResearchGate icon.
The problem is that somehow the actual *content width* of the `<span>` element is about 4 pixels larger than it should be (depending on the Browser).

## Newlines don't matter in HTML - except when they do

The reason for the spurious space is an innocent newline character at the end of the SVG file for the Github icon.
We conditioned ourselves to ignore newline characters when it comes to HTML, but they can matter in a horizontal context.

This

```html
<span>no</span><span>space</span>
```

renders differently than this

```html
<span>no
</span><span>space</span>
```

as you can see:

<p><div>
    <span>no</span><span>space</span>
</div>
<div>
    <span>no
    </span><span>space</span>
</div></p>

So the take home message is: If your margin or padding is off and you cannot spot the error in the CSS, it might actually be some whitespace character that you did not notice.