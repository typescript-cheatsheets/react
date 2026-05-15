---
id: concurrent
title: Concurrent React
---

The Concurrent React APIs (`Suspense`, `useTransition`, `useDeferredValue`, `startTransition`, `use`) let you keep the UI responsive while React renders work in the background or waits for data. They're all stable as of React 18 and gained additional capabilities in React 19.

## `Suspense`

`Suspense` lets you declaratively show a fallback while a child component is waiting for something — typically data unwrapped with `use(promise)`, a lazy component, or a streamed boundary on the server.

```tsx
import { Suspense } from "react";

const UserProfile = ({ userPromise }: { userPromise: Promise<User> }) => {
  const user = use(userPromise);
  return <p>Hello, {user.name}!</p>;
};

const App = ({ userPromise }: { userPromise: Promise<User> }) => (
  <Suspense fallback={<p>Loading...</p>}>
    <UserProfile userPromise={userPromise} />
  </Suspense>
);
```

`SuspenseProps` is typed as `{ children?: ReactNode; fallback?: ReactNode }`. The fallback can be any `ReactNode`, including `null`.

## `use`

`use` reads the value of a context or a promise. Unlike `useContext`, it can be called inside conditions and loops, and it integrates with `Suspense` for promises.

```tsx
import { use } from "react";

const Comments = ({
  commentsPromise,
}: {
  commentsPromise: Promise<Comment[]>;
}) => {
  // Suspends until the promise resolves; throws to the nearest <Suspense>.
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
};
```

The promise is typically created by a parent and passed down — don't create it inside the component, or you'll create a new promise on every render.

## `useTransition`

`useTransition` marks a state update as non-urgent so React can keep typing, scrolling, and other urgent input responsive while it renders.

```tsx
import { useState, useTransition } from "react";

const TabSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"posts" | "comments">("posts");

  const selectTab = (next: "posts" | "comments") => {
    startTransition(() => {
      setTab(next);
    });
  };

  return (
    <>
      <button disabled={isPending} onClick={() => selectTab("posts")}>
        Posts
      </button>
      <button disabled={isPending} onClick={() => selectTab("comments")}>
        Comments
      </button>
      {tab === "posts" ? <Posts /> : <Comments />}
    </>
  );
};
```

### Async transitions (React 19)

In React 19, the function passed to `startTransition` can be async. This is the foundation for Actions and is how `useActionState` and `<form action>` schedule their pending state.

```tsx
const [isPending, startTransition] = useTransition();

const onSubmit = () => {
  startTransition(async () => {
    await saveDraft(content);
    setSavedAt(new Date());
  });
};
```

`isPending` stays `true` for the entire duration of the async callback, including awaited work.

## `useDeferredValue`

`useDeferredValue` lets you defer re-rendering a part of the UI that's expensive to compute, so urgent updates (typing into an input) can flush first.

```tsx
import { useDeferredValue, useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* SearchResults re-renders with deferredQuery, lagging behind input */}
      <SearchResults query={deferredQuery} />
    </>
  );
};
```

### `initialValue` (React 19)

React 19 added an optional second argument: the value to use during the initial render before the deferred value has caught up. Useful for SSR/streaming when you want to show a known initial value rather than the latest one.

```tsx
const deferredQuery = useDeferredValue(query, "");
```

## `startTransition` (standalone)

`startTransition` is also exported directly from `react` for use outside components — for example, inside event handlers in non-React code or third-party stores.

```tsx
import { startTransition } from "react";

store.subscribe(() => {
  startTransition(() => {
    forceRender();
  });
});
```

The standalone version does not provide an `isPending` flag — use the hook if you need that.

## See also

- [`useActionState`, `useFormStatus`, `useOptimistic`](https://react.dev/reference/react) — built on top of transitions
- [Server Components and `'use server'`](https://react.dev/reference/rsc/server-components)
