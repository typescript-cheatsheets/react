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

- [Section 0: Prerequisites](#section-0-prerequisites)
  </details>

# Section 1: React HOC docs in TypeScript

In this first section we refer closely to [the React docs on HOCs](https://reactjs.org/docs/higher-order-components.html) and offer direct TypeScript parallels.

## Example: Use HOCs For Cross-Cutting Concerns

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
    text: 'comment1',
    id: 1
  },
  {
    text: 'comment2',
    id: 2
  }
];
const blog = 'blogpost';

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
type TODO_ANY = any;

/** utility types we use */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Optionalize<T extends K, K> = Omit<T, keyof K>;

/** Rewritten Components from the React docs that just uses injected data prop */
function CommentList({ data }: WithSubscriptionProps) {
  return (
    <div>
      {data.map((comment: CommentType) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
interface BlogPostProps extends WithSubscriptionProps {
  id: number;
  // children: ReactNode;
}
function BlogPost({ data, id }: BlogPostProps) {
  return (
    <div>
      <TextBlock text={data} />;
    </div>
  );
}
```

</details>

Example HOC from React Docs translated to TypeScript

```tsx
// // ACTUAL HOC
interface WithSubscriptionProps {
  data: TODO_ANY;
}
/** This function takes a component... */
function withSubscription<
  T extends WithSubscriptionProps = WithSubscriptionProps
>(
  WrappedComponent: React.ComponentType<T>,
  selectData: (DataSource: DataType, props: TODO_ANY) => TODO_ANY
) {
  // ...and returns another component...
  return class extends React.Component<Optionalize<T, WithSubscriptionProps>> {
    state = {
      data: selectData(DataSource, this.props)
    };

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    };

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props as T} />;
    }
  };
}

/** HOC usage with Components */
export const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource: DataType) => DataSource.getComments()
);

export const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource: DataType, props: React.ComponentProps<typeof BlogPost>) =>
    DataSource.getBlogPost(props.id)
);
```
