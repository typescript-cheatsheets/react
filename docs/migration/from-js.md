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

## Manual JS to TS Conversion

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

- [Adopting TypeScript at Scale - AirBnB's conversion story and strategy](https://www.youtube.com/watch?v=P-J9Eg7hJwE) - their [ts-migrate tool here](https://medium.com/airbnb-engineering/ts-migrate-a-tool-for-migrating-to-typescript-at-scale-cd23bfeb5cc)
- [Migrating a `create-react-app`/`react-scripts` app to TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript) - don't use `react-scripts-ts`
- [Migrating an EJECTED CRA app to TS](https://spin.atomicobject.com/2018/07/04/migrating-cra-typescript/)
- [Lyft's JS to TS migration tool](https://github.com/lyft/react-javascript-to-typescript-transform) (includes PropTypes migration)
- [Hootsuite][hootsuite]
- [Storybook's migration (PR)](https://github.com/storybooks/storybook/issues/5030)
- [How we migrated a 200K+ LOC project to TypeScript and survived to tell the story][coherentlabs] - Coherent Labs - using `grunt-ts`, jQuery and Kendo UI
- incrementally adding strict null checks https://code.visualstudio.com/blogs/2019/05/23/strict-null

Old content that is possibly out of date

- [Incrementally Migrating JS to TS][clayallsop] (old)
- [Microsoft's TypeScript React Conversion Guide][mstsreactconversionguide] (old)
