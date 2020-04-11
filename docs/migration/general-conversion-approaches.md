---
id: general_conversion_approaches
title: General Conversion approaches
---

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
