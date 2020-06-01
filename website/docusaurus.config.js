// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "Docusaurus",
    image: "https://docusaurus.io/img/docusaurus.svg",
    infoLink: "https://docusaurus.io/",
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

  // Needed for the Github Star in footer
  scripts: [
    {
      src: "https://buttons.github.io/buttons.js",
      async: true,
      defer: true,
    },
  ],

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

    prism: {
      defaultLanguage: "typescript",
    },

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
              html:
                '<a class="footer__link-item github-button" href="https://github.com/typescript-cheatsheets/react-typescript-cheatsheet" data-color-scheme="no-preference: dark; light: light; dark: light;" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star typescript-cheatsheets/react-typescript-cheatsheet on GitHub">Star</a>',
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
