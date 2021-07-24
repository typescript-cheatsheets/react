---
id: operators
title: "Troubleshooting Handbook: Operators"
sidebar_label: Operators
---

- `typeof` and `instanceof`: type query used for refinement
- `keyof`: get keys of an object. `keyof T` is an operator to tell you what values of `k` can be used for `obj[k]`.
  - [Some misconceptions here](https://twitter.com/SeaRyanC/status/1418678670739218438?s=20).
- `O[K]`: property lookup
- `[K in O]`: mapped types
- `+` or `-` or `readonly` or `?`: addition and subtraction and readonly and optional modifiers
- `x ? Y : Z`: Conditional types for generic types, type aliases, function parameter types
- `!`: Nonnull assertion for nullable types
- `=`: Generic type parameter default for generic types
- `as`: type assertion
- `is`: type guard for function return types

Conditional Types are a difficult topic to get around so here are some extra resources:

- fully walked through explanation https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
- Bailing out and other advanced topics https://github.com/sw-yx/ts-spec/blob/master/conditional-types.md
- Basarat's video https://www.youtube.com/watch?v=SbVgPQDealg&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=2&t=0s
- [Generics, Conditional types and Mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ&feature=youtu.be)
