/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "User1",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: "/img/undraw_open_source.svg",
    infoLink: "https://www.facebook.com",
    pinned: true,
  },
];

module.exports = {
  favicon: "img/icon.png",
  title: "React TypeScript Cheatsheets", // Title for your website.
  tagline:
    "Cheatsheets for experienced React developers getting started with TypeScript",
  url: "https://react-typescript-cheatsheet.netlify.app/", // Your website URL
  baseUrl: "/",
  projectName: "react-typescript-cheatsheet",
  organizationName: "typescript-cheatsheets",

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // Docs folder path relative to website dir.
          path: "../docs",
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve("./sidebars.json"),
        },
        // ...
      },
    ],
  ],

  themeConfig: {
    image:
      "https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png",

    // Equivalent to `docsSideNavCollapsible`.
    // sidebarCollapsible: false,

    navbar: {
      title: "React Typescript Cheatsheet",
      logo: {
        alt: "Logo",
        src: "img/icon.png", // TODO: Make it smaller
      },
      links: [
        { doc: "docs/basic/setup", label: "Docs" },
        { page: "help", label: "Help" },
        // {blog: true, label: 'Blog'},
      ],
    },

    footer: {
      logo: {
        alt: "Facebook Open Source Logo",
        src: "img/icon.png", // TODO: Make it smaller
      },
      copyright: `Copyright © ${new Date().getFullYear()} Typescript Cheatsheets`,
    },
    algolia: {
      apiKey: "e1c87cdc9c52f8ccf84ceb7f9e18bcd3",
      indexName: "react-typescript-cheatsheet",
      // appId: "",
      algoliaOptions: {
        //... },
      },
    },
  },

  customFields: {
    users, // TODO useful ???
  },
};
