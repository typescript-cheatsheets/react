---
id: forward_and_create_ref
title: forwardRef/createRef
---

Check the [Hooks section](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#hooks) for `useRef`.

`createRef`:

```tsx
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

`forwardRef`:

```tsx
type Props = { children: React.ReactNode; type: "submit" | "button" };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

<details>
  <summary>
    You can make a minor optimization to make the forward ref immutable.
  </summary>

  As of Oct 2020, the default `ref` you get from `forwardRef` is mutable (`MutableRefObject`). However most of the time you don't want users to be able to assign to it.  [There is an open discussion about this](https://github.com/typescript-cheatsheets/react/pull/323/), but for now you can assign `React.Ref` if you want to ensure nobody reassigns it:

  ```tsx
  type Props = { children: React.ReactNode; type: "submit" | "button" };
  export type Ref = HTMLButtonElement;
  export const FancyButton = React.forwardRef(
    (props: Props, ref: React.Ref<Ref>) => ( // <-- here!
      <button ref={ref} className="MyClassName" type={props.type}>
        {props.children}
      </button>
    )
  );
  ```

</details>


If you are grabbing the props of a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770).

More info: https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

You may also wish to do [Conditional Rendering with `forwardRef`](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/167).

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
