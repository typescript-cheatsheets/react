---
id: react_hoc_docs
sidebar_label: React HOC docs in TypeScript
title: "Section 1: React HOC docs in TypeScript"
---

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
    id: 1,
  },
  {
    text: "comment2",
    id: 2,
  },
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
  },
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
}
function BlogPost({ data, id }: BlogPostProps) {
  return (
    <div key={id}>
      <TextBlock text={data} />;
    </div>
  );
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCgeirhgAskBnJOFIuxuMHMJuiHABGrYADsAVkgxIAJsICenVgAkA8gGEK4mEiiZ0rAOrAGAERQwUABV5MAPABUAfHADeFOHFmWUALjhHAG44Gm9fOGB+AHMkMT1gNAoAX2paR0j+BlYYBTBWCExwqzS4a0zlbjs4QsqAdygUMHz5NFxIeLF4BksK8Uw9IllSjQrstgwAVxQAG0iuvQM0AqLxhqaWuDbwCE74AApJlnkYQWjGoW8kA0mZmFsIPjhsXEiYAEoKJAAPSFhnyZiDDAXZwOqmegAZUmQiYaCgwDAMBBYicABoynAfroxLJ+CZzL4HnwnM4MRpnPtPKFaAwonQ8qxZjMIHV+EcBPMBlAyhihJN4OcUJdxrl8jUikZGs05Bp2rs4vAWGB2JYkDMlOCGBABW95rp9AkxNEwRDKv09HFlhKytSpRtZfK9gFkOgYAA6ABSkIAGgBRGZIECKuViJgwKCTDDQezWVwAMjgGjR1LCLEDGAsVgqKABQNOPMw0ECqdoPEe-Hprtkuw1wmkKCOohg+H4RBQNbEdfETGAshWlTQMxQTCY1PT0hgWf8cCp5C8Xh8VkhOqgywCYqQtWnK8ma6QKfnC-LfBdqE7Gvs3p97oAMsAhI0oAoALIoMQoWKyACCMAjD4FZh7GTOA1BAUxYwxAAiJcUCg5wEOpd44AAXlcRwKGQjwjzCcYQE-RIKkYIgAmvO8HyfV930-ORf3-fldH4cEZjmKwAGsci4TcbXtFo5R2PY2FxOAiCYCAZgAN2bfh+xuO4qgrUs2GiFAe26LgT34WoCXoacMTqehEnoCoJCOdSCgRaJxFmTFuK1Yz8Fg-ARKDCApPkF48FMNskAAR0mYAiGDLoxyPbjiX4FC4DI+9H3YKiPy-OiEQYoCQLAiDrGg2D4OcIJqW4yErF0VD3GpRdfACYJqWSfKjyIGA9zELZh1HOAdOnLFvhxPFEGID1+I6RVYzsDEirVVxsIXLZdnDSNoygfZNICCKsPKhcmEmfJFs0946umrw6SYd16HfWRAw0U7jVYKKjpOs6Lqu2J3SEcRZH2I69vWw7DOO8M1VKqaDoqqwAgnTNfH2HdV2WDFdu+uBavW1JKCPLxtiGrozD7F8dS6Ur9mQtC4GhvdlndDtZEu99YnvcM4j0D7fvu3FHpppAvtR6aMYVLoTBYgBVMQQDx+AosJ1DnAR0n93dIK3KQanrrpnFGbuq7zsVp6Obq9aNbZ66CaJqW0YXO6WBgcbdH2IHgdgsH1Unacod8Xd9wxO74dNrxkk59aiFxRm1u9mlKjFcQTSLHkmB4c8I84KJ3U0zJ3VTuApOfGbwEDb53XrcMwRQJRLPoeAxFZMZBFMgvuNMNh+HfBQEbCWDTRYuBw2AduRAZfI0EYNAOOGEOGqa2cEa8exeL4p1FWKFAULcc3iqQd1YOSdxU-dJnE+TkchIUd4N6oE3gc56aUZ9-bQ9HqBmo63w6pR6gACoX7gdRRiOGjTQYJNZ5CnAF+VAvi-GgPANoYZ4D8WCjAFWOloSwnhIiZEoIor2UQXCBESIURzi8DAxUKtDxeBdsuGGSAAjTkcIyY2JNXbkPdLEGABCQqE0wrrcgPw-gQNmvAAAQiyaI1gIDhgQTCLBKCUSlQweI5BODdh4LgAIiAQiREwGIbOGW646FWGofkOGdgAgZRgPYZRqjwwRWyr4eCxt1paNXkwsxwjwxLTsO6PsnxyB7SAA)

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
    props: Readonly<React.JSX.LibraryManagedAttributes<C, Omit<P, "data">>>
  ) => T
) {
  // the magic is here: React.JSX.LibraryManagedAttributes will take the type of WrapedComponent and resolve its default props
  // against the props of WithData, which is just the original P type with 'data' removed from its requirements
  type Props = React.JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
  type State = {
    data: T;
  };
  return class WithData extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount = () => DataSource.addChangeListener(this.handleChange);

    componentWillUnmount = () =>
      DataSource.removeChangeListener(this.handleChange);

    handleChange = () =>
      this.setState({
        data: selectData(DataSource, this.props),
      });

    render() {
      // the typing for spreading this.props is... very complex. best way right now is to just type it as any
      // data will still be typechecked
      return (
        <WrappedComponent data={this.state.data} {...(this.props as any)} />
      );
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
      return <WrappedComponent {...(this.props as T)} />;
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
    id: 1,
  },
  {
    text: "comment2",
    id: 2,
  },
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
  id: ownProps.id,
});
const commentActions = () => ({
  addComment: (str: string) =>
    comments.push({ text: str, id: comments.length }),
});

const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// these are the props to be injected by the HOC
interface WithSubscriptionProps<T> {
  data: T;
}
function connect(mapStateToProps: Function, mapDispatchToProps: Function) {
  return function <T, P extends WithSubscriptionProps<T>, C>(
    WrappedComponent: React.ComponentType<T>
  ) {
    type Props = React.JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
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

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd5qQQkaY64BeOAbQF0A3BSq0GcAMK4WbADLAx3ABQBKLgD44iinDgAeACbAAbnAD0aisuHlq9RlNYwAykgA2SDNC6aA+gC44FBoATwAaOAgAdxoABRwwOgCg4NVODUUAb204YH0AqNj4ugA6XIoAX2UhG1F7ZkcAQQxgUW8VdU0s8h0UfX1JerYAxQYoANHgGgBzVI0maXZisABXOgALTLgYJAAPGHGYKHDcgPnHEvdpmDW4Soqq61sxSRoaD23+hzZvWzeMLW6cDObBc7k8R2ywJgTRgLXolkUAwWcgYD0o5FMpi2ayQdCQgSI2PxYCKWwgcAARvjJgArd5IfSU4JEuAACQA8uIKJNtlBMOh8QB1YDXJzLCl0NBQYBgWG0OIQBK6AAqGi6On0KBgKACyuq5QomGWNGatCBtD+MEUIBQYCc2u2yogCoSAQAYsbTTRwjawAAReRgLVoNZOl2JOAek1ymiqdVwIgwZZQGhwI3RuEq8IxOC7bY0fQcYWi8WS6WyuHhlVqcLiNQAnQ6QVQW1gBkDSBvIaIYgwYod2iOZXBNvV7Jx7I6GAj-Hh7wAKScAA1inIKS2oMEALJBFBTBkNGCHYAU5bbOi6cThdkgEW6GLhABEmu1j7UamqjbMWPERC1kymFlJjeKBzXAQc2GKOBlRxIEUFcNBllcLUGTgOdpzbOAcUJeQWUibD8WufEbSmYA0Cw1tWBKScEyQJMUyBZC6A4AcuxgYtQxxFhcz2VhCx7dA+1Yxx7yKNUaJ0FYKVcMjaILJAoHaeMvx0TFIzokMWRJRUOGCCBljgSIgngWl3igmDcOoJDGSpOB9EHQyRRuWxtj2HI7FQfRigkxsnngX0230e0ULnbhfWCx1nSKRRrnkYoGBQ8JYpKbSEjRFTfNqOAAoZAM6CDGAQ1C7LbTygqQzDaLkvih0kCStY4tSuh0oy79sUa0kmFxQJMF5IyoH4uhySIuDUwgIwFOlfRCNg6b+SQ+BB2owEMsTZNUwbVqdF0ZtKM+cC2J8jKMmKU7qqag0Vq2uATtOnKgtq8NLuuxtbuKe6yuDNYnqOxtzF+lqv2extyk-W59SAA)

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
