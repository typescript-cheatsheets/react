---
id: full_example
sidebar_label: Full HOC Example
title: "Full HOC Example"
---

> This is an HOC example for you to copy and paste. If certain pieces don't make sense for you, head to [the React HOC Docs intro](https://react-typescript-cheatsheet.netlify.app/docs/hoc/react_hoc_docs/) to get a detailed walkthrough via a complete translation of the React docs in TypeScript.

Sometimes you want a simple way to inject props from somewhere else (either a global store or a provider) and don't want to continually pass down the props for it. Context is great for it, but then the values from the context can only be used in your `render` function. A HoC will provide these values as props.

**The injected props**

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

**Usage in the component**

The goal is to have the props available on the interface for the component, but subtracted out for the consumers of the component when wrapped in the HoC.

```ts
interface Props extends WithThemeProps {
  children?: React.ReactNode;
}

class MyButton extends React.Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

**Consuming the Component**

Now when consuming the component you can omit the `primaryColor` prop or override the one provided through context.

```tsx
<MyButton>Hello button</MyButton> // Valid
<MyButton primaryColor="#333">Hello Button</MyButton> // Also valid
```

**Declaring the HoC**

The actual HoC.

```tsx
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (props: Omit<T, keyof WithThemeProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = useTheme();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
```

Note that the `{...(props as T)}` assertion is needed because of a current bug in TS 3.2 https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046

Here is a more advanced example of a dynamic higher order component that bases some of its parameters on the props of the component being passed in:

```tsx
// inject static values to a component so that they're always provided
export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...(props as TProps)} {...injector} />;
  };
}
```

### Using `forwardRef`

For "true" reusability you should also consider exposing a ref for your HOC. You can use `React.forwardRef<Ref, Props>` as documented in [the basic cheatsheet](https://github.com/typescript-cheatsheets/react/blob/main/README.md#forwardrefcreateref), but we are interested in more real world examples. [Here is a nice example in practice](https://gist.github.com/OliverJAsh/d2f462b03b3e6c24f5588ca7915d010e) from @OliverJAsh (note - it still has some rough edges, we need help to test this out/document this).

### Supporting `defaultProps` of Wrapped Component

If this is something you need, please see [the stale discussion we had](https://github.com/typescript-cheatsheets/react/issues/86) and comment with your requirements. We will pick this up again if needed.
