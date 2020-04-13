---
id: props_one_other_not_both
title: Props:  Must Pass Both
---

```tsx
type OneOrAnother<T1, T2> =
  | (T1 & { [K in keyof T2]?: undefined })
  | (T2 & { [K in keyof T1]?: undefined });

type Props = OneOrAnother<{ a: string; b: string }, {}>;

const a: Props = { a: "a" }; // error
const b: Props = { b: "b" }; // error
const ab: Props = { a: "a", b: "b" }; // ok
```

Thanks [diegohaz](https://twitter.com/kentcdodds/status/1085655423611367426)
