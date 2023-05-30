---
title: ComponentProps<ElementType>
---

`ComponentProps<ElementType>` constructs a type with all valid props of an element or inferred props of a component.

:::note

Prefer `ComponentPropsWithRef<ElementType>` if ref is forwarded and `ComponentPropsWithoutRef<ElementType>` when ref is not forwarded.

:::

## Parameters

- `ElementType`: An element type. Examples include:
  - An HTML or SVG element string literal such as `"div"`, `"h1"` or `"path"`.
  - A component type, such as `typeof Component`.

## Usage

### Get all valid props of an element

`ComponentProps<ElementType>` can be used to create a type that includes all valid `div` props.

```tsx
interface Props extends ComponentProps<"div"> {
  text: string;
}

function Component({ className, children, text, ...props }: Props) {
  // `props` includes `text` in addition to all valid `div` props
}
```

### Infer component props type

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

#### Infer specific prop type

The type of a specific prop can also be inferred this way. Let's say you are using an `<Icon>` component from a component library. The component takes a `name` prop that determines what icon is shown. You need to use the type of `name` in your app, but it's not made available by the library. You could create a custom type:

```tsx
type IconName = "warning" | "checkmark";
```

However, this type if not really reflecting the actual set of icons made available by the library. A better solution is to infer the type:

```tsx
import { Icon } from "component-library";

type IconName = ComponentProps<typeof Icon>["name"];
//       ^? type IconName = "warning" | "checkmark"
```

You can also use the `Pick<Type, Keys>` utility type to accomplish the same thing:

```tsx
import { Icon } from "component-library";

type IconName = Pick<ComponentProps<typeof Icon>, "name">;
//       ^? type IconName = "warning" | "checkmark"
```
