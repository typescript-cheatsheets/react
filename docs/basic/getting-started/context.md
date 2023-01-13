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

Wrap the components that need the context with a context provider:

```tsx
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  );
};
```

Call `useContext` to read and subscribe to the context.

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const theme = useContext(ThemeContext);

  return <p>The current theme is {theme}.</p>;
};
```

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
    <CurrentUserContext.Provider value={currentUser}>
      <MyComponent />
    </CurrentUserContext.Provider>
  );
};
```

Now that the type of the context can be `null`, you'll notice that you'll get a `'currentUser' is possibly 'null'` TypeScript error if you try to access the `username` property. You can use optional chaining to access `username`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);

  return <p>Name: {currentUser?.username}.</p>;
};
```

However, it would be preferrable to not have to check for `null`, since we know that the context won't be `null`. One way to do that is to provide a custom hook to use the context, where an error is thrown if the context is not provided:

```tsx
import { createContext } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};
```

Using a runtime type check in this will has the benefit of printing a clear error message in the console when a provider is not wrapping the components properly. Now it's possible to access `currentUser.username` without checking for `null`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useCurrentUser();

  return <p>Username: {currentUser.username}.</p>;
};
```

### Type assertion as an alternative

Another way to avoid having to check for `null` is to use type assertion to tell TypeScript you know the context is not `null`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);

  return <p>Name: {currentUser!.username}.</p>;
};
```

Another option is to use an empty object as default value and cast it to the expected context type:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);
```

You can also use non-null assertion to get the same result:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(null!);
```

When you don't know what to choose, prefer runtime checking and throwing over type asserting.
