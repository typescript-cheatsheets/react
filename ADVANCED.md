<div align="center">

<a href="https://github.com/sw-yx/react-typescript-cheatsheet/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
    align="left"
  />
</a>

<p>Cheatsheets for experienced React developers getting started with TypeScript</p>

[**Basic**](https://github.com/sw-yx/react-typescript-cheatsheet#basic-cheatsheet-table-of-contents) |
[**Advanced**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/ADVANCED.md) |
[**Migrating**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/MIGRATING.md) |
[**HOC**](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/HOC.md) |
[中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) |
[Contribute!](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new/choose)

</div>

---

# Advanced Cheatsheet

**This Advanced Cheatsheet** helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.

- It also has miscellaneous tips and tricks for pro users.
- Advice for contributing to DefinitelyTyped
- The goal is to take _full advantage_ of TypeScript.

**Creating React + TypeScript Libraries**

The best tool for creating React + TS libraries right now is [`tsdx`](https://github.com/palmerhq/tsdx). Run `npx tsdx create` and select the "react" option. You can view [the React User Guide](https://github.com/palmerhq/tsdx/issues/5) for a few tips on React+TS library best practices and optimizations for production.

---

### Advanced Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 0: Utility Types](#section-0-utility-types)
- [Section 1: Reusable Components/Type Utilities](#section-1-reusable-componentstype-utilities)
  - [Higher Order Components](#higher-order-components-hocs)
  - [Render Props](#render-props)
  - [`as` props (passing a component to be rendered)](#as-props-passing-a-component-to-be-rendered)
  - [Types for Conditional Rendering](#types-for-conditional-rendering)
  - [Props: One or the Other but not Both](#props-one-or-the-other-but-not-both)
  - [Props: Must Pass Both](#props-must-pass-both)
  - [Props: Can Optionally Pass One Only If the Other Is Passed](#props-can-optionally-pass-one-only-if-the-other-is-passed)
  - [Omit attribute from a type](#omit-attribute-from-a-type)
  - [Type Zoo](#type-zoo)
  - [Extracting Prop Types of a Component](#extracting-prop-types-of-a-component)
  - [Third Party Libraries](#third-party-libraries)
- [Section 2: Useful Patterns by TypeScript Version](#section-2-useful-patterns-by-typescript-version)
  - [TypeScript 2.9](#typescript-29)
  - [TypeScript 3.0](#typescript-30)
  - [TypeScript 3.1](#typescript-31)
  - [TypeScript 3.2](#typescript-32)
  - [TypeScript 3.3](#typescript-33)
  - [TypeScript 3.4](#typescript-34)
- [Section 3: Misc. Concerns](#section-3-misc-concerns)
  - [Writing TypeScript Libraries instead of Apps](#writing-typescript-libraries-instead-of-apps)
  - [Commenting Components](#commenting-components)
  - [Design System Development](#design-system-development)
  - [Migrating from Flow](#migrating-from-flow)
  - [Prettier + TSLint](#prettier--tslint)
  - [ESLint + TSLint](#eslint--tslint)
  - [Working with Non-TypeScript Libraries (writing your own index.d.ts)](#working-with-non-typescript-libraries-writing-your-own-indexdts)
- [Section 4: @types/react and @types/react-dom APIs](#section-4-typesreact-and-typesreact-dom-apis)
  </details>

# Section 0: Utility Types

Handy Utility Types used in the rest of this cheatsheet, or commonly used with React+TS apps, with explanation on what they do and how they can help. We will assume knowledge of [mapped types and conditional types](https://mariusschulz.com/blog/series/typescript-evolution) like `Exclude<T, U>` and `ReturnType<T>` but try to build progressively upon them.

<details>
  <summary>
    <code>Omit&lt;T, K extends keyof T&gt;</code>: Subtract keys from one interface from the other.
  </summary>
  
```ts
/**
 * Subtract keys from one interface from the other.
 *
 * @example
 * interface One { one: string }
 * interface Three { one: string, two: string }
 *
 * type Two = Omit<Three, keyof One>;
 *
 * // The type of Two will be
 * interface Two { two: string }
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

You can also supply string literals to omit:

```ts
type SettingsPageProps = Omit<
  ServerConfig,
  'immutableSetting1' | 'invisibleSetting2'
>;
```

</details>

<details>
  <summary>
    <code>Optionalize&lt;T extends K, K&gt;</code>: Remove from T the keys that are in common with K
  </summary>
  
```ts
/**
 * Remove from T the keys that are in common with K
 */
type Optionalize<T extends K, K> = Omit<T, keyof K>;
```
  
  An example usage is in our HOC section below.
  
</details>
<details>
  <summary>
    <code>Nullable&lt;T&gt;</code> or <code>Maybe&lt;T&gt;</code>: Make a Type into a Maybe Type
  </summary>
  
```ts
/**
 * Make a Type into a Maybe Type
 */
type Nullable<T> = T | null
type Maybe<T> = T | undefined
```

Your choice of `null` or `undefined` depends on your approach toward missing values. Some folks feel strongly one way or the other.

</details>
<details>
  <summary>
    <code>Dictionary&lt;T&gt;</code>: Dictionary of string, value pairs
  </summary>
  
```ts
/**
 * Dictionary of string, value pairs
 */
type Dictionary<T> = { [key: string]: T }
```

`[key: string]` is a very handy trick in general. You can also modify dictionary fields with [Readonly](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) or make them optional or Omit them, etc.

</details>

There also exist helper type libraries:

- [utility-types](https://github.com/piotrwitek/utility-types)
- [type-zoo](https://github.com/pelotom/type-zoo)
- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new). We respect the fact that naming and selection of examples here is arbitrary as the possible space is infinite.

# Section 1: Advanced Guides

## Higher Order Components (HoCs)

Sometimes you want a simple way to inject props from somewhere else (either a global store or a provider) and don't want to continually pass down the props for it. Context is great for it, but then the values from the context can only be used in your `render` function. A HoC will provide these values as props.

**The injected props**

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

**Usage in the component**

The goal is to have the props available on the interface for the component, but subtracted out for the consumers of the component when wrapped in the HoC.

```ts
interface Props extends WithThemeProps {
  children: ReactNode;
}

class MyButton extends Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

**Consuming the Component**

Now when consuming the component you can omit the `primaryColor` prop or override the one provided through context.

```tsx
<MyButton>Hello button</MyButton> // Valid
<MyButton primaryColor="#333">Hello Button</MyButton> // Also valid
```

**Declaring the HoC**

The actual HoC.

```ts
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<
    Optionalize<T, WithThemeProps>
  > {
    public static displayName = `withPages(${displayName})`;

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = getThemePropsFromSomeWhere();

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...this.props as T} />;
    }
  };
}
```

Note that the `{...this.props as T}` assertion is needed because of a current bug in TS 3.2 https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046

Here is a more advanced example of a dynamic higher order component that bases some of its parameters on the props of the component being passed in:

```ts
// inject static values to a component so that they're always provided
export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...props as TProps} {...injector} />;
  };
}
```

### Using `forwardRef`

For "true" reusability you should also consider exposing a ref for your HOC. You can use `React.forwardRef<Ref, Props>` as documented in [the basic cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/blob/master/README.md#forwardrefcreateref), but we are interested in more real world examples. [Here is a nice example in practice](https://gist.github.com/OliverJAsh/d2f462b03b3e6c24f5588ca7915d010e) from @OliverJAsh.

## Render Props

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `React.ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
export interface Props {
  label?: React.ReactNode;
  children: React.ReactNode;
}
export const Card = (props: Props) => {
  return (
    <div>
      {props.label && <div>{props.label}</div>}
      {props.children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
export interface Props {
  children: (foo: string) => React.ReactNode;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## `as` props (passing a component to be rendered)

`ElementType` is pretty useful to cover most types that can be passed to createElement e.g.

```tsx
function PassThrough(props: { as: ElementType<any> }) {
  const { as: Component } = props;

  return <Component />;
}
```

[Thanks @eps1lon](https://github.com/sw-yx/react-typescript-cheatsheet/pull/69) for this

## Typing a Component that Accepts Different Props

Components, and JSX in general, are analogous to functions. When a component can render differently based on their props, it's similar to how a function can be overloaded to have multiple call signatures. In the same way, you can overload a function component's call signature to list all of its different "versions".

A very common use case for this is to render something as either a button or an anchor, based on if it receives a `href` attribute.

```tsx
type ButtonProps = JSX.IntrinsicElements['button'];
type AnchorProps = JSX.IntrinsicElements['a'];

// optionally use a custom type guard
function isPropsForAnchorElement(
  props: ButtonProps | AnchorProps
): props is AnchorProps {
  return 'href' in props;
}

function Clickable(props: ButtonProps): JSX.Element;
function Clickable(props: AnchorProps): JSX.Element;
function Clickable(props: ButtonProps | AnchorProps) {
  if (isPropsForAnchorElement(props)) {
    return <a {...props} />;
  } else {
    return <button {...props} />;
  }
}
```

They don't even need to be completely different props, as long as they have at least one difference in properties:

```tsx
type LinkProps = Omit<JSX.IntrinsicElements['a'], 'href'> & { to?: string };

function RouterLink(props: LinkProps): JSX.Element;
function RouterLink(props: AnchorProps): JSX.Element;
function RouterLink(props: LinkProps | AnchorProps) {
  if ('to' in props) {
    return <a {...props} />;
  } else {
    return <Link {...props} />;
  }
}
```

<details>
  <summary><b>Approach: Generic Components</b></summary>
  
  Here is an example solution, see the further discussion for other solutions. *thanks to [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12#issuecomment-394440577)*
  
```tsx
interface LinkProps {}
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

const Link = <T extends {}>(
props: LinkProps & T extends RouterLinkProps ? RouterLinkProps : AnchorProps
) => {
if ((props as RouterLinkProps).to) {
return <NavLink {...props as RouterLinkProps} />
} else {
return <a {...props as AnchorProps} />
}
}

<Link<RouterLinkProps> to="/">My link</Link> // ok
<Link<AnchorProps> href="/">My link</Link> // ok
<Link<RouterLinkProps> to="/" href="/">My link</Link> // error

````

</details>



<details>
  <summary><b>Approach: Composition</b></summary>

If you want to conditionally render a component, sometimes is better to use [React's composition model](https://reactjs.org/docs/composition-vs-inheritance.html) to have simpler components and better to understand typings:

```tsx
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

interface Button {
  as: React.ComponentClass | 'a'
}

const Button: React.FunctionComponent<Button> = (props) => {
  const {as: Component, children, ...rest} = props
  return (
    <Component className="button" {...rest}>{children}</Component>
  )
}

const AnchorButton: React.FunctionComponent<AnchorProps> = (props) => (
  <Button as="a" {...props} />
)

const LinkButton: React.FunctionComponent<RouterLinkProps> = (props) => (
  <Button as={NavLink} {...props} />
)

<LinkButton to="/login">Login</LinkButton>
<AnchorButton href="/login">Login</AnchorButton>
<AnchorButton href="/login" to="/test">Login</AnchorButton> // Error: Property 'to' does not exist on type...
````

</details>

## Props: One or the Other but not Both

Use the `in` keyword, function overloading, and union types to make components that take either one or another sets of props, but not both:

```tsx
type Props1 = { foo: string };
type Props2 = { bar: string };

function MyComponent(props: Props1): JSX.Element;
function MyComponent(props: Props2): JSX.Element;
function MyComponent(props: Props1 | Props2) {
  if ('foo' in props) {
    // props.bar // error
    return <div>{props.foo}</div>;
  } else {
    // props.foo // error
    return <div>{props.bar}</div>;
  }
}
const UsageComponent: React.FC = () => (
  <div>
    <MyComponent foo="foo" />
    <MyComponent bar="bar" />
    {/* <MyComponent foo="foo" bar="bar"/> // invalid */}
  </div>
);
```

## Props: Must Pass Both

```tsx
type OneOrAnother<T1, T2> =
  | (T1 & { [K in keyof T2]?: undefined })
  | (T2 & { [K in keyof T1]?: undefined });

type Props = OneOrAnother<{ a: string; b: string }, {}>;

const a: Props = { a: 'a' }; // error
const b: Props = { b: 'b' }; // error
const ab: Props = { a: 'a', b: 'b' }; // ok
```

Thanks [diegohaz](https://twitter.com/kentcdodds/status/1085655423611367426)

## Props: Can Optionally Pass One Only If the Other Is Passed

Say you want a Text component that gets truncated if `truncate` prop is passed but expands to show the full text when `expanded` prop is passed (e.g. when the user clicks the text).

You want to allow `expanded` to be passed only if `truncate` is also passed, because there is no use for `expanded` if the text is not truncated.

You can do this by function overloads:

```tsx
import React from "react";

type CommonProps = {
  children: React.ReactNode;
  as: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

type NoTruncateProps = CommonProps & {
  truncate?: false;
};

type TruncateProps = CommonProps & {
  truncate: true;
  expanded?: boolean;
};

// Type guard
const isTruncateProps = (
  props: NoTruncateProps | TruncateProps
): props is TruncateProps => !!props.truncate;

// Function overloads to accept both prop types NoTruncateProps & TruncateProps
function Text(props: NoTruncateProps): JSX.Element;
function Text(props: TruncateProps): JSX.Element;
function Text(props: NoTruncateProps | TruncateProps) {

  if (isTruncateProps(props)) {
    const { children, as: Tag, truncate, expanded, ...otherProps } = props;

    const classNames = truncate ? ".truncate" : "";

    return (
      <Tag
        className={classNames}
        aria-expanded={!!expanded}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }

  const { children, as: Tag, ...otherProps } = props;

  return <Tag {...otherProps}>{children}</Tag>;
}

Text.defaultProps = {
  as: 'span'
}
```

Using the Text component:
```tsx
const App: React.FC = () => (
  <>
    <Text>not truncated</Text> {/* works */}
    <Text truncate>truncated</Text> {/* works */}
    <Text truncate expanded>truncate-able but expanded</Text> {/* works */}

    {/* TS error: Property 'truncate' is missing in type '{ children: string; expanded: true; }' but required in type 'Pick<TruncateProps, "expanded" | "children" | "truncate">'} */}
    <Text expanded>truncate-able but expanded</Text>
  </>
);
```

## Omit attribute from a type

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode; // this will conflict with the InputElement's label
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, 'label'>
) => {
  const { label } = props;
  return (
    <div className="Checkbox">
      <label className="Checkbox-label">
        <input type="checkbox" {...props} />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

## Type Zoo

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Extracting Prop Types of a Component

_(Contributed by [@ferdaber](https://github.com/sw-yx/react-typescript-cheatsheet/issues/63))_

There are a lot of places where you want to reuse some slices of props because of prop drilling,
so you can either export the props type as part of the module or extract them (either way works).

The advantage of extracting the prop types is that you won't need to export everything, and a refactor of the source of truth component will propagate to all consuming components.

```ts
import { ComponentProps, JSXElementConstructor } from 'react';

// goes one step further and resolves with propTypes and defaultProps properties
type ApparentComponentProps<C> = C extends JSXElementConstructor<infer P>
  ? JSX.LibraryManagedAttributes<C, P>
  : ComponentProps<C>;
```

You can also use them to strongly type custom event handlers if they're not written at the call sites themselves
(i.e. inlined with the JSX attribute):

```tsx
// my-inner-component.tsx
export function MyInnerComponent(props: {
  onSomeEvent(
    event: ComplexEventObj,
    moreArgs: ComplexArgs
  ): SomeWeirdReturnType;
}) {
  /* ... */
}

// my-consuming-component.tsx
export function MyConsumingComponent() {
  // event and moreArgs are contextually typed along with the return value
  const theHandler: Props<typeof MyInnerComponent>['onSomeEvent'] = (
    event,
    moreArgs
  ) => {};
  return <MyInnerComponent onSomeEvent={theHandler} />;
}
```

## Third Party Libraries

Sometimes DefinitelyTyped can get it wrong, or isn't quite addressing your use case. You can declare your own file with the same interface name. Typescript will merge interfaces with the same name.

# Section 2: Useful Patterns by TypeScript Version

TypeScript Versions often introduce new ways to do things; this section helps current users of React + TypeScript upgrade TypeScript versions and explore patterns commonly used by TypeScript + React apps and libraries. This may have duplications with other sections; if you spot any discrepancies, [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new)!

_TypeScript version guides before 2.9 are unwritten, please feel free to send a PR!_ Apart from official TS team communication we also recommend [Marius Schulz's blog for version notes](https://mariusschulz.com/).

## TypeScript 2.9

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/05/31/announcing-typescript-2-9/)]

1. Type arguments for tagged template strings (e.g. `styled-components`):

```tsx
export interface InputFormProps {
  foo: string; // this is understood inside the template string below
}

export const InputForm = styledInput<InputFormProps>`
    color:
        ${({ themeName }) => (themeName === 'dark' ? 'black' : 'white')};
    border-color: ${({ foo }) => (foo ? 'red' : 'black')};
`;
```

2. **JSX Generics**

https://github.com/Microsoft/TypeScript/pull/22415

Helps with typing/using generic components:

```tsx
// instead of
<Formik render={(props: FormikProps<Values>) => ....}/>

// usage
<Formik<Values> render={props => ...}/>
<MyComponent<number> data={12} />
```

More info: https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md#react-jsx-tip-generic-components

## TypeScript 3.0

[[Release Notes](https://github.com/Microsoft/TypeScript/releases/tag/v3.0.1) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/)]

1. Typed rest parameters for writing arguments of variable length:

```ts
// `rest` accepts any number of strings - even none!
function foo(...rest: string[]) {
  // ...
}

foo('hello'); // works
foo('hello', 'world'); // also works
```

2. Support for `propTypes` and `static defaultProps` in JSX using `LibraryManagedAttributes`:

```ts
export interface Props {
  name: string;
}

export class Greet extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return <div>Hello ${name.toUpperCase()}!</div>;
  }
  static defaultProps = { name: 'world' };
}

// Type-checks! No type assertions needed!
let el = <Greet />;
```

3. new `Unknown` type

For typing API's to force type checks - not specifically React related, however very handy for dealing with API responses:

```tsx
interface IComment {
  date: Date;
  message: string;
}

interface IDataService1 {
  getData(): any;
}

let service1: IDataService1;
const response = service1.getData();
response.a.b.c.d; // RUNTIME ERROR

// ----- compare with -------

interface IDataService2 {
  getData(): unknown; // ooo
}

let service2: IDataService2;
const response2 = service2.getData();
// response2.a.b.c.d; // COMPILE TIME ERROR if you do this

if (typeof response === 'string') {
  console.log(response.toUpperCase()); // `response` now has type 'string'
}
```

You can also assert a type, or use a **type guard** against an `unknown` type. This is better than resorting to `any`.

## TypeScript 3.1

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)]

1. Properties declarations on functions

Attaching properties to functions like this "just works" now:

```tsx
export const FooComponent => ({ name }) => (
    <div>Hello! I am {name}</div>
);

FooComponent.defaultProps = {
    name: "swyx",
};
```

## TypeScript 3.2

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/11/29/announcing-typescript-3-2/)]

nothing specifically React related.

## TypeScript 3.3

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2019/01/31/announcing-typescript-3-3/)]

nothing specifically React related.

## TypeScript 3.4

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4)]

1. [`const` assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions)

```tsx
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

## TypeScript Roadmap

https://github.com/Microsoft/TypeScript/wiki/Roadmap

# Section 3: Misc. Concerns

Sometimes writing React isn't just about React. While we don't focus on other libraries like Redux (see below for more on that), here are some tips on other common concerns when making apps with React + TypeScript.

## Writing TypeScript Libraries instead of Apps

`propTypes` may seem unnecessary with TypeScript, especially when building React + TypeScript **apps**, but they are still relevant when writing **libraries** which may be used by developers working in Javascript.

```ts
interface IMyComponentProps {
  autoHeight: boolean;
  secondProp: number;
}

export class MyComponent extends React.Component<IMyComponentProps, {}> {
  static propTypes = {
    autoHeight: PropTypes.bool,
    secondProp: PropTypes.number.isRequired
  };
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Commenting Components

Typescript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for Typescript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/documentation/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
import React from 'react';

interface MyProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = 'foobar' }: MyProps) {
  return <div>Hello world {label}</div>;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept Typescript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Migrating From Flow

You should check out large projects that are migrating from flow to pick up concerns and tips:

- [Jest](https://github.com/facebook/jest/pull/7554)
- [Expo](https://github.com/expo/expo/issues/2164)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Storybook](https://github.com/storybooks/storybook/issues/5030)
- [VueJS](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)

Useful libraries:

- https://github.com/bcherny/flow-to-typescript
- <https://github.com/piotrwitek/utility-types>.

If you have specific advice in this area, please file a PR!

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Linting

> ⚠️Note that [TSLint is now in maintenance and you should try to use ESLint instead](https://medium.com/palantir/tslint-in-2019-1a144c2317a9). If you are interested in TSLint tips, please check this PR from [@azdanov](https://github.com/sw-yx/react-typescript-cheatsheet/pull/14). The rest of this section just focuses on ESLint.

> ⚠️This is an evolving topic. `typescript-eslint-parser` is no longer maintained and [work has recently begun on `typescript-eslint` in the ESLint community](https://eslint.org/blog/2019/01/future-typescript-eslint) to bring ESLint up to full parity and interop with TSLint.

Follow the TypeScript + ESLint docs at https://github.com/typescript-eslint/typescript-eslint:

```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

add a `lint` script to your `package.json`:

```json
  "scripts": {
    "lint": "eslint 'src/**/*.ts'"
  },
```

and a suitable `.eslintrc.json`:

```json
{
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
    ],
    "no-empty": "warn"
  }
}
```

This is taken from [the `tsdx` PR](https://github.com/palmerhq/tsdx/pull/70/files) which is for **libraries**.

More `.eslintrc.json` options to consider with more options you may want for **apps**:

```json

{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["prettier", "jest", "unicorn"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "typescript-eslint-parser",
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
```

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
declare module 'de-indent' {
  function deindent(): void
  export = deindent // default export
}
```

<details>

<summary>Further Discussion</summary>

Any other tips? Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/sw-yx/react-typescript-cheatsheet/issues/8). We have more discussion and examples [in our issue here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12).

</details>

# Section 4: @types/react and @types/react-dom APIs

The `@types` typings export both "public" types meant for your use as well as "private" types that are for internal use.

## `@types/react`

[Link to `.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)

**Namespace: React**

Most Commonly Used Interfaces and Types

- `ReactNode` - anything that is renderable _inside_ of JSX, this is NOT the same as what can be rendered by a component!
- `Component` - base class of all class-based components
- `PureComponent` - base class for all class-based optimized components
- `FC`, `FunctionComponent` - a complete interface for function components, often used to type external components instead of typing your own
- `CSSProperties` - used to type style objects
- all events: used to type event handlers
- all event handlers: used to type event handlers
- all consts: `Children`, `Fragment`, ... are all public and reflect the React runtime namespace

Not Commonly Used but Good to know

- `Ref` - used to type `innerRef`
- `ElementType` - used for higher order components or operations on components
- `ComponentType` - used for higher order components where you don't specifically deal with the intrinsic components
- `ReactPortal` - used if you specifically need to type a prop as a portal, otherwise it is part of `ReactNode`
- `ComponentClass` - a complete interface for the produced constructor function of a class declaration that extends `Component`, often used to type external components instead of typing your own
- `JSXElementConstructor` - anything that TypeScript considers to be a valid thing that can go into the opening tag of a JSX expression
- `ComponentProps` - props of a component
- `ComponentPropsWithRef` - props of a component where if it is a class-based component it will replace the `ref` prop with its own instance type
- `ComponentPropsWithoutRef` - props of a component without its `ref` prop
- all methods: `createElement`, `cloneElement`, ... are all public and reflect the React runtime API

[@Ferdaber's note](https://github.com/sw-yx/react-typescript-cheatsheet/pull/69): I discourage the use of most `...Element` types because of how black-boxy `JSX.Element` is. You should almost always assume that anything produced by `React.createElement` is the base type `React.ReactElement`.

**Namespace: JSX**

- `Element` - the type of any JSX expression
- `LibraryManagedAttributes` - used to resolve static `defaultProps` and `propTypes` with the internal props type of a component
- `IntrinsicElements` - every possible built-in component that can be typed in as a lowercase tag name in JSX

**Don't use/Internal/Deprecated**

Anything not listed above is considered an internal type and not public. If you're not sure you can check out the source of `@types/react`. The types are annotated accordingly.

- `SFCElement`
- `SFC`
- `ComponentState`
- `LegacyRef`
- `StatelessComponent`
- `ReactType`

## `@types/react-dom`

To be written

# My question isn't answered here!

- [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).
