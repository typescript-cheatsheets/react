---
id: type_component_diff_props
title: Typing a Component that Accepts Different Props
---

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
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type RouterLinkProps = Omit<AnchorProps, "href">;

interface Button {
  as: React.ComponentClass | "a";
}

const Button: React.FunctionComponent<Button> = (props) => {
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

To streamline this you may also combine this with the concept of **User-Defined Type Guards**:

```ts
function isString(a: unknown): a is string {
  return typeof a === "string";
}
```

[Read more about User-Defined Type Guards in the Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).
