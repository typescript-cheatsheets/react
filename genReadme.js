const { Octokit } = require("@octokit/rest");
const toc = require('markdown-toc');

const REPO_INFO = process.env.GITHUB_REPOSITORY.split('/')
const REPO_DETAILS = {
  owner: REPO_INFO[0],
  repo: REPO_INFO[1]
};

(async function main() {
  try {
    const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
    const setupMd = octokit.repos.getContents({
      ...REPO_DETAILS,
      path: 'docs/basic/setup.md'
    })
    setupMd.then(result => {
      const content = Buffer.from(result.data.content, 'base64').toString()
      const toc = toc(content).content
      console.log(toc)
      console.log(content)
    })
  } catch (err) {
    console.error(err);
  }
})();
