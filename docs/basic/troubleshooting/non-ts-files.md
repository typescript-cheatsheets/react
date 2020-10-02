---
id: non_ts_files
title: "Troubleshooting Handbook: Globals, Images and other non-TS files"
sidebar_label: Globals, Images and other non-TS files
---

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

If, say, you are using a third party JS script that attaches on to the `window` global, you can extend `Window`:

```ts
declare global {
  interface Window {
    MyVendorThing: MyVendorType;
  }
}
```

Likewise if you wish to "import" an image or other non TS/TSX file:

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";

// importing in a tsx file
import * as logo from "./logo.png";
```

Note that `tsc` cannot bundle these files for you, you will have to use Webpack or Parcel.

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)
