---
id: from_js
title: From JS
---

## Automated JS to TS Conversion

- [TypeStat](https://github.com/JoshuaKGoldberg/TypeStat) ([used by Codecademy](https://mobile.twitter.com/JoshuaKGoldberg/status/1159090281314160640))
- [TypeWiz](https://github.com/urish/typewiz)
- [js-to-ts-converter](https://github.com/gregjacobs/js-to-ts-converter)
- [TS-migrate](https://github.com/airbnb/ts-migrate) used in [Airbnb's conversion](https://medium.com/airbnb-engineering/ts-migrate-a-tool-for-migrating-to-typescript-at-scale-cd23bfeb5cc)
- [dts-gen](https://github.com/microsoft/dts-gen) - `dts-gen` is a tool that generates TypeScript definition files (.d.ts) from any JavaScript object.

for JSON - http://json2ts.com/ generate TypeScript interfaces from JSON

## Manual JS to TS Conversion

the "Just Renaming" strategy

- OSX/Linux: `find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.tsx"' {} \;`

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

## 3 Step Process

![image](https://user-images.githubusercontent.com/6764957/91499410-f1399080-e8f3-11ea-86f8-431266af713b.png)

https://speakerdeck.com/amhinson/convert-a-react-native-project-to-typescript-in-10-minutes?slide=23

## More resources

- [Adopting TypeScript at Scale - AirBnB's conversion story and strategy](https://www.youtube.com/watch?v=P-J9Eg7hJwE) - their [ts-migrate tool here](https://medium.com/airbnb-engineering/ts-migrate-a-tool-for-migrating-to-typescript-at-scale-cd23bfeb5cc)
- [Scaling TypeScript lessons from Bloomberg](https://www.techatbloomberg.com/blog/10-insights-adopting-typescript-at-scale/)
- [Migrating a `create-react-app`/`react-scripts` app to TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript) - don't use `react-scripts-ts`
- [Migrating an EJECTED CRA app to TS](https://spin.atomicobject.com/2018/07/04/migrating-cra-typescript/)
- [Lyft's JS to TS migration tool](https://github.com/lyft/react-javascript-to-typescript-transform) (includes PropTypes migration)
- [Hootsuite][hootsuite]
- [Etsy's Journey to TypeScript](https://codeascraft.com/2021/11/08/etsys-journey-to-typescript/)
- [Storybook's migration (PR)](https://github.com/storybooks/storybook/issues/5030)
- [How we migrated a 200K+ LOC project to TypeScript and survived to tell the story][coherentlabs] - Coherent Labs - using `grunt-ts`, jQuery and Kendo UI
- incrementally adding strict null checks https://code.visualstudio.com/blogs/2019/05/23/strict-null

Old content that is possibly out of date

- [Incrementally Migrating JS to TS][clayallsop] (old)
- [Microsoft's TypeScript React Conversion Guide][mstsreactconversionguide] (old)

[clayallsop]: https://medium.com/@clayallsopp/incrementally-migrating-javascript-to-typescript-565020e49c88 "Incrementally Migrating JavaScript to TypeScript"
[pleo]: https://medium.com/pleo/migrating-a-babel-project-to-typescript-af6cd0b451f4 "Migrating a Babel project to TypeScript"
[tiny]: https://go.tiny.cloud/blog/benefits-of-gradual-strong-typing-in-javascript/ "Benefits of gradual strong typing in JavaScript"
[entria]: https://medium.com/entria/incremental-migration-to-typescript-on-a-flowtype-codebase-515f6490d92d "Incremental Migration to TypeScript on a Flowtype codebase"
[mstsreactconversionguide]: https://github.com/Microsoft/TypeScript-React-Conversion-Guide "TypeScript React Conversion Guide"
[coherentlabs]: https://hashnode.com/post/how-we-migrated-a-200k-loc-project-to-typescript-and-survived-to-tell-the-story-ciyzhikcc0001y253w00n11yb "How we migrated a 200K+ LOC project to TypeScript and survived to tell the story"
[hootsuite]: https://medium.com/hootsuite-engineering/thoughts-on-migrating-to-typescript-5e1a04288202 "Thoughts on migrating to TypeScript"
