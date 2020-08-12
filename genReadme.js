const { Octokit } = require("@octokit/rest");
const Toc = require('markdown-toc');

const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
const repo_info = process.env.GITHUB_REPOSITORY.split('/')
const repo_details = {
  owner: repo_info[0],
  repo: repo_info[1]
};

(async function main() {
  try {
    const setupMd = await readContentFromPath('docs/basic/setup.md');
    console.log(JSON.stringify(setupMd, null, 2))
  } catch (err) {
    console.error(err);
  }
})();

async function readContentFromPath(relative_path) {
    const MdDoc = await octokit.repos.getContents({
      ...repo_details,
      path: relative_path
    })
    const MdContent = Buffer.from(MdDoc.data.content, 'base64').toString()
    const TableOfContents = Toc(MdContent).content
    return {md : MdContent, toc: TableOfContents}
}
