---
id: portals
title: Portals
---

Using `ReactDOM.createPortal`:

```tsx
const modalRoot = document.getElementById("modal-root") as HTMLElement;
// assuming in your html file has a div with id 'modal-root';

export class Modal extends React.Component {
  el: HTMLElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWRYmAEQHkBZObXAo9GAWgBNcZchTQQAdgGd4ICHxQAbBBAjwAvHAFoAriCRiYAOgDmSGAFF5SXfoBCATwCSfABQAiGXPk8cK1wEo4FAk4AAkAFWYAGQsrPRgAbgoAeiTAiQkdYDEjOCy4OwgtKDgACxgQeTZgS1KgwI1gADc4AHdgGBLcvgIPBW9lGHxE4XIkAA9qeDR5IODmWQU4cZg9PmDkbgMAYVxIMTi4AG8KOCX5AC5QiOjLazUNCG07gzQuFZi7tz4m-2GTuFE4HEcXowD48y0+mcAWO5FOp16igGBhQYDAqy2JWqLg6wAkBiQ8j8w1OAF8KP9AXs4gB1aryACqYhkkJg0KO-wRCyRKgMRBkjSQmOxzlx+MJxP+5JGpyIYj4SCg7Nh8LgRBgRTEtG4TGYLzeSAACtAYApRVj8WAcGB8WgsfI+HKADRwMUEokkuDS0lAA)

<details>
  <summary><b>Using hooks</b></summary>

Same as above but using hooks

```tsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal: React.FC<{}> = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    // We assume `modalRoot` exists with '!'
    modalRoot!.appendChild(el.current);
    return () => void modalRoot!.removeChild(el.current);
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgKIBmZSG2RSyZcAvnGVBCHAORSoacCwAKFCRYuOGh4oYSAArQYKADZMWbDt14wAtABN2AwULQQAdoXggIu5QggR4AXjj60+EElMwAdAEd8SFAAngDKSEpUMNAAFJwAxFY2StpsDpwAlHAohHAAEgAqALIAMiQRHl5CAPRVWYSE7sCmAOZwTXBBEPhQcAAWMCAqZMARfdlZLsAAbnAA7sAwvW26XInKKfYwnADcQsZmFnCF1soAXIha3gBiAMIAPDiMAHxwztF4aL0jujymTJmOF44IRwOA1OAkED4JTSJBwRZwtAw+oSdiQUyeLY5JoWFCmNBwqYoKDAFAAI1G80WEx4ZBBqPM8HCrwIxHo0Vc7kx3kkqBkZSQFRgsV00wy6T2glBtHIlAw0WiAKB9NB4IA6nDsg0PHAAAZrJR2By6uBIAAewAsOSpS04AEJDKDQQajTA7d4UGAwJ5dDcvkpdNFwjzur8YBKpU6eDBun9Fa8XlMIMAVi7Nu6eFYpkg-d8g0oQ1AwxHQYxsABtAC6Efp4IAkozUCsIAxdeFddgEQzFE1Am0cl3dbTC2HdfTo7GJFIZPJYMpop9vr9sMG3EXMRHGJLzaJ4LokGQUND4MckkA)

</details>

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>
