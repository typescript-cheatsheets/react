---
id: patterns_by_usecase
title: "Useful Patterns by Use Case"
sidebar_label: Useful Patterns by Use Case
---

## Wrapping/Mirroring

### Wrapping/Mirroring a HTML Element

Usecase: you want to make a `<Button>` that takes all the normal props of `<button>` and does extra stuff.

Strategy: extend `React.ComponentPropsWithoutRef<'button'>`

```tsx
// usage
function App() {
  // Type '"foo"' is not assignable to type '"button" | "submit" | "reset" | undefined'.(2322)
  // return <Button type="foo"> sldkj </Button>

  // no error
  return <Button type="button"> text </Button>;
}

// implementation
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}
export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // do something with specialProp
  return <button {...rest} />;
}
```

[_See this in the TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUI4wPQtwCuqyA5lowQ4A7fMAhC4AQTBgAFAEo4Ab0Zw4bOABUAnmCzkARAQgQDZOMHRCI8NKmA8hyAEYAbfTAhwYu-WQPOHDCeQgZwAD5wBqgcziDAMGGRBpSoWIkRnEIAJlgEwEJY2WQAdLIATADM5eXyqurslDAcUBIAPABCQSHevgC8RiYGAHxwqK7ZANYAVnBtLF3B4sP19RrWcFhQxFD1TS3tiz0+egOBS6GjMFgAHvDzR8uMAL7MDBqgYO4gWEIwyDAxEJGLdILALH8tgQ8PpHkIAArEMDoW7XHLobB4GAlADCJEghT+iIgyLaZHOITIoxUDDUqD0uGAyFcxLAAH4AFxjGBQAo8egMV4MUHQQjCUTiOBw2RgJGoLlw1moRQ0tS4cSoeBKMYMpkspEAGjgJRNqXgzzgfTgspJqAFag02S8qBI6QAFny4AB3BJunVYRnM1l7dIHOYUyVKE0lM0WljDAXPIA)

**Forwarding Refs**: As [the React docs themselves note](https://reactjs.org/docs/forwarding-refs.html), most usecases will not need to obtain a ref to the inner element. But for people making reusable component libraries, you will need to `forwardRef` the underlying element, and then you can use `ComponentPropsWithRef` to grab props for your wrapper component. Check [our docs on forwarding Refs](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/) for more.

In future, the need to `forwardRef` may go away in React 17+, but for now we still have to deal with this. 🙃

<details>
<summary>

Why not `ComponentProps` or `IntrinsicElements` or `[Element]HTMLAttributes` or `HTMLProps` or `HTMLAttributes`?

</summary>

## `ComponentProps`

You CAN use `ComponentProps` in place of `ComponentPropsWithRef`, but you may prefer to be explicit about whether or not the component's refs are forwarded, which is what we have chosen to demonstrate. The tradeoff is slightly more intimidating terminology.

More info: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/

### Maybe `JSX.IntrinsicElements` or `[Element]HTMLAttributes`

There are at least 2 other equivalent ways to do this, but they are more verbose:

```tsx
// Method 1: JSX.IntrinsicElements
type BtnType = JSX.IntrinsicElements["button"]; // cannot inline or will error
export interface ButtonProps extends BtnType {} // etc

// Method 2: React.[Element]HTMLAttributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
```

Looking at [the source for `ComponentProps`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f3134f4897c8473f590cbcdd5788da8d59796f45/types/react/index.d.ts#L821) shows that this is a clever wrapper for `JSX.IntrinsicElements`, whereas the second method relies on specialized interfaces with unfamiliar naming/capitalization.

> Note: There are over 50 of these specialized interfaces available - look for `HTMLAttributes` in our [`@types/react` commentary](https://react-typescript-cheatsheet.netlify.app/docs/advanced/types_react_api#typesreact).

Ultimately, [we picked the `ComponentProps` method](https://github.com/typescript-cheatsheets/react/pull/276) as it involves the least TS specific jargon and has the most ease of use. But you'll be fine with either of these methods if you prefer.

### Definitely not `React.HTMLProps` or `React.HTMLAttributes`

This is what happens when you use `React.HTMLProps`:

```tsx
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  specialProp: string;
}
export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // ERROR: Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.
  return <button {...rest} />;
}
```

It infers a too-wide type of `string` for `type`, because it [uses `AllHTMLAttributes` under the hood](https://github.com/typescript-cheatsheets/react/issues/128#issuecomment-508103558).

This is what happens when you use `React.HTMLAttributes`:

```tsx
import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /* etc */
}

function App() {
  // Property 'type' does not exist on type 'IntrinsicAttributes & ButtonProps'
  return <Button type="submit"> text </Button>;
}
```

</details>

### Wrapping/Mirroring a Component

> TODO: this section needs work to make it simplified.

Usecase: same as above, but for a React Component you don't have access to the underlying props

```tsx
import { CSSProperties } from "react";

const Box = (props: CSSProperties) => <div style={props} />;

const Card = (
  { title, children, ...props }: { title: string } & $ElementProps<typeof Box> // new utility, see below
) => (
  <Box {...props}>
    {title}: {children}
  </Box>
);
```

Strategy: extract a component's props by inferring them

Example:

```tsx
// ReactUtilityTypes.d.ts
declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never;
```

Usage:

```tsx
import * as Recompose from "recompose";
export const defaultProps = <
  C extends React.ComponentType,
  D extends Partial<$ElementProps<C>>
>(
  defaults: D,
  Component: C
): React.ComponentType<$ElementProps<C> & Partial<D>> =>
  Recompose.defaultProps(defaults)(Component);
```

_thanks [dmisdm](https://github.com/typescript-cheatsheets/react/issues/23)_

:new: You should also consider whether to explicitly forward refs:

```tsx
import { forwardRef, ReactNode } from "react";

// base button, with ref forwarding
type Props = { children: ReactNode; type: "submit" | "button" };
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyCustomButtonClass" type={props.type}>
    {props.children}
  </button>
));

// second layer button, no need for forwardRef (TODO: doublecheck this)
export interface DoubleWrappedProps
  extends React.ComponentPropsWithRef<typeof FancyButton> {
  specialProp?: string;
}
export function DoubleWrappedButton(props: DoubleWrappedProps) {
  const { specialProp, ref, ...rest } = props;
  return <button ref={ref} {...rest} />;
}

// usage
import { useRef } from "react";

function App() {
  const btnRef = useRef<HTMLButtonElement>(null!);
  return (
    <DoubleWrappedButton type="button" ref={btnRef}>
      {" "}
      text{" "}
    </DoubleWrappedButton>
  );
}
```

_[TS Playground link](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUIwPTNwBGaWHArjDBAB2AGjgB3YDAAWcSgTgFoY5FAAmwQQHNGMAJ5huABWJh0AXjgBvOLinAANqsqCAXJiowAdNjwwAchCqWDRwegZuAESoPOwgkhFwAD5wEex8AoIJAL70DFgAHpCwofrc2PIWABIAKgCyADIAQulCAKL2WCBYgjC5BUXwuEKo8ABiyIK4us38QnAWPvieilDKauUAPOWixhCmAHwAFIdgJqiicgCU8-twh4xwcBtps4KyWARmlnJZNvZoqD8yC6ZgitV0AGF-qhAcCsAkwlgvqc9qhPIisvsHo8rCjTJ5bA4nN0stiNswXhksQxLpdcowWGxUFghoJVHB-rosFBeK9GP1oPANDBuQQ8NwACIQGIdADqUGQYAMql2pjgBRFbPQiy8EJIkEE3RgqtQsskUk2iIg8nGk2mLUEt0s2NQBlwwGQ9lVAH43CMoBpNLlSXlCoKFDxJjBgHMpTKsPLFcqZhkTmc3HH2HKFUqsCqztdnQxHqyRlY4K6WR6vSYLh9RJ5G5Qy78LHjULlHpQYDwoG9ng73p9vh9fpZG55mzBfsx9sGGQxWHAeKhkJosIwCJH8DG3gBBJWHQvY0vwdgwQTlebuXyeFdYTY1BoptodLo9I6CHj2ewAQku2Ldr2-aZtmSZ5i+byIqClJCAkchfOel6jrcIr5PA5KgQmObJg61IhkAA)_

## Polymorphic Components (e.g. with `as` props)

> "Polymorphic Components" = passing a component to be rendered, e.g. with `as` props

`ElementType` is pretty useful to cover most types that can be passed to createElement e.g.

```tsx
function PassThrough(props: { as: React.ElementType<any> }) {
  const { as: Component } = props;

  return <Component />;
}
```

You might also see this with React Router:

```tsx
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component {...rest} /> : <Redirect to="/" />;
};
```

For more info you can refer to these resources:

- https://blog.andrewbran.ch/polymorphic-react-components/
- https://github.com/kripod/react-polymorphic-box
- https://stackoverflow.com/questions/58200824/generic-react-typescript-component-with-as-prop-able-to-render-any-valid-dom

[Thanks @eps1lon](https://github.com/typescript-cheatsheets/react/pull/69) and [@karol-majewski](https://github.com/typescript-cheatsheets/react/issues/151) for thoughts!

## Generic Components

Just as you can make generic functions and classes in TypeScript, you can also make generic components to take advantage of the type system for reusable type safety. Both Props and State can take advantage of the same generic types, although it probably makes more sense for Props than for State. You can then use the generic type to annotate types of any variables defined inside your function / class scope.

```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
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
    renderItem={(item) => (
      <li key={item}>
        {/* Error: Property 'toPrecision' does not exist on type 'string'. */}
        {item.toPrecision(3)}
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
    renderItem={(item) => <li key={item}>{item.toPrecision(3)}</li>}
  />,
  document.body
);
```

You can also use Generics using fat arrow function style:

```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

// Note the <T extends unknown> before the function definition.
// You can't use just `<T>` as it will confuse the TSX parser whether it's a JSX tag or a Generic Declaration.
// You can also use <T,> https://github.com/microsoft/TypeScript/issues/15713#issuecomment-499474386
const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
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
import { PureComponent, ReactNode } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

interface State<T> {
  items: T[];
}

class List<T> extends PureComponent<Props<T>, State<T>> {
  // You can use type T inside List class.
  state: Readonly<State<T>> = {
    items: [],
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

## Typing Children

Some API designs require some restriction on `children` passed to a parent component. It is common to want to enforce these in types, but you should be aware of limitations to this ability.

### What You CAN Do

You can type the **structure** of your children: just one child, or a tuple of children.

The following are valid:

```ts
type OneChild = React.ReactElement;
type TwoChildren = [React.ReactElement, React.ReactElement];
type ArrayOfProps = SomeProp[];
type NumbersChildren = number[];
type TwoNumbersChildren = [number, number];
```

<details>
<summary>
Don't forget that you can also use `prop-types` if TS fails you.
</summary>

```ts
Parent.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.shape({
      // could share `propTypes` to the child
      value: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
```

</details>

### What You CANNOT Do

The thing you cannot do is **specify which components** the children are, e.g. If you want to express the fact that "React Router `<Routes>` can only have `<Route>` as children, nothing else is allowed" in TypeScript.

This is because when you write a JSX expression (`const foo = <MyComponent foo='foo' />`), the resultant type is blackboxed into a generic JSX.Element type. (_[thanks @ferdaber](https://github.com/typescript-cheatsheets/react/issues/271)_)

## Type Narrowing based on Props

What you want:

```tsx
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

How to implement: Use [type guards](https://basarat.gitbook.io/typescript/type-system/typeguard#user-defined-type-guards)!

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
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoAekrgCEBXGGCAOzjBzAGcKYBPMEjqNmLAAqcucALyJiMAHQMmrABIAVALIAZAIJMowAEaMkXADwady0QFEANkhBIWMAHxwAZHADeFOHAAFkSYAPwAXHD0LAAmSJjALEgxANwUAL5p5BTUcLosaIHQ7JK8AkL5hdASENwycuiKlUVQVnoGxqYWbc3QDk4u7l6+-kEhEXBcMIYsAOZZmRQ5NACSLGCMlBCMG-C1MMCsPOT8gnAA8gBuSFD2ECgx9X7kAQAUHLVckTasNdwAlJEAFIAZQAGgp+s5XFk3h9uJFelA-lxAXBQRCoYMFlllnAAOL0FBQR7MOCFJBoADWcGAmDG8TgSAAHsAplJEiVPhQ0Ed4IEUFxVCF6u9JN8RL9JHAAD55AotFFo+EcqRIlEyNyjABEwXi2tpbBVuKoNAAwrhIElXDy+cIVCxIlcbncHqKVRKHRq5erJP9NSMXnBcigFcUiLEbqM6XBXgKhSExZ9-v6iDB6FA2OYUL4FHmVelg25YcGaCYHXAI3EoKM0xms+XRLn85JC5RixkTbkAKpcFCzJAUTDRDCHNi6MBgV7+54BOuZ2OjALmLVBgIBHyUABUcEAvBuAOD28vZ7HBZhAII8t5R0kv1+YfmwYMSBzBpNqAPpGeyhqkGvWYN9AiYBFqAAd3AhQzwgWZHAUXkQG1Vd12QuB1DMGBb2XSgHyQlDNx3XdAFo9uBbCgHAoAAGjgAADGI2RQL9kmouAYggMxXCZVkpjgVg4FDKooCZRxoXgK8bzXO8HxY+jGMef832ZRDMPXNCpmU8xsMlFhcKw3D-gWIA)

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
  if ("href" in props) {
    return <a {...props} />;
  } else {
    return <Link {...props} />;
  }
}
```

<details>
  <summary><b>Approach: Generic Components</b></summary>

Here is an example solution, see the further discussion for other solutions. _thanks to [@jpavon](https://github.com/typescript-cheatsheets/react/issues/12#issuecomment-394440577)_

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
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type RouterLinkProps = Omit<AnchorProps, "href">;

interface ButtonProps {
  as: React.ComponentClass | "a";
  children?: React.ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { as: Component, children, ...rest } = props;
  return (
    <Component className="button" {...rest}>
      {children}
    </Component>
  );
};

const AnchorButton: React.FunctionComponent<AnchorProps> = (props) => (
  <Button as="a" {...props} />
);

const LinkButton: React.FunctionComponent<RouterLinkProps> = (props) => (
  <Button as={NavLink} {...props} />
);

<LinkButton to="/login">Login</LinkButton>;
<AnchorButton href="/login">Login</AnchorButton>;
<AnchorButton href="/login" to="/test">
  Login
</AnchorButton>; // Error: Property 'to' does not exist on type...
```

</details>

You may also want to use Discriminated Unions, please check out [Expressive React Component APIs with Discriminated Unions](https://blog.andrewbran.ch/expressive-react-component-apis-with-discriminated-unions/).

Here is a brief intuition for **Discriminated Union Types**:

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

<details>
  <summary>
  Take care: TypeScript does not narrow the type of a Discriminated Union on the basis of typeof checks. The type guard has to be on the value of a key and not it's type.
  </summary>

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

The above example does not work as we are not checking the value of `event.value` but only it's type. Read more about it [microsoft/TypeScript#30506 (comment)](https://github.com/microsoft/TypeScript/issues/30506#issuecomment-474858198)

</details>

<details>
  <summary>
  Discriminated Unions in TypeScript can also work with hook dependencies in React. The type matched is automatically updated when the corresponding union member based on which a hook depends, changes. Expand more to see an example usecase.
   <br/><br/>
  </summary>

```tsx
import { useMemo } from "react";

interface SingleElement {
  isArray: true;
  value: string[];
}
interface MultiElement {
  isArray: false;
  value: string;
}
type Props = SingleElement | MultiElement;

function Sequence(p: Props) {
  return useMemo(
    () => (
      <div>
        value(s):
        {p.isArray && p.value.join(",")}
        {!p.isArray && p.value}
      </div>
    ),
    [p.isArray, p.value] // TypeScript automatically matches the corresponding value type based on dependency change
  );
}

function App() {
  return (
    <div>
      <Sequence isArray={false} value={"foo"} />
      <Sequence isArray={true} value={["foo", "bar", "baz"]} />
    </div>
  );
}
```

<a href="https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwBQdMAnmFnAArFjoC8dccAD5wA3vwETgqAIJQoyJgC44MKAFcs9CRIBuyADYblqVcAB2AcwDaAXRpxxAgL7jhY7QKmz5SuAQOomo66BkZwJlDmFloSTvS4EGYmcAAacDxwABRgypwQ3ACU6QB8ouKUMGpQZphUMAB0aoEAslggEJnBmUU8pZ0ecAA8ACbAOsXB2nqGWJmoBYqTEiJg9V5yCnAAZFtwq9Ma9QBWEOaZZAA0ZAUuAwIiAISr6z7bu-uhWLcegwD0o+NggULsErM8ZBsmBc9vUDlgbNDfr84AAVFhYVC4SJgeDINQwEjIGDAXAGfRMOAgIm4AAWGJUdLgCTkGMgZlGljgcJU6PEBXocToBDUZnwwEScGkYDA3TKAgqVRq-QkIzGTP0aFQADlkCAsDwAERSsAGiYDQZpF4KHgifz6QJOLmfG1kAgQCBkR2-M0-S0Qnw21QaR1wm1WV3uy7kABGyCgUbIsYAXmQbF6fQI-gCffy6E4gA"><i>See this in TS Playground</i>
</a>

In the above example, based on the `isArray` union member, the type of the `value` hook dependency changes.

 </details>

To streamline this you may also combine this with the concept of **User-Defined Type Guards**:

```ts
function isString(a: unknown): a is string {
  return typeof a === "string";
}
```

[Read more about User-Defined Type Guards in the Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

### Narrowing using `extends`

See this quick guide: https://twitter.com/mpocock1/status/1500813765973053440?s=20&t=ImUA-NnZc4iUuPDx-XiMTA

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
const UsageComponent = () => (
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

## Props: Pass One ONLY IF the Other Is Passed

Say you want a Text component that gets truncated if `truncate` prop is passed but expands to show the full text when `expanded` prop is passed (e.g. when the user clicks the text).

You want to allow `expanded` to be passed only if `truncate` is also passed, because there is no use for `expanded` if the text is not truncated.

Usage example:

```tsx
const App = () => (
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

You can implement this by function overloads:

```tsx
import { ReactNode } from "react";

interface CommonProps {
  children?: ReactNode;
  miscProps?: any;
}

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

## Props: Omit prop from a type

Note: [Omit was added as a first class utility in TS 3.5](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittk)! 🎉

Sometimes when intersecting types, we want to define our own version of a prop. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` prop. Here's how to extract that out:

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

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Props: Extracting Prop Types of a Component

Sometimes you want the prop types of a component, but it isn't exported.

A simple solution is to use `React.ComponentProps`:

```tsx
// a Modal component defined elsewhere
const defaultProps: React.ComponentProps<typeof Modal> = {
  title: "Hello World",
  visible: true,
  onClick: jest.fn(),
};
```

There are advanced edge cases if you want to extract the prop types of a component taking into account internal props, `propTypes`, and `defaultProps` - [check our issue here for helper utilities that resolve these](https://github.com/typescript-cheatsheets/react/issues/63).

## Props: Render Props

> Advice: Where possible, you should try to use Hooks instead of Render Props. We include this merely for completeness.

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
import { ReactNode } from "react";

interface Props {
  label?: ReactNode;
  children?: ReactNode;
}

const Card = ({ children, label }: Props) => {
  return (
    <div>
      {label && <div>{label}</div>}
      {children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
import { ReactNode } from "react";

interface Props {
  children: (foo: string) => ReactNode;
}
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new/choose).

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
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): FormikOption<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap<U>(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

// now you can use it like:
let result = Option(6) // Some<number>
  .flatMap((n) => Option(n * 3)) // Some<number>
  .flatMap((n = new None())) // None
  .getOrElse(7);

// or:
let result = ask() // Option<string>
  .flatMap(parse) // Option<Date>
  .flatMap((d) => new Some(d.toISOString())) // Option<string>
  .getOrElse("error parsing string");
```
