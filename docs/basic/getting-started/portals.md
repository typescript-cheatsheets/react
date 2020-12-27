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
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;
    
    // We assume `modalRoot` exists with '!'
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOAbzjSJRiQAVoYUAbOAXzmy4CTDAFoAJrjLkKAellwUAZyUBXEMAB2Aczha4ATwiqocABYwQPTMC5JzyxXHHAAbnADuwGGb3iCIBDi3KI4EDD4ANwUFGgQmkrwALJB3ABciMQwAHQAYgDCADy0vAB8cAC8cAAU9GhmtuJEmnwAlJXltBRwcPJwAKIgqlzM9j72aCMqDLiQmkiaEUp6CZyaaPauKFDAKABGdp7evihwRJjdM6twSDxVyOg5qkpIyJjVkmjqCzmMqCz9OwgH7VABELlcoNarWiMnIPQeGGyzyQ-UwmCQGGq1XaFU6lx6fQA6vZlGpgXAAAaBYJcBAQcKUm4AD2AiWWXh8BAAhNIej04tcadx6eFKs4IF9gYtsgBHVRIKAGADKt0xMGgYIAxMKuKEGTAoYplgAJAAqSQAMoCkNKYLD+XBdaKYNzsigwGAFuJ8g0uOJqrdsl8oM0YDCCWckDATC0cR04K4IMB-M6DW6iIFXEhfY1A1xgyYwxH4XwADRwADaAF0S5c+gBJVaofwQTBU26UivjK6cLSKvTLHuU86F0M-SmXIgxqAtP6jdiwbjVeqNZoVoMh4uw3iwuQKZ4obRIGLkTCqdYwYDxOAAQU98a6pcFiSrSjMEA8KVpFZeMGVH5fqkXDVuKiJPC8yqcCw1SYNwLwlj006xjUkaFBCpSRoSChGKoDAoC08EQHAYCqPAPhsishjGKYiTMMAaDmJY1i2CepaOuhbh+BUoK6vq4SgqUhSyBhWF0O+n7ftwcAAGQyah7GOnAhRSVwmGKUpykQmJmmJAYdgVLQT6aSZzhsmAIwGBkoLaDs4igmWOkmRZ6BIA2LAgEo1kbIsioOU5mlmEgwDaBY1kAIwAAyRa4Zj+RpplHOIPgZPgUUxWY+COQlpl7OgADWtnGJo4jWVA2h5dUkVltVtXZOFrTxYlSkAF5NuISDMhkACc3XZc1PS8LwAVwOpA1wA2+B4KcurcrQoJwKCw05UphR7GRGotHpBlGXlaCFTgF6lYtYAegYKAeA0YBLfw8T5FwDH5YZ8Z4nAf4AZJwGwfBSCtGUkwQC8wnrTAm1jYlwmiStwmqeDjp-WJa0bTed0Pftz24uU72Aap1QwFACp-aUEkeHAqnA8jmhw-yfREK+bbUSYiiemhIluODrQULwQA)

</details>

Modal Component Usage Example:

```tsx
function App() {
  const [showModal, setShowModal] = React.useState(false);
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
