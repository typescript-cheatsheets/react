import { themes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const setupDoc = "docs/basic/setup";

const config: Config = {
  favicon: "img/icon.png",
  title: "React TypeScript Cheatsheet", // Title for your website.
  tagline: "A cheatsheet for developers using React with TypeScript",
  url: "https://react-typescript-cheatsheet.netlify.app", // Your website URL
  baseUrl: "/",
  projectName: "react-typescript-cheatsheet",
  organizationName: "typescript-cheatsheets",

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        // Pages moved when the menu was restructured (#820). Keep old URLs
        // working so links out on the web don't break.
        redirects: [
          {
            from: "/docs/advanced/patterns_by_usecase",
            to: "/docs/basic/getting-started/patterns_by_usecase",
          },
          {
            from: "/docs/react-types/ComponentProps",
            to: "/docs/reference/ComponentProps",
          },
          {
            from: "/docs/react-types/CSSProperties",
            to: "/docs/reference/CSSProperties",
          },
          {
            from: "/docs/react-types/ReactNode",
            to: "/docs/reference/ReactNode",
          },
          {
            from: "/docs/react-types/Ref",
            to: "/docs/reference/Ref",
          },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
    },

    image:
      "https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png",

    prism: {
      defaultLanguage: "typescript",
      theme: themes.github,
      darkTheme: themes.dracula,
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
          label: "Introduction",
          position: "right",
        },
        {
          to: "docs/basic/getting-started/basic_type_example",
          label: "Learn",
          position: "right",
        },
        {
          to: "docs/reference/ComponentProps",
          label: "API Reference",
          position: "right",
        },
        {
          to: "https://discord.gg/wTGS5z9",
          label: "Discord",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      logo: {
        alt: "TypeScript Cheatsheets Logo",
        src: "img/icon.png",
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
              label: "Learn",
              to: "docs/basic/getting-started/basic_type_example",
            },
            {
              label: "API Reference",
              to: "docs/reference/ComponentProps",
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
              label: "Contributors",
              to: "contributors",
            },
            {
              label: "Contributing",
              to: "contributing",
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
                <img src="https://img.shields.io/github/stars/typescript-cheatsheets/react-typescript-cheatsheet.svg?style=social&amp;label=Star&amp;maxAge=2592000" alt="GitHub stars" data-canonical-src="https://img.shields.io/github/stars/typescript-cheatsheets/react-typescript-cheatsheet.svg?style=social&amp;label=Star&amp;maxAge=2592000" style="max-width:100%;">
                </a>`,
            },
            {
              html: `<a class="footer__link-item" href="https://discord.gg/wTGS5z9">
              <img src="https://img.shields.io/discord/508357248330760243.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" style="max-width:100%;" alt="Discord">
              </a>`,
            },
            {
              html: `<a class="footer__link-item" href="http://twitter.com/home?status=Awesome%20%40Reactjs%20%2B%20%40TypeScript%20cheatsheet%20by%20%40ferdaber%2C%20%40sebsilbermann%2C%20%40swyx%20%26%20others!%20https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact">
              <img src="https://img.shields.io/twitter/url?label=Help%20spread%20the%20word%21&style=social&url=https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact" style="max-width:100%;" alt="X">
              </a>`,
            },
          ],
        },
      ],
    },

    algolia: {
      apiKey: "9a22585d1841d2fa758da919cd08a764",
      indexName: "react-typescript-cheatsheet",
      appId: "J65EL4UPXZ",
    },
  } satisfies Preset.ThemeConfig,

  customFields: {
    firstDoc: setupDoc,
  },
};

export default config;
