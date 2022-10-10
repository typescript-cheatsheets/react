---
id: resources
title: Other React + TypeScript resources
sidebar_label: Other resources
---

- me! <https://twitter.com/swyx>
- https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-react-typescript-nodejs-and-mongodb/
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [10 Bad TypeScript Habits](https://startup-cto.net/10-bad-typescript-habits-to-break-this-year/):
  1. not using `"strict": true`
  2. using `||` for default values when we have `??`
  3. Using `any` instead of `unknown` for API responses
  4. using `as` assertion instead of Type Guards (`function isFoo(obj: unknown): obj is Foo {}`)
  5. `as any` in tests
  6. Marking optional properties instead of modeling which combinations exist by extending interfaces
  7. One letter generics
  8. Non-boolean `if (nonboolean)` checks
  9. bangbang checks `if (!!nonboolean)`
  10. `!= null` to check for `null` and `undefined`
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbook.io/typescript/tsx/react) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Palmer Group's TypeScript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [Sindre Sorhus' TypeScript Style Guide](https://github.com/sindresorhus/typescript-definition-style-guide)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together. Note: this doesn't seem to be frequently updated anymore.
- [Steve Kinney's React and TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/react-typescript/)
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To TypeScript Section
- [Mike North's Production TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/production-typescript/)
- [TSX Guide](https://jenil.github.io/chota/) by [gojutin](https://github.com/gojutin/www.tsx.guide)
- TypeScript conversion:
  - [Lyft's React-To-TypeScript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to TypeScript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React TypeScript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [Matt Pocock's Beginner's Typescript Tutorial](https://github.com/total-typescript/beginners-typescript-tutorial)
- [You?](https://github.com/typescript-cheatsheets/react/issues/new).
