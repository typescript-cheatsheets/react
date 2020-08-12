const { Octokit } = require("@octokit/rest");
const Toc = require('markdown-toc');
const Fm = require('front-matter');

const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
const repo_info = process.env.GITHUB_REPOSITORY.split('/')
const repo_details = {
  owner: repo_info[0],
  repo: repo_info[1]
};

(async function main() {
  const readme = await getReadme();
  let oldTocFences = getFenceForSection("setup", true).exec(readme.content)
  oldTocFences = oldTocFences && oldTocFences[0] // could be null
  const setupMd = await readContentFromPath('docs/basic/setup.md');
  try {
    let newTocFences = generateContentForSection("setup", setupMd, true);
    if (newTocFences === oldTocFences) {
      console.log('NO CHANGE detected in the setupMd, skipping commit')
      return 
    }
    let newContents = readme.content.replace(oldTocFences, newTocFences);
    await octokit.repos.createOrUpdateFile({
      ...repo_details,
      content: Buffer.from(newContents).toString("base64"),
      path: "README.md",
      message: `Updated README with ${"setup"} on ${new Date().toISOString()}`,
      sha: readme.sha,
      branch: "master"
    });
  } catch (err) {
    console.error(err);
  }
})();

async function getReadme() {
  const res = await octokit.repos.getReadme(repo_details);
  const encoded = res.data.content;
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  return {
    content: decoded,
    sha: res.data.sha,
  };
}

async function readContentFromPath(relative_path) {
    const MdDoc = await octokit.repos.getContents({
      ...repo_details,
      path: relative_path
    })
    const MdContent = Fm(Buffer.from(MdDoc.data.content, 'base64').toString());
    const TableOfContents = Toc(MdContent.body).content
    return {
      frontmatter: MdContent.attributes, 
      body : MdContent.body, 
      toc: TableOfContents
    }
}

function getFenceForSection(sectionName, isToc=false) {
  const name = isToc ? sectionName + '-toc' : sectionName;
  const START_COMMENT = `<!--START_SECTION:${name}-->`;
  const END_COMMENT = `<!--END_SECTION:${name}-->`;
  return new RegExp(`${START_COMMENT}[\\s\\S]+${END_COMMENT}`);
}

function generateContentForSection(sectionName, sectionContent, isToc=false) {
  return isToc ? 
          `<!--START_SECTION:${sectionName}-->${sectionContent.toc}<!--END_SECTION:${sectionName}-->`
       : `<!--START_SECTION:${sectionName}-->
           ${sectionContent.body}  
          <!--END_SECTION:${sectionName}-->`
}
