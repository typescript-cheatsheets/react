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

const setupDoc = "docs/basic/setup";

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
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
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
    defaultDarkMode: true,

    image:
      "https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png",

    // Equivalent to `docsSideNavCollapsible`.
    // sidebarCollapsible: false,

    navbar: {
      title: "React TypeScript Cheatsheet",
      logo: {
        alt: "Logo",
        src: "img/icon.png",
      },
      links: [
        {
          to: setupDoc,
          label: "Docs",
          position: "right",
        },
        {
          to: "help",
          label: "Help",
          position: "right",
        },
        // {to: 'blog', label: 'Blog', position: 'right'},
      ],
    },

    footer: {
      style: "dark",
      logo: {
        alt: "TypeScript Cheatsheets Logo",
        src: "img/icon.png",
        maxWidth: 128,
        style: { maxWidth: 128, maxHeight: 128 },
      },
      copyright: `Copyright © ${new Date().getFullYear()} TypeScript Cheatsheets`,
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: setupDoc,
            },
            {
              label: "High Order Component (HOC)",
              to: "docs/hoc/intro",
            },
            {
              label: "Advanced Guides",
              to: "docs/advanced/intro",
            },
            {
              label: "Migrating",
              to: "docs/migration/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/typescript",
            },
            {
              label: "User Showcase",
              to: "users",
            },
            {
              label: "Help",
              to: "help",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href:
                "https://github.com/typescript-cheatsheets/react-typescript-cheatsheet",
            },
            {
              label: "Star",
              class: "footer__link-item github-button",
              href:
                "https://github.com/typescript-cheatsheets/react-typescript-cheatsheet",
              "data-icon": "octicon-star",
              "aria-label":
                "typescript-cheatsheets/react-typescript-cheatsheet",
            },
          ],
        },
      ],
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
    firstDoc: setupDoc,

    // TODO useless user showcase page ?
    users,
    addUserUrl:
      "https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/website/docusaurus.config.js",
  },
};
