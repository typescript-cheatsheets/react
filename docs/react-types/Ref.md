---
title: Ref, RefObject, RefCallback
---

`@types/react` ships three closely related ref types. Understanding how they fit together is the key to typing refs correctly in React 19, where `ref` is a regular prop on function components.

| Type             | What it is                                                    | When to use                                                                                           |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `RefObject<T>`   | An object with a `current: T` field.                          | Return type of `useRef` and `createRef`. Pass it as `ref={…}` to read/write `.current`.               |
| `RefCallback<T>` | A function that receives the instance (or `null` on unmount). | Inline `ref={node => …}` callbacks. May return a cleanup function in React 19+.                       |
| `Ref<T>`         | `RefCallback<T> \| RefObject<T \| null> \| null`.             | Use this as the **prop type** when accepting a ref from a parent — the parent might pass either form. |

```ts
interface RefObject<T> {
  current: T;
}

type RefCallback<T> = (instance: T | null) => void | (() => void);

type Ref<T> = RefCallback<T> | RefObject<T | null> | null;
```

## `RefObject<T>`

`RefObject<T>` is what `useRef` and `createRef` return. Its `.current` is typed based on the initial value you pass:

```tsx
import { useRef } from "react";

const inputRef = useRef<HTMLInputElement>(null);
//    ^? RefObject<HTMLInputElement | null>

const idRef = useRef(0);
//    ^? RefObject<number>
```

When you pass `null` as the initial value with an explicit generic, React manages `.current` for you — TypeScript types it as `T | null` so you have to null-check before use:

```tsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

> `MutableRefObject<T>` still exists in `@types/react` for backwards compatibility but is `@deprecated` — use `RefObject<T>` instead.

## `RefCallback<T>`

Callback refs are useful when you need to run code the moment the DOM node is attached or detached. The callback is called with the node when it mounts, and with `null` when it unmounts:

```tsx
<div
  ref={(node) => {
    if (node) console.log("mounted", node);
    else console.log("unmounted");
  }}
/>
```

### Cleanup function (React 19)

In React 19, a ref callback can return a cleanup function — React calls it instead of invoking the callback again with `null`. This makes ref callbacks symmetric with `useEffect`:

```tsx
<div
  ref={(node) => {
    const observer = new IntersectionObserver(/* ... */);
    observer.observe(node);
    return () => observer.disconnect();
  }}
/>
```

If your callback returns nothing, React falls back to the old behavior and calls it with `null` on unmount.

## `Ref<T>` (the union)

`Ref<T>` is the type you should use when **accepting** a ref as a prop, because a caller can pass either a `RefObject` or a callback.

```tsx
import { Ref } from "react";

type FancyInputProps = {
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
};

function FancyInput({ ref, placeholder }: FancyInputProps) {
  return <input ref={ref} placeholder={placeholder} className="fancy" />;
}
```

In React 19 this is all you need — `ref` is a regular prop, no `forwardRef` wrapper required.

### Forwarding a ref to a different element

If the ref you accept doesn't belong on the root element, you can still pass it down — `Ref<T>` is assignable to any element's `ref` prop as long as `T` matches:

```tsx
type LabelledInputProps = {
  label: string;
  ref?: Ref<HTMLInputElement>;
};

function LabelledInput({ label, ref }: LabelledInputProps) {
  return (
    <label>
      {label}
      <input ref={ref} />
    </label>
  );
}
```

## Related types

- **`ForwardedRef<T>`** — the legacy `ref` parameter type passed to a `forwardRef` render function. Only relevant if you still use `forwardRef`; prefer `Ref<T>` on a prop instead.
- **`LegacyRef<T>`** — `@deprecated` alias for `Ref<T>`. String refs are no longer supported.
- **`ComponentRef<T>`** — the ref type accepted by a given component or element, e.g. `ComponentRef<"input">` is `HTMLInputElement`. Useful when you want the ref type without writing it out by hand.
- **`RefAttributes<T>`** — the prop shape `{ ref?: Ref<T> }`. Rarely needed directly; intersected by `ComponentPropsWithRef`.
