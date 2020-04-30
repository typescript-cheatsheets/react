---
id: types
title: Troubleshooting Handbook: Types
sidebar_label: Types
---

> ⚠️ Have you read [the TypeScript FAQ](https://github.com/microsoft/TypeScript/wiki/FAQ)?) Your answer might be there!

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working _against_ the compiler and the more the compiler will be working _for_ you!

Try to avoid typing with `any` as much as possible to experience the full benefits of typescript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

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

_Something to add? [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new) with your suggestions!_

## Enum Types

Enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large",
}
```

Usage:

```tsx
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

A simpler alternative to enum is just declaring a bunch of strings with union:

```tsx
export declare type Position = "left" | "right" | "top" | "bottom";
```

This is handy because TypeScript will throw errors when you mistype a string for your props.

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
element.parentNode!.removeChild(element) // ! before the period
myFunction(document.getElementById(dialog.id!)! // ! after the property accessing
let userID!: string // definite assignment assertion... be careful!
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
export interface Props {
  label: string;
}
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement> // adding my Props together with the @types/react button provided props
) => <Button {...props} />;
```

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
export const Human: React.FC<BaseProps & HumanProps> = // ...
export const Dog: React.FC<BaseProps & DogProps> = // ...
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgCEUBnJABRzGbgF44BvCnGFoANi2YA5FCCQB+AFxxmMKMAB2AcwA0Q4Suqj5S5OhgA6AMIBlaxwh1YwJMz1x1MpEpVqtcAPT+cACurAAmcBpwAEYQMAAWFAC+VLT0ACIQmvZcvAJ6MCjAosyWEMHqMErqwSDRSFDJqXRwABK1KOo53HyC5MLxnWGl5ZXVtfWN5CnkSAAekLBwaBDqKm0d6ibEFgBilgA8TKzdcABkGyCd3QB8eQAUAJS8d-d6B2HAAG4BNxSPFAo80W8BWa3gmU02zM5n2RxY7E43AukNuD2ePFe70+P38f3IjyAA)

Make sure not to confuse Intersection Types (which are **and** operations) with Union Types (which are **or** operations).

## Union Types

This section is yet to be written (please contribute!). Meanwhile, see our [commentary on Union Types usecases](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#union-types-and-type-guarding).

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

Note that when you implement the actual overloaded function, the implementation will need to declare the combined call signature that you'll be handling, it won't be inferred for you. You can see readily see examples of overloads in DOM APIs, e.g. `createElement`.

[Read more about Overloading in the Handbook.](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

## Using Inferred Types

Leaning on TypeScript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with `typeof`, you won't have to do that. Just use it on any value:

```tsx
const [state, setState] = React.useState({
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
const [state, setState] = React.useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in React.useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

<details>
  <summary>
    Minor caveats on using <code>Partial</code>
  </summary>

Note that there are some TS users who don't agree with using `Partial` as it behaves today. See [subtle pitfalls of the above example here](https://twitter.com/ferdaber/status/1084798596027957248), and check out this long discussion on [why @types/react uses Pick instead of Partial](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365).

</details>

## The Types I need weren't exported!

This can be annoying but here are ways to grab the types!

- Grabbing the Prop types of a component: Use `React.ComponentProps` and `typeof`, and optionally `Omit` any overlapping types

```tsx
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify
const AlertButton: React.FC<AlertButtonProps> = (props) => (
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
type SubIsntType = SubInstArr[0];

let baz: SubIsntType = {
  c: 5,
  d: 6, // type checks ok!
};

//You could just write a one-liner,
//But please make sure it is forward-readable
//(you can understand it from reading once left-to-right with no jumps)
type SubIsntType2 = ReturnType<typeof foo>["subInstArr"][0];
let baz2: SubIsntType2 = {
  c: 5,
  d: 6, // type checks ok!
};
```

- TS also ships with a `Parameters` utility type for extracting the parameters of a function
- for anything more "custom", the `infer` keyword is the basic building block for this, but takes a bit of getting used to. Look at the source code for the above utility types, and [this example](https://twitter.com/mgechev/status/1211030455224422401?s=20) to get the idea.
