---
title: ReactNode
---

`ReactNode` is a type that describes what React can render.

## Parameters

`ReactNode` does not take any parameters.

## Usage

### Typing `children`

The most common use case for `ReactNode` is typing `children`.

```tsx
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function Component({ children }: Props) {
  return children;
}
```

`<Component>` accepts anything that React can render as `children`. Here are some examples:

```tsx
function Examples() {
  return (
    <>
      <Component>
        <div>Hello</div>
      </Component>
      <Component>Hello</Component>
      <Component>{123}</Component>
      <Component>
        <>Hello</>
      </Component>
      <Component>{true}</Component>
      <Component>{null}</Component>
      <Component>{undefined}</Component>
      <Component>{[1, 2, 3]}</Component>
    </>
  );
}
```
