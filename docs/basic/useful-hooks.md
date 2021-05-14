---
id: useful-hooks
title: Useful Hooks
---

Useful hooks to have with their TypeScript types :)

> ⚠️ This is a VERY new document - contributions are welcome!

Other useful resources:

- https://usehooks.com/

## useLocalStorage

<details>
<summary>Persist useState in localstorage.</summary>

```tsx
import { useState } from "react";

// Usage
function App() {
  // Similar to useState but first arg is key to the value in local storage.
  const [name, setName] = useLocalStorage<string>("name", "Bob");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

// Hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```

</details>

## useMedia

<details>
<summary>Media queries in JS</summary>

```tsx
import { useState, useEffect } from 'react';

function App() {
  const columnCount = useMedia<number>(
    // Media queries
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );

  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);

  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []) as Array<DataProps[]>;

  (data as DataProps[]).forEach(item => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });

  // Render columns and items
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map(column => (
          <div className="column">
            {column.map(item => (
              <div
                className="image-container"
                style={{
                  // Size image container to aspect ratio of image
                  paddingTop: (item.height / item.width) * 100 + '%'
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook
const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return values?.[index] || defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
}
```

</details>

## useAsyncTask

This Hook is designed for users to make async calls and also know the current state of the request. _thanks to [Adnan S Husain](https://github.com/adnanhusain15) for contributing_!

<details>
<summary>
Example implementation
</summary>

```tsx
// Usage
const task = useAsyncTask(async (data: any) => await myApiRequest(data));
task.run(data);
useEffect(() => {
  console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
}, [task.status]);

// Implementation

import { useCallback, useState } from "react";

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

function useAsyncTask<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [message, setMessage] = useState("");

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setStatus("SUCCESS");
      return resp;
    } catch (error) {
      let message = error?.response?.data?.error?.message || error.message;
      setMessage(message);
      setStatus("ERROR");
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage("");
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    message,
    reset,
  };
}

export default useAsyncTask;
```

</details>

See also: [useAsync](https://usehooks.com/useAsync/).

## useFetch

This Hook is usefull to make fetch request using `AbortController`

```tsx
export function useFetch(request: RequestInfo, init?: RequestInit) {
  const [response, setResponse] = useState<null | Response>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(request, {
          ...init,
          signal: abortController.signal,
        });
        setResponse(await response?.json());
        setIsLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError(error);
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [init, request]);

  return { response, error, isLoading };
}
```
