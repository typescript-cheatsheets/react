---
id: default_props
title: Typing defaultProps
---

## You May Not Need `defaultProps` Anymore

According to [Dan Abramov's tweet](https://twitter.com/dan_abramov/status/1133878326358171650), `defaultProps` is on the path to deprecation for function components. Instead, it is recommended to use default values directly in the function component signature for simplicity.

For more discussion, check:

- [Original tweet thread](https://twitter.com/hswolff/status/1133759319571345408)
- [Detailed article](https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1)

### Function Components: Use Default Values

Instead of using `defaultProps`, you can define default values inline for function components:

```tsx
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => {
  return <div>{`Hello, I am ${age} years old.`}</div>;
};
```

### Class Components: `defaultProps` Still Supported

For class components, `defaultProps` is still a valid way to set default values:

```tsx
type GreetProps = {
  age?: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };

  render() {
    return <div>{`Hello, I am ${this.props.age} years old.`}</div>;
  }
}

let el = <Greet age={3} />;
```

## Typing `defaultProps` in TypeScript

For TypeScript 3.0 and later, type inference for `defaultProps` has improved. Below is how you can properly type `defaultProps` for both function and class components.

### Function Components

```tsx
type GreetProps = { age: number } & typeof defaultProps;

const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  return <div>{`Hello, I am ${props.age} years old.`}</div>;
};

Greet.defaultProps = defaultProps;
```

### Class Components

```tsx
type GreetProps = typeof Greet.defaultProps & { age: number };

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };

  render() {
    return <div>{`Hello, I am ${this.props.age} years old.`}</div>;
  }
}
```

## Additional Information

For more advanced use cases, you can explore the following links:

- [TypeScript 3.0 defaultProps improvements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html)

[_See this example in TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAOKVYwAKxY6ALxwA3igDmWAFxwAdgFcQAIyxQ4AXzgAyOM1YQCcACZYCyeQBte-VPVwRZqeCbOXrEAXGEi6cCdLgAJgBGABo6dXo6e0d4TixuLzgACjAbGXjuPg9UAEovAD5RXzhKGHkoWTgAHiNgADcCkTScgDpkSTgAeiQFZVVELvVqrrrGiPpMmFaXcytsz2FZtwXbOiA).

---
