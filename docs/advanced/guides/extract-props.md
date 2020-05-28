---
id: extract_props
title: "Props:  Extracting Prop Types of a Component"
---

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
