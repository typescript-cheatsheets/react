# Let's Contribute Together! 🚀

We appreciate your interest in contributing to this project. Here are some core principles and a simplified project structure to make your contribution process more efficient and effective:

## 📋 Core Principles

1. **We're All About Cheatsheets**: Our main goal is to provide concise and easy-to-use cheatsheets. All code examples should be simple, easily searchable, and ready for copy-and-paste.

2. **Collapsible Explanations**: Keep explanations short and sweet, limited to 1-2 sentences. For more in-depth explanations, use `details` tags to provide additional context.

3. **React + TypeScript Only**: We focus on React and TypeScript. React's ecosystem is vast, so we won't cover everything. If you think there's a need, consider maintaining separate lists for specialized topics, like React + Apollo GraphQL. We also don't aim to convince people to use TypeScript; we're here to assist those who have already chosen to use it.

4. **Add TypeScript Playground Links**: For code examples longer than four lines, include a link to the TypeScript Playground. Use the default TypeScript Playground options for the best experience.

Your contributions will help countless developers, including your future self! 🙌

## 📁 Project Structure

- **Content in `/docs`**: All the content resides here.
  - The content in `/docs/basic` is compiled into `README.md` to ensure that it's easy to read on GitHub.
- **`/website` Folder**: This part consumes the content in `/docs`. It's a Docusaurus 2 site and includes Algolia search. A big thanks to both the Docusaurus and Algolia teams for their support!

The website is deployed on Netlify, under swyx's personal account.

To run the docsite locally, follow these steps:

```bash
yarn # Install dependencies
## Ensure dependencies are also installed in /website
cd website && yarn start
```

Here's an example of the expected output when the development server starts successfully:

```
yarn run v1.22.4
warning package.json: No license field
$ docusaurus start
Starting the development server...

✔ Client
  Compiled successfully in 9.61s

ℹ ｢wds｣: Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Users/wanshawn/Work/react-typescript-cheatsheet/website
ℹ ｢wds｣: 404s will fallback to /index.html

✔ Client
  Compiled successfully in 116.41ms
```

Let's work together to enhance this resource and make it even more valuable to the developer community! 🌟👩‍💻👨‍💻
