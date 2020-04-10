---
id: polymorphic_components
title: Polymorphic Components
---

> passing a component to be rendered, e.g. with `as` props

`ElementType` is pretty useful to cover most types that can be passed to createElement e.g.

```tsx
function PassThrough(props: { as: React.ElementType<any> }) {
  const { as: Component } = props;

  return <Component />;
}
```

For more info you can refer to these resources:

- https://blog.andrewbran.ch/polymorphic-react-components/
- https://github.com/kripod/react-polymorphic-box

[Thanks @eps1lon](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/69) for this
