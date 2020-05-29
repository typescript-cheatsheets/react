/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

function Help(props) {
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
      <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <div>
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>This project is maintained by a dedicated group of people.</p>
        </div>

        <div className="row" style={{ marginTop: 60 }}>
          {supportLinks.map((supportLink, i) => (
            <div className="col col--4" key={i}>
              <SupportLink {...supportLink} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Help;
