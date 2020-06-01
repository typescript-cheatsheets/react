import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="React TypeScript Cheatsheets"
      permalink="/"
      description="React TypeScript Cheatsheets"
    >
      <div className="hero text--center">
        <div className="container ">
          <div className="padding-vert--md">
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
          </div>
          <div>
            <Link
              to={useBaseUrl(siteConfig.customFields.firstDoc)}
              className="button button--lg button--outline button--primary"
            >
              Getting started
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
