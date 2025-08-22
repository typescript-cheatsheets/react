---
id: forward_and_create_ref
title: forwardRef/createRef
---

For `useRef`, check the [Hooks section](/docs/basic/getting-started/hooks#useref).

## Ref as a Prop (Recommended for React 19+)

In React 19+, you can access `ref` directly as a prop in function components - no `forwardRef` wrapper needed.

### Option 1: Inherit all props from a native element

Use `ComponentPropsWithRef` to inherit all props from a native element.

```tsx
import { ComponentPropsWithRef, useRef } from "react";

function MyInput(props: ComponentPropsWithRef<"input">) {
  return <input {...props} />;
}

// Usage in parent component
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return <MyInput ref={inputRef} placeholder="Type here..." />;
}
```

### Option 2: Explicit typing

If you have custom props and want fine-grained control, you can explicitly type the ref:

```tsx
import { Ref, useRef } from "react";

interface MyInputProps {
  placeholder: string;
  ref: Ref<HTMLInputElement>;
}

function MyInput(props: MyInputProps) {
  return <input {...props} />;
}

// Usage in parent component
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return <MyInput ref={inputRef} placeholder="Type here..." />;
}
```

**Read more**: [Wrapping/Mirroring a HTML Element](/docs/advanced/patterns_by_usecase#wrappingmirroring-a-html-element)

## Legacy Approaches (Pre-React 19)

### forwardRef

For React 18 and earlier, use `forwardRef`:

```tsx
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

<details>
<summary><b>Side note: the <code>ref</code> you get from <code>forwardRef</code> is mutable so you can assign to it if needed.</b></summary>

This was done [on purpose](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43265/). You can make it immutable if you have to - assign `React.Ref` if you want to ensure nobody reassigns it:

```tsx
import { forwardRef, ReactNode, Ref } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}

export const FancyButton = forwardRef(
  (
    props: Props,
    ref: Ref<HTMLButtonElement> // <-- explicit immutable ref type
  ) => (
    <button ref={ref} className="MyClassName" type={props.type}>
      {props.children}
    </button>
  )
);
```

</details>

If you need to grab props from a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770).

### createRef

`createRef` is mostly used for class components. Function components typically rely on `useRef` instead.

```tsx
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
  private rootRef = createRef<HTMLDivElement>();

  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

## Generic Components with Refs

Generic components typically require manual ref handling since their generic nature prevents automatic type inference. Here are the main approaches:

Read more context in [this article](https://fettblog.eu/typescript-react-generic-forward-refs/).

### Option 1: Wrapper Component

The most straightforward approach is to manually handle refs through props:

```tsx
interface ClickableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
}

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={() => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

### Option 2: Redeclare forwardRef

For true `forwardRef` behavior with generics, extend the module declaration:

```tsx
// Redeclare forwardRef to support generics
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Now you can use forwardRef with generics normally
import { forwardRef, ForwardedRef } from "react";

interface ClickableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
}

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={() => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = forwardRef(ClickableListInner);
```

### Option 3: Call Signature

If you need both generic support and proper forwardRef behavior with full type inference, you can use the call signature:

```tsx
// Add to your type definitions (e.g. in `index.d.ts` file)
interface ForwardRefWithGenerics extends React.FC<WithForwardRefProps<Option>> {
  <T extends Option>(props: WithForwardRefProps<T>): ReturnType<
    React.FC<WithForwardRefProps<T>>
  >;
}

export const ClickableListWithForwardRef: ForwardRefWithGenerics =
  forwardRef(ClickableList);
```

Credits: [https://stackoverflow.com/a/73795494](https://stackoverflow.com/a/73795494)

:::note
Option 1 is usually sufficient and clearer. Use Option 2 when you specifically need `forwardRef` behavior. Use Option 3 for advanced library scenarios requiring both generics and full forwardRef type inference.
:::

## Additional Resources

- [React refs with TypeScript](https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315)
- [Conditional rendering with forwardRef](https://github.com/typescript-cheatsheets/react/issues/167)

---

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new)
