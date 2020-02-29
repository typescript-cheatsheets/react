<div align="center">

<a href="https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
    align="left"
  />
</a>

<p>Cheatsheets for experienced React developers getting started with TypeScript</p>

[**Basic**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#basic-cheatsheet-table-of-contents) |
[**Advanced**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md) |
[**Migrating**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/MIGRATING.md) |
[**HOC**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/HOC.md) |
[中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) |
[**Español**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet-es) |
[Contribute!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose)

</div>

---

# Migrating (to TypeScript) Cheatsheet

This Cheatsheet collates advice and utilities from real case studies of teams moving significant codebases from plain JS or Flow over to TypeScript. It makes no attempt to _convince_ people to do so, but we do collect what few statistics companies offer up after their conversion experience.

> ⚠️ This Cheatsheet is extremely new and could use all the help we can get. Solid advice, results, and up to date content all welcome.

## Prerequsite

Read [TypeScript's official Guide for migrating from JS](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) and you should already be familiar with their [React conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide).

## General Conversion approaches

- Level 0: Don't use TypeScript, use JSDoc
  - See our [JSDoc section](#JSDoc)
- Level 1A: Majority JavaScript, increasingly strict TypeScript
  - as recommended by [official TS guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
  - use `allowJS` (Experiences: [clayallsop][clayallsop], [pleo][pleo])
- Level 1B: Total rename to TypeScript from the start
  - "[Just rename all .js files to .ts](https://twitter.com/jamonholmgren/status/1089241726303199232)"?
  - use the loosest, bare minimum settings to start with
- Level 2: Strict TypeScript
  - use Microsoft's [`dts-gen`](https://github.com/Microsoft/dts-gen) to generate `.d.ts` files for your untyped files. [This SO answer](https://stackoverflow.com/questions/12687779/how-do-you-produce-a-d-ts-typings-definition-file-from-an-existing-javascript) has more on the topic.
  - use `declare` keyword for ambient declarations - see [declaration merging](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#troubleshooting-handbook-bugs-in-official-typings) to patch library declarations inline

Misc tips/approaches successful companies have taken

- `@ts-ignore` on compiler errors for libraries with no typedefs
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

## JSDoc

- https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript
- webpack's codebase uses JSDoc with linting by TS https://twitter.com/TheLarkInn/status/984479953927327744 (some crazy hack: https://twitter.com/thelarkinn/status/996475530944823296)

Problems to be aware of:

- `object` is converted to `any` for some reason.
- If you have an error in the jsdoc, you get no warning/error. TS just silently doesn't type annotate the function.
- [casting can be verbose](https://twitter.com/bahmutov/status/1089229349637754880)

(_thanks [Gil Tayar](https://twitter.com/giltayar/status/1089228919260221441) and [Gleb Bahmutov](https://twitter.com/bahmutov/status/1089229196247908353) for sharing above commentary_)

## From JS

### Automated JS to TS Conversion

- [TypeStat](https://github.com/JoshuaKGoldberg/TypeStat) ([used by Codecademy](https://mobile.twitter.com/JoshuaKGoldberg/status/1159090281314160640))
- [TypeWiz](https://github.com/urish/typewiz)
- [js-to-ts-converter](https://github.com/gregjacobs/js-to-ts-converter)

### Manual JS to TS Conversion

the "Just Renaming" strategy

- OSX/Linux: `find src -name "*.js" -exec sh -c 'mv"$0" "${0%.js}.tsx"' {} \;`

You can either load typescript files with webpack, or use the `tsc` compiler to compile your TS files to JS side by side. The basic `tsconfig.json` is:

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

Then you will want to enable it to check JS:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

If you have a large codebase and this throws too many errors at once, you can opt out problematic files with `//@ts-nocheck`, or instead turn off `checkJs` and add a `//@ts-check` directive at the top of each regular JS file.

TypeScript should throw up some egregious errors here which should be easy to fix.

Once you are done, swallow the red pill by turning off implicit `any`'s:

```js
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noImplicitAny": true // or "strict": true
  }
}
```

This will raise a bunch of type errors and you can start converting files to TS or (optionally) use [JSDoc annotations](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html) in your JS.

A common practice here is using an ambient TODO type alias for `any` so you can keep track of what you need to come back to:

```ts
type TODO_TYPEME = any;
export function myFunc(foo: TODO_TYPEME, bar: TODO_TYPEME): number {
  // ...
}
```

Gradually add [more `strict` mode flags](https://www.typescriptlang.org/docs/handbook/compiler-options.html) like `noImplicitThis`, `strictNullChecks`, and so on until you can eventually just run in full strict mode with no js files left:

```js
{
  "compilerOptions": {
    "strict": true
  }
}
```

**More resources**

- [Adopting TypeScript at Scale - AirBnB's conversion story and strategy](https://www.youtube.com/watch?v=P-J9Eg7hJwE)
- [Migrating a `create-react-app`/`react-scripts` app to TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript) - don't use `react-scripts-ts`
- [Migrating an EJECTED CRA app to TS](https://spin.atomicobject.com/2018/07/04/migrating-cra-typescript/)
- [Lyft's JS to TS migration tool](https://github.com/lyft/react-javascript-to-typescript-transform) (includes PropTypes migration)
- [Hootsuite][hootsuite]
- [Storybook's migration (PR)](https://github.com/storybooks/storybook/issues/5030)
- [How we migrated a 200K+ LOC project to TypeScript and survived to tell the story][coherentlabs] - Coherent Labs - using `grunt-ts`, jQuery and Kendo UI

Old content that is possibly out of date

- [Incrementally Migrating JS to TS][clayallsop] (old)
- [Microsoft's TypeScript React Conversion Guide][mstsreactconversionguide] (old)

## From Flow

- Try flow2ts: `npx flow2ts` - doesn't work 100% but saves some time ([see this and other tips from @braposo](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/79#issuecomment-458227322) at TravelRepublic)
- [Incremental Migration to TypeScript on a Flowtype codebase][entria] at Entria
- [MemSQL's Studio's migration](https://davidgom.es/porting-30k-lines-of-code-from-flow-to-typescript/) - blogpost with many useful tips
- Retail-UI's Codemod: https://github.com/skbkontur/retail-ui/tree/master/packages/react-ui-codemodes/flow-to-ts
- Quick-n-dirty [Flow to TS Codemod](https://gist.github.com/skovhus/c57367ce6ecbc3f70bb7c80f25727a11)
- [Ecobee's brief experience](https://mobile.twitter.com/alanhietala/status/1104450494754377728)
- [Migrating a 50K SLOC Flow + React Native app to TypeScript](https://blog.usejournal.com/migrating-a-flow-react-native-app-to-typescript-c74c7bceae7d)

## Results

- Number of production deploys doubled for [Hootsuite][hootsuite]
- Found accidental globals for [Tiny][tiny]
- Found incorrect function calls for [Tiny][tiny]
- Found rarely used, buggy code that was untested for [Tiny][tiny]

## Academic Studies of Migration

- [To Type or Not to Type: Quantifying Detectable Bugs in JavaScript](http://earlbarr.com/publications/typestudy.pdf)

> Our central finding is that both static type systems find an important percentage of public bugs: both Flow 0.30 and TypeScript 2.0 successfully detect 15%!

## Misc migration stories by notable companies and open source

- [Adopting TypeScript at Scale - AirBnB's conversion story and strategy](https://www.youtube.com/watch?v=P-J9Eg7hJwE)
- [Lyft](https://eng.lyft.com/typescript-at-lyft-64f0702346ea)
- [Google](http://neugierig.org/software/blog/2018/09/typescript-at-google.html)
- [Tiny][tiny] - [Talk from ForwardJS here](https://www.slideshare.net/tiny/porting-100k-lines-of-code-to-typescript)
- [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d) ([podcast](https://softwareengineeringdaily.com/2017/08/11/typescript-at-slack-with-felix-rieseberg/))
- [Netflix adoption story](https://www.youtube.com/watch?v=p5Hwb1YbNMY&feature=share)
- [Priceline](https://medium.com/priceline-labs/trying-out-typescript-part-1-15a5267215b9)
- Dropbox - [Talk at React Loop](https://www.youtube.com/watch?v=veXkJq0Z2Qk)

Open Source

- [Jest's migration (PR)](https://github.com/facebook/jest/pull/7554#issuecomment-454358729)
- [Expo's migration (issue)](https://github.com/expo/expo/issues/2164)
- [Google Workbox migration](https://github.com/GoogleChrome/workbox/pull/2058)
- [Chrome Dev Tools related issues](https://twitter.com/TimvdLippe/status/1220393069792694281)
- [Atlassian's migration (PR)](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Yarn's migration (issue)](https://github.com/yarnpkg/yarn/issues/6953)
- [React Native CLI](https://github.com/react-native-community/cli/issues/683)
- [Next.js](https://nextjs.org/blog/next-9)
- [React Router](https://github.com/ReactTraining/react-router/issues/6955)
- [Redux](https://github.com/reduxjs/redux/pull/3536)
- [Dojo 1 -> 2 migration](https://devchat.tv/js-jabber/jsj-277-dojo-2-dylan-schiemann-kitson-kelly/)

## Links

[hootsuite]: https://medium.com/hootsuite-engineering/thoughts-on-migrating-to-typescript-5e1a04288202 "Thoughts on migrating to TypeScript"
[clayallsop]: https://medium.com/@clayallsopp/incrementally-migrating-javascript-to-typescript-565020e49c88 "Incrementally Migrating JavaScript to TypeScript"
[pleo]: https://medium.com/pleo/migrating-a-babel-project-to-typescript-af6cd0b451f4 "Migrating a Babel project to TypeScript"
[mstsreactconversionguide]: https://github.com/Microsoft/TypeScript-React-Conversion-Guide "TypeScript React Conversion Guide"
[entria]: https://medium.com/entria/incremental-migration-to-typescript-on-a-flowtype-codebase-515f6490d92d "Incremental Migration to TypeScript on a Flowtype codebase"
[coherentlabs]: https://hashnode.com/post/how-we-migrated-a-200k-loc-project-to-typescript-and-survived-to-tell-the-story-ciyzhikcc0001y253w00n11yb "How we migrated a 200K+ LOC project to TypeScript and survived to tell the story"
[tiny]: https://go.tiny.cloud/blog/benefits-of-gradual-strong-typing-in-javascript/ "Benefits of gradual strong typing in JavaScript"
