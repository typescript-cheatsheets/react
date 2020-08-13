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
  let initialContent = readme.content;
  initialContent = await updateSectionWith(
    (name = "setup"),
    (path = "docs/basic/setup.md"),
    (to = initialContent),
    (from = readme),
    (withToc = true)
  );
  initialContent = await updateSectionWith(
    (name = "function-components"),
    (path = "docs/basic/getting-started/function-components.md"),
    (to = initialContent),
    (from = readme)
  );
  try {
    await octokit.repos.createOrUpdateFile({
      ...repo_details,
      content: Buffer.from(content).toString("base64"),
      path: "README.md",
      message: `Updated README on ${new Date().toISOString()}`,
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

async function updateSectionWith(name, path, to, from, withToc = false) {
  const indent = path.split("/").length - 1;
  const md = await readContentFromPath(path);
  const oldFences = getFenceForSection(from, name);
  const newFences = generateContentForSection(name, md, (tab = indent - 1));
  if (oldFences === newFences.content) {
    console.log(`No change detected, skipping commit for section "${name}".`);
    return to;
  }
  let updatedTocContents = to;
  if (withToc) {
    const oldTocFences = getFenceForSection(from, name, (isToc = true));
    const newTocFences = generateContentForSection(name, md, (isToc = true),(tab = indent - 1));
    if (oldFences === newFences.content && oldTocFences === newTocFences.content) {
      console.log(`No change detected, skipping commit for section "${name}".`);
      return to;
    }
    updatedTocContents = to.replace(oldTocFences.regex, newTocFences)
  }
  let newContents = updatedTocContents.replace(oldFences.regex, newFences);
  return newContents;
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

function generateContentForSection(
  sectionName,
  sectionContent,
  sectionKey = "title",
  isToc = false,
  tab = 0
) {
  const fence = getFence(sectionName, isToc);
  if (isToc) {
    let fenceContent = fence.start + "\n";
    let lines = sectionContent.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent += "\t".repeat(tab) + lines[i] + "\n";
    fenceContent += fence.end;
    return fenceContent;
  } else {
    let fenceContent = fence.start + "\n";
    fenceContent += "## " + sectionContent.frontmatter[sectionKey] + "\n\n";
    fenceContent += sectionContent.body + "\n";
    fenceContent += fence.end;
    return fenceContent;
  }
}

function getFenceForSection(readme, sectionName, isToc = false) {
  const fence = getFence(sectionName, isToc);
  const regex = new RegExp(`${fence.start}[\\s\\S]+${fence.end}`, "gm");
  return { regex: regex, content: regex.exec(readme.content) };
}

function getFence(sectionName, isToc = false) {
  const name = isToc ? sectionName + "-toc" : sectionName;
  const START_COMMENT = "<!--START-SECTION:" + name + "-->";
  const END_COMMENT = "<!--END-SECTION:" + name + "-->";
  return { start: START_COMMENT, end: END_COMMENT };
}
