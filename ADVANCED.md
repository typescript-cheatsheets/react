# Advanced Cheatsheet

**This Advanced Cheatsheet** helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.
  - It also has miscellaneous tips and tricks for pro users. 
  - Advice for contributing to DefinitelyTyped
  - The goal is to take *full advantage* of TypeScript.

---

### Advanced Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Reusable Components/Type Utilities](#section-1-reusable-componentstype-utilities)
  * [Higher Order Components](#higher-order-components-hocs)
  * [Render Props](#render-props)
  * [Types for Conditional Rendering](#types-for-conditional-rendering)
  * [Props: One or the Other but not Both](#props-one-or-the-other-but-not-both)
  * [Props: Must Pass Both](#props-one-or-the-other-but-not-both)
  * [Omit attribute from a type](#omit-attribute-from-a-type)
  * [Type Zoo](#type-zoo)
  * [Extracting Prop Types of a Component](#extracting-prop-types-of-a-component)
  * [Third Party Libraries](#third-party-libraries)
- [Section 2: Useful Patterns by TypeScript Version](#section-2-useful-patterns-by-typescript-version)
  * [TypeScript 2.9](#typescript-29)
  * [TypeScript 3.0](#typescript-30)
  * [TypeScript 3.1](#typescript-31)
  * [TypeScript 3.2](#typescript-32)
- [Section 3: Misc. Concerns](#section-3-misc-concerns)
  * [Writing TypeScript Libraries instead of Apps](#writing-typescript-libraries-instead-of-apps)
  * [Commenting Components](#commenting-components)
  * [Design System Development](#design-system-development)
  * [Migrating from Flow](#migrating-from-flow)
  * [Prettier + TSLint](#prettier--tslint)
  * [ESLint + TSLint](#eslint--tslint)
  * [Working with Non-TypeScript Libraries (writing your own index.d.ts)](#working-with-non-typescript-libraries-writing-your-own-indexdts)
</details>

# Section 1: Advanced Guides

## Higher Order Components (HoCs)

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
  children: ReactNode;
}

class MyButton extends Component<Props> {
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

The following utilities will be needed.

```ts
/**
 * Generic type utility to subtract keys from one interface from the other.
 *
 * @example
 * interface One { one: string }
 * interface Three { one: string, two: string }
 *
 * type Two = Omit<Three, keyof One>;
 *
 * // The type of Two will be
 * interface Two { two: string }
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Remove from T the keys that are in common with K
 */
type Optionalize<T extends K, K> = Omit<T, keyof K>;
```

The actual HoC.

```ts
export function withTheme<T extends WithThemeProps = WithThemeProps>(WrappedComponent: React.ComponentType<T>) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<Optionalize<T, WithThemeProps>> {
    public static displayName = `withPages(${displayName})`;

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = getThemePropsFromSomeWhere();

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...this.props as T} />;
    }
  }
}
```

Note that the `{...this.props as T}` assertion is needed because of a current bug in TS 3.2 https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046

Here is a more advanced example of a dynamic higher order component that bases some of its parameters on the props of the component being passed in:
```ts
// inject static values to a component so that they're always provided
export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
 ) {
   return function Injected(props: Omit<TProps, TInjectedKeys>) {
     return <Component {...props as TProps} {...injector} />
   }
 }
```

## Render Props

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `React.ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
export interface Props {
  label?: React.ReactNode;
  children: React.ReactNode;
}
export const Card = (props: Props) => {
  return (
    <div>
      {props.label && <div>{props.label}</div>}
      {props.children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
export interface Props {
  children: (foo: string) => React.ReactNode;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).


## Types for Conditional Rendering

Components can render different things based on props that are passed in, and this can be confusing to model in terms of argument and return types. See the Type checks, guards, and assertion strategies discussed above as a first resort.

You can also do fairly advanced logic within your types ([they are Turing complete!](https://github.com/Microsoft/TypeScript/issues/14833)). Read the [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) section of the docs for ideas on how to use `Pick`, `ReadOnly`, `Partial`, and `Record`. Here is an example solution, see the further discussion for other solutions. *thanks to [@jpavon](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12#issuecomment-394440577)*


```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface LinkProps {}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

const Link = <T extends {}>(
    props: LinkProps & T extends RouterLinkProps ? RouterLinkProps : AnchorProps
) => {
    if ((props as RouterLinkProps).to) {
        return <NavLink {...props as RouterLinkProps} />
    } else {
        return <a {...props as AnchorProps} />
    }
}

<Link<RouterLinkProps> to="/">My link</Link> // ok
<Link<AnchorProps> href="/">My link</Link> // ok
<Link<RouterLinkProps> to="/" href="/">My link</Link> // error
```

If you want to conditionaly render a component, sometimes is better to use [React's composition model](https://reactjs.org/docs/composition-vs-inheritance.html) to have simpler components and better to understand typings:

```tsx
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>
type RouterLinkProps = Omit<NavLinkProps, 'href'>

interface Button {
  as: React.ComponentClass | 'a'
}

const Button: React.FunctionComponent<Button> = (props) => {
  const {as: Component, children, ...rest} = props
  return (
    <Component className="button" {...rest}>{children}</Component>
  )
}

const AnchorButton: React.FunctionComponent<AnchorProps> = (props) => (
  <Button as="a" {...props} />
)

const LinkButton: React.FunctionComponent<RouterLinkProps> = (props) => (
  <Button as={NavLink} {...props} />
)

<LinkButton to="/login">Login</LinkButton>
<AnchorButton href="/login">Login</AnchorButton>
<AnchorButton href="/login" to="/test">Login</AnchorButton> // Error: Property 'to' does not exist on type...
```

## Props: One or the Other but not Both

Use the `in` keyword, function overloading, and union types to make components that take either one or another sets of props, but not both:

```tsx
type Props1 = { foo: string }
type Props2 = { bar: string }

function MyComponent(props: Props1): JSX.Element
function MyComponent(props: Props2): JSX.Element
function MyComponent(props: Props1 | Props2) {
  if ('foo' in props) {
    // props.bar // error
    return <div>{props.foo}</div>
  } else {
    // props.foo // error
    return <div>{props.bar}</div>
  }
}
const UsageComponent: React.FC = () => (
  <div>
    <MyComponent foo="foo" />
    <MyComponent bar="bar" />
    {/* <MyComponent foo="foo" bar="bar"/> // invalid */}
  </div>
)
```


## Props: Must Pass Both

```tsx
type OneOrAnother<T1, T2> = 
  | (T1 & { [K in keyof T2]?: undefined })
  | (T2 & { [K in keyof T1]?: undefined })

type Props = OneOrAnother<{ a: string; b: string }, {}>

const a: Props = { a: 'a' } // error
const b: Props = { b: 'b' } // error
const ab: Props = { a: 'a', b: 'b' } // ok
```

Thanks [diegohaz](https://twitter.com/kentcdodds/status/1085655423611367426)

## Omit attribute from a type

Sometimes when intersecting types, we want to define our own version of an attribute. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` attribute. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode // this will conflict with the InputElement's label
}

// here is the magic - omitting an attribute
type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
// end of magic

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, 'label'>
) => {
  const { label } = props;
  return (
    <div className='Checkbox'>
      <label className='Checkbox-label'>
        <input
          type="checkbox"
          {...props}
        />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

## Type Zoo

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Extracting Prop Types of a Component

*(Contributed by [@ferdaber](https://github.com/sw-yx/react-typescript-cheatsheet/issues/63))*

There are a lot of places where you want to reuse some slices of props because of prop drilling, 
so you can either export the props type as part of the module or extract them (either way works).

The advantage of extracting the prop types is that you won't need to export everything, and a refactor of the source of truth component will propagate to all consuming components.


```ts
// helper type for all known valid JSX element constructors (class and function based)
type ElementConstructor<P> =
  | ((props: P) => React.ReactElement<any> | null)
  | (new (props: P) => React.Component<P, any, any>);

// gets the internal props of a component
// used like Props<typeof MyComponent>
// or Props<'button'> for intrinsic HTML attributes
type Props<C> = C extends ElementConstructor<infer P>
  ? P
  : C extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[C] : {};

// goes one step further and resolves with propTypes and defaultProps properties
type ApparentProps<C> = C extends ElementConstructor<infer P> ? JSX.LibraryManagedAttributes<C, P> : Props<C>
```

You can also use them to strongly type custom event handlers if they're not written at the call sites themselves 
(i.e. inlined with the JSX attribute):

```tsx
// my-inner-component.tsx
export function MyInnerComponent(props: { onSomeEvent(event: ComplexEventObj, moreArgs: ComplexArgs): SomeWeirdReturnType }) { /* ... */ }

// my-consuming-component.tsx
export function MyConsumingComponent() {
  // event and moreArgs are contextually typed along with the return value
  const theHandler: Props<typeof MyInnerComponent>['onSomeEvent'] = (event, moreArgs) => {}
  return <MyInnerComponent onSomeEvent={theHandler} />
}
```

## Third Party Libraries

Sometimes DefinitelyTyped can get it wrong, or isn't quite addressing your use case. You can declare your own file with the same interface name. Typescript will merge interfaces with the same name.


# Section 2: Useful Patterns by TypeScript Version

TypeScript Versions often introduce new ways to do things; this section helps current users of React + TypeScript upgrade TypeScript versions and explore patterns commonly used by TypeScript + React apps and libraries. This may have duplications with other sections; if you spot any discrepancies, [file an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new)!

*TypeScript version guides before 2.9 are unwritten, please feel free to send a PR!*

## TypeScript 2.9


[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/05/31/announcing-typescript-2-9/)]

1. Type arguments for tagged template strings (e.g. `styled-components`):

```tsx
export interface InputFormProps {
    foo: string; // this is understood inside the template string below
}

export const InputForm = styledInput<InputFormProps> `
    color:
        ${({themeName}) => themeName === 'dark' ? 'black' : 'white'};
    border-color: ${({foo}) => foo ? 'red' : 'black'};
`;
```

2. **JSX Generics**

https://github.com/Microsoft/TypeScript/pull/22415

Helps with typing/using generic components:

```tsx
// instead of 
<Formik render={(props: FormikProps<Values>) => ....}/>

// usage
<Formik<Values> render={props => ...}/>
<MyComponent<number> data={12} />
```

More info: https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md#react-jsx-tip-generic-components

## TypeScript 3.0

[[Release Notes](https://github.com/Microsoft/TypeScript/releases/tag/v3.0.1) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/)]

1. Typed rest parameters for writing arguments of variable length:

```ts
// `rest` accepts any number of strings - even none!
function foo(...rest: string[]) {
    // ...
}

foo("hello"); // works
foo("hello", "world"); // also works
```

2. Support for `propTypes` and `static defaultProps` in JSX using `LibraryManagedAttributes`:

```ts
export interface Props {
    name: string
}

export class Greet extends React.Component<Props> {
    render() {
        const { name } = this.props;
        return <div>Hello ${name.toUpperCase()}!</div>;
    }
    static defaultProps = { name: "world"}
}

// Type-checks! No type assertions needed!
let el = <Greet />
```

3. new `Unknown` type

For typing API's to force type checks - not specifically React related, however very handy for dealing with API responses:

```tsx
interface IComment {
    date: Date;
    message: string;
}

interface IDataService1 {
    getData(): any;
}

let service1: IDataService1;
const response = service1.getData();
response.a.b.c.d; // RUNTIME ERROR

// ----- compare with -------

interface IDataService2 {
    getData(): unknown; // ooo
}

let service2: IDataService2;
const response2 = service2.getData();
// response2.a.b.c.d; // COMPILE TIME ERROR if you do this

if (typeof response === 'string') {
    console.log(response.toUpperCase()); // `response` now has type 'string'
}
```

You can also assert a type, or use a **type guard** against an `unknown` type. This is better than resorting to `any`.

## TypeScript 3.1


[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)]

1. Properties declarations on functions

Attaching properties to functions like this "just works" now:

```tsx
export const FooComponent => ({ name }) => (
    <div>Hello! I am {name}</div>
);

FooComponent.defaultProps = {
    name: "swyx",
};
```

## TypeScript 3.2

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/11/29/announcing-typescript-3-2/)]

nothing specifically React related.

## TypeScript Roadmap

https://github.com/Microsoft/TypeScript/wiki/Roadmap


# Section 3: Misc. Concerns

Sometimes writing React isn't just about React. While we don't focus on other libraries like Redux (see below for more on that), here are some tips on other common concerns when making apps with React + TypeScript.

## Writing TypeScript Libraries instead of Apps

`propTypes` may seem unnecessary with TypeScript, especially when building React + TypeScript **apps**, but they are still relevant when writing **libraries** which may be used by developers working in Javascript.

```ts
interface IMyComponentProps {
  autoHeight: boolean;
  secondProp: number;
}

export class MyComponent extends React.Component<IMyComponentProps, {}> {
  static propTypes = {
    autoHeight: PropTypes.bool,
    secondProp: PropTypes.number.isRequired,
  };
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).


## Commenting Components

Typescript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for Typescript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/documentation/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
import React from 'react';

interface MyProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = 'foobar' }: MyProps) {
  return <div>Hello world {label}</div>;
}
```

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept Typescript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Migrating From Flow

You should check out large projects that are migrating from flow to pick up concerns and tips:

- [Jest](https://github.com/facebook/jest/pull/7554)
- [Expo](https://github.com/expo/expo/issues/2164)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Storybook](https://github.com/storybooks/storybook/issues/5030)
- [VueJS](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)

Useful libraries: 

- https://github.com/bcherny/flow-to-typescript
- <https://github.com/piotrwitek/utility-types>. 

If you have specific advice in this area, please file a PR!

[Something to add? File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).

## Prettier + TSLint

*Contributed by: [@azdanov](https://github.com/sw-yx/react-typescript-cheatsheet/pull/14)*

To use prettier with TSLint you will need [`tslint-config-prettier`](https://github.com/alexjoverm/tslint-config-prettier) which disables all the conflicting rules and optionally [`tslint-plugin-prettier`](https://github.com/ikatyang/tslint-plugin-prettier) which will highlight differences as TSLint issues.

Example configuration:

<table>
    <tr>
        <th>
            <strong>tslint.json</strong>
        </th>
        <th>
            <strong>.prettierrc</strong>
        </th>
    </tr>
    <tr>
        <td>
            <pre>
{
  "rulesDirectory": ["tslint-plugin-prettier"],
  "extends": [
    "tslint:recommended",
    "tslint-config-prettier"
  ],
  "linterOptions": {
    "exclude": ["node_modules/**/*.ts"]
  },
  "rules": {
    "prettier": true
  }
}
            </pre>
        </td>
        <td>
            <pre>
{
  "printWidth": 89,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
            </pre>
        </td>
    </tr>
</table>

An example github repository with a project showing how to integrate [prettier + tslint + create-react-app-ts](https://github.com/azdanov/tslint-eslint-crats).

## ESLint + TSLint

> ⚠️This is an evolving topic. `typescript-eslint-parser` is no longer maintained and [work has recently begun on `typescript-eslint` in the ESLint community](https://eslint.org/blog/2019/01/future-typescript-eslint) to bring ESLint up to full parity and interop with TSLint. The rest of this section is potentially outdated.

Why use ESLint with/over TSLint? ESLint ecosystem is rich, with lots of different plugins and config files, whereas TSLint tend to lag behind in some areas.

To remedy this nuisance there is an [`typescript-eslint-parser`](https://github.com/eslint/typescript-eslint-parser) which tries to bridge the differences between javascript and typescript. It still has some rough corners, but can provide consistent assistance with certain plugins.

<table>
 <tr>
  <td>
   Usage
  </td>
  <td>
   .eslintrc
  </td>
 </tr>
 <tr>
  <td>
  <pre>
// Install:

npm i -D typescript-eslint-parser

// And in your ESLint configuration file:

"parser": "typescript-eslint-parser"
  </pre>
  </td>
  <td>
  <pre>
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["prettier", "jest", "unicorn"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "typescript-eslint-parser",
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
  </pre>
  </td>
 </tr>
</table>

An example github repository with a project showing how to integrate [eslint + tslint + create-react-app-ts](https://github.com/azdanov/tslint-eslint-crats).

## Working with Non-TypeScript Libraries (writing your own index.d.ts)

*Not written yet.*

Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/sw-yx/react-typescript-cheatsheet/issues/8).

<details>

<summary>Further Discussion</summary>

We have more discussion and examples [in our issue here](https://github.com/sw-yx/react-typescript-cheatsheet/issues/12).

</details>

# My question isn't answered here!

- [File an issue](https://github.com/sw-yx/react-typescript-cheatsheet/issues/new).



