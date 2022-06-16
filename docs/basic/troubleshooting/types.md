---
id: types
title: "Troubleshooting Handbook: Types"
sidebar_label: Types
---

> ⚠️ Have you read [the TypeScript FAQ](https://github.com/microsoft/TypeScript/wiki/FAQ?) Your answer might be there!

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working _against_ the compiler and the more the compiler will be working _for_ you!

Try to avoid typing with `any` as much as possible to experience the full benefits of TypeScript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

## Union Types and Type Guarding

Union types are handy for solving some of these typing problems:

```tsx
class App extends React.Component<
  {},
  {
    count: number | null; // like this
  }
> {
  state = {
    count: null,
  };
  render() {
    return <div onClick={() => this.increment(1)}>{this.state.count}</div>;
  }
  increment = (amt: number) => {
    this.setState((state) => ({
      count: (state.count || 0) + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2K0EAK48YALjg89IAEZIocAD6m91agG44AejdxqwANZI4MAAWwHSaKhQAfFrkinQwKNxwALzRijr6hiZmTmHOmkT81gAUAJSpaUQwelA8cLJ8wABucBA8Yt5oPklKpclRQSEiwDxoRCAyRQCMJSoRSgN0InEJSCK6BjAqsm4NjRF5MXDhh8OjSOOGyXBFKCDGDpbWZUlRStoBwYt0SDAAyvHcIrLRIva5vQ5pODrTLXYGraHwWz2AAMZQA1HBbjB3ioSiUDooVAcVEA)

**Type Guarding**: Sometimes Union Types solve a problem in one area but create another downstream. If `A` and `B` are both object types, `A | B` isn't "either A or B", it is "A or B or both at once", which causes some confusion if you expected it to be the former. Learn how to write checks, guards, and assertions (also see the Conditional Rendering section below). For example:

```ts
interface Admin {
  role: string;
}
interface User {
  email: string;
}

// Method 1: use `in` keyword
function redirect(user: Admin | User) {
  if ("role" in user) {
    // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(user.role);
  } else {
    routeToHomePage(user.email);
  }
}

// Method 2: custom type guard, does the same thing in older TS versions or where `in` isnt enough
function isAdmin(user: Admin | User): user is Admin {
  return (user as any).role !== undefined;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgEEATEGuAbwrjhwAbJAC44AZxhQaAcwDcFAL5Va9RmmYBVcfR584SECmCCxk6dXlKKFTAFdqGYBGoCIdugBUI7TtQAKKDJIABTiwDLUwJjA9ACUeuT80XBhEVExugC8OQR2OlAIEML4CbxJ-AJIMHZQrvi+NGQVinDWlOT2jjDOrjgeSN4AErhIgcFpkdGxUGX6KZMZM3A5WQSGxoKliZVVNXUEIyBIYEFIzfzK5FcUAPS3cACy1QAWEGxwAIxi+cwABjQ-nAANZIACeAHdoGxbA4nC4qmxgEQMCFflAxI1XAAfODaeI7ODREIAIiESBJRNc6LKcHucF+cBgL3+gLgEDA9BQMGgcEwvJgYM5MjsKCgbHEEhoGjgngAynAAEwAOgA7ABqfT8fpeHwcGjjULo5XkuIKFoGQQ6Qna9y6o5jM5ogrKjYmM36K43cj057M95KsRofI8vCCzlwEVitgAGjgbAgSElzOY4hQxyZL1kVPZgjYunlcAAbvRwi5JbyISyiHAAdQgcBxLQDNR3DIXrDur0ieIsc76Jj9Ti8QU4j8Cj3WEPCUR9q5+1A4ChJShqGC4ibiswAIS5Bz5mLUJAw65AA)

Method 2 is also known as [User-Defined Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) and can be really handy for readable code. This is how TS itself refines types with `typeof` and `instanceof`.

If you need `if...else` chains or the `switch` statement instead, it should "just work", but look up [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) if you need help. (See also: [Basarat's writeup](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)). This is handy in typing reducers for `useReducer` or Redux.

## Optional Types

If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).

```tsx
class MyComponent extends React.Component<{
  message?: string; // like this
}> {
  render() {
    const { message = "default" } = this.props;
    return <div>{message}</div>;
  }
}
```

You can also use a `!` character to assert that something is not undefined, but this is not encouraged.

_Something to add? [File an issue](https://github.com/typescript-cheatsheets/react/issues/new) with your suggestions!_

## Enum Types

**We recommend avoiding using enums as far as possible**.

Enums have a few [documented issues](https://fettblog.eu/tidy-typescript-avoid-enums/) (the TS team [agrees](https://twitter.com/orta/status/1348966323271987201?s=20)). A simpler alternative to enums is just declaring a union type of string literals:

```tsx
export declare type Position = "left" | "right" | "top" | "bottom";
```

If you must use enums, remember that enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large",
}

// usage
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

## Type Assertion

Sometimes you know better than TypeScript that the type you're using is narrower than it thinks, or union types need to be asserted to a more specific type to work with other APIs, so assert with the `as` keyword. This tells the compiler you know better than it does.

```tsx
class MyComponent extends React.Component<{
  message: string;
}> {
  render() {
    const { message } = this.props;
    return (
      <Component2 message={message as SpecialMessageType}>{message}</Component2>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgGU61gUAbAWSQGduUBzJABVa9ALwFuMKMAB2-fAG4KFOTCRRM6egAUcYbnADeFOHBA8+ggFxwpM+XAA+cAK6yAJkkxykH5eQAvirkaBCyUnAAwriQskiyMABMtsjoMAB0AGJRADx6EAYAfHASABRG5pYCSIEAlKUlZaZwuR7AAG5FLWa5ABYAjEVGFrw1gbkA9IPd5L2T7V0UdSFobCi8cBzUMeDhCfBIAB7qnoZpGBm7cQe5JnNVYzZ20nL8AYEl92ZEnhplDW+ZjgYQi8Eqoys9ECpTgMD6wG4GTA+m4AWBcCIMFcUFkcGaDwxuWu+0SSUeULEI2qgjgG0YzFYnBpwlEn2pT1qUxJ8TJswxdXRcGCQSAA)

Note that you cannot assert your way to anything - basically it is only for refining types. Therefore it is not the same as "casting" a type.

You can also assert a property is non-null, when accessing it:

```ts
element.parentNode!.removeChild(element); // ! before the period
myFunction(document.getElementById(dialog.id!)!); // ! after the property accessing
let userID!: string; // definite assignment assertion... be careful!
```

Of course, try to actually handle the null case instead of asserting :)

## Simulating Nominal Types

TS' structural typing is handy, until it is inconvenient. However you can simulate nominal typing with [`type branding`](https://basarat.gitbook.io/typescript/main-1/nominaltyping):

```ts
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;
```

We can create these values with the Companion Object Pattern:

```ts
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}
```

Now TypeScript will disallow you from using the wrong ID in the wrong place:

```ts
function queryForUser(id: UserID) {
  // ...
}
queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type 'UserID'
```

In future you can use the `unique` keyword to brand. [See this PR](https://github.com/microsoft/TypeScript/pull/33038).

## Intersection Types

Adding two types together can be handy, for example when your component is supposed to mirror the props of a native component like a `button`:

```tsx
export interface PrimaryButtonProps {
  label: string;
}
export const PrimaryButton = (
  props: PrimaryButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  // do custom buttony stuff
  return <button {...props}> {props.label} </button>;
};
```

_Playground [here](https://www.typescriptlang.org/play?ssl=4&ssc=1&pln=12&pc=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCipAD0ljmADsYkpN0k4AFKUFKAE8AQgFcYMCE14QwAZzgBvCnDgAbFACMkagFxw5MPkwDmAbgoBfanWjw0Uwzz4gBI8ZKZwAvHAAUKnBgOPL6vPxCYhJSMvJwAGSIxDAAdFGeABIAKgCyADIAghJ8muJIcgA82fnpUgCiakggSCwAfBQAlD6tSoEA9H1wACYQcGiihrhwpdFMggYwopiYgUSLUF4VM55KKXvBsnKWPYoH8ika2mqWcBV921KtFuSWQA)_

You can also use Intersection Types to make reusable subsets of props for similar components:

```tsx
type BaseProps = {
   className?: string,
   style?: React.CSSProperties
   name: string // used in both
}
type DogProps = {
  tailsCount: number
}
type HumanProps = {
  handsCount: number
}
export const Human = (props: BaseProps & HumanProps) => // ...
export const Dog = (props: BaseProps & DogProps) => // ...
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgCEUBnJABRzGbgF44BvCnGFoANi2YA5FCCQB+AFxxmMKMAB2AcwA0Q4Suqj5S5OhgA6AMIBlaxwh1YwJMz1x1MpEpVqtcAPT+cACurAAmcBpwAEYQMAAWFAC+VLT0ACIQmvZcvAJ6MCjAosyWEMHqMErqwSDRSFDJqXRwABK1KOo53HyC5MLxnWGl5ZXVtfWN5CnkSAAekLBwaBDqKm0d6ibEFgBilgA8TKzdcABkGyCd3QB8eQAUAJS8d-d6B2HAAG4BNxSPFAo80W8BWa3gmU02zM5n2RxY7E43AukNuD2ePFe70+P38f3IjyAA)

Make sure not to confuse Intersection Types (which are **and** operations) with Union Types (which are **or** operations).

## Union Types

This section is yet to be written (please contribute!). Meanwhile, see our [commentary on Union Types usecases](https://github.com/typescript-cheatsheets/react/blob/main/README.md#union-types-and-type-guarding).

The ADVANCED cheatsheet also has information on Discriminated Union Types, which are helpful when TypeScript doesn't seem to be narrowing your union type as you expect.

## Overloading Function Types

Specifically when it comes to functions, you may need to overload instead of union type. The most common way function types are written uses the shorthand:

```ts
type FunctionType1 = (x: string, y: number) => number;
```

But this doesn't let you do any overloading. If you have the implementation, you can put them after each other with the function keyword:

```ts
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // implementation with combined signature
  // ...
}
```

However, if you don't have an implementation and are just writing a `.d.ts` definition file, this won't help you either. In this case you can forego any shorthand and write them the old-school way. The key thing to remember here is as far as TypeScript is concerned, `functions are just callable objects with no key`:

```ts
type pickCard = {
  (x: { suit: string; card: number }[]): number;
  (x: number): { suit: string; card: number };
  // no need for combined signature in this form
  // you can also type static properties of functions here eg `pickCard.wasCalled`
};
```

Note that when you implement the actual overloaded function, the implementation will need to declare the combined call signature that you'll be handling, it won't be inferred for you. You can readily see examples of overloads in DOM APIs, e.g. `createElement`.

[Read more about Overloading in the Handbook.](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

## Using Inferred Types

Leaning on TypeScript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with `typeof`, you won't have to do that. Just use it on any value:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```

## Using Partial Types

Working with slicing state and props is common in React. Again, you don't really have to go and explicitly redefine your types if you use the `Partial` generic type:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

<details>
<summary><b>Minor caveats on using <code>Partial</code></b></summary>

Note that there are some TS users who don't agree with using `Partial` as it behaves today. See [subtle pitfalls of the above example here](https://twitter.com/ferdaber/status/1084798596027957248), and check out this long discussion on [why @types/react uses Pick instead of Partial](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365).

</details>

## The Types I need weren't exported!

This can be annoying but here are ways to grab the types!

- Grabbing the Prop types of a component: Use `React.ComponentProps` and `typeof`, and optionally `Omit` any overlapping types

```tsx
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify
const AlertButton = (props: AlertButtonProps) => (
  <Button onClick={() => alert("hello")} {...props} />
);
```

You may also use [`ComponentPropsWithoutRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L774) (instead of ComponentProps) and [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770) (if your component specifically forwards refs)

- Grabbing the return type of a function: use `ReturnType`:

```tsx
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

In fact you can grab virtually anything public: [see this blogpost from Ivan Koshelev](http://ikoshelev.azurewebsites.net/search/id/11/Pragmatic-uses-of-TypeScript-type-system-My-type-of-type)

```ts
function foo() {
  return {
    a: 1,
    b: 2,
    subInstArr: [
      {
        c: 3,
        d: 4,
      },
    ],
  };
}

type InstType = ReturnType<typeof foo>;
type SubInstArr = InstType["subInstArr"];
type SubInstType = SubInstArr[0];

let baz: SubInstType = {
  c: 5,
  d: 6, // type checks ok!
};

//You could just write a one-liner,
//But please make sure it is forward-readable
//(you can understand it from reading once left-to-right with no jumps)
type SubInstType2 = ReturnType<typeof foo>["subInstArr"][0];
let baz2: SubInstType2 = {
  c: 5,
  d: 6, // type checks ok!
};
```

- TS also ships with a `Parameters` utility type for extracting the parameters of a function
- for anything more "custom", the `infer` keyword is the basic building block for this, but takes a bit of getting used to. Look at the source code for the above utility types, and [this example](https://twitter.com/mgechev/status/1211030455224422401?s=20) to get the idea. Basarat [also has a good video on `infer`](https://www.youtube.com/watch?v=ijK-1R-LFII&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=3&t=0s).

## The Types I need don't exist!

What's more annoying than modules with unexported types? Modules that are **untyped**!

> Before you proceed - make sure you have checked that types don't exist in [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) or [TypeSearch](https://microsoft.github.io/TypeSearch/)

Fret not! There are more than a couple of ways in which you can solve this problem.

### Slapping `any` on everything

A **lazier** way would be to create a new type declaration file, say `typedec.d.ts`– if you don't already have one. Ensure that the path to file is resolvable by TypeScript by checking the `include` array in the `tsconfig.json` file at the root of your directory.

```json
// inside tsconfig.json
{
  // ...
  "include": [
    "src" // automatically resolves if the path to declaration is src/typedec.d.ts
  ]
  // ...
}
```

Within this file, add the `declare` syntax for your desired module, say `my-untyped-module`– to the declaration file:

```ts
// inside typedec.d.ts
declare module "my-untyped-module";
```

This one-liner alone is enough if you just need it to work without errors. A even hackier, write-once-and-forget way would be to use `"*"` instead which would then apply the `Any` type for all existing and future untyped modules.

This solution works well as a workaround if you have less than a couple untyped modules. Anything more, you now have a ticking type-bomb in your hands. The only way of circumventing this problem would be to define the missing types for those untyped modules as explained in the following sections.

### Autogenerate types

You can use TypeScript with `--allowJs` and `--declaration` to see TypeScript's "best guess" at the types of the library.

If this doesn't work well enough, use [`dts-gen`](https://github.com/Microsoft/dts-gen) to use the runtime shape of the object to accurately enumerate all available properties. This tends to be very accurate, BUT the tool does not yet support scraping JSDoc comments to populate additional types.

```bash
npm install -g dts-gen
dts-gen -m <your-module>
```

There are other automated JS to TS conversion tools and migration strategies - see [our MIGRATION cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/migration/from_js).

### Typing Exported Hooks

Typing Hooks is just like typing pure functions.

The following steps work under two assumptions:

- You have already created a type declaration file as stated earlier in the section.
- You have access to the source code - specifically the code that directly exports the functions you will be using. In most cases, it would be housed in an `index.js` file.
  Typically you need a minimum of **two** type declarations (one for **Input Prop** and the other for **Return Prop**) to define a hook completely. Suppose the hook you wish to type follows the following structure,

```js
// ...
const useUntypedHook = (prop) => {
  // some processing happens here
  return {
    /* ReturnProps */
  };
};
export default useUntypedHook;
```

then, your type declaration should most likely follow the following syntax.

```ts
declare module 'use-untyped-hook' {
  export interface InputProps { ... }   // type declaration for prop
  export interface ReturnProps { ... } // type declaration for return props
  export default function useUntypedHook(
    prop: InputProps
    // ...
  ): ReturnProps;
}
```

<details>
<summary><b>For instance, the <a href="https://github.com/donavon/use-dark-mode">useDarkMode hook</a> exports the functions that follows a similar structure.</b></summary>

```js
// inside src/index.js
const useDarkMode = (
  initialValue = false, // -> input props / config props to be exported
  {
    // -> input props / config props to be exported
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = "darkMode",
    storageProvider,
    global,
  } = {}
) => {
  // ...
  return {
    // -> return props to be exported
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState((current) => !current), [setState]),
  };
};
export default useDarkMode;
```

As the comments suggest, exporting these config props and return props following the aforementioned structure will result in the following type export.

```ts
declare module "use-dark-mode" {
  /**
   * A config object allowing you to specify certain aspects of `useDarkMode`
   */
  export interface DarkModeConfig {
    classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
    classNameLight?: string; // A className to set "light mode". Default = "light-mode".
    element?: HTMLElement; // The element to apply the className. Default = `document.body`
    onChange?: (val?: boolean) => void; // Override the default className handler with a custom callback.
    storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable persistent storage.
    storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
    global?: Window; // The global object. Default = `window`.
  }
  /**
   * An object returned from a call to `useDarkMode`.
   */
  export interface DarkMode {
    readonly value: boolean;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
  }
  /**
   * A custom React Hook to help you implement a "dark mode" component for your application.
   */
  export default function useDarkMode(
    initialState?: boolean,
    config?: DarkModeConfig
  ): DarkMode;
}
```

</details>

### Typing Exported Components

In case of typing untyped class components, there's almost no difference in approach except for the fact that after declaring the types, you export the extend the type using `class UntypedClassComponent extends React.Component<UntypedClassComponentProps, any> {}` where `UntypedClassComponentProps` holds the type declaration.

For instance, [sw-yx's Gist on React Router 6 types](https://gist.github.com/sw-yx/37a6a3d248c2d4031801f0d568904df8) implemented a similar method for typing the then untyped RR6.

```ts
declare module "react-router-dom" {
  import * as React from 'react';
  // ...
  type NavigateProps<T> = {
    to: string | number,
    replace?: boolean,
    state?: T
  }
  //...
  export class Navigate<T = any> extends React.Component<NavigateProps<T>>{}
  // ...
```

For more information on creating type definitions for class components, you can refer to this [post](https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components) for reference.

## Frequent Known Problems with TypeScript

Just a list of stuff that React developers frequently run into, that TS has no solution for. Not necessarily TSX only.

### TypeScript doesn't narrow after an object element null check

[![https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium](https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium)](https://mobile.twitter.com/tannerlinsley/status/1390409931627499523)

Ref: https://mobile.twitter.com/tannerlinsley/status/1390409931627499523. see also https://github.com/microsoft/TypeScript/issues/9998

### TypeScript doesn't let you restrict the type of children

Guaranteeing typesafety for this kind of API isn't possible:

```tsx
<Menu>
  <MenuItem/> {/* ok */}
  <MenuLink/> {/* ok */}
  <div> {/* error */}
</Menu>
```

Source: https://twitter.com/ryanflorence/status/1085745787982700544?s=20
