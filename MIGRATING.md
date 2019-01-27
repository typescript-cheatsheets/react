# Migrating (to TypeScript) Cheatsheet

This Cheatsheet collates advice and utilities from real case studies of teams moving significant codebases from plain JS or Flow over to TypeScript. It makes no attempt to _convince_ people to do so, but we do collect what few statistics companies offer up after their conversion experience.

> ⚠️ This Cheatsheet is extremely new and could use all the help we can get. solid advice, results, and up to date content all welcome.

## General Conversion approaches

- Level 0: Don't use TypeScript, use JSDoc
  - See our [JSDoc section](#JSDoc)
- Level 1: Unstrict TypeScript
  - `"noImplicitAny": false`
  - "[Just rename all .js files to .ts](https://twitter.com/jamonholmgren/status/1089241726303199232)"
  - consider using `allowJS`? (Source: [clayallsop][clayallsop], [pleo][pleo])
- Level 2: Strict TypeScript
  - use Microsoft's [`dts-gen`](https://github.com/Microsoft/dts-gen) to generate `.d.ts` files for your untyped files. [This SO answer](https://stackoverflow.com/questions/12687779/how-do-you-produce-a-d-ts-typings-definition-file-from-an-existing-javascript) has more on the topic.
  - use `declare` keyword for ambient declarations
  

Misc tips/approaches successful companies have taken

- `@ts-ignore` on compiler errors for libraries with no typedefs
- pick ESLint over TSLint ([source](https://eslint.org/blog/2019/01/future-typescript-eslint))
- New code must always be written in TypeScript. No exceptions. For existing code: If your task requires you to change JavaScript code, you need to rewrite it. (Source: [Hootsuite][hootsuite])


<details>
<summary>
<b>
Webpack tips
</b>
</summary>

- webpack loader: `awesome-typescript-loader` vs `ts-loader`? (there is some disagreement in community about this)
- Webpack config:

```
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

</details>

## JSDoc

- https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript
- webpack's codebase uses JSDoc with linting by TS https://twitter.com/TheLarkInn/status/984479953927327744 (some crazy hack: https://twitter.com/thelarkinn/status/996475530944823296)

Problems to be aware of:

- `object` is converted to `any` for some reason.
- If you have an error in the jsdoc, you get no warning/error. TS just silently doesn't type annotate the function.
- [casting can be verbose](https://twitter.com/bahmutov/status/1089229349637754880)

(*thanks [Gil Tayar](https://twitter.com/giltayar/status/1089228919260221441) and [Gleb Bahmutov](https://twitter.com/bahmutov/status/1089229196247908353) for sharing above commentary*)

## From JS

- [TypeScript's official Guide for migrating from JS](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
- [Migrating a `create-react-app`/`react-scripts` app to TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript) - don't use `react-scripts-ts`
- [Migrating an EJECTED CRA app to TS](https://spin.atomicobject.com/2018/07/04/migrating-cra-typescript/)
- [Hootsuite][hootsuite]
- [Storybook's migration (PR)](https://github.com/storybooks/storybook/issues/5030)
- [How we migrated a 200K+ LOC project to TypeScript and survived to tell the story][coherentlabs] - Coherent Labs - using `grunt-ts`, jQuery and Kendo UI

Old content that is possibly out of date

- [Incrementally Migrating JS to TS][clayallsop] (old)
- [Microsoft's TypeScript React Conversion Guide][mstsreactconversionguide] (old)

## From Flow

- [Incremental Migration to TypeScript on a Flowtype codebase][entria] at Entria
- [Jest's migration (PR)](https://github.com/facebook/jest/pull/7554#issuecomment-454358729)
- [Expo's migration (issue)](https://github.com/expo/expo/issues/2164)
- [Atlassian's migration (PR)](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Yarn's migration (issue)](https://github.com/yarnpkg/yarn/issues/6953)

## Results

- Number of production deploys doubled for [Hootsuite][hootsuite]

## Misc writeups by notable companies

- [Lyft](https://eng.lyft.com/typescript-at-lyft-64f0702346ea)
- [Google](http://neugierig.org/software/blog/2018/09/typescript-at-google.html)

## Links

[hootsuite]: https://medium.com/hootsuite-engineering/thoughts-on-migrating-to-typescript-5e1a04288202 'Thoughts on migrating to TypeScript'
[clayallsop]: https://medium.com/@clayallsopp/incrementally-migrating-javascript-to-typescript-565020e49c88 'Incrementally Migrating JavaScript to TypeScript'
[pleo]: https://medium.com/pleo/migrating-a-babel-project-to-typescript-af6cd0b451f4 'Migrating a Babel project to TypeScript'
[mstsreactconversionguide]: https://github.com/Microsoft/TypeScript-React-Conversion-Guide 'TypeScript React Conversion Guide'
[entria]: https://medium.com/entria/incremental-migration-to-typescript-on-a-flowtype-codebase-515f6490d92d 'Incremental Migration to TypeScript on a Flowtype codebase'
[coherentlabs]: https://hashnode.com/post/how-we-migrated-a-200k-loc-project-to-typescript-and-survived-to-tell-the-story-ciyzhikcc0001y253w00n11yb 'How we migrated a 200K+ LOC project to TypeScript and survived to tell the story'
