---
id: misc_concerns
title: "Section 3: Misc. Concerns"
sidebar_label: Misc. Concerns
---

Sometimes writing React isn't just about React. While we don't focus on other libraries like Redux (see below for more on that), here are some tips on other common concerns when making apps with React + TypeScript.

## Writing TypeScript Libraries instead of Apps

`propTypes` may seem unnecessary with TypeScript, especially when building React + TypeScript **apps**, but they are still relevant when writing **libraries** which may be used by developers working in Javascript.

```ts
interface MyComponentProps {
  autoHeight: boolean;
  secondProp: number;
}

export class MyComponent extends React.Component<MyComponentProps, {}> {
  static propTypes = {
    autoHeight: PropTypes.bool,
    secondProp: PropTypes.number.isRequired,
  };
}
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Commenting Components

TypeScript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for TypeScript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/docs/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
interface MyComponentProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = "foobar" }: MyComponentProps) {
  return <div>Hello world {label}</div>;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgFkBPABRzAGc4BvCnDgB6AFRi4AESQ80UYGBjAI1OBExww3OACIANigBGSfboB0Q4ZIACAEySMArvqwQIRlFCtxJYkVaGJvoA-ABccDwwCtQA5gDcFAC+FBTiYkKSAOJI1PQo+nBouJB5tHAOcgpKKmo0cABSAMpSEGhwmNAgKDDmrF4A1nYQAO51fGI8TmCQsEh2YpbkvgHkSAAes-AOzq4dTtQYtaxsAMIlqrkwABT8cEGmcAC8ep0eXrpwSRHsXBC8AEoBFYiDAnFA1AAeOzAABuAD4ABKmfQQOAjaD6OwCB76JKQkQwhGJchJIA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Namespaced Components

Often when creating similar components or components that have a parent-child relationship, it is useful to namespace your components. Types can easily be added be using `Object.assign()`;

```tsx
import { forwardRef } from "react";

const Input = (props: any) => <input {...props} />;

const Form = forwardRef<HTMLDivElement, any>(
  ({ children, ...otherProps }, ref) => (
    <form {...otherProps} ref={ref}>
      {children}
    </form>
  )
);

/**
 * Exported components now can be used as `<Form>` and `<Form.Input>`
 */
export default Object.assign(Form, { Input: Input });
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2&ssl=1&ssc=1&pln=14&pc=52#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd4BJGsAV3gF44AKMHMOgC44KGgE8AlHA4A+OAB5gLdnADeAOk18IAgL5wA9DIpVaDOADFoeLsnQx1maAHcUUACbJM8gBIAVAFkAGQARYAA3AFEAGyQQJBoYABoRcRlublU0AAtgaPciGhTNdQgYbKQoAAV+Ol0UokwpWR4KOAUnKDwNTTKK6tr9Ro5VRt1jcnb2rNz8wt02hQNOkAmJCQBuE3IDACpdtt24SIAPSFgkdzhqcFoEmDo4Gghna9E4ACMkOFY6S5FHgADeRWLoyQGpK7A0EgdTMNgwcGHAwUJBnaDwdxITAoVjReAAeQ+ACskBh1Cg6HRgABzGjcGEpVTw9jCFkwXSbIA)

(Contributed by @bryceosterhaus, see [further discussion](https://github.com/typescript-cheatsheets/react/issues/165))

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept TypeScript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Migrating From Flow

You should check out large projects that are migrating from flow to pick up concerns and tips:

- [Jest](https://github.com/facebook/jest/pull/7554)
- [Expo](https://github.com/expo/expo/issues/2164)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Storybook](https://github.com/storybooks/storybook/issues/5030)
- [VueJS](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)

Useful libraries:

- <https://github.com/bcherny/flow-to-typescript>
- <https://github.com/Khan/flow-to-ts>
- <https://github.com/piotrwitek/utility-types>

If you have specific advice in this area, please file a PR!

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Prettier

There isn't any real secret to Prettier for TypeScript. But its a great idea to run prettier on every commit!

```bash
$ yarn add -D prettier husky lint-staged
```

```json
// inside package.json
{
  //...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "linters": {
      "src/*.{ts,tsx,js,jsx,css,scss,md}": [
        "prettier --trailing-comma es5 --single-quote --write",
        "git add"
      ],
      "ignore": ["**/dist/*, **/node_modules/*"]
    }
  },
  "prettier": {
    "printWidth": 80,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5"
  }
}
```

Integrating this with ESlint may be a problem. We haven't written much on this yet, please contribute if you have a strong opinion. [Here's a helpful gist.](https://gist.github.com/JirkaVebr/519c7597517e4ba756d5b89e7cb4cc0e)

For library authors, this is set up for you in [tsdx](https://github.com/palmerhq/tsdx/pull/45/files). You may also wish to check out the newer https://ts-engine.dev/ project.

## Testing

Yes, you can test your types! You shouldn't use it for EVERYTHING, but it can help prevent regressions:

- https://github.com/azz/jest-runner-tsc
- https://github.com/SamVerschueren/tsd
- https://github.com/ikatyang/dts-jest ([Demo](https://codesandbox.io/s/dts-test-frozen-public-demo-iyorn))
- https://github.com/microsoft/dtslint ([Intro to dtslint](https://www.youtube.com/watch?v=nygcFEwOG8w&feature=share))

## Working with Non-TypeScript Libraries (writing your own index.d.ts)

Lets say you want to use `de-indent`, but it isn't typed or on DefinitelyTyped. You get an error like this:

```
[ts]
Could not find a declaration file for module 'de-indent'. '/Users/swyx/Work/react-sfc-loader/node_modules/de-indent/index.js' implicitly has an 'any' type.
  Try `npm install @types/de-indent` if it exists or add a new declaration (.d.ts) file containing `declare module 'de-indent';` [7016]
```

So create a `.d.ts` file anywhere in your project with the module definition:

```ts
// de-indent.d.ts
declare module "de-indent" {
  function deindent(): void;
  export = deindent; // default export
}
```

<details>

<summary>Further Discussion</summary>

Any other tips? Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/typescript-cheatsheets/react/issues/8). We have more discussion and examples [in our issue here](https://github.com/typescript-cheatsheets/react/issues/12).

</details>

## Compilation Speed

Compiling large TS projects can get slow. Here are some tips:

- We have a dedicated repo tracking TS speed recommendations: https://github.com/typescript-cheatsheets/speed
- Use [TS 3.0 Project references](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_version#typescript-30)
- Check the official [TS performance wiki guidelines](https://github.com/microsoft/TypeScript/wiki/Performance) - note that [Dan Rossenwasser says to take it with a grain of salt](https://news.ycombinator.com/item?id=25199070)
- Webpack ([see CRA diff](https://gist.github.com/jaredpalmer/d3016701589f14df8a3572df91a5754b)):
  - set `output.pathinfo = false`
  - set `optimization.splitChunks`, `optimization.removeAvailableModules`, `optimization.removeEmptyChunks` to `false`
