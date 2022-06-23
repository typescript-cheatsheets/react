---
id: context
title: Context
---

## Basic Example

```tsx
import { createContext } from "react";

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

const AppCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

const sampleAppContext: AppContextInterface = {
  name: "Using React Context in a Typescript App",
  author: "thehappybug",
  url: "http://www.example.com",
};

export const App = () => (
  <AppCtx.Provider value={sampleAppContext}>...</AppCtx.Provider>
);

// Consume in your app
import { useContext } from "react";

export const PostInfo = () => {
  const appContext = useContext(AppCtx);
  return (
    <div>
      Name: {appContext.name}, Author: {appContext.author}, Url:{" "}
      {appContext.url}
    </div>
  );
};
```

You can also use the [Class.contextType](https://reactjs.org/docs/context.html#classcontexttype) or [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer) API, let us know if you have trouble with that.

_[Thanks to @AlvSovereign](https://github.com/typescript-cheatsheets/react/issues/97)_

## Extended Example

Using `createContext` with an empty object as default value.

```tsx
interface ContextState {
  // set the type of state you want to handle with context e.g.
  name: string | null;
}
//set an empty object as default state
const Context = createContext({} as ContextState);
// set up context provider as you normally would in JavaScript [React Context API](https://reactjs.org/docs/context.html#api)
```

Using `createContext` and [context getters](https://kentcdodds.com/blog/application-state-management-with-react/) to make a `createCtx` with **no `defaultValue`, yet no need to check for `undefined`**:

```ts
import { createContext, useContext } from "react";

const currentUserContext = createContext<string | undefined>(undefined);

function EnthusasticGreeting() {
  const currentUser = useContext(currentUserContext);
  return <div>HELLO {currentUser!.toUpperCase()}!</div>;
}

function App() {
  return (
    <currentUserContext.Provider value="Anders">
      <EnthusasticGreeting />
    </currentUserContext.Provider>
  );
}
```

Notice the explicit type arguments which we need because we don't have a default `string` value:

```ts
const currentUserContext = createContext<string | undefined>(undefined);
//                                             ^^^^^^^^^^^^^^^^^^
```

along with the non-null assertion to tell TypeScript that `currentUser` is definitely going to be there:

```ts
return <div>HELLO {currentUser!.toUpperCase()}!</div>;
//                              ^
```

This is unfortunate because _we know_ that later in our app, a `Provider` is going to fill in the context.

There are a few solutions for this:

1. You can get around this by asserting non null:

   ```ts
   const currentUserContext = createContext<string>(undefined!);
   ```

   ([Playground here](https://www.typescriptlang.org/play/index.html?jsx=1#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQduEAdqvLgK5SXMwCqqLFADCLGFgAe8ALyYqMAHS5KycaN6SYAHjZRgzAOYA+ABQdmAEywF9WCwEIAlPQLn8wFnACivABYdUNBhgXABxSixgwxNHOABvOjg4JlZ2Lh5+QSg4WWw8RQCsdXEpE05uLF4BIWLNZ0S4ShguZjgtC2AANyMACS8AGX6AeXjyjOqoBRgIPjAwGrQsGIBfey0Aeg7u+mW6V2Z3TwBBOZj4hqaWtrHKzJqxTQUABWJO4CtszuQAGw4saTIAGVfMgAO7MMhGBpJLQ+GD+QJsELhLCRfQGODrKEw9Y3KpZWpSZ6vd5CIw7IA)) This is a quick and easy fix, but this loses type-safety, and if you forget to supply a value to the Provider, you will get an error.

2. We can write a helper function called `createCtx` that guards against accessing a `Context` whose value wasn't provided. By doing this, API instead, **we never have to provide a default and never have to check for `undefined`**:

   ```tsx
   import { createContext, useContext } from "react";

   /**
    * A helper to create a Context and Provider with no upfront default value, and
    * without having to check for undefined all the time.
    */
   function createCtx<A extends {} | null>() {
     const ctx = createContext<A | undefined>(undefined);
     function useCtx() {
       const c = useContext(ctx);
       if (c === undefined)
         throw new Error("useCtx must be inside a Provider with a value");
       return c;
     }
     return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
   }

   // Usage:

   // We still have to specify a type, but no default!
   export const [useCurrentUserName, CurrentUserProvider] = createCtx<string>();

   function EnthusasticGreeting() {
     const currentUser = useCurrentUserName();
     return <div>HELLO {currentUser.toUpperCase()}!</div>;
   }

   function App() {
     return (
       <CurrentUserProvider value="Anders">
         <EnthusasticGreeting />
       </CurrentUserProvider>
     );
   }
   ```

   [View in the TypeScript Playground](http://www.typescriptlang.org/play/index.html?jsx=1&ssl=1&ssc=1&pln=31&pc=2#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdA9AgnYnAIJwAWWANmCxQ4MCHFyVkMLCjgBhCADtpAD3jJFAEzgAFYgDdgmoXADuwGNziKxAVzBEl8YwWS2+8fcj62sAGhQtNiRzSwhbeG5kQ0UAcxExXF5cAGs4Amg4Wy0sAmBFLG1vPhFeEVAsADpgxjoCbPxgJXFJaTkYFQAeLiw1LC10AG8AXzgAH2t3PgA+AAoASjhBtnElVHh8FTgAXkwqGEqJHDanXphu8aycvILNOeyXfML5+jh0hpgmxSzULHaVBZLFZvXBrDY7PZ4A62X4KZRnWabF7AuDAAhwRE7ba7B65J6aRaWYimaxYEkAUSgxCgszIML+HTgIBh8AARjJ8qgjDJkLoDNzhKErLyvD4sGRkW83pQYLYoN9cK84MMVjK5d8ANr0-4BTaVPQQQzGKAAXRQ6FBinWNDgjEYcAA5GhVlaYA6mcgUlh0AAVACeggAyhJgGB4PkCCZebKwHwsHQVUx7QBVVDIWJYABcDDtcAA6jJ1sA+CUovoZKI4KhBLg0X7ZDAA-44KyItYxC43B4AIR0XqQWAu9ZwLWwuWUZSpoQAOWQIGbcnH-RgU6gBqNQjNuyOUgZXXWUHysTmyLqHy+cHJym4MLQn1wAHFKFhPnFAcsQWDxEvJ79hDixypZdV1necFiVNV5TgTpNGAfRpgACXJAAZZCAHkllwH8Vz-SpRGTMBBCgOQ0CwBZhm7TpGFg+D6ETepFEaZoOEI99VRfdVoMXIDfyEdcBTgUVfG2MhAyiUxFDIaYUU6K9LFvItH2fV94kYaS3io7iJxwvj+WNaY6KAA)

3. You can go even further and combine this idea using `createContext` and [context getters](https://kentcdodds.com/blog/application-state-management-with-react/).

   ```tsx
   import { createContext, useContext } from "react";

   /**
    * A helper to create a Context and Provider with no upfront default value, and
    * without having to check for undefined all the time.
    */
   function createCtx<A extends {} | null>() {
     const ctx = createContext<A | undefined>(undefined);
     function useCtx() {
       const c = useContext(ctx);
       if (c === undefined)
         throw new Error("useCtx must be inside a Provider with a value");
       return c;
     }
     return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
   }

   // usage

   export const [useCtx, SettingProvider] = createCtx<string>(); // specify type, but no need to specify value upfront!
   export function App() {
     const key = useCustomHook("key"); // get a value from a hook, must be in a component
     return (
       <SettingProvider value={key}>
         <Component />
       </SettingProvider>
     );
   }
   export function Component() {
     const key = useCtx(); // can still use without null check!
     return <div>{key}</div>;
   }
   ```

   [View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd4BXOpAYWZlwAkIIBrOAF44ACj5IAngC44DKMBoBzAJRCAfHADeFOHGr14AbQYoYSADSykMAMoxTSALpDExGADpmSOw5GaAvso6cEQwjFA0svZmhuISjhT+FAD0yXpEDnq0ZgAe8ADuwDAAFnA0EHCMYNjZcAAmSJgojAA2MABqKC2MSClphSUQjPDFKABuCopwnPUVjDQNmApIdXrFSGgCXS3T69OgveSY8xjAtOmoZqwwOQA8AIJqIqra5Lr6DHo3LsjoHmgZK7ZJB5B5wAA+lQWjWWdSe80WsOUAG5gscaKdzl5rjlnlpgu9aJ80D83J4WKxgXkRBgciiCXBgJhRABCNCqEo4fJlJDcgCiUBwUBEACJsd8QBw4AAjJCM+jABpwFBwAAKOAmDSgcAGpRVYy6PRF9LeuhC1nCkTQqNNSVNoUtcEM4pyllp7nVEE1SCgzhQdCyBmRcFScBAKHEcAAKhIwN4AcAwPAFJgfcrplUWhYyhB4ChIihBSgJHAIMz5mdIjBY0g6IkKH1KnQUIpDhQQZBYIHPs6KTdLDZrDBJp7vb6XADLmwbrc5JMniiQ2k6HG0EyS9W45ZpcMczyVtMKiuNuu4AbunKqjUaDAWe2cp2sCdh+d7mAwHjXoSDHA4i5sRw3C8HwopxMawahq2eZnoaco1HgKrFMBliSp8sryum1DgLQSA3sEDoRKIDK3IOMDDkoo6Kmm549IImhxP4agMrotyUthNC4fAyRMaaLHJKR5GKJRWo8boJp2h20BPhiL6RGxkAcTen7BB88B-sILrPBBaRoPmUTAC0OxeDqRRIbuNCtDsaDrJsd72hahG3HUwBjGo9GSP4tzJM5rk2v4QA)

4. Using `createContext` and `useContext` to make a `createCtx` with [`unstated`](https://github.com/jamiebuilds/unstated)-like context setters:

   ```tsx
   import {
     createContext,
     Dispatch,
     PropsWithChildren,
     SetStateAction,
     useState,
   } from "react";

   export function createCtx<A>(defaultValue: A) {
     type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
     const defaultUpdate: UpdateType = () => defaultValue;
     const ctx = createContext({
       state: defaultValue,
       update: defaultUpdate,
     });

     function Provider(props: PropsWithChildren<{}>) {
       const [state, update] = useState(defaultValue);
       return <ctx.Provider value={{ state, update }} {...props} />;
     }
     return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
   }

   // usage
   import { useContext } from "react";

   const [ctx, TextProvider] = createCtx("someText");
   export const TextContext = ctx;
   export function App() {
     return (
       <TextProvider>
         <Component />
       </TextProvider>
     );
   }
   export function Component() {
     const { state, update } = useContext(TextContext);
     return (
       <label>
         {state}
         <input type="text" onChange={(e) => update(e.target.value)} />
       </label>
     );
   }
   ```

   [View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCpAD0ljkwFcA7DYCZuNIlGJAYRjUAPAEEAfAAoAJkkwpGAGxgA1FIsZIAXHFEBKOAG8KcODACeYJHACqYabyQAVS9YC8iYjAB0AEWAAzmC8aAAWwsjoPgDKSDDRMI6ibBzCFlYQmHCy8kqq6pri4gDcJlwcAfA5Csp2Dnw6dY4uVnAekgZu4tlyNfkaSKXkpmgV8BjUbZ5R3tyofPwcfNQwksbDpnCVjjrVeWoDADRlpoz2Oz25ted8ZQC+ekOmTKww7JwACjgAbsCyUJIwDgwAEdJEMN4vhAQQB1YAwUL8ULARTSIjMYSGO7iAzrTblZiVOAAbW2fEOcDO9SQAF0puCfIwAkgEo4ZL19gUkI8TnAiDBGFBOMIJpCfn8kFA4N8uW5DIYtolyZSbtY7ncjN4tUDoQENQB6Er3Mr8wWcYkTClQ37-OkoAIEyrFOD6-VwdR8IW8YDfJCKcwU4npJCZLhCCnB0PWiVQGkUO4UCiuykBFAAcyQifIo0J8At4bgThoMGjtqmc0cgmokgARAFcM5izWeeQaHRxmNC8XFsxlvAPBMhm3oFgWClOKIwGAOkYTXEzXBJLzhEWVqXJeJeaZhItwBwkL2XZuNtv9auS+L-sfTC2E63aCOGGO3hw4LvIMwD6tcWUc0SFWSSAUlSjhwBqHgMt4TICEsxaSOePZ9i2pimkKi7LooKAAEZ+te+JGIBd74XAwjAMwYCMPAwZuDWfY1nAHBIigzAZnK7jdCBfCSEg3iJFAGY+DKAx6AaeGnphOGKHht5AA)

5. A [useReducer-based version](https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052) may also be helpful.

<details>

<summary><b>Mutable Context Using a Class component wrapper</b></summary>

_Contributed by: [@jpavon](https://github.com/typescript-cheatsheets/react/pull/13)_

```tsx
interface ProviderState {
  themeColor: string;
}

interface UpdateStateArg {
  key: keyof ProviderState;
  value: string;
}

interface ProviderStore {
  state: ProviderState;
  update: (arg: UpdateStateArg) => void;
}

const Context = createContext({} as ProviderStore); // type assertion on empty object

class Provider extends React.Component<
  { children?: ReactNode },
  ProviderState
> {
  public readonly state = {
    themeColor: "red",
  };

  private update = ({ key, value }: UpdateStateArg) => {
    this.setState({ [key]: value });
  };

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update,
    };

    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;
```

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).
