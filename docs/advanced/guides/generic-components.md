---
id: generic_components
title: Generic Components
---

Just as you can make generic functions and classes in TypeScript, you can also make generic components to take advantage of the type system for reusable type safety. Both Props and State can take advantage of the same generic types, although it probably makes more sense for Props than for State. You can then use the generic type to annotate types of any variables defined inside your function / class scope.

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}
```

You can then use the generic components and get nice type safety through type inference:

```tsx
ReactDOM.render(
  <List
    items={["a", "b"]} // type of 'string' inferred
    renderItem={(item) => (
      <li key={item}>
        {/* Error: Property 'toPrecision' does not exist on type 'string'. */}
        {item.toPrecision(3)}
      </li>
    )}
  />,
  document.body
);
```

As of [TS 2.9](#typescript-29), you can also supply the type parameter in your JSX to opt out of type inference:

```tsx
ReactDOM.render(
  <List<number>
    items={["a", "b"]} // Error: Type 'string' is not assignable to type 'number'.
    renderItem={(item) => <li key={item}>{item.toPrecision(3)}</li>}
  />,
  document.body
);
```

You can also use Generics using fat arrow function style:

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Note the <T extends unknown> before the function definition.
// You can't use just `<T>` as it will confuse the TSX parser whether it's a JSX tag or a Generic Declaration.
// You can also use <T,> https://github.com/microsoft/TypeScript/issues/15713#issuecomment-499474386
const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};
```

The same for using classes: (Credit: [Karol Majewski](https://twitter.com/WrocTypeScript/status/1163234064343736326)'s [gist](https://gist.github.com/karol-majewski/befaf05af73c7cb3248b4e084ae5df71))

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

interface State<T> {
  items: T[];
}

class List<T> extends React.PureComponent<Props<T>, State<T>> {
  // You can use type T inside List class.
  state: Readonly<State<T>> = {
    items: [],
  };
  render() {
    const { items, renderItem } = this.props;
    // You can use type T inside List class.
    const clone: T[] = items.slice(0);
    return (
      <div>
        {items.map(renderItem)}
        <button onClick={() => this.setState({ items: clone })}>Clone</button>
        {JSON.stringify(this.state, null, 2)}
      </div>
    );
  }
}
```

Though you can't use Generic Type Parameters for Static Members:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  // Static members cannot reference class type parameters.ts(2302)
  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

To fix this you need to convert your static function to a type inferred function:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  static getDerivedStateFromProps<T>(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

### Generic components with children

`children` is usually not defined as a part of the props type. Unless `children` are explicitly defined as a part of the `props` type, an attempt to use `props.children` in JSX or in the function body will fail:

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

/* Property 'children' does not exist on type 'WrapperProps<T>'. */
const Wrapper = <T extends {}>(props: WrapperProps<T>) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};

/*
Type '{ children: string; item: string; renderItem: (item: string) => string; }' is not assignable to type 'IntrinsicAttributes & WrapperProps<string>'.
  Property 'children' does not exist on type 'IntrinsicAttributes & WrapperProps<string>'.
*/

const wrapper = (
  <Wrapper item="test" renderItem={(item) => item}>
    {test}
  </Wrapper>
);
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgHUoUwx6AFHMAZwA8AFQB8cAN4U4cYHRAAuOMIDc0uEWoATegEl5SgBRyki5QEo4AXnHJ0MAHR2MAOQg615GWgAWwADZamkrOjqFuHhQAvhQUAPQAVHC8EFywAJ4EvgFBSNT4cFoQSPxw1BDwSAAewPzwENRwMOlcBGwcaSkCIqL4DnAJcRRoDXWs7Jz01nAicNV02qUSUaKGYHz8Su2TUF1CYpY2kupEMACuUI2G6jKCWsAAbqI3MpLrqfwOmjpQ+qZrGwcJhA5hiXleMgk7wEDmygU0YIhgji9ye6nMniinniCQowhazHwEjgcNy1CUdSgNAA5ipZAY4JSaXTvnoGcYGUzqNTDuIubS4FECrUyhU4Ch+PxgNTqCgAEb+ZgwCBNAkEXS0KnUKVoACCMBgVLlZzopQAZOMOjwNoJ+b0HOouvRmlk-PC8gUiiVRZUamMGqrWvgNYaaDr9aHjaa4Bbtp0bXa+hRBrFyCNtfBTfArHBDLyZqjRAAJJD+fwqrPIwvDUbwADuEzS02u4MEcamwKsACIs12NHkfn8QFYJMDrOJgSsXhIs4iZnF21BnuQMUA)

To work around that, either add `children` to the `WrapperProps` definition (possibly narrowing down its type, as needed):

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
  children: string; // The component will only accept a single string child
}

const Wrapper = <T extends {}>(props: WrapperProps<T>) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};
```

or wrap the type of the props in `React.PropsWithChildren` (this is what `React.FC<>` does):

```tsx
interface WrapperProps<T> {
  item: T;
  renderItem: (item: T) => React.ReactNode;
}

const Wrapper = <T extends {}>(
  props: React.PropsWithChildren<WrapperProps<T>>
) => {
  return (
    <div>
      {props.renderItem(props.item)}
      {props.children}
    </div>
  );
};
```
