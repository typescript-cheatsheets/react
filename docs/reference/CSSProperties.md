---
title: CSSProperties
---

`CSSProperties` is the type for inline styles passed via the `style` prop. It extends [`csstype`](https://github.com/frenic/csstype)'s `Properties<string | number>`, so every standard CSS property is covered with autocompletion and value validation.

## Parameters

`CSSProperties` does not take any parameters.

## Usage

### Inline styles

```tsx
function Banner() {
  return (
    <div style={{ backgroundColor: "papayawhip", padding: 16 }}>Hello</div>
  );
}
```

### Reusable style objects

Pull style objects out to share between elements. Annotate with `CSSProperties` so TypeScript checks the values:

```tsx
import { CSSProperties } from "react";

const card: CSSProperties = {
  borderRadius: 8,
  padding: 16,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

function Card({ children }: { children: ReactNode }) {
  return <div style={card}>{children}</div>;
}
```

### Typing a `style` prop on your own component

If your component forwards a style object, type the prop as `CSSProperties` directly — that's exactly what HTML elements use:

```tsx
type BoxProps = {
  style?: CSSProperties;
  children?: ReactNode;
};

function Box({ style, children }: BoxProps) {
  return <div style={{ padding: 16, ...style }}>{children}</div>;
}
```

## Values: numbers vs strings

For length-like properties, **numbers are interpreted as pixels** — React appends `px` automatically. Strings are passed through verbatim.

```tsx
<div style={{ width: 100 }} />       // → width: 100px
<div style={{ width: "100%" }} />    // → width: 100%
<div style={{ width: "10rem" }} />   // → width: 10rem
```

A handful of properties (such as `lineHeight`, `opacity`, `zIndex`, `flexGrow`) are unitless — passing a number leaves it unitless.

## Vendor prefixes

Vendor-prefixed properties are written in PascalCase, not with the leading hyphen:

```tsx
const style: CSSProperties = {
  WebkitTransform: "rotate(45deg)",
  MozAppearance: "none",
};
```

## Custom properties (CSS variables)

`CSSProperties` deliberately has no index signature, so writing a CSS custom property triggers a TypeScript error:

```tsx
// ❌ Type '{ "--accent": string; }' is not assignable to type 'CSSProperties'.
<div style={{ "--accent": "tomato" }} />
```

There are three common workarounds.

### 1. Type assertion (quickest)

```tsx
<div style={{ "--accent": "tomato" } as CSSProperties} />
```

Fine for one-off use, but you lose type-checking on the rest of the object.

### 2. Intersection with an indexed type (recommended)

Keep type-checking for normal properties while allowing any `--*` key:

```tsx
type CSSPropertiesWithVars = CSSProperties & {
  [key: `--${string}`]: string | number;
};

const style: CSSPropertiesWithVars = {
  color: "white",
  "--accent": "tomato",
};

<div style={style} />;
```

### 3. Module augmentation (when you have a fixed set of variables)

If your design system has a known list of CSS variables, augment `CSSProperties` once and get autocomplete everywhere:

```tsx
// global.d.ts
import "react";

declare module "react" {
  interface CSSProperties {
    "--accent"?: string;
    "--spacing"?: string | number;
  }
}
```

After this, `style={{ "--accent": "tomato" }}` type-checks with no assertion.

## Typing individual CSS values with `csstype`

If you want a prop that accepts a single CSS value — e.g. a color or a display value — import the underlying [`csstype`](https://github.com/frenic/csstype) package and use the `Property` namespace:

```tsx
import type { Property } from "csstype";

type BadgeProps = {
  color?: Property.Color; // any valid CSS <color>
  display?: Property.Display;
};
```

`csstype` is already a transitive dependency of `@types/react`, so no extra install is needed — just import the types.

## CSS-in-JS libraries

Most CSS-in-JS libraries (Emotion, styled-components, Stitches, vanilla-extract, …) augment `CSSProperties` themselves to support library-specific features such as nested selectors, pseudo-classes as object keys, or theme tokens. If you see properties like `"&:hover"` accepted as keys, that's a library augmentation, not a feature of `@types/react`.
