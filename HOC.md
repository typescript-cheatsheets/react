<div align="center">

<a href="https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
    align="left"
  />
</a>

<p>Cheatsheets for experienced React developers getting started with TypeScript</p>

[**Basic**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#basic-cheatsheet-table-of-contents) |
[**Advanced**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md) |
[**Migrating**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/MIGRATING.md) |
[**HOC**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/HOC.md) |
[中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) |
[Contribute!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose)

</div>

---

# HOC Cheatsheet

**This HOC Cheatsheet** compiles all available knowledge for writing Higher Order Components with React and TypeScript.

- We will map closely to [the official docs on HOCs](https://reactjs.org/docs/higher-order-components.html) initially
- While hooks exist, many libraries and codebases still have a need to type HOCs.
- Render props may be considered in future
- The goal is to write HOCs that offer type safety while not getting in the way.

---

### HOC Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 0: Full HOC Example](#section-0-full-hoc-example)
- [Section 1: React HOC docs in TypeScript](#section-1-react-hoc-docs-in-typescript)
- [Section 2: Excluding Props](#section-2-excluding-props)

  </details>

# Section 0: Full HOC Example

> This is an HOC example for you to copy and paste. If you certain pieces don't make sense for you, head to [Section 1](#section-1-react-hoc-docs-in-typescript) to get a detailed walkthrough via a complete translation of the React docs in TypeScript.

Sometimes you want a simple way to inject props from somewhere else (either a global store or a provider) and don't want to continually pass down the props for it. Context is great for it, but then the values from the context can only be used in your `render` function. A HoC will provide these values as props.

**The injected props**

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

**Usage in the component**

The goal is to have the props available on the interface for the component, but subtracted out for the consumers of the component when wrapped in the HoC.

```ts
interface Props extends WithThemeProps {
  children: React.ReactNode;
}

class MyButton extends React.Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

**Consuming the Component**

Now when consuming the component you can omit the `primaryColor` prop or override the one provided through context.

```tsx
<MyButton>Hello button</MyButton> // Valid
<MyButton primaryColor="#333">Hello Button</MyButton> // Also valid
```

**Declaring the HoC**

The actual HoC.

```tsx
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<
    Optionalize<T, WithThemeProps>
  > {
    public static displayName = `withPages(${displayName})`;

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = getThemePropsFromSomeWhere();

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...this.props as T} />;
    }
  };
}
```

Note that the `{...this.props as T}` assertion is needed because of a current bug in TS 3.2 https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046

Here is a more advanced example of a dynamic higher order component that bases some of its parameters on the props of the component being passed in:

```tsx
// inject static values to a component so that they're always provided
export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...props as TProps} {...injector} />;
  };
}
```

### Using `forwardRef`

For "true" reusability you should also consider exposing a ref for your HOC. You can use `React.forwardRef<Ref, Props>` as documented in [the basic cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#forwardrefcreateref), but we are interested in more real world examples. [Here is a nice example in practice](https://gist.github.com/OliverJAsh/d2f462b03b3e6c24f5588ca7915d010e) from @OliverJAsh.

# Section 1: React HOC docs in TypeScript

In this first section we refer closely to [the React docs on HOCs](https://reactjs.org/docs/higher-order-components.html) and offer direct TypeScript parallels.

## Docs Example: [Use HOCs For Cross-Cutting Concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns)

<details>

<summary>
<b>Misc variables referenced in the example below</b>
</summary>

```tsx
/** dummy child components that take anything */
const Comment = (_: any) => null;
const TextBlock = Comment;

/** dummy Data */
type CommentType = { text: string; id: number };
const comments: CommentType[] = [
  {
    text: "comment1",
    id: 1
  },
  {
    text: "comment2",
    id: 2
  }
];
const blog = "blogpost";

/** mock data source */
const DataSource = {
  addChangeListener(e: Function) {
    // do something
  },
  removeChangeListener(e: Function) {
    // do something
  },
  getComments() {
    return comments;
  },
  getBlogPost(id: number) {
    return blog;
  }
};
/** type aliases just to deduplicate */
type DataType = typeof DataSource;
// type TODO_ANY = any;

/** utility types we use */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// type Optionalize<T extends K, K> = Omit<T, keyof K>;

/** Rewritten Components from the React docs that just uses injected data prop */
function CommentList({ data }: WithDataProps<typeof comments>) {
  return (
    <div>
      {data.map((comment: CommentType) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
interface BlogPostProps extends WithDataProps<string> {
  id: number;
  // children: ReactNode;
}
function BlogPost({ data, id }: BlogPostProps) {
  return (
    <div key={id}>
      <TextBlock text={data} />;
    </div>
  );
}
```

</details>

Example HOC from React Docs translated to TypeScript

```tsx
// these are the props to be injected by the HOC
interface WithDataProps<T> {
  data: T; // data is generic
}
// T is the type of data
// P is the props of the wrapped component that is inferred
// C is the actual interface of the wrapped component (used to grab defaultProps from it)
export function withSubscription<T, P extends WithDataProps<T>, C>(
  // this type allows us to infer P, but grab the type of WrappedComponent separately without it interfering with the inference of P
  WrappedComponent: React.JSXElementConstructor<P> & C,
  // selectData is a functor for T
  // props is Readonly because it's readonly inside of the class
  selectData: (
    dataSource: typeof DataSource,
    props: Readonly<JSX.LibraryManagedAttributes<C, Omit<P, "data">>>
  ) => T
) {
  // the magic is here: JSX.LibraryManagedAttributes will take the type of WrapedComponent and resolve its default props
  // against the props of WithData, which is just the original P type with 'data' removed from its requirements
  type Props = JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
  type State = {
    data: T;
  };
  return class WithData extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount = () => DataSource.addChangeListener(this.handleChange);

    componentWillUnmount = () =>
      DataSource.removeChangeListener(this.handleChange);

    handleChange = () =>
      this.setState({
        data: selectData(DataSource, this.props)
      });

    render() {
      // the typing for spreading this.props is... very complex. best way right now is to just type it as any
      // data will still be typechecked
      return <WrappedComponent data={this.state.data} {...this.props as any} />;
    }
  };
  // return WithData;
}

/** HOC usage with Components */
export const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource: DataType) => DataSource.getComments()
);

export const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource: DataType, props: Omit<BlogPostProps, "data">) =>
    DataSource.getBlogPost(props.id)
);
```

## Docs Example: [Don’t Mutate the Original Component. Use Composition.](https://reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition)

This is pretty straightforward - make sure to assert the passed props as `T` [due to the TS 3.2 bug](https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046).

```tsx
function logProps<T>(WrappedComponent: React.ComponentType<T>) {
  return class extends React.Component {
    componentWillReceiveProps(
      nextProps: React.ComponentProps<typeof WrappedComponent>
    ) {
      console.log("Current props: ", this.props);
      console.log("Next props: ", nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props as T} />;
    }
  };
}
```

## Docs Example: [Pass Unrelated Props Through to the Wrapped Component](https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component)

No TypeScript specific advice needed here.

## Docs Example: [Maximizing Composability](https://reactjs.org/docs/higher-order-components.html#convention-maximizing-composability)

HOCs can take the form of Functions that return Higher Order Components that return Components.

`connect` from `react-redux` has a number of overloads you can take inspiration [from in the source](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bc0c933415466b34d2de5790f7cd6418f676801e/types/react-redux/v5/index.d.ts#L77).

Here we build our own mini `connect` to understand HOCs:

<details>

<summary>
<b>Misc variables referenced in the example below</b>
</summary>

```tsx
/** utility types we use */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** dummy Data */
type CommentType = { text: string; id: number };
const comments: CommentType[] = [
  {
    text: "comment1",
    id: 1
  },
  {
    text: "comment2",
    id: 2
  }
];
/** dummy child components that take anything */
const Comment = (_: any) => null;
/** Rewritten Components from the React docs that just uses injected data prop */
function CommentList({ data }: WithSubscriptionProps<typeof comments>) {
  return (
    <div>
      {data.map((comment: CommentType) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
```

</details>

```tsx
const commentSelector = (_: any, ownProps: any) => ({
  id: ownProps.id
});
const commentActions = () => ({
  addComment: (str: string) => comments.push({ text: str, id: comments.length })
});

const ConnectedComment = connect(
  commentSelector,
  commentActions
)(CommentList);

// these are the props to be injected by the HOC
interface WithSubscriptionProps<T> {
  data: T;
}
function connect(mapStateToProps: Function, mapDispatchToProps: Function) {
  return function<T, P extends WithSubscriptionProps<T>, C>(
    WrappedComponent: React.ComponentType<T>
  ) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    return class ComponentWithTheme extends React.Component<Props> {
      public render() {
        // Fetch the props you want inject. This could be done with context instead.
        const mappedStateProps = mapStateToProps(this.state, this.props);
        const mappedDispatchProps = mapDispatchToProps(this.state, this.props);
        // this.props comes afterwards so the can override the default ones.
        return (
          <WrappedComponent
            {...this.props}
            {...mappedStateProps}
            {...mappedDispatchProps}
          />
        );
      }
    };
  };
}
```

## Docs Example: [Wrap the Display Name for Easy Debugging](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)

This is pretty straightforward as well.

```tsx
interface WithSubscriptionProps {
  data: any;
}

function withSubscription<
  T extends WithSubscriptionProps = WithSubscriptionProps
>(WrappedComponent: React.ComponentType<T>) {
  class WithSubscription extends React.Component {
    /* ... */
    public static displayName = `WithSubscription(${getDisplayName(
      WrappedComponent
    )})`;
  }
  return WithSubscription;
}

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
```

## Unwritten: [Caveats section](https://reactjs.org/docs/higher-order-components.html#caveats)

- Don’t Use HOCs Inside the render Method
- Static Methods Must Be Copied Over
- Refs Aren’t Passed Through

# Section 2: Excluding Props

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
  return function<T extends { owner: string }>(
    Component: React.ComponentType<T>
  ) {
    return function(props: Omit<T, "owner">): React.ReactNode {
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
