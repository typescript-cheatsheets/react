---
id: react_prop_type_example
title: Useful React Prop Type Examples
---

```tsx
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesn't accept strings
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements["button"]>; // to impersonate all the props of a button element without its ref
}
```

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component

</details>

[More discussion: Where ReactNode does not overlap with JSX.Element](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/129)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
