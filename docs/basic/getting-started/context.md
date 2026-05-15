---
id: context
title: Context
---

## Basic example

Here's a basic example of creating a context containing the active theme.

```tsx
import { createContext } from "react";

type ThemeContextType = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>("light");
```

Wrap the components that need the context by rendering the context itself as a provider. In React 19, the context object can be rendered directly — you no longer need `<ThemeContext.Provider>`:

```tsx
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext value={theme}>
      <MyComponent />
    </ThemeContext>
  );
};
```

> `<ThemeContext.Provider value={theme}>` still works and is identical in behavior — it's just the legacy spelling.

Read the context with `use`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const theme = use(ThemeContext);

  return <p>The current theme is {theme}.</p>;
};
```

> `useContext(ThemeContext)` still works too. The main difference is that `use` can also unwrap a promise, and it can be called inside conditions and loops.

## Without default context value

If you don't have any meaningful default value, specify `null`:

```tsx
import { createContext } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
```

```tsx
const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserContextType>({
    username: "filiptammergard",
  });

  return (
    <CurrentUserContext value={currentUser}>
      <MyComponent />
    </CurrentUserContext>
  );
};
```

Now that the type of the context can be `null`, you'll notice that you'll get a `'currentUser' is possibly 'null'` TypeScript error if you try to access the `username` property. You can use optional chaining to access `username`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const currentUser = use(CurrentUserContext);

  return <p>Name: {currentUser?.username}.</p>;
};
```

However, it would be preferable to not have to check for `null`, since we know that the context won't be `null`. One way to do that is to provide a custom hook to use the context, where an error is thrown if the context is not provided:

```tsx
import { createContext, use } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const useCurrentUser = () => {
  const currentUserContext = use(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext>",
    );
  }

  return currentUserContext;
};
```

Using a runtime type check in this will have the benefit of printing a clear error message in the console when a provider is not wrapping the components properly. Now it's possible to access `currentUser.username` without checking for `null`:

```tsx
const MyComponent = () => {
  const currentUser = useCurrentUser();

  return <p>Username: {currentUser.username}.</p>;
};
```

### Type assertion as an alternative

Another way to avoid having to check for `null` is to use type assertion to tell TypeScript you know the context is not `null`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const currentUser = use(CurrentUserContext);

  return <p>Name: {currentUser!.username}.</p>;
};
```

Another option is to use an empty object as default value and cast it to the expected context type:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType,
);
```

You can also use non-null assertion to get the same result:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(null!);
```

When you don't know what to choose, prefer runtime checking and throwing over type asserting.
