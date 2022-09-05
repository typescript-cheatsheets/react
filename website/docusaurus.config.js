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
const contributorsDoc = "docs/contributors";
const contributingDoc = "docs/contributing";

module.exports = {
  favicon: "img/icon.png",
  title: "React TypeScript Cheatsheets", // Title for your website.
  tagline:
    "Cheatsheets for experienced React developers getting started with TypeScript",
  url: "https://react-typescript-cheatsheet.netlify.app/", // Your website URL
  baseUrl: "/",
  projectName: "react-typescript-cheatsheet",
  organizationName: "typescript-cheatsheets",

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
          editUrl:
            "https://github.com/typescript-cheatsheets/react/tree/main/docs",
        },
        // ...
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },

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
      items: [
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
        {
          to: "https://discord.gg/wTGS5z9",
          label: "Discord",
          position: "right",
        },
        {
          to: contributorsDoc,
          label: "Contributors",
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
        // maxWidth: 128,
        // style: { maxWidth: 128, maxHeight: 128 },
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
              to: "docs/hoc",
            },
            {
              label: "Advanced Guides",
              to: "docs/advanced",
            },
            {
              label: "Migrating",
              to: "docs/migration",
            },
            {
              label: "Contributing",
              to: contributingDoc,
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
            {
              label: "Contributors",
              to: contributorsDoc,
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/typescript-cheatsheets/react",
            },
            {
              html: `<a class="footer__link-item" href="https://github.com/typescript-cheatsheets/react">
                <img src="https://camo.githubusercontent.com/f00e074779455222f68fde1096fbbd91bae555c2/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f747970657363726970742d63686561747368656574732f72656163742d747970657363726970742d636865617473686565742e7376673f7374796c653d736f6369616c266c6162656c3d53746172266d61784167653d32353932303030" alt="GitHub stars" data-canonical-src="https://img.shields.io/github/stars/typescript-cheatsheets/react-typescript-cheatsheet.svg?style=social&amp;label=Star&amp;maxAge=2592000" style="max-width:100%;">
                </a>`,
            },
            {
              // label: "Discord",
              html: `<a class="footer__link-item" href="https://discord.gg/wTGS5z9">
              <img src="https://img.shields.io/discord/508357248330760243.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" style="max-width:100%;">
              </a>`,
            },
            {
              // label: "Spread the word",
              html: `<a class="footer__link-item" href="http://twitter.com/home?status=Awesome%20%40Reactjs%20%2B%20%40TypeScript%20cheatsheet%20by%20%40ferdaber%2C%20%40sebsilbermann%2C%20%40swyx%20%26%20others!%20https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact">
              <img src="https://img.shields.io/twitter/url?label=Help%20spread%20the%20word%21&style=social&url=https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact" style="max-width:100%;">
              </a>`,
            },
          ],
        },
      ],
    },

    algolia: {
      apiKey: "e1c87cdc9c52f8ccf84ceb7f9e18bcd3",
      indexName: "react-typescript-cheatsheet",
      appId: "J65EL4UPXZ",
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
      "https://github.com/typescript-cheatsheets/react/blob/main/website/docusaurus.config.js",
  },
};
