const { Octokit } = require("@octokit/rest");
const Toc = require("markdown-toc");
const Fm = require("front-matter");

const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
const repo_info = process.env.GITHUB_REPOSITORY.split("/");
const repo_details = {
  owner: repo_info[0],
  repo: repo_info[1],
};

(async function main() {
  const readme = await getReadme();
  const name = "setup";
  const path = "docs/basic/setup.md";
  const readmePath = "README.md";
  const fenceSyntax = getFence(name, true);
  let oldTocFences = getFenceForSection(name, true).exec(readme.content);
  oldTocFences === null ? (fenceSyntax.start + '\n' + fenceSyntax.end) : oldTocFences
  console.log("oldTocFences",oldTocFences)
  const setupMd = await readContentFromPath(path);
  try {
    let indent = path.split("/").length - 1;
    let newTocFences = generateContentForSection(
      "setup",
      setupMd,
      true,
      indent - 1
    );
    console.log("newTocFences",newTocFences)
    if (newTocFences === oldTocFences) {
      console.log("NO CHANGE detected in the setupMd, skipping commit");
      return;
    }
    let newContents = readme.content.replace(oldTocFences, newTocFences);
    await octokit.repos.createOrUpdateFile({
      ...repo_details,
      content: Buffer.from(newContents).toString("base64"),
      path: readmePath,
      message: `Updated README with ${"setup"} on ${new Date().toISOString()}`,
      sha: readme.sha,
      branch: "master",
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
    path: relative_path,
  });
  const MdContent = Fm(Buffer.from(MdDoc.data.content, "base64").toString());
  const TableOfContents = Toc(MdContent.body).content;
  return {
    frontmatter: MdContent.attributes,
    body: MdContent.body,
    toc: TableOfContents,
  };
}

function getFence(sectionName, isToc = false) {
  const name = isToc ? sectionName + "-toc" : sectionName;
  const START_COMMENT = "<!--START_SECTION:" + name + "-->";
  const END_COMMENT = "<!--END_SECTION:" + name + "-->";
  return { start: START_COMMENT, end: END_COMMENT };
}

function getFenceForSection(sectionName, isToc = false) {
  const fence = getFence(sectionName, isToc);
  return new RegExp(`${fence.start}[\\s\\S]+${fence.end}`, "gm");
}

function generateContentForSection(
  sectionName,
  sectionContent,
  isToc = false,
  indent = 0
) {
  const fence = getFence(sectionName, isToc);
  if (isToc) {
    let fenceContent = fence.start + "\n";
    let lines = sectionContent.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent += "\t".repeat(indent) + lines[i] + "\n";
    fenceContent += fence.end;
    return fenceContent;
  } else {
    let fenceContent = fence.start + "\n";
    fenceContent += sectionContent.body + "\n";
    fenceContent += fence.end;
    return fenceContent;
  }
}
