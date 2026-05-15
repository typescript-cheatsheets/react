import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import Layout from "@theme/Layout";

type Section = {
  title: string;
  description: string;
  to: string;
};

type Topic = {
  label: string;
  to: string;
};

const sections: Section[] = [
  {
    title: "Introduction",
    description:
      "Get started with React and TypeScript using Next.js, Remix, Gatsby, or Expo.",
    to: "/docs/basic/setup",
  },
  {
    title: "Learn",
    description:
      "Typing component props, hooks, class components, defaultProps, forms and events, context, refs, portals, error boundaries, concurrent rendering, and reusable patterns.",
    to: "/docs/basic/getting-started/basic_type_example",
  },
  {
    title: "API Reference",
    description:
      "Focused references for the @types/react types you'll reach for most: ComponentProps, CSSProperties, ReactNode, and Ref.",
    to: "/docs/reference/ComponentProps",
  },
];

const popularTopics: Topic[] = [
  { label: "Hooks", to: "/docs/basic/getting-started/hooks" },
  {
    label: "Function components",
    to: "/docs/basic/getting-started/function_components",
  },
  {
    label: "Forms and events",
    to: "/docs/basic/getting-started/forms_and_events",
  },
  {
    label: "forwardRef / Ref as a prop",
    to: "/docs/basic/getting-started/forward_and_create_ref",
  },
  { label: "Context", to: "/docs/basic/getting-started/context" },
  {
    label: "Useful patterns by use case",
    to: "/docs/basic/getting-started/patterns_by_usecase",
  },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="React TypeScript Cheatsheet"
      description="A cheatsheet for developers using React with TypeScript"
    >
      <header className="hero text--center">
        <div className="container padding-vert--xl">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>

      <main>
        <section className="container padding-vert--xl">
          <h2 className="text--center margin-bottom--lg">What's inside</h2>
          <div className="homeSectionGrid">
            {sections.map((section) => (
              <Link
                key={section.title}
                to={section.to}
                className="homeSectionCard"
              >
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="container padding-vert--xl">
          <h2 className="text--center margin-bottom--lg">Popular topics</h2>
          <div className="homeTopicsGrid">
            {popularTopics.map((topic) => (
              <Link key={topic.to} to={topic.to} className="homeTopicLink">
                {topic.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
