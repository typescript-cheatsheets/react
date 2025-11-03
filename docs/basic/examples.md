---
id: examples
title: Example App
sidebar_label: Examples
---

- [Create React App TypeScript Todo Example 2021](https://github.com/laststance/create-react-app-typescript-todo-example-2021)
- [Ben Awad's 14 hour Fullstack React/GraphQL/TypeScript Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)
- [Cypress Realworld App](https://github.com/cypress-io/cypress-realworld-app)

---

### 🧠 Tip: Using TypeScript with React.FC

When defining a functional component with TypeScript, you can explicitly use the `React.FC` type for better prop validation and IntelliSense.

```tsx
import React from "react";

type Props = {
  message: string;
};

const Hello: React.FC<Props> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Hello;
