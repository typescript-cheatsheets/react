---
id: excluding_props
sidebar_label: Excluding Props
title: Section 2: Excluding Props
---

This is covered in passing in Section 1 but we focus on it here as it is such a common issue. HOCs often inject props to premade components. The problem we want to solve is having the HOC-wrapped-component exposing a type that reflects the reduced surface area of props - without manually retyping the HOC every time. This involves some generics, fortunately with some helper utilities.

Say we have a component:

```tsx
type DogProps {
  name: string
  owner: string
}
function Dog({name, owner}: DogProps) {
  return <div> Woof: {name}, Owner: {owner}</div>
}
```

And we have a `withOwner` HOC that injects the `owner`:

```tsx
const OwnedDog = withOwner("swyx")(Dog);
```

We want to type `withOwner` such that it will pass through the types of any component like `Dog`, into the type of `OwnedDog`, minus the `owner` property it injects:

```tsx
typeof OwnedDog; // we want this to be equal to { name: string }

<Dog name="fido" owner="swyx" />; // this should be fine
<OwnedDog name="fido" owner="swyx" />; // this should have a typeError
<OwnedDog name="fido" />; // this should be fine

// and the HOC should be reusable for completely different prop types!

type CatProps = {
  lives: number;
  owner: string;
};
function Cat({ lives, owner }: CatProps) {
  return (
    <div>
      {" "}
      Meow: {lives}, Owner: {owner}
    </div>
  );
}

const OwnedCat = withOwner("swyx")(Cat);

<Cat lives={9} owner="swyx" />; // this should be fine
<OwnedCat lives={9} owner="swyx" />; // this should have a typeError
<OwnedCat lives={9} />; // this should be fine
```

So how do we type `withOwner`?

1. We get the types of the component: `keyof T`
2. We `Exclude` the property we want to mask: `Exclude<keyof T, 'owner'>`, this leaves you with a list of names of properties you want on the wrapped component e.g. `name`
3. (optional) Use intersection types if you have more to exclude: `Exclude<keyof T, 'owner' | 'otherprop' | 'moreprop'>`
4. Names of properties aren't quite the same as properties themselves, which also have an associated type. So we use this generated list of names to `Pick` from the original props: `Pick<keyof T, Exclude<keyof T, 'owner'>>`, this leaves you with the new, filtered props, e.g. `{ name: string }`
5. (optional) Instead of writing this manually each time, we could use this utility: `type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`
6. Now we write the HOC as a generic function:

```tsx
function withOwner(owner: string) {
  return function <T extends { owner: string }>(
    Component: React.ComponentType<T>
  ) {
    return function (props: Omit<T, "owner">): React.ReactNode {
      return <Component owner={owner} {...props} />;
    };
  };
}
```

_Note: above is an incomplete, nonworking example. PR a fix!_

## Learn More

We will need to extract lessons from here in future but here they are:

- https://medium.com/@xfor/typescript-react-hocs-context-api-cb46da611f12
- https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
- https://www.matthewgerstman.com/tech/ts-tricks-higher-order-components/
