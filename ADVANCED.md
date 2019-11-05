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
[Contribute!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose)

</div>

---

# Advanced Cheatsheet

**This Advanced Cheatsheet** helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.

- It also has miscellaneous tips and tricks for pro users.
- Advice for contributing to DefinitelyTyped
- The goal is to take _full advantage_ of TypeScript.

**Creating React + TypeScript Libraries**

The best tool for creating React + TS libraries right now is [`tsdx`](https://github.com/palmerhq/tsdx). Run `npx tsdx create` and select the "react" option. You can view [the React User Guide](https://github.com/palmerhq/tsdx/issues/5) for a few tips on React+TS library best practices and optimizations for production.

- Be sure to also check [`basarat`'s guide](https://basarat.gitbooks.io/typescript/content/docs/quick/library.html) for library tsconfig settings.
- From the Angular world, check out https://github.com/bitjson/typescript-starter

---

### Advanced Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 0: Utility Types](#section-0-utility-types)
- [Section 1: Reusable Components/Type Utilities](#section-1-reusable-componentstype-utilities)
  - [Higher Order Components](#higher-order-components-hocs)
  - [Render Props](#render-props)
  - [Conditionally Rendering Components](#conditinonally-rendering-components)
  - [`as` props (passing a component to be rendered)](#as-props-passing-a-component-to-be-rendered)
  - [Generic Components](#generic-components)
  - [Typing a Component that Accepts Different Props](#typing-a-component-that-accepts-different-props)
  - [Props: One or the Other but not Both](#props-one-or-the-other-but-not-both)
  - [Props: Must Pass Both](#props-must-pass-both)
  - [Props: Can Optionally Pass One Only If the Other Is Passed](#props-can-optionally-pass-one-only-if-the-other-is-passed)
  - [Omit attribute from a type](#omit-attribute-from-a-type)
  - [Type Zoo](#type-zoo)
  - [Extracting Prop Types of a Component](#extracting-prop-types-of-a-component)
  - [Handling Exceptions](#handling-exceptions)
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
  - [Namespaced Components](#namespaced-components)
  - [Design System Development](#design-system-development)
  - [Migrating from Flow](#migrating-from-flow)
  - [Prettier](#prettier)
  - [Linting](#linting)
  - [Working with Non-TypeScript Libraries (writing your own index.d.ts)](#working-with-non-typescript-libraries-writing-your-own-indexdts)
- [Section 4: @types/react and @types/react-dom APIs](#section-4-typesreact-and-typesreact-dom-apis)
  - [Adding non-standard attributes](#adding-non-standard-attributes)
    </details>

# Section 0: Utility Types

We will assume knowledge of utility types covered in the sister project [`typescript-utilities-guide`](https://github.com/typescript-cheatsheets/typescript-utilities-guide). Look up libraries included there as well for your typing needs.

# Section 1: Advanced Guides

## Higher Order Components (HOCs)

**There is now a dedicated [HOC cheatsheet](./HOC.md) you can refer to get some practice on HOCs.**

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

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose).

## Conditionally Rendering Components

Use [type guards](https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html#user-defined-type-guards)!

```tsx
// Button props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

// Input/output options
type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  "href" in props;

// Component
const Button: Overload = (props: ButtonProps | AnchorProps) => {
  // anchor render
  if (hasHref(props)) return <a {...props} />;
  // button render
  return <button {...props} />;
};

// Usage
function App() {
  return (
    <>
      {/* 😎 All good */}
      <Button target="_blank" href="https://www.google.com">
        Test
      </Button>
      {/* 😭 Error, `disabled` doesnt exist on anchor element */}
      <Button disabled href="x">
        Test
      </Button>
    </>
  );
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoAekrgCEBXGGCAOzjBzAGcKYBPMEjqNmLAAqcucALyJiMAHQMmrABIAVALIAZAIJMowAEaMkXADwady0QFEANkhBIWMAHxwAZHADeFOHAAFkSYAPwAXHD0LAAmSJjALEgxANwUAL5p5BTUcLosaIHQ7JK8AkL5hdASENwycuiKlUVQVnoGxqYWbc3QDk4u7l6+-kEhEXBcMIYsAOZZmRQ5NACSLGCMlBCMG-C1MMCsPOT8gnAA8gBuSFD2ECgx9X7kAQAUHLVckTasNdwAlJEAFIAZQAGgp+s5XFk3h9uJFelA-lxAXBQRCoYMFlllnAAOL0FBQR7MOCFJBoADWcGAmDG8TgSAAHsAplJEiVPhQ0Ed4IEUFxVCF6u9JN8RL9JHAAD55AotFFo+EcqRIlEyNyjABEwXi2tpbBVuKoNAAwrhIElXDy+cIVCxIlcbncHqKVRKHRq5erJP9NSMXnBcigFcUiLEbqM6XBXgKhSExZ9-v6iDB6FA2OYUL4FHmVelg25YcGaCYHXAI3EoKM0xms+XRLn85JC5RixkTbkAKpcFCzJAUTDRDCHNi6MBgV7+54BOuZ2OjALmLVBgIBHyUABUcEAvBuAOD28vZ7HBZhAII8t5R0kv1+YfmwYMSBzBpNqAPpGeyhqkGvWYN9AiYBFqAAd3AhQzwgWZHAUXkQG1Vd12QuB1DMGBb2XSgHyQlDNx3XdAFo9uBbCgHAoAAGjgAADGI2RQL9kmouAYggMxXCZVkpjgVg4FDKooCZRxoXgK8bzXO8HxY+jGMef832ZRDMPXNCpmU8xsMlFhcKw3D-gWIA)

## `as` props (passing a component to be rendered)

`ElementType` is pretty useful to cover most types that can be passed to createElement e.g.

```tsx
function PassThrough(props: { as: React.ElementType<any> }) {
  const { as: Component } = props;

  return <Component />;
}
```

[Thanks @eps1lon](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/69) for this

## Generic Components

Just as you can make generic functions and classes in TypeScript, you can also make generic components to take advantage of the type system for reusable type safety. Both Props and State can take advantage of the same generic types, although it probably makes more sense for Props than for State. You can then use the generic type to annotate types of any variables defined inside your function / class scope.

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}
```

You can then use the generic components and get nice type safety through type inference:

```tsx
ReactDOM.render(
  <List
    items={["a", "b"]} // type of 'string' inferred
    renderItem={item => (
      <li key={item}>
        {item.toPrecision(3)} // Error: Property 'toPrecision' does not exist on
        type 'string'.
      </li>
    )}
  />,
  document.body
);
```

As of [TS 2.9](#typescript-29), you can also supply the type parameter in your JSX to opt out of type inference:

```tsx
ReactDOM.render(
  <List<number>
    items={["a", "b"]} // Error: Type 'string' is not assignable to type 'number'.
    renderItem={item => <li key={item}>{item.toPrecision(3)}</li>}
  />,
  document.body
);
```

You can also use Generics using fat arrow function style:

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Note the <T extends unknown> before the function definition.
// You can't use just `<T>` as it will confuse the TSX parser whether it's a JSX tag or a Generic Declaration.
// You can also use <T,> https://github.com/microsoft/TypeScript/issues/15713#issuecomment-499474386
const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};
```

The same for using classes: (Credit: [Karol Majewski](https://twitter.com/WrocTypeScript/status/1163234064343736326)'s [gist](https://gist.github.com/karol-majewski/befaf05af73c7cb3248b4e084ae5df71))

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

interface State<T> {
  items: T[];
}

class List<T> extends React.PureComponent<Props<T>, State<T>> {
  // You can use type T inside List class.
  state: Readonly<State<T>> = {
    items: []
  };
  render() {
    const { items, renderItem } = this.props;
    // You can use type T inside List class.
    const clone: T[] = items.slice(0);
    return (
      <div>
        {items.map(renderItem)}
        <button onClick={() => this.setState({ items: clone })}>Clone</button>
        {JSON.stringify(this.state, null, 2)}
      </div>
    );
  }
}
```

Though you can't use Generic Type Parameters for Static Members:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  // Static members cannot reference class type parameters.ts(2302)
  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

To fix this you need to convert your static function to a type inferred function:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  static getDerivedStateFromProps<T>(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

### Generic components with children

`children` is usually not defined as a part of the props type. Unless `children` are explicitly defined as a part of the `props` type, an attempt to use `props.children` in JSX or in the function body will fail:

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

/* Property 'children' does not exist on type 'WrapperProps<T>'. */
const Wrapper = <T extends {}>(props: WrapperProps<T>) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};

/*
Type '{ children: string; item: string; renderItem: (item: string) => string; }' is not assignable to type 'IntrinsicAttributes & WrapperProps<string>'.
  Property 'children' does not exist on type 'IntrinsicAttributes & WrapperProps<string>'.
*/

const wrapper = (
  <Wrapper item="test" renderItem={item => item}>
    {test}
  </Wrapper>
);
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgHUoUwx6AFHMAZwA8AFQB8cAN4U4cYHRAAuOMIDc0uEWoATegEl5SgBRyki5QEo4AXnHJ0MAHR2MAOQg615GWgAWwADZamkrOjqFuHhQAvhQUAPQAVHC8EFywAJ4EvgFBSNT4cFoQSPxw1BDwSAAewPzwENRwMOlcBGwcaSkCIqL4DnAJcRRoDXWs7Jz01nAicNV02qUSUaKGYHz8Su2TUF1CYpY2kupEMACuUI2G6jKCWsAAbqI3MpLrqfwOmjpQ+qZrGwcJhA5hiXleMgk7wEDmygU0YIhgji9ye6nMniinniCQowhazHwEjgcNy1CUdSgNAA5ipZAY4JSaXTvnoGcYGUzqNTDuIubS4FECrUyhU4Ch+PxgNTqCgAEb+ZgwCBNAkEXS0KnUKVoACCMBgVLlZzopQAZOMOjwNoJ+b0HOouvRmlk-PC8gUiiVRZUamMGqrWvgNYaaDr9aHjaa4Bbtp0bXa+hRBrFyCNtfBTfArHBDLyZqjRAAJJD+fwqrPIwvDUbwADuEzS02u4MEcamwKsACIs12NHkfn8QFYJMDrOJgSsXhIs4iZnF21BnuQMUA)

To work around that, either add `children` to the `WrapperProps` definition (possibly narrowing down its type, as needed):

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
  children: string; // The component will only accept a single string child
}

const Wrapper = <T extends {}>(props: WrapperProps<T>) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};
```

or wrap the type of the props in `React.PropsWithChildren` (this is what `React.FC<>` does):

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

const Wrapper = <T extends {}>(
  props: React.PropsWithChildren<WrapperProps<T>>
) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};
```

## Typing a Component that Accepts Different Props

Components, and JSX in general, are analogous to functions. When a component can render differently based on their props, it's similar to how a function can be overloaded to have multiple call signatures. In the same way, you can overload a function component's call signature to list all of its different "versions".

A very common use case for this is to render something as either a button or an anchor, based on if it receives a `href` attribute.

```tsx
type ButtonProps = JSX.IntrinsicElements["button"];
type AnchorProps = JSX.IntrinsicElements["a"];

// optionally use a custom type guard
function isPropsForAnchorElement(
  props: ButtonProps | AnchorProps
): props is AnchorProps {
  return "href" in props;
}

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
type LinkProps = Omit<JSX.IntrinsicElements["a"], "href"> & { to?: string };

function RouterLink(props: LinkProps | AnchorProps) {
  if ("to" in props) {
    return <a {...props} />;
  } else {
    return <Link {...props} />;
  }
}
```

<details>
  <summary><b>Approach: Generic Components</b></summary>

Here is an example solution, see the further discussion for other solutions. _thanks to [@jpavon](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/12#issuecomment-394440577)_

```tsx
interface LinkProps {}
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type RouterLinkProps = Omit<NavLinkProps, "href">;

const Link = <T extends {}>(
  props: LinkProps & T extends RouterLinkProps ? RouterLinkProps : AnchorProps
) => {
  if ((props as RouterLinkProps).to) {
    return <NavLink {...(props as RouterLinkProps)} />;
  } else {
    return <a {...(props as AnchorProps)} />;
  }
};

<Link<RouterLinkProps> to="/">My link</Link>; // ok
<Link<AnchorProps> href="/">My link</Link>; // ok
<Link<RouterLinkProps> to="/" href="/">
  My link
</Link>; // error
```

</details>

<details>
  <summary><b>Approach: Composition</b></summary>

If you want to conditionally render a component, sometimes is better to use [React's composition model](https://reactjs.org/docs/composition-vs-inheritance.html) to have simpler components and better to understand typings:

```tsx
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<AnchorProps, 'href'>

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
```

</details>

You may also want to use Discriminated Unions, please check out [Expressive React Component APIs with Discriminated Unions](https://blog.andrewbran.ch/expressive-react-component-apis-with-discriminated-unions/).

Here is a brief intuition for **Discriminated Union Types**:

```ts
type UserTextEvent = { value: string; target: HTMLInputElement };
type UserMouseEvent = { value: [number, number]; target: HTMLElement };
type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (typeof event.value === "string") {
    event.value; // string
    event.target; // HTMLInputElement | HTMLElement (!!!!)
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLInputElement | HTMLElement (!!!!)
}
```

Even though we have narrowed based on `event.value`, the logic doesn't filter up and sideways to `event.target`. This is because a union type `UserTextEvent | UserMouseEvent` could be BOTH at once. So TypeScript needs a better hint. The solution is to use a literal type to tag each case of your union type:

```ts
type UserTextEvent = {
  type: "TextEvent";
  value: string;
  target: HTMLInputElement;
};
type UserMouseEvent = {
  type: "MouseEvent";
  value: [number, number];
  target: HTMLElement;
};
type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (event.type === "TextEvent") {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLElement
}
```

To streamline this you may also combine this with the concept of **User-Defined Type Guards**:

```ts
function isString(a: unknown): a is string {
  return typeof a === "string";
}
```

[Read more about User-Defined Type Guards in the Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

## Props: One or the Other but not Both

Use the `in` keyword, function overloading, and union types to make components that take either one or another sets of props, but not both:

```tsx
type Props1 = { foo: string };
type Props2 = { bar: string };

function MyComponent(props: Props1 | Props2) {
  if ("foo" in props) {
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

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgAUcwBnARjgF44BvOTCBABccFjCjAAdgHM4AXwDcVWvSYRWAJi684AIxRQRYiTPlLK5TAFdJGYBElwAstQDCuSJKSSYACjDMLCJqrBwAPoyBGgCUvBRwcMCYcL4ARAIQqYmOAeossTzxCXAA9CVwuawAdPpQpeVIUDhQRQlEMFZQjgA8ACbAAG4AfDyVLFUZct0l-cPmCXJwSAA2LPSF5MX1FYETgtuNza1w7Z09syNjNQZTM4ND8-IUchRoDmJwAKosKNJI7uAHN4YCJkOgYFUAGKubS+WKcIYpIp9e7HbouAGeYH8QScdKCLIlIZojEeIE+PQGPG1QnEzbFHglABUcHRbjJXgpGTxGSytWpBlSRO2UgGKGWwF6cCZJRe9OmFwo0QUQA)

Further reading: [how to ban passing `{}` if you have a `NoFields` type.](http://www.javiercasas.com/articles/typescript-impossible-states-irrepresentable)

## Props: Must Pass Both

```tsx
type OneOrAnother<T1, T2> =
  | (T1 & { [K in keyof T2]?: undefined })
  | (T2 & { [K in keyof T1]?: undefined });

type Props = OneOrAnother<{ a: string; b: string }, {}>;

const a: Props = { a: "a" }; // error
const b: Props = { b: "b" }; // error
const ab: Props = { a: "a", b: "b" }; // ok
```

Thanks [diegohaz](https://twitter.com/kentcdodds/status/1085655423611367426)

## Props: Can Optionally Pass One Only If the Other Is Passed

Say you want a Text component that gets truncated if `truncate` prop is passed but expands to show the full text when `expanded` prop is passed (e.g. when the user clicks the text).

You want to allow `expanded` to be passed only if `truncate` is also passed, because there is no use for `expanded` if the text is not truncated.

You can do this by function overloads:

```tsx
type CommonProps = {
  children: React.ReactNode;
  miscProps?: any;
};

type NoTruncateProps = CommonProps & { truncate?: false };

type TruncateProps = CommonProps & { truncate: true; expanded?: boolean };

// Function overloads to accept both prop types NoTruncateProps & TruncateProps
function Text(props: NoTruncateProps): JSX.Element;
function Text(props: TruncateProps): JSX.Element;
function Text(props: CommonProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, ...otherProps } = props;
  const classNames = truncate ? ".truncate" : "";
  return (
    <div className={classNames} aria-expanded={!!expanded} {...otherProps}>
      {children}
    </div>
  );
}
```

Using the Text component:

```tsx
const App: React.FC = () => (
  <>
    {/* these all typecheck */}
    <Text>not truncated</Text>
    <Text truncate>truncated</Text>
    <Text truncate expanded>
      truncate-able but expanded
    </Text>
    {/* TS error: Property 'truncate' is missing in type '{ children: string; expanded: true; }' but required in type '{ truncate: true; expanded?: boolean | undefined; }'. */}
    <Text expanded>truncate-able but expanded</Text>
  </>
);
```

## Omit attribute from a type

Note: [Omit was added as a first class utility in TS 3.5](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittk)! 🎉

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode; // this will conflict with the InputElement's label
}

// this comes inbuilt with TS 3.5
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, "label">
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

When your component defines multiple props, chances of those conflicts increase. However you can explicitly state that all your fields should be removed from the underlying component using the `keyof` operator:

```tsx
export interface Props {
  label: React.ReactNode; // conflicts with the InputElement's label
  onChange: (text: string) => void; // conflicts with InputElement's onChange
}

export const Textbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, keyof Props>
) => {
  // implement Textbox component ...
};
```

## Type Zoo

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Extracting Prop Types of a Component

_(Contributed by [@ferdaber](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/63))_

There are a lot of places where you want to reuse some slices of props because of prop drilling,
so you can either export the props type as part of the module or extract them (either way works).

The advantage of extracting the prop types is that you won't need to export everything, and a refactor of the source of truth component will propagate to all consuming components.

```ts
import { ComponentProps, JSXElementConstructor } from "react";

// goes one step further and resolves with propTypes and defaultProps properties
type ApparentComponentProps<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>
> = C extends JSXElementConstructor<infer P>
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
  const theHandler: Props<typeof MyInnerComponent>["onSomeEvent"] = (
    event,
    moreArgs
  ) => {};
  return <MyInnerComponent onSomeEvent={theHandler} />;
}
```

## Handling Exceptions

You can provide good information when bad things happen.

```ts
class InvalidDateFormatError extends RangeError {}
class DateIsInFutureError extends RangeError {}

/**
 * // optional docblock
 * @throws {InvalidDateFormatError} The user entered date incorrectly
 * @throws {DateIsInFutureError} The user entered date in future
 *
 */
function parse(date: string) {
  if (!isValid(date))
    throw new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) throw new DateIsInFutureError("date is in the future");
  // ...
}

try {
  // call parse(date) somewhere
} catch (e) {
  if (e instanceof InvalidDateFormatError) {
    console.error("invalid date format", e);
  } else if (e instanceof DateIsInFutureError) {
    console.warn("date is in future", e);
  } else {
    throw e;
  }
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BJAOwDcVrgATAERRhIAYtBACAolBxQ4SAB6CW3RghQsA5kknS4AbwC+VWgzj9BTOqyEBXGNaLboshUiUq1mxzIMUKmaywYwBAscMB0AGqcPAAU3AJIAFxwdDBQwBoAlHoUcHBEdlCh8YJwAPxwadZIcMmYnHRIANwUhpTk-oEwwaHhVrb2SHEJyanpWTnkeWghqXAlSAByEADucAC8cCxIa2ZDmS1TcDMsc2j2RCwwextbO6YJw4KZuXCvBfah51Ku1wkAdJoYAAVUD7OAAPnmCWWK0BSBBYJiB1avnIAHoAFSY3KYuDo9FwCBgbohTjzCBoABG1EpAGtcXAAAIwAAWOBWjF0rA4XD4CREUDEMC8+jgwNZNWsjRkvyQRG40NKGRmPww1AAnoyWezVly9hZ+oUtFJoGKJVKZbIrvKkIqFmFQv5jbjcei-AEgiE4GAUFBGk8kik0hl1NldK9gJg4DEAIThKJ8wOZF5HPJsjl3NY86L8wSC4VeGIAIhYEHgKDgvJ4SpqmFEAmLKKOUZjfRYNmNyeyGdWWYe5ksHYGDlNUBLDvCjsqkrgzsGTcOeQJcH+a9R7TSGsmy8JaE41B9foDC2ydFwO0lRFaxwEaFZMaQ4cj0ZiNQyqTUaCQEGjOb5ewFhIY7PmmxyzBA1BIP88rSCWGTVvaCRzg2MDFgANLIzZ5GKSDUI0YSvu+pwwF+P7RgaQ6doMXigXk0wQVB-wrH6LATshU4ZHOI5IBhWFLnAuH4TUEZgb2azNK8bT6EAA)

Simply throwing an exception is fine, however it would be nice to make TypeScript remind the consumer of your code to handle your exception. We can do that just by returning instead of throwing:

```ts
function parse(
  date: string
): Date | InvalidDateFormatError | DateIsInFutureError {
  if (!isValid(date))
    return new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) return new DateIsInFutureError("date is in the future");
  // ...
}

// now consumer *has* to handle the errors
let result = parse("mydate");
if (result instanceof InvalidDateFormatError) {
  console.error("invalid date format", result.message);
} else if (result instanceof DateIsInFutureError) {
  console.warn("date is in future", result.message);
} else {
  /// use result safely
}

// alternately you can just handle all errors
if (result instanceof Error) {
  console.error("error", result);
} else {
  /// use result safely
}
```

You can also describe exceptions with special-purpose data types (don't say monads...) like the `Try`, `Option` (or `Maybe`), and `Either` data types:

```ts
interface Option<T> {
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Option<U>): Option<U>
  getOrElse(value: T): T
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: T) => Some<U>): Some<U>
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value)
  }
  getOrElse(): T {
    return this.value
  }
}
class None implements Option<never> {
  flatMap<U>(): None {
    return this
  }
  getOrElse<U>(value: U): U {
    return value
  }
}

// now you can use it like:
let result = Option(6) // Some<number>
              .flatMap(n => Option(n*3)) // Some<number>
              .flatMap(n = new None) // None
              .getOrElse(7)

// or:
let result = ask() // Option<string>
              .flatMap(parse) // Option<Date>
              .flatMap(d => new Some(d.toISOString()) // Option<string>
              .getOrElse('error parsing string')
```

## Third Party Libraries

Sometimes DefinitelyTyped can get it wrong, or isn't quite addressing your use case. You can declare your own file with the same interface name. Typescript will merge interfaces with the same name.

# Section 2: Useful Patterns by TypeScript Version

TypeScript Versions often introduce new ways to do things; this section helps current users of React + TypeScript upgrade TypeScript versions and explore patterns commonly used by TypeScript + React apps and libraries. This may have duplications with other sections; if you spot any discrepancies, [file an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new)!

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
        ${({ themeName }) => (themeName === "dark" ? "black" : "white")};
    border-color: ${({ foo }) => (foo ? "red" : "black")};
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

foo("hello"); // works
foo("hello", "world"); // also works
```

2. Support for `propTypes` and `static defaultProps` in JSX using `LibraryManagedAttributes`:

```tsx
export interface Props {
  name: string;
}

export class Greet extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return <div>Hello ${name.toUpperCase()}!</div>;
  }
  static defaultProps = { name: "world" };
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

if (typeof response === "string") {
  console.log(response.toUpperCase()); // `response` now has type 'string'
}
```

You can also assert a type, or use a **type guard** against an `unknown` type. This is better than resorting to `any`.

4. Project References

Project references allow TypeScript projects to depend on other TypeScript projects – specifically, allowing tsconfig.json files to reference other tsconfig.json files. This lets large codebases scale without recompiling every part of the codebase every time, by breaking it up into multiple projects.

In each folder, create a tsconfig.json that includes at least:

```js
{
  "compilerOptions": {
    "composite": true, // tells TSC it is a subproject of a larger project
    "declaration": true, // emit .d.ts declaration files since project references dont have access to source ts files. important for project references to work!
    "declarationMap": true, // sourcemaps for .d.ts
    "rootDir": "." // specify compile it relative to root project at .
  },
  "include": [
    "./**/*.ts
  ],
  "references": [ // (optional) array of subprojects your subproject depends on
    {
      "path": "../myreferencedproject", // must have tsconfig.json
      "prepend": true // concatenate js and sourcemaps generated by this subproject, if and only if using outFile
    }
  ]
}
```

and the root `tsconfig.json` that references top level subproject:

```js
{
  "files: [],
  "references": [
    {"path": "./proj1"},
    {"path": "./proj2"},
  ]
}
```

and you must run `tsc --build` or `tsc -b`.

To save the tsconfig boilerplate, you can use the `extends` option:

```js
{
  "extends": "../tsconfig.base",
  // more stuff here
}
```

## TypeScript 3.1

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)]

1. Properties declarations on functions

Attaching properties to functions like this "just works" now:

```tsx
export const FooComponent = ({ name }) => <div>Hello! I am {name}</div>;

FooComponent.defaultProps = {
  name: "swyx"
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
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

More info on places you can use [const assertions](https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802).

## TypeScript 3.5

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/)]

1. Built-in `<Omit>` Type!!

2. Higher order type inference from generic constructors

```tsx
type ComponentClass<P> = new (props: P) => Component<P>;
declare class Component<P> {
  props: P;
  constructor(props: P);
}

declare function myHoc<P>(C: ComponentClass<P>): ComponentClass<P>;

type NestedProps<T> = { foo: number; stuff: T };

declare class GenericComponent<T> extends Component<NestedProps<T>> {}

// type is 'new <T>(props: NestedProps<T>) => Component<NestedProps<T>>'
const GenericComponent2 = myHoc(GenericComponent);
```

See also [Notes from Google upgrading to 3.5](https://github.com/microsoft/TypeScript/issues/33272)

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

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Commenting Components

Typescript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for Typescript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/documentation/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
import React from "react";

interface MyProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = "foobar" }: MyProps) {
  return <div>Hello world {label}</div>;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgFkBPABRzAGc4BvCnDgB6AFRi4AESQ80UYGBjAI1OBExww3OACIANigBGSfboB0Q4ZIACAEySMArvqwQIRlFCtxJYkVaGJvoA-ABccDwwCtQA5gDcFAC+FBTiYkKSAOJI1PQo+nBouJB5tHAOcgpKKmo0cABSAMpSEGhwmNAgKDDmrF4A1nYQAO51fGI8TmCQsEh2YpbkvgHkSAAes-AOzq4dTtQYtaxsAMIlqrkwABT8cEGmcAC8ep0eXrpwSRHsXBC8AEoBFYiDAnFA1AAeOzAABuAD4ABKmfQQOAjaD6OwCB76JKQkQwhGJchJIA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Namespaced Components

Often when creating similar components or components that have a parent-child relationship, it is useful to namespace your components. Types can easily be added be using `Object.assign()`;

```tsx
import React from 'react'

const Input = (props: any) => <input {...props} />

const Form = React.forwardRef<HTMLDivElement, any>(({children, ...otherProps}, ref) => (
  <form {...otherProps} ref={ref}>
    {children}
  </form>
));

/**
 * Exported components now can be used as `<Form>` and `<Form.Input>`
 */
export default Object.assign(Form, {Input: Input});
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2&ssl=1&ssc=1&pln=14&pc=52#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd4BJGsAV3gF44AKMHMOgC44KGgE8AlHA4A+OAB5gLdnADeAOk18IAgL5wA9DIpVaDOADFoeLsnQx1maAHcUUACbJM8gBIAVAFkAGQARYAA3AFEAGyQQJBoYABoRcRlublU0AAtgaPciGhTNdQgYbKQoAAV+Ol0UokwpWR4KOAUnKDwNTTKK6tr9Ro5VRt1jcnb2rNz8wt02hQNOkAmJCQBuE3IDACpdtt24SIAPSFgkdzhqcFoEmDo4Gghna9E4ACMkOFY6S5FHgADeRWLoyQGpK7A0EgdTMNgwcGHAwUJBnaDwdxITAoVjReAAeQ+ACskBh1Cg6HRgABzGjcGEpVTw9jCFkwXSbIA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept Typescript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

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

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Prettier

There isn't any real secret to Prettier for TypeScript. But its a great idea to run prettier on every commit!

```js
yarn add -D prettier husky lint-staged

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
      "ignore": [
        "**/dist/*, **/node_modules/*"
      ]
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

This is set up for you in [tsdx](https://github.com/palmerhq/tsdx/pull/45/files).

## Linting

> ⚠️Note that [TSLint is now in maintenance and you should try to use ESLint instead](https://medium.com/palantir/tslint-in-2019-1a144c2317a9). If you are interested in TSLint tips, please check this PR from [@azdanov](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/14). The rest of this section just focuses on ESLint.

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

You can read a [fuller TypeScript + ESLint setup guide here](https://blog.matterhorn.dev/posts/learn-typescript-linting-part-1/) from Matterhorn, in particular check https://github.com/MatterhornDev/learn-typescript-linting.

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

Any other tips? Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/8). We have more discussion and examples [in our issue here](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/12).

</details>

# Section 4: @types/react and @types/react-dom APIs

The `@types` typings export both "public" types meant for your use as well as "private" types that are for internal use.

Check [SaltyCrane's React TypeScript Cheatsheet](https://github.com/saltycrane/typescript-cheatsheet) for a nice autogenerated complete reference.

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

[@Ferdaber's note](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/69): I discourage the use of most `...Element` types because of how black-boxy `JSX.Element` is. You should almost always assume that anything produced by `React.createElement` is the base type `React.ReactElement`.

**Namespace: JSX**

- `Element` - the type of any JSX expression
- `LibraryManagedAttributes` - It specifies other places where JSX elements can declare and initialize property types. Used to resolve static `defaultProps` and `propTypes` with the internal props type of a component.
- `IntrinsicElements` - every possible built-in component that can be typed in as a lowercase tag name in JSX

Not commonly used but good to know

- `IntrinsicAttributes` set of attributes that all `IntrinsicElements` support... basically just `key`.
- `ElementChildrenAttribute` name of property that TS looks at to figure out what types of children a component supports. Basically the `children` property
- `ElementAttributesProperty` name of property that TS looks at to figure out what attributes a component supports. Basically the `props` property (for a class instance)

**Don't use/Internal/Deprecated**

Anything not listed above is considered an internal type and not public. If you're not sure you can check out the source of `@types/react`. The types are annotated accordingly.

- `SFCElement`
- `SFC`
- `ComponentState`
- `LegacyRef`
- `StatelessComponent`
- `ReactType`

### Adding non-standard attributes

The attributes allowed on host components such as `button` or `img` follow the
HTML living standard. New features that are not yet part of specification
or are only implemented by certain browsers will therefore cause a type error. If
you specifically write code for these browsers or polyfill this attributes you can
use [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) to still get those components type checked without having
to use `any` or `@ts-ignore`.

In this example we'll add the [`loading`](https://www.chromestatus.com/feature/5645767347798016) attribute which adds support for [lazy-loading](https://web.dev/native-lazy-loading) images on Chrome:

```ts
// react-unstable-attributes.d.ts
import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "auto" | "eager" | "lazy";
  }
}
```

## `@types/react-dom`

To be written

# My question isn't answered here!

- [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
