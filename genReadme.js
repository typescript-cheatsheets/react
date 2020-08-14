const { Octokit } = require("@octokit/rest");
const Toc = require("markdown-toc");
const Fm = require("front-matter");
const octokit = new Octokit({ auth: `token ${process.env.ENV_GITHUB_TOKEN}` });
const repo_info = process.env.GITHUB_REPOSITORY.split("/");
const repo_details = {
  owner: repo_info[0],
  repo: repo_info[1],
};
const default_options = {
  withKey: "title",
  withToc: false,
  showHeading: true,
  headingLevel: 2,
  tabLevel: 1,
};
console.log("before start", JSON.stringify(default_options, null, 2));
async function getReadme() {
  let res = await octokit.repos.getReadme(repo_details);
  let encoded = res.data.content;
  let decoded = Buffer.from(encoded, "base64").toString("utf8");
  return {
    content: decoded,
    sha: res.data.sha,
  };
}
(async function main() {
  try {
    let readme = await getReadme();
    default_options["from"] = readme;
    console.log(
      "added <from> key to default options",
      JSON.stringify(default_options, null, 2)
    );
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
    });
    initialContent = await updateSectionWith({
      name: "hooks",
      path: "docs/basic/getting-started/hooks.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "class-components",
      path: "docs/basic/getting-started/class-components.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "default-props",
      path: "docs/basic/getting-started/default-props.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "type-or-interface",
      path: "docs/basic/getting-started/type-or-interface.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "basic-type-examples",
      path: "docs/basic/getting-started/basic-type-examples.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "react-prop-type-examples",
      path: "docs/basic/getting-started/react-prop-type-examples.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "forms-and-events",
      path: "docs/basic/getting-started/forms-and-events.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "context",
      path: "docs/basic/getting-started/context.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "forward-create-ref",
      path: "docs/basic/getting-started/forward-create-ref.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "portals",
      path: "docs/basic/getting-started/portals.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "context",
      path: "docs/basic/getting-started/error-boundaries.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "concurrent",
      path: "docs/basic/getting-started/concurrent.md",
      to: initialContent,
    });
    await octokit.repos.createOrUpdateFile({
      ...repo_details,
      content: Buffer.from(initialContent).toString("base64"),
      path: "README.md",
      message: `Updated README on ${new Date().toISOString()}`,
      sha: readme.sha,
      branch: "master",
    });
  } catch (err) {
    console.error(
      `🚨 You've encountered a ${err.name} ➜ ${err.message}` +
        "\n" +
        `💡 ProTip ➜ Please ensure your credentials are up-to-date or the path to your file exists.`
    );
  }
})();
async function updateSectionWith(options) {
  console.log("UPDATE SECTION WITH:", options.name.toUpperCase());
  console.log(
    "in updateSectionWith() with options",
    JSON.stringify(options, null, 2)
  );
  console.log(
    "in updateSectionWith() with default_options",
    JSON.stringify(default_options, null, 2)
  );
  let update_options = Object.assign({}, { ...default_options }, options);
  console.log(
    "in updateSectionWith() with update_options",
    JSON.stringify(update_options, null, 2)
  );
  let md = await readContentFromPath(update_options.path);
  let oldFences = getFenceForSection(update_options.from, update_options.name);
  let newFences = generateContentForSection({
    name: update_options.name,
    content: md,
    withToc: false,
    tabLevel: update_options.tabLevel,
    headingLevel: update_options.headingLevel,
    showHeading: update_options.showHeading,
  });
  console.log("newFences", newFences);
  let oldTocFences = getFenceForSection(
    update_options.from,
    update_options.name,
    (isToc = true)
  );
  let newTocFences = generateContentForSection({
    name: update_options.name,
    content: md,
    withToc: true,
    tabLevel: update_options.tabLevel,
    headingLevel: update_options.headingLevel,
    showHeading: update_options.showHeading,
  });
  console.log("newTocFences", newTocFences);
  let updatedContents = update_options.to.replace(oldFences.regex, newFences);
  updatedContents = updatedContents.replace(oldTocFences.regex, newTocFences);
  console.log("updatedContents", updatedContents);
  return updatedContents;
}
async function readContentFromPath(relative_path) {
  let MdDoc = await octokit.repos.getContents({
    ...repo_details,
    path: relative_path,
  });
  let MdContent = Fm(Buffer.from(MdDoc.data.content, "base64").toString());
  let TableOfContents = Toc(MdContent.body).content;
  return {
    frontmatter: MdContent.attributes,
    body: MdContent.body,
    toc: TableOfContents,
  };
}
function generateContentForSection(options) {
  console.log("GENERATE CONTENT FOR SECTION:", options.name.toUpperCase());
  console.log(
    "in generateContentForSection() with options",
    JSON.stringify(options, null, 2)
  );
  console.log(
    "in generateContentForSection() with default_options",
    JSON.stringify(default_options, null, 2)
  );
  let sectionOptions = Object.assign({}, { ...default_options }, options);
  console.log(
    "in generateContentForSection() with sectionOptions",
    JSON.stringify(sectionOptions, null, 2)
  );
  let fence = getFence(sectionOptions.name, sectionOptions.withToc);
  let fenceContent = fence.start + "\n";
  if (sectionOptions.withToc) {
    let lines = sectionOptions.content.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent +=
        "\t".repeat(sectionOptions.tabLevel) +
        lines[i] +
        (i !== len - 1 ? "\n" : "");
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
    let fence = getFence(sectionName, isToc);
    let regex = new RegExp(`(${fence.start}[\\s\\S]+${fence.end})`, "gm");
    return { regex: regex, content: regex.exec(readme.content) };
  } catch (err) {
    console.error(
      `🚨 You've encountered a ${err.name} ➜ ${err.message}` +
        "\n" +
        `💡 ProTip ➜ Please ensure the comments exist and are separated by a newline.`
    );
  }
}
function getFence(sectionName, isToc = false) {
  let name = isToc ? sectionName + "-toc" : sectionName;
  let START_COMMENT = "<!--START-SECTION:" + name + "-->";
  let END_COMMENT = "<!--END-SECTION:" + name + "-->";
  return { start: START_COMMENT, end: END_COMMENT };
}
