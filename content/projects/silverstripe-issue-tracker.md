---
title: "Github Issue Tracker"
date: "2019-04-11"
draft: false
tags: ["VueJS", "GraphQL", "Serverless"]
summary: VueJS frontend to aggregate Github issues through their GraphQL API, deployed on Vercel
---

A relatively simple but powerful little app:
The [Silverstripe CMS](https://addons.silverstripe.org) "core" recipe is composed from over a hundred
individual modules, each with their own repository and issue tracker. This makes bug identification
and triage harder than necessary. Thankfully Github has a fantastic [GraphQL API](https://docs.github.com/en/graphql)
with a versatile search endpoint. I've started this project on a Hackday,
and with the help of a few [collaborators](https://github.com/silverstripe/github-issue-search-client/graphs/contributors),
it is still in active use years later.

Check out the [live application](http://silverstripe-issue-tracker.silverstripe.org/),
and read more about the drivers on the [silverstripe.org announcement](https://www.silverstripe.org/blog/searching-silverstripe-issues-just-got-a-lot-easier/).