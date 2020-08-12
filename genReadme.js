const { Octokit } = require("@octokit/rest");
const REPO_DETAILS = {
  owner: process.env.GITHUB_REPOSITORY_OWNER,
  repo: process.env.GITHUB_REPOSITORY_OWNER,
};
console.log("token",process.env.ENV_GITHUB_TOKEN);
(async function main() {
try {
  const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
  const setupMd = await octokit.repos.getContents({
    ...REPO_DETAILS,
    path: 'docs/basic/setup.md'
  })
  setupMd.then(result => {
    const content = Buffer.from(result.data.content, 'base64').toString()
    console.log(content)
  })
} catch (err) {
  console.error(err);
}
})();
