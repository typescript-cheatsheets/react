import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

// TODO useless user showcase page ?
export default function Users() {
  const { siteConfig } = useDocusaurusContext();
  const { users, addUserUrl } = siteConfig.customFields;

  return (
    <Layout title="Users" permalink="/users" description="Users">
      <div className="container">
        <div className="margin-vert--xl text--center">
          <div>
            <h1>Who is Using This?</h1>
            <p>This project is used by many folks</p>
          </div>
          <div className="row">
            {users.map((user) => (
              <a
                className="col-2"
                href={user.infoLink}
                key={user.infoLink}
                style={{ flexGrow: 1 }}
              >
                <img
                  className="padding--md"
                  src={user.image}
                  alt={user.caption}
                  title={user.caption}
                  style={{
                    maxHeight: 128,
                    width: 128,
                  }}
                />
              </a>
            ))}
          </div>
          <p>Are you using this project?</p>
          <a
            href={addUserUrl}
            className="button button--lg button--outline button--primary"
          >
            Add your company
          </a>
        </div>
      </div>
    </Layout>
  );
}
