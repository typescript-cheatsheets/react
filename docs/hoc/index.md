---
id: intro
sidebar_label: Intro
title: HOC Cheatsheet
---

**This HOC Cheatsheet** compiles all available knowledge for writing Higher Order Components with React and TypeScript.

- We will map closely to [the official docs on HOCs](https://reactjs.org/docs/higher-order-components.html) initially
- While hooks exist, many libraries and codebases still have a need to type HOCs.
- Render props may be considered in future
- The goal is to write HOCs that offer type safety while not getting in the way.

Here is a base HOC example you can copy right away:

```jsx

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

const withSampleHoC = <P extends {}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  propsAreEqual?: PropsAreEqual<P> | false,

  componentName = component.displayName ?? component.name
): {
  (props: P): JSX.Element;
  displayName: string;
} => {

  function WithSampleHoc(props: P) {
    //Do something special to justify the HoC.
    return component(props) as JSX.Element;
  }

  WithSampleHoc.displayName = `withSampleHoC(${componentName})`;

  let wrappedComponent = propsAreEqual === false ? WithSampleHoc : React.memo(WithSampleHoc, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithSampleHoc
};
```

This code meets these criteria:

1. Allows a component to return valid elements (`strings | array | boolean | null | number`) and not just `JSX.Element | null`.
2. Wraps it in a memo unless you opt out.
3. Removes the nested component, so React Dev tools will just show one component.
4. Indicates with `displayName` in React Dev Tool with an annotation that this is a component wrapped in two HoCs
5. Optional: Copies over static properties that might have been defined on the original component.
