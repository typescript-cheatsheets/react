# Memoization in React with TypeScript

This guide covers two important memoization techniques in React: the `React.memo` higher-order component and the `useMemo` hook. Both are essential for optimizing performance in React applications, especially when used with TypeScript.

## Table of Contents
1. [React.memo](#reactmemo)
2. [useMemo Hook](#usememo-hook)

## React.memo

### What is React.memo?

React.memo is a higher-order component (HOC) that memoizes functional components to prevent unnecessary re-renders when props haven't changed.

### When to Use React.memo

Use React.memo when:
- A component renders often with the same props
- The component is pure (output determined solely by props)
- Rendering the component is relatively expensive

### Basic Usage with TypeScript
`typescript`
```bash
import React from 'react';
interface GreetingProps {
name: string;
}
const Greeting: React.FC<GreetingProps> = ({ name }) => {
console.log('Greeting component rendered');
return <h1>Hello, {name}!</h1>;
};
export default React.memo(Greeting);
```

### Custom Comparison Function
`typescript`
```bash
import React from 'react';
interface ComplexProps {
id: number;
data: {
name: string;
value: number;
};
}
const ComplexComponent: React.FC<ComplexProps> = ({ id, data }) => {
return (
<div>
<h3>ID: {id}</h3>
<p>Name: {data.name}</p>
<p>Value: {data.value}</p>
</div>
);
};
function arePropsEqual(prevProps: ComplexProps, nextProps: ComplexProps) {
return (
prevProps.id === nextProps.id &&
prevProps.data.name === nextProps.data.name &&
prevProps.data.value === nextProps.data.value
);
}
export default React.memo(ComplexComponent, arePropsEqual);
```

## useMemo Hook

### What is useMemo?

`useMemo` is a React hook that memoizes the result of a computation, recomputing only when its dependencies change.

### When to Use useMemo

Use `useMemo` when:
- You have computationally expensive operations
- You want to avoid unnecessary re-computations on re-renders
- You need to maintain referential equality for complex objects

### Basic Usage with TypeScript
```bash
import React, { useMemo } from 'react';
interface Props {
numbers: number[];
}
const SumComponent: React.FC<Props> = ({ numbers }) => {
const sum = useMemo(() => {
console.log('Calculating sum...');
return numbers.reduce((acc, num) => acc + num, 0);
}, [numbers]);
return <div>Sum: {sum}</div>;
};
export default SumComponent;
```


### Complex Example: Memoizing Expensive Calculations

```bash
import React, { useMemo } from 'react';

interface DataPoint {
  x: number;
  y: number;
}

interface ComplexCalculationProps {
  data: DataPoint[];
  threshold: number;
}

const ComplexCalculationComponent: React.FC<ComplexCalculationProps> = ({ data, threshold }) => {
  const result = useMemo(() => {
    console.log('Performing complex calculation...');
    
    // Simulate an expensive calculation
    const filteredData = data.filter(point => point.x > threshold);
    const sum = filteredData.reduce((acc, point) => acc + point.y, 0);
    const average = sum / filteredData.length;
    
    // Simulate more complex operations
    const standardDeviation = Math.sqrt(
      filteredData.reduce((acc, point) => acc + Math.pow(point.y - average, 2), 0) / filteredData.length
    );
    
    return {
      filteredCount: filteredData.length,
      average: average.toFixed(2),
      standardDeviation: standardDeviation.toFixed(2)
    };
  }, [data, threshold]);

  return (
    <div>
      <h3>Complex Calculation Results:</h3>
      <p>Filtered Data Points: {result.filteredCount}</p>
      <p>Average Y Value: {result.average}</p>
      <p>Standard Deviation: {result.standardDeviation}</p>
    </div>
  );
};

export default ComplexCalculationComponent;
```


## Best Practices for Memoization

1. Don't overuse: Only apply memoization when there's a clear performance benefit.
2. Measure performance: Use profiling tools to identify and verify performance improvements.
3. Avoid premature optimization: Start with simple implementations and optimize as needed.
4. Be careful with dependencies: Ensure all variables used in memoized functions are included in dependency arrays.
5. Consider extraction: For complex memoized logic, consider creating custom hooks.

## Conclusion

Both `React.memo` and `useMemo` are powerful tools for optimizing React applications, especially when used with TypeScript. They can significantly improve performance when applied judiciously. Always measure the impact of your optimizations and use these techniques when they provide tangible benefits to your application's performance.