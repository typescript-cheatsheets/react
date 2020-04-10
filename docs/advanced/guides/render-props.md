---
id: render_props
title: Render Props
---

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `React.ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
export interface Props {
  label?: React.ReactNode;
  children: React.ReactNode;
}
export const Card = (props: Props) => {
  return (
    <div>
      {props.label && <div>{props.label}</div>}
      {props.children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
export interface Props {
  children: (foo: string) => React.ReactNode;
}
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose).
