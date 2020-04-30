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

const siteConfig = {
  title: "React TypeScript Cheatsheets", // Title for your website.
  tagline:
    "Cheatsheets for experienced React developers getting started with TypeScript",
  /* TODO: Change this to official branch before gets merged */
  url: "https://raulfdm.github.io", // Your website URL
  baseUrl: "/",
  /* TODO: Change this to official branch before gets merged */
  projectName: "react-typescript-cheatsheet",
  organizationName: "raulfdm",

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "basic/setup", label: "Docs" },
    { page: "help", label: "Help" },
    // {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  /* TODO: Make it smaller */
  headerIcon: "img/icon.png",
  footerIcon: "img/icon.png",
  favicon: "img/icon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#222222",
    secondaryColor: "#171717",
    urlColor: "#138cd3",
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Your Name or Your Company Name`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default",
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage:
    "https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png",
  twitterImage:
    "https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png",

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  repoUrl:
    "https://github.com/typescript-cheatsheets/react-typescript-cheatsheet",

  // https://docusaurus.io/docs/en/site-config#algolia-object
  algolia: {
    apiKey: "e1c87cdc9c52f8ccf84ceb7f9e18bcd3",
    indexName: "react-typescript-cheatsheet",
    // appId:
  },
};

module.exports = siteConfig;
