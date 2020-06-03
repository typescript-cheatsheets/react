---
id: non_ts_files
title: "Troubleshooting Handbook: Images and other non-TS/TSX files"
sidebar_label: Images and other non-TS/TSX files
---

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";

// importing in a tsx file
import * as logo from "./logo.png";
```

Note that `tsc` cannot bundle these files for you, you will have to use Webpack or Parcel.

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)
