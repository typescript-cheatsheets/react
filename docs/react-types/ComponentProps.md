---
title: ComponentProps<ElementType>
---

`ComponentProps<ElementType>` constructs a type with all valid props of an element or inferred props of a component.

`@types/react` ships three related utilities:

| Type                          | What it gives you                                                                                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ComponentProps<T>`           | The props as declared by the component or element.                                                                                                                                        |
| `ComponentPropsWithRef<T>`    | Same as `ComponentProps<T>`, plus `ref` for class components. For function components in React 19 the result is identical to `ComponentProps<T>` (since `ref` is already a regular prop). |
| `ComponentPropsWithoutRef<T>` | `ComponentProps<T>` with any `ref` prop stripped out. Useful when you spread props onto a child element and don't want `ref` to leak.                                                     |

:::note
**React 19+:** `ComponentProps<T>` is usually all you need — `ref` is just a regular prop for function components. Reach for `ComponentPropsWithoutRef<T>` when you specifically need to remove `ref` from a spread.

**React ≤18:** Prefer `ComponentPropsWithRef<T>` when refs are forwarded, and `ComponentPropsWithoutRef<T>` when they are not.
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
  // `props` includes all valid `div` props (minus the ones destructured above)
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

#### Infer a specific prop type

The type of a specific prop can also be inferred. Let's say you are using an `<Icon>` component from a component library. The component takes a `name` prop that determines what icon is shown. You need to use the type of `name` in your app, but it's not made available by the library. You could create a custom type:

```tsx
type IconName = "warning" | "checkmark";
```

However, this type doesn't reflect the actual set of icons the library exposes. A better solution is to infer the type by indexing into the inferred props:

```tsx
import { Icon } from "component-library";

type IconName = ComponentProps<typeof Icon>["name"];
//       ^? type IconName = "warning" | "checkmark"
```
