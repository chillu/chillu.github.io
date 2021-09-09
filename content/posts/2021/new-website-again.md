---
title: "New website ... again!"
date: 2021-09-08T16:26:05+12:00
draft: false
---

In the great tradition of my people (developers),
I have taken to rebuilding my personal website, again.
Apart from [building your own CMS](https://silverstripe.org),
this appears to be a rite of passage at least for my generation.
It's on [Hugo](https://gohugo.io) now, a blazingly fast system built on [Golang](https://golang.org).
Hey, at least I didn't put it on a Kubernetes cluster!
To celebrate the occasion, I'm looking back the tools I've used over the years.

My theory is that for most devs, their personal website is **just enough production** to
drive applied learning. It strikes the right balance between technology exploration
and only jumping into every third rabbit hole because there's some self-made pressure to deliver.

Technically my website was "born" on [Geocities](https://en.wikipedia.org/wiki/Yahoo!_GeoCities) in 1998, built on
[Netobjects Fusion](https://en.wikipedia.org/wiki/NetObjects_Fusion).
The cool kids today would call it a "Static Site Generator". Thankfully it has not been
preserved in the [Geocities Archive](https://archive.org/web/geocities.php).
For a while it was on [Textpattern](https://en.wikipedia.org/wiki/Textpattern), a PHP blogging engine
that served as a precursor to Wordpress. In 2004, it moved to [Typo3](/posts/2004/2004-07-12-finally-online),
with a hilariously complicated configuration language that took hours to build a menu as an HTML unordered list.

Funnily enough, despite working for 15 years with [Silverstripe CMS](https://silverstripe.org),
my blog instead jumped to [Mephisto](http://mephistoblog.com) and Ruby. It taught me the value
(and complexity) of atomic deployments through Capistrano. Then I got busy, and made a fateful
switch away from self-hosting towards [Tumblr](https://tumblr.com). 

Which brings us to the current [Hugo](https://gohugo.io) implementation.
It's pretty close to the simplest viable option if you want to avoid SaaS lock-in of your content:
A static site, with the [source](https://github.com/chillu/chillu.github.io) hosted on Github,
and deployed with a few lines of YAML via [Github Pages](https://pages.github.com).

The most amazing part is that the content survived five transitions,
first as HTML and then as Markdown. Portable standards are a powerful thing.
I like to think that some of the content gained a "digital patina" over the years,
with small conversion gaps along the way. But it's mine, and I love it!