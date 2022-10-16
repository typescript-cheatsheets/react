---
id: portals
title: Portals
---

Using `ReactDOM.createPortal`:

```tsx
const modalRoot = document.getElementById("modal-root") as HTMLElement;
// assuming in your html file has a div with id 'modal-root';

export class Modal extends React.Component<{ children?: React.ReactNode }> {
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
import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgKIBmZSG2RSyZ2y6MAchACZJwC+cZUEEHADkUVBmEBYAFChIsXHDRiUMJAAVoMFABsefAUNHiYAWnaCp0mQHobcFIUL4QwAHYBzOO7gBPCPhQcAAWMCB6ZMA6XMGODnDswABucADuwDDB3uwiIBy6pgIQMMIA3DJoEG6E8HnsuggQxXAAvAkQaC5IbjAAdACO+EhQvgDKSNEY0AAUAEQAxHUFRTCzAJQOhHAAEgAqALIAMiTRIN0w5dbSML5gXPv5OuoCYFttODJwSsFR7GJuAC5ECY2JxLtxLjIyPg3BhgFU4A96jppng0D8dH9ujwgUjdM8IK8Nh9pF87EoVGoEsk4BMkGcenAqjpfEzYVwiO4vGIyJ8lFUarSdPRWgRiPQADx7I4AEWSJ3p5zgAB84G58DodAA+abqzVrS5fYBkODTACEE3ovU6UH+MA2lqQZGtgTtoosnQZfWUqDUCq9c0SSXWkNJYtIFCoMGm0w2LS1uD5X0q1XgE1FjudNrtZtKcHJbiqpj1ekcxFg8LccAARlQULRvPB0pq1UgksMa1wS0m4EthU0+igwHc3OwAMIY9jTCYGntiGCBKux1oJklfde9x6NYq9MR5dsT37TnSzsNfCF87jYADaAF1T3z54uKb6NFpdNN0b9-thMy7becp7cDIIHSOSRAoB4SCgdCsIwJWcAAILDsua78qmcDXoQwQQKkeI6NgxAwKMOF4Y8t6ikwGC9LQozaGo0xkLoxCnl8T5QEuPYSkGWo9mS9j+PgSgoFWzEQHAYD4PAmTAFsPiCUENSqMAaAhGEERRNBZ7rtxNLAOwLSzH2hQDrMWoSjYPF8bg2G4fhcAAGQOaa1lfBK+G8dpG5uUGrneTUvjRC0OBod5YXUoQYA6CgvhArMHhQPpsyYH5YVRegSAAJJqCAhBxWg5zDMlqXecESDAB4oRxQAjAADLVSTBMVXnhV86TsJkQLCHVDXBMIKUta11boAA1glASjnFUAeMN0y1Zg82Lb01VrM1rVhQAXplo5IAAHkCACcB0Det67cMBg3rp5p1fJlwhCCgm7ImaOCzHAswXTdcAStWUkwAiAVBSFw1oGNAgwuwcVgEOvgoKkPxgB9vBVGOOgqSNwXLvGcBESRdmPIxzFIGs3BamgOgQMQFm-TA-1uNd60WVZl0WR51kk9ZP1-QiKNo6DmNxgmuOkfh0wwFAQwk1qtmpIijzU9z9PWeSYiChAJoKQ4w5cZZyQM2sMjcEAA)

</details>

Modal Component Usage Example:

```tsx
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      // you can also put this in your static html file
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
              width: "100vh",
              background: "rgba(0,0,0,0.1)",
              zIndex: 99,
            }}
          >
            I'm a modal!{" "}
            <button
              style={{ background: "papyawhip" }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
      // rest of your app
    </div>
  );
}
```

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>
