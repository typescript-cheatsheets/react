---
id: intro
sidebar_label: Intro
title: HOC Cheatsheet
---

**This HOC Cheatsheet** compiles all available knowledge for writing Higher Order Components with React and TypeScript.

- We will map closely to [the official docs on HOCs](https://reactjs.org/docs/higher-order-components.html) initially
- While hooks exist, many libraries and codebases still have a need to type HOCs.
- Render props may be considered in the future
- The goal is to write HOCs that offer type safety while not getting in the way.

There are a lot of use cases where an HOC is used. For example:

- HOCs can wrap components to check if a user is authenticated before rendering, or to restrict access based on user roles.
- An HOC can conditionally render components based on feature flags or A/B testing.
- An HOC can provide translation functionality to components.
- An HOC can add logging or analytics tracking to components without modifying their core logic.

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
  (props: P): React.JSX.Element;
  displayName: string;
} => {

  function WithSampleHoc(props: P) {
    //Do something special to justify the HoC.
    return component(props) as React.JSX.Element;
  }

  WithSampleHoc.displayName = `withSampleHoC(${componentName})`;

  let wrappedComponent = propsAreEqual === false ? WithSampleHoc : React.memo(WithSampleHoc, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithSampleHoc
};
```

This code meets these criteria:

1. Allows a component to return valid elements (`strings | array | boolean | null | number`) and not just `React.JSX.Element | null`.
2. Wraps it in a memo unless you opt out.
3. Removes the nested component, so React Dev tools will just show one component.
4. Indicates with `displayName` in React Dev Tool with an annotation that this is a component wrapped in two HoCs
5. Optional: Copies over static properties that might have been defined on the original component.
