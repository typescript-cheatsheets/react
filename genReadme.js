const { Octokit } = require("@octokit/rest");
const Toc = require("markdown-toc");
const Fm = require("front-matter");
const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
const repo_info = process.env.GITHUB_REPOSITORY.split("/");
const repo_details = {
  owner: repo_info[0],
  repo: repo_info[1],
};
let default_options = {
  withKey: "title",
  withToc: false,
  showHeading: true,
  headingLevel: 2,
  tabLevel: 1,
};
async function getReadme() {
  console.log("in getReadme()");
  const res = await octokit.repos.getReadme(repo_details);
  const encoded = res.data.content;
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  return {
    content: decoded,
    sha: res.data.sha,
  };
}
(async function main() {
  try {
    const readme = await getReadme();
    default_options["from"] = readme;
    let initialContent = readme.content;
    initialContent = await updateSectionWith({
      name: "setup",
      path: "docs/basic/setup.md",
      to: initialContent,
      withToc: true,
      headingLevel: 1,
      showHeading: false,
    });
    initialContent = await updateSectionWith({
      name: "function-components",
      path: "docs/basic/getting-started/function-components.md",
      to: initialContent,
      withToc: false,
      headingLevel: 2,
      showHeading: true,
    });
    console.log(initialContent);
  } catch (err) {
    console.error(
      "ERROR: ",
      err,
      "\n Protip: Please check if your credentials are up-to-date or the path to file exists."
    );
  }
})();
async function updateSectionWith(options) {
  console.log("in updateSectionWith()");
  const update_options = Object.assign(default_options, options);
  const md = await readContentFromPath(update_options.path);
  const oldFences = getFenceForSection(
    update_options.from,
    update_options.name
  );
  console.log("oldFences", oldFences.content);
  const newFences = generateContentForSection({
    name: update_options.name,
    content: md,
    withToc: false,
  });
  console.log("newFences", newFences);
  const oldTocFences = getFenceForSection(
    update_options.from,
    update_options.name,
    (isToc = true)
  );
  console.log("oldTocFences", oldTocFences.content);
  const newTocFences = generateContentForSection({
    name: update_options.name,
    content: md,
    withToc: true,
    tabLevel: update_options.tabLevel,
    headingLevel: update_options.headingLevel,
    showHeading: update_options.showHeading,
  });
  console.log("newTocFences", newTocFences);
  let updatedContents = update_options.to.replace(oldFences.regex, newFences);
  console.log("updatedContents", updatedContents);
  updatedContents = updatedContents.replace(oldTocFences.regex, newTocFences);
  console.log("updatedContentsWithToc", updatedContents);
  return updatedContents;
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
function generateContentForSection(options) {
  const sectionOptions = Object.assign(default_options, options);
  const fence = getFence(sectionOptions.name, sectionOptions.withToc);
  let fenceContent = fence.start + "\n";
  if (sectionOptions.withToc) {
    let lines = sectionOptions.content.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent += "\t".repeat(sectionOptions.tabLevel) + lines[i] + "\n";
  } else {
    fenceContent += sectionOptions.showHeading
      ? "#".repeat(sectionOptions.headingLevel) +
        " " +
        sectionOptions.content.frontmatter[sectionOptions.withKey] +
        "\n\n"
      : "";
    fenceContent += sectionOptions.content.body + "\n";
  }
  fenceContent += fence.end;
  return fenceContent;
}
function getFenceForSection(readme, sectionName, isToc = false) {
  try {
    const fence = getFence(sectionName, isToc);
    const regex = new RegExp(`(${fence.start}[\\s\\S]+${fence.end})`, "gm");
    return { regex: regex, content: regex.exec(readme.content) };
  } catch (err) {
    console.error(
      "ERROR: ",
      err,
      "\n Protip: Please ensure the comments exist and are separated by a newline."
    );
  }
}
function getFence(sectionName, isToc = false) {
  const name = isToc ? sectionName + "-toc" : sectionName;
  const START_COMMENT = "<!--START-SECTION:" + name + "-->";
  const END_COMMENT = "<!--END-SECTION:" + name + "-->";
  return { start: START_COMMENT, end: END_COMMENT };
}
