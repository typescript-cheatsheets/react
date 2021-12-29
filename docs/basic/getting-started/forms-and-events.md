---
id: forms_and_events
title: Forms and Events
---

If performance is not an issue (and it usually isn't!), inlining handlers is easiest as you can just use [type inference and contextual typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing):

```tsx
const el = (
  <button
    onClick={(event) => {
      /* event will be correctly typed automatically! */
    }}
  />
);
```

But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:

```tsx
type State = {
  text: string;
};
class App extends React.Component<Props, State> {
  state = {
    text: "",
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2KA9Drg8IcMDjB1tcblwBccOjCjAeAcwDcmlRQB8W8ovso3HAAvL6KilYwtgBE0R7ulH5wepYAnmBOznAQPIgAkgDiABIAKnAAFij8dsB8SNmYIZo5YpUu9aEAFEi2QhgiAGLQIACiAG4ysqUAsgAyeTxgAK4wI9RIIDJeAJS2YxC1IT5KFjDlwHQidEgwAMowgUidSpacUewiaEtQRDwwJSgoM4biIxihqEt6iptglFCpYXBfnUoJ1tmFwkQYN9cp0LIpZHxgGMvHjwrInMt4DB0khgtFItE4GCIbSlGcLlcHtwRJEVNkeK0qsDgmzzpcWm1gXydCSkuE4LIdITiRYYR4KCogA)

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (_contributed by @TomasHubelbauer_):

```tsx
  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... _artisanally hand-rolled_. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/24).

</details>

**Typing onSubmit, with Uncontrolled components in a Form**

If your target form has custom named inputs that you'd like to access, you can extend HTMLFormElement:

```tsx
type ExtendedHTMLFormElement = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const Form = () => {
  const formRef = React.useRef<ExtendedHTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(e: React.FormEvent<ExtendedHTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value; // typechecks!
        const password = form.password.value; // typechecks!
        // etc...
      }}
    >
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <div>
        <input type="submit" value="Log in" />
      </div>
    </form>
  )
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgFEAPGJAOwBMkOAJAFQCyAGQBi0EAwA2SEO3gBeOP2FioE6bLbwAZHADeFOHBkpgkgFxLBQgJJswAVxhSZcw3DAoAzl4Du0DktlW3snF00YCgBfCgo0CDYveFU8RQAKAEo4eQA+fXd4xKxxZExsxGIYADoHLyRSgB5mVk5uYJTwuRy0tgdJSQzY8iMiGAcoNjg09yMGzHEZozgiTHk9ebVSmOGlowSAZQcAIxBgGDW0pEtkdGqOgDc5JpZ2Ll5rDo0urNz8nd2jEgqmAiI8tAARJCYFB9GCZRa7QpJOAbVLGKpocZELR8FBQADmSEi-wBSPgJjM5VRVQpkiq9xQkgc9AA9Cy4DQ6GgABZINAAay8AEIEUsyR5vH4AlTxMDJf4oBx6YzmXA2RzaHzeQLhaKjOqiWgqsbRVFtrscqKGhxgPdLSTdg1JCgjkhJPaAQCGCBTBY9UsGsBQvBOUh5Phafg4GwULJw5G1R7PXAGizna73VaWTa7Vac0nPU6XW6C8mAArygLmf2zIOOEOa8OeHwKjhRmNx-DNqWKqMs0uOtPFzMOlPZ20DlP5-2B4MaujhrzHU4wKMMplh-BCCD4uBBvuT1PTkmp1FJwbkKJAA)

Of course, if you're making any sort of significant form, [you should use Formik](https://jaredpalmer.com/formik) or [React Hook Form](https://react-hook-form.com/), which are written in TypeScript.

### List of event types

| Event Type       | Description                                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AnimationEvent   | CSS Animations.                                                                                                                                                                                                                                                        |
| ChangeEvent      | Changing the value of `<input>`, `<select>` and `<textarea>` element.                                                                                                                                                                                                  |
| ClipboardEvent   | Using copy, paste and cut events.                                                                                                                                                                                                                                      |
| CompositionEvent | Events that occur due to the user indirectly entering text (e.g. depending on Browser and PC setup, a popup window may appear with additional characters if you e.g. want to type Japanese on a US Keyboard)                                                           |
| DragEvent        | Drag and drop interaction with a pointer device (e.g. mouse).                                                                                                                                                                                                          |
| FocusEvent       | Event that occurs when elements gets or loses focus.                                                                                                                                                                                                                   |
| FormEvent        | Event that occurs whenever a form or form element gets/loses focus, a form element value is changed or the form is submitted.                                                                                                                                          |
| InvalidEvent     | Fired when validity restrictions of an input fails (e.g `<input type="number" max="10">` and someone would insert number 20).                                                                                                                                          |
| KeyboardEvent    | User interaction with the keyboard. Each event describes a single key interaction.                                                                                                                                                                                     |
| MouseEvent       | Events that occur due to the user interacting with a pointing device (e.g. mouse)                                                                                                                                                                                      |
| PointerEvent     | Events that occur due to user interaction with a variety pointing of devices such as mouse, pen/stylus, a touchscreen and which also supports multi-touch. Unless you develop for older browsers (IE10 or Safari 12), pointer events are recommended. Extends UIEvent. |
| TouchEvent       | Events that occur due to the user interacting with a touch device. Extends UIEvent.                                                                                                                                                                                    |
| TransitionEvent  | CSS Transition. Not fully browser supported. Extends UIEvent                                                                                                                                                                                                           |
| UIEvent          | Base Event for Mouse, Touch and Pointer events.                                                                                                                                                                                                                        |
| WheelEvent       | Scrolling on a mouse wheel or similar input device. (Note: `wheel` event should not be confused with the `scroll` event)                                                                                                                                               |
| SyntheticEvent   | The base event for all above events. Should be used when unsure about event type                                                                                                                                                                                       |

<details>
<summary>

**What about `InputEvent`?**

</summary>

You've probably noticed that there is no `InputEvent`. This is because it is not supported by Typescript as the event itself has no fully browser support and may behave differently in different browsers. You can use `KeyboardEvent` instead.

Sources:

- https://github.com/microsoft/TypeScript/issues/29441
- https://developer.mozilla.org/en-US/docs/Web/API/InputEvent
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

</details>
