---
title: ReactNode
---

`ReactNode` is a type that describes what React can render. It's a union of every value React accepts as a child:

- `ReactElement` (the result of JSX, `createElement`, or `cloneElement`)
- `string`
- `number`
- `bigint`
- `boolean` (`true` and `false` render as nothing)
- `null`
- `undefined`
- `Iterable<ReactNode>` (so arrays of nodes, but also any iterable)
- `ReactPortal`
- `Promise<ReactNode>` (for async Server Components — React unwraps the promise via Suspense)

## Parameters

`ReactNode` does not take any parameters.

## Usage

### Typing `children`

The most common use case for `ReactNode` is typing `children`.

```tsx
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function Component({ children }: Props) {
  return children;
}
```

`<Component>` accepts anything that React can render as `children`:

```tsx
function Examples() {
  return (
    <>
      <Component>
        <div>Hello</div>
      </Component>
      <Component>Hello</Component>
      <Component>{123}</Component>
      <Component>{42n}</Component>
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

### Async Server Components

A Server Component can be `async` and return a `Promise<ReactNode>`. React unwraps the promise through the nearest `<Suspense>` boundary:

```tsx
// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return <p>{user.name}</p>;
}

function Page() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <UserProfile userId="42" />
    </Suspense>
  );
}
```

A bare `Promise<ReactNode>` can also be passed as children directly — useful for streaming patterns where the parent kicks off the work and the child resolves it:

```tsx
function Page() {
  const userPromise = fetchUser(); // Promise<ReactNode>
  return <Suspense fallback={<Loading />}>{userPromise}</Suspense>;
}
```

## `ReactNode` vs `ReactElement` vs `JSX.Element`

These three types are often confused because all three appear when you write JSX. They are not interchangeable:

- **`ReactNode`** is the broadest: anything React can render, including primitives, `null`, arrays, and elements.
- **`ReactElement`** describes only the object produced by JSX or `createElement` — it has `type`, `props`, and `key`. A `string` is _not_ a `ReactElement`.
- **`React.JSX.Element`** is essentially `ReactElement<any, any>` — what the JSX transform infers for a JSX expression.

### Use `ReactNode` for `children`

`ReactNode` is the correct type for any prop that receives children-like content, because a caller might pass a string, an array, or `null`:

```tsx
type Props = { content: ReactNode };

<MyComponent content="hello" />          // ✅ string is a ReactNode
<MyComponent content={<span>hi</span>} /> // ✅ element is a ReactNode
<MyComponent content={null} />           // ✅ null is a ReactNode
```

### Don't use `ReactNode` as a function-component return type

A function component's return type should be what React allows components to _return_, not what it allows them to _receive_. Returning a plain `ReactNode` (which includes `bigint`, `Promise<ReactNode>`, etc.) is broader than what TypeScript wants to see from a JSX-rendered component. Let TypeScript infer the return type, or use `React.JSX.Element` / `ReactElement` if you must annotate:

```tsx
// 👎 too broad, and historically caused issues when used in JSX
const MyComponent = (): ReactNode => "hello";

// 👍 let TS infer
const MyComponent = () => "hello";

// 👍 explicit
const MyComponent = (): React.JSX.Element => <span>hello</span>;
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).
