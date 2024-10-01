# React.memo and useMemo

## React.memo

`React.memo` is a higher-order component (HOC) that optimizes the performance of functional components by preventing unnecessary re-renders. It works by memoizing the component and only re-renders it when its props change.

### Why Use `React.memo`?

In React, when a parent component re-renders, all its child components also re-render by default, even if their props haven't changed. This can lead to performance issues in large applications or components that are expensive to re-render.

`React.memo` prevents these unnecessary re-renders by memoizing the component and only allowing it to re-render when its props actually change.

### Example Without `React.memo`

`typescript`

```bash
import React from 'react';

interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  console.log('Component rendered');
  return <div>Hello, {name}!</div>;
};

const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MyComponent name="John" />
    </div>
  );
};

export default ParentComponent;
```

In this example, every time the button is clicked and the `count` state changes, `MyComponent` re-renders even though its `name` prop hasn't changed.

### Example With `React.memo`

`typescript`

```bash
import React from 'react';

interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = React.memo(({ name }) => {
  console.log('Component rendered');
  return <div>Hello, {name}!</div>;
});

const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MyComponent name="John" />
    </div>
  );
};

export default ParentComponent;

```

By using `React.memo`, `MyComponent` only re-renders if its `name` prop changes, improving performance by avoiding unnecessary re-renders.

## How `React.memo` Works

`React.memo` performs a shallow comparison of the component's props. If the props are the same as the previous render, the component will not re-render.

Primitives (numbers, strings, booleans) are compared by value.
Objects, arrays, and functions are compared by reference.
Custom Comparison Function
If you need more control over how the props are compared, you can pass a custom comparison function as the second argument to `React.memo`.

### Example With `Custom Comparison`

`typescript`

```bash
import React from 'react';

interface MyComponentProps {
  name: string;
  info: {
    age: number;
  };
}

const MyComponent: React.FC<MyComponentProps> = React.memo(
  ({ name, info }) => {
    console.log('Component rendered');
    return (
      <div>
        <p>Hello, {name}!</p>
        <p>Age: {info.age}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name && prevProps.info.age === nextProps.info.age;
  }
);

const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);
  const info = { age: 25 };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MyComponent name="John" info={info} />
    </div>
  );
};

export default ParentComponent;
```

Here, the custom comparison function ensures `MyComponent` only re-renders when the `name` or `info.age` changes.

## useMemo

`useMemo` is a React hook that optimizes performance by memoizing the result of a calculation or a function call. It recomputes the value only when one of its dependencies changes.

### Why Use useMemo?

Without `useMemo`, expensive calculations inside a component will be recalculated every time the component renders, even if the inputs to the calculation haven't changed. This can lead to performance issues.

By using `useMemo`, you can memoize the result of the calculation and avoid unnecessary recalculations.

### Example Without `useMemo`

`typescript`

```bash
import React from 'react';

const calculateValue = (num: number): number => {
  console.log('Expensive calculation');
  return num * 2;
};

interface MyComponentProps {
  num: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ num }) => {
  const value = calculateValue(num);

  return <div>Value: {value}</div>;
};

const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MyComponent num={5} />
    </div>
  );
};

export default ParentComponent;
```

In this example, `calculateValue` is called every time `ParentComponent` renders, even though `num` remains the same.

### Example Without `useMemo`

`typescript`

```bash
import React from 'react';

const calculateValue = (num: number): number => {
  console.log('Expensive calculation');
  return num * 2;
};

interface MyComponentProps {
  num: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ num }) => {
  const value = React.useMemo(() => calculateValue(num), [num]);

  return <div>Value: {value}</div>;
};

const ParentComponent: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MyComponent num={5} />
    </div>
  );
};

export default ParentComponent;
```

In this example, `calculateValue` is only called when `num` changes, thanks to `useMemo`.

## How useMemo Works

useMemo memoizes the result of the function passed to it. It takes two arguments:

1. A function that returns the value you want to memoize.
2. A dependency array. The function is only recomputed when one of the dependencies changes.

### Example With `Dependency Array`

`typescript`

```bash
import React from 'react';

const calculateValue = (num: number, multiplier: number): number => {
  console.log('Expensive calculation');
  return num * multiplier;
};

const MyComponent: React.FC = () => {
  const [num, setNum] = React.useState<number>(5);
  const [multiplier, setMultiplier] = React.useState<number>(2);

  const value = React.useMemo(() => calculateValue(num, multiplier), [num, multiplier]);

  return (
    <div>
      <button onClick={() => setNum(num + 1)}>Increment Num</button>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increment Multiplier</button>
      <div>Value: {value}</div>
    </div>
  );
};

export default MyComponent;
```

In this example, `calculateValue` is only called when either `num` or `multiplier changes`.

## Conclusion

Both `React.memo` and `useMemo` are useful performance optimization tools in React.

- Use `React.memo` to prevent unnecessary re-renders of child components by memoizing them.
- Use useMemo to memoize expensive calculations or function results to avoid recalculating on every render.

## References

- React.memo Documentation (https://reactjs.org/docs/react-api.html#reactmemo)
- useMemo Documentation (https://reactjs.org/docs/hooks-reference.html#usememo)

## Additional Resources

### Medium Articles:

- Memoization in React (https://medium.com/@rumeysakaragoz18/memoization-in-react-memo-usecallback-and-usememo-69b1367041e0)
- React Performance Optimization using React.memo or useMemo (https://medium.com/@arunsheoran90/react-performance-optimisation-using-react-memo-usememo-6edcb25a1ed6)

### Walkthrough Videos:

- Learn useMemo and React Memo for Faster Apps: (https://www.youtube.com/watch?v=6-BfMpTT2PE​).

- useMemo Explained | React Hooks useMemo Tutorial: (https://www.youtube.com/watch?v=oR8gUi1LfWY​)

- Mastering React Memo:( https://www.youtube.com/watch?v=DEPwA3mv_R8)

- Learn useMemo In 15 Minutes - React Hooks Explained: (https://www.youtube.com/watch?v=JvdxYsF66K4​)

- React.memo, useMemo, and useCallback Optimizations: (https://www.youtube.com/watch?v=4BranN3qnDU​)
