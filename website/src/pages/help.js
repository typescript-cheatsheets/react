import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

const SupportLink = ({ title, content }) => (
  <div>
    <h2>{title}</h2>
    <div>{content}</div>
  </div>
);

export default function Help() {
  const { siteConfig } = useDocusaurusContext();

  const supportLinks = [
    {
      title: "Browse Docs",
      content: (
        <>
          Learn more using the{" "}
          <Link to={useBaseUrl(siteConfig.customFields.firstDoc)}>
            documentation on this site
          </Link>
          .
        </>
      ),
    },
    {
      title: "Join the community",
      content: "Ask questions about the documentation and project",
    },
    {
      title: "Stay up to date",
      content: "Find out what's new with this project",
    },
  ];

  return (
    <Layout title="Help" permalink="/help" description="Help">
      <div className="container margin-vert--xl">
        <div>
          <header>
            <h1>Need help?</h1>
          </header>
          <p>This project is maintained by a dedicated group of people.</p>
        </div>

        <div className="row">
          {supportLinks.map((supportLink, i) => (
            <div className="col col--4 margin-top--lg" key={i}>
              <SupportLink {...supportLink} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
