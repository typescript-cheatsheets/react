/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

// TODO this page is probably useless
export default function Users() {
  const { siteConfig } = useDocusaurusContext();

  const users = siteConfig.customFields.users;

  if ((users || []).length === 0) {
    return null;
  }

  //const editUrl = `${siteConfig.repoUrl}/edit/master/website/siteConfig.js`;
  const editUrl = `TODO`;

  const showcase = users.map((user) => (
    <a href={user.infoLink} key={user.infoLink}>
      <img
        src={user.image}
        alt={user.caption}
        title={user.caption}
        style={{
          maxHeight: 128,
          padding: 20,
          width: 128,
        }}
      />
    </a>
  ));

  return (
    <Layout title="Users" permalink="/users" description="Users">
      <div className="container">
        <div style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <div>
              <h1>Who is Using This?</h1>
              <p>This project is used by many folks</p>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "center",
              }}
            >
              {showcase}
            </div>
            <p>Are you using this project?</p>
            <a href={"todo"} className="button button--outline button--primary">
              Add your company
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
