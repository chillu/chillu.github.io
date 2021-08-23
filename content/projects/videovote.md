---
title: "Videovote: Simple video suggestion and voting app in Meteor and React"
date: 2015-10-01
draft: false
externalUrl: "https://github.com/chillu/videovote"
---

[https://github.com/chillu/videovote](https://github.com/chillu/videovote)

Allows users to suggest videos by pasting in their URLs. 
The app will automatically retrieve and list details on the video via the oEmbed protocol.
By authenticating via Github, users can also vote on videos.

The use case for this app is company-internal "lunch and learn" sessions,
where a group of devs get together to watch interesting conference talks.
This was used in "production" at Silverstripe for a number of years.

It was a great way of learning the benefits and traps of using
a "full stack" framework ([MeteorJS](https://www.meteor.com/)).
The client/server data binding and built-in websocket transport layer
felt quite magical. As usual, once you pull back the curtain
on these "broad" frameworks it tends to get quite messy.