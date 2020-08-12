const { Octokit } = require("@octokit/rest");
const REPO_DETAILS = {
  owner: process.env.GITHUB_REPOSITORY_OWNER,
  repo: process.env.GITHUB_REPOSITORY_OWNER,
};
const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
octokit.repos.getContents({
  ...REPO_DETAILS,
  path: 'docs/basic/setup.md'
}).then(result => {
    const content = Buffer.from(result.data.content, 'base64').toString()
    console.log(content)
  })
