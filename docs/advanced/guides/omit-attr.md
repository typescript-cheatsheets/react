---
id: omit_attr
title: Omit attribute from a type
---

Note: [Omit was added as a first class utility in TS 3.5](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittk)! 🎉

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode; // this will conflict with the InputElement's label
}

// this comes inbuilt with TS 3.5
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, "label">
) => {
  const { label } = props;
  return (
    <div className="Checkbox">
      <label className="Checkbox-label">
        <input type="checkbox" {...props} />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

When your component defines multiple props, chances of those conflicts increase. However you can explicitly state that all your fields should be removed from the underlying component using the `keyof` operator:

```tsx
export interface Props {
  label: React.ReactNode; // conflicts with the InputElement's label
  onChange: (text: string) => void; // conflicts with InputElement's onChange
}

export const Textbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, keyof Props>
) => {
  // implement Textbox component ...
};
```
