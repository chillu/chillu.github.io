---
title: "Echt: A social network based on face recognition"
date: 2017-12-01
draft: false
externalUrl: "https://github.com/bnolan/echt-server"
tags: ["nodejs", "serverless", "react", "machinelearning"]
---

On Github: [server](https://github.com/bnolan/echt-server) and [client](https://github.com/bnolan/echt-client)

Worked with my good friend [@bnolan](https://github.com/bnolan) to realise his idea
for a minimalistic social network based on selfies and facial recognition.
In short, you join by taking a photo, and you "friend" someone by taking a selfie with them.
Being physically in the same space with the other person is a feature, not a bug.
We've taken this idea to PoC stage and tested it with a few friends, before it lost steam.
It was super fun working through the user experience and edge cases,
as well as building on lots of (then) relatively new technology.

The server uses NodeJS through [Express](http://expressjs.com),
deployed on AWS Lambda via the the [ClaudiaJS](https://claudiajs.com) serverless framework.
Data is stored in AWS DynamoDB, although the NoSQL aspects (e.g. secondary indexes) have given us a bit of grief.
Face recognition is performed through [AWS Rekognition](https://aws.amazon.com/rekognition/).

The client uses [React Native](https://facebook.github.io/react-native/) for a smooth
end user experience, with [MobX](https://mobx.js.org) for state management.
We learned lots about an iOS development workflow overlaid with
a web development workflow (leaky abstractions...). And realised that the learning curve
becomes pretty steep if one of the iOS/Javascript bridges don't work as expected.
In our case the chosen camera plugin for React Native really didn't like 
being placed in two application screens.s