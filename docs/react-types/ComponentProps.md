---
title: ComponentProps<T>
---

`ComponentProps<T>` is a utility type that lets you grab all valid props of an HTML or SVG element, or infer prop type for a component.

## Parameters

- `T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>`

`keyof JSX.IntrinsicElements` is a set of all HTML and SVG elements, such as `"div"`, `"h1"` and `"path"`.

`JSXElementConstructor<any>` is the type of a function or class component.

## Usage

### Getting all valid props of an HTML or SVG element

`ComponentProps<T>` can be used to create a type that includes all valid `div` props.

```tsx
interface Props extends ComponentProps<"div"> {
  text: string;
}

function Component({ className, children, text }: Props) {
  // ...
}
```

### Infer prop types from a component

In some cases, you might want to infer the type of a component's props.

```tsx
interface Props {
  text: string;
}

function Component(props: Props) {
  // ...
}

type MyType = ComponentProps<typeof Component>;
//     ^? type MyType = Props
```

The type of a specific prop can also be inferred this way. Let's say you are using an `<Icon>` component from a component library. The component takes a `name` prop that determines what icon is shown. You need to use the type of `name` in your app, but it's not made available by the library. No problem!

```tsx
import { Icon } from "component-library";

type IconName = ComponentProps<typeof Icon>["name"];
//       ^? type IconName = "warning" | "checkmark" | ...
```

Needless to say, `ComponentProps<T>` can be very useful!
