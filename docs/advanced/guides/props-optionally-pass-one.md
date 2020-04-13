---
id: props_optionally_pass_one
title: Props: Can Optionally Pass One Only If the Other Is Passed
---

Say you want a Text component that gets truncated if `truncate` prop is passed but expands to show the full text when `expanded` prop is passed (e.g. when the user clicks the text).

You want to allow `expanded` to be passed only if `truncate` is also passed, because there is no use for `expanded` if the text is not truncated.

You can do this by function overloads:

```tsx
type CommonProps = {
  children: React.ReactNode;
  miscProps?: any;
};

type NoTruncateProps = CommonProps & { truncate?: false };

type TruncateProps = CommonProps & { truncate: true; expanded?: boolean };

// Function overloads to accept both prop types NoTruncateProps & TruncateProps
function Text(props: NoTruncateProps): JSX.Element;
function Text(props: TruncateProps): JSX.Element;
function Text(props: CommonProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, ...otherProps } = props;
  const classNames = truncate ? ".truncate" : "";
  return (
    <div className={classNames} aria-expanded={!!expanded} {...otherProps}>
      {children}
    </div>
  );
}
```

Using the Text component:

```tsx
const App: React.FC = () => (
  <>
    {/* these all typecheck */}
    <Text>not truncated</Text>
    <Text truncate>truncated</Text>
    <Text truncate expanded>
      truncate-able but expanded
    </Text>
    {/* TS error: Property 'truncate' is missing in type '{ children: string; expanded: true; }' but required in type '{ truncate: true; expanded?: boolean | undefined; }'. */}
    <Text expanded>truncate-able but expanded</Text>
  </>
);
```
