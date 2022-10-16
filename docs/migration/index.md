---
id: intro
sidebar_label: Intro
title: Migrating (to TypeScript) Cheatsheet
---

This Cheatsheet collates advice and utilities from real case studies of teams moving significant codebases from plain JS or Flow over to TypeScript. It makes no attempt to _convince_ people to do so, but we do collect what few statistics companies offer up after their conversion experience.

> ⚠️ This Cheatsheet is extremely new and could use all the help we can get. Solid advice, results, and up to date content all welcome.

## Prerequisite

Read [TypeScript's official Guide for migrating from JS](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) and you should already be familiar with their [React conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide).

## General Conversion approaches

- Level 0: Don't use TypeScript, use JSDoc
  - See our [JSDoc section](./js-docs.md)
- Level 1A: Majority JavaScript, increasingly strict TypeScript
  - as recommended by [official TS guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
  - use `allowJS` (Experiences: [clayallsop][clayallsop], [pleo][pleo])
- Level 1B: Total rename to TypeScript from the start
  - "[Just rename all .js files to .ts](https://twitter.com/jamonholmgren/status/1089241726303199232)"?
  - use the loosest, bare minimum settings to start with
- Level 2: Strict TypeScript
  - use Microsoft's [`dts-gen`](https://github.com/Microsoft/dts-gen) to generate `.d.ts` files for your untyped files. [This SO answer](https://stackoverflow.com/questions/12687779/how-do-you-produce-a-d-ts-typings-definition-file-from-an-existing-javascript) has more on the topic.
  - use `declare` keyword for ambient declarations - see [declaration merging](https://github.com/typescript-cheatsheets/react#troubleshooting-handbook-bugs-in-official-typings) to patch library declarations inline

Misc tips/approaches successful companies have taken

- `@ts-expect-error` on compiler errors for libraries with no typedefs
- pick ESLint over TSLint (source: [ESLint](https://eslint.org/blog/2019/01/future-typescript-eslint) and [TS Roadmap](https://github.com/Microsoft/TypeScript/issues/29288)). [You can convert TSlint to ESlint with this tool](https://github.com/typescript-eslint/tslint-to-eslint-config).
- New code must always be written in TypeScript. No exceptions. For existing code: If your task requires you to change JavaScript code, you need to rewrite it. (Source: [Hootsuite][hootsuite])

<details>
<summary>
<b>
Webpack tips
</b>
</summary>

- webpack loader: `awesome-typescript-loader` vs `ts-loader`? (there is some disagreement in community about this - but read [awesome's point of view](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader))
- Webpack config:

```js
module.exports = {

resolve: {
-    extensions: ['.js', '.jsx']
+    extensions: ['.ts', '.tsx', '.js', '.jsx']
},

// Source maps support ('inline-source-map' also works)
devtool: 'source-map',

// Add the loader for .ts files.
module: {
  loaders: [{
-       test: /\.jsx?$/,
-       loader: 'babel-loader',
-       exclude: [/node_modules/],
+       test: /\.(t|j)sx?$/,
+       loader: ['awesome-typescript-loader?module=es6'],
+       exclude: [/node_modules/]
+   }, {
+       test: /\.js$/,
+       loader: 'source-map-loader',
+       enforce: 'pre'
  }]
}
};
```

Special note on `ts-loader` and 3rd party libraries: https://twitter.com/acemarke/status/1091150384184229888

</details>

## Academic Studies of Migration

> Note: Empirical Software Engineering is desirable, but [extremely hard](https://hillelwayne.com/talks/what-we-know-we-dont-know/). Please be gentle but also please share if you find quality research!

- [To Type or Not to Type: Quantifying Detectable Bugs in JavaScript](http://earlbarr.com/publications/typestudy.pdf)

> Our central finding is that both static type systems find an important percentage of public bugs: both Flow 0.30 and TypeScript 2.0 successfully detect 15%!

- [Empirical study on the impact of static typing](https://www.researchgate.net/publication/259634489_An_empirical_study_on_the_impact_of_static_typing_on_software_maintainability)

see also [Things I was Wrong About: Types](https://v5.chriskrycho.com/journal/things-i-was-wrong-about/1-types/) and [A Large Scale Study of Programming Languages
and Code Quality in GitHub](https://web.cs.ucdavis.edu/~filkov/papers/lang_github.pdf)

## Misc migration stories by notable companies and open source

- (2022) Stripe: https://stripe.com/blog/migrating-to-typescript ([podcast](https://devtools.fm/episode/33), [tweet](https://twitter.com/alunny/status/1501261144341680130))
- [Bloomberg](https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/) - [Podcast form](https://talkscript.sitepen.com/episode-57-typescript-at-scale/)
- [Adopting TypeScript at Scale - AirBnB's conversion story and strategy](https://www.youtube.com/watch?v=P-J9Eg7hJwE)
- Airtable's [Big Bang Migration from Flow to TS](https://medium.com/airtable-eng/the-continual-evolution-of-airtables-codebase-migrating-a-million-lines-of-code-to-typescript-612c008baf5c)
- [Lyft](https://eng.lyft.com/typescript-at-lyft-64f0702346ea)
- [Google](http://neugierig.org/software/blog/2018/09/typescript-at-google.html)
- [Tiny][tiny] - [Talk from ForwardJS here](https://www.slideshare.net/tiny/porting-100k-lines-of-code-to-typescript)
- [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d) ([podcast](https://softwareengineeringdaily.com/2017/08/11/typescript-at-slack-with-felix-rieseberg/))
- [Etsy](https://codeascraft.com/2021/11/08/etsys-journey-to-typescript/)
- [Netflix adoption story](https://www.youtube.com/watch?v=p5Hwb1YbNMY&feature=share)
- [Priceline](https://medium.com/priceline-labs/trying-out-typescript-part-1-15a5267215b9)
- Dropbox
  - [Talk at React Loop](https://www.youtube.com/watch?v=veXkJq0Z2Qk)
  - [Blogpost: The Great CoffeeScript to TypeScript Migration of 2017](https://dropbox.tech/frontend/the-great-coffeescript-to-typescript-migration-of-2017)
- [Heap - How we failed, then succeeded, at migrating to TypeScript](https://heap.io/blog/migrating-to-typescript)
- Execute Program (Gary Bernhardt) https://www.executeprogram.com/blog/porting-to-typescript-solved-our-api-woes

Open Source

- [Jest's migration (PR)](https://github.com/facebook/jest/pull/7554#issuecomment-454358729)
- [Expo's migration (issue)](https://github.com/expo/expo/issues/2164)
- [Google Workbox migration](https://github.com/GoogleChrome/workbox/pull/2058)
- [Chrome Dev Tools related issues](https://twitter.com/TimvdLippe/status/1220393069792694281)
- [Atlassian's migration (PR)](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Yarn's migration (issue)](https://github.com/yarnpkg/yarn/issues/6953)
- [React Native CLI](https://github.com/react-native-community/cli/issues/683)
- [Next.js](https://nextjs.org/blog/next-9)
- React Router
  - [v5 attempt](https://github.com/ReactTraining/react-router/issues/6955)
  - [React Router v6](https://github.com/ReactTraining/react-router/releases/tag/v6.0.0-alpha.4)
  - [history](https://github.com/ReactTraining/history/pull/774) - [final](https://github.com/ReactTraining/history/commit/1e91a64a858604062d804e4d51eb1d2a020a95c8)
- [Docusaurus v2](https://github.com/facebook/docusaurus/pull/2578)
- [Gatsby](https://github.com/gatsbyjs/gatsby/issues/21995)
- [Redux](https://github.com/reduxjs/redux/pull/3536)
- [Theme-UI](https://github.com/system-ui/theme-ui/issues/668)
- [Hasura Console](https://github.com/hasura/graphql-engine/issues/4314)
- [Storybook](https://github.com/storybookjs/storybook/pulls?page=4&q=is%3Apr+sort%3Aupdated-desc+is%3Aclosed+typescript+label%3Atypescript)
- [Dojo 1 -> 2 migration](https://topenddevs.com/podcasts/javascript-jabber/episodes/jsj-277-dojo-2-with-dylan-schiemann-and-kitson-kelly)

## Migration Results

- Number of production deploys doubled for [Hootsuite][hootsuite]
- Found accidental globals for [Tiny][tiny]
- Found incorrect function calls for [Tiny][tiny]
- Found rarely used, buggy code that was untested for [Tiny][tiny]

[clayallsop]: https://medium.com/@clayallsopp/incrementally-migrating-javascript-to-typescript-565020e49c88 "Incrementally Migrating JavaScript to TypeScript"
[pleo]: https://medium.com/pleo/migrating-a-babel-project-to-typescript-af6cd0b451f4 "Migrating a Babel project to TypeScript"
[tiny]: https://go.tiny.cloud/blog/benefits-of-gradual-strong-typing-in-javascript/ "Benefits of gradual strong typing in JavaScript"
[entria]: https://medium.com/entria/incremental-migration-to-typescript-on-a-flowtype-codebase-515f6490d92d "Incremental Migration to TypeScript on a Flowtype codebase"
[mstsreactconversionguide]: https://github.com/Microsoft/TypeScript-React-Conversion-Guide "TypeScript React Conversion Guide"
[coherentlabs]: https://hashnode.com/post/how-we-migrated-a-200k-loc-project-to-typescript-and-survived-to-tell-the-story-ciyzhikcc0001y253w00n11yb "How we migrated a 200K+ LOC project to TypeScript and survived to tell the story"
[hootsuite]: https://medium.com/hootsuite-engineering/thoughts-on-migrating-to-typescript-5e1a04288202 "Thoughts on migrating to TypeScript"
