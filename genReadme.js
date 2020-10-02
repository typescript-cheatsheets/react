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
  prefix: "",
  suffix: "",
};
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
    let initialContent = readme.content;
    initialContent = await updateSectionWith({
      name: "setup",
      path: "docs/basic/setup.md",
      to: initialContent,
      withToc: true,
      headingLevel: 1,
      prefix: "Section 1: ",
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
      showHeading: false,
    });
    initialContent = await updateSectionWith({
      name: "type-or-interface",
      path: "docs/basic/getting-started/type-or-inteface.md",
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
      name: "get-derived-state-from-props",
      path: "docs/basic/getting-started/get-derived-state-from-props.md",
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
      name: "error-boundaries",
      path: "docs/basic/getting-started/error-boundaries.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "concurrent",
      path: "docs/basic/getting-started/concurrent.md",
      to: initialContent,
    });
    initialContent = await updateSectionWith({
      name: "types",
      path: "docs/basic/troubleshooting/types.md",
      to: initialContent,
      withToc: true,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "operators",
      path: "docs/basic/troubleshooting/operators.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "utilities",
      path: "docs/basic/troubleshooting/utilities.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "ts-config",
      path: "docs/basic/troubleshooting/ts-config.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "official-typings-bugs",
      path: "docs/basic/troubleshooting/official-typings-bugs.md",
      to: initialContent,
      headingLevel: 1,
      withKey: "sidebar_label",
      prefix: "Troubleshooting Handbook: ",
    });
    initialContent = await updateSectionWith({
      name: "non-ts-files",
      path: "docs/basic/troubleshooting/non-ts-files.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "editor-integration",
      path: "docs/basic/editor-integration.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "linting",
      path: "docs/basic/linting.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "resources",
      path: "docs/basic/recommended/resources.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "talks",
      path: "docs/basic/recommended/talks.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "codebases",
      path: "docs/basic/recommended/codebases.md",
      to: initialContent,
      headingLevel: 1,
    });
    initialContent = await updateSectionWith({
      name: "learn-ts",
      path: "docs/basic/troubleshooting/learn-ts.md",
      to: initialContent,
      headingLevel: 1,
      withKey: "sidebar_label",
    });
    initialContent = await updateSectionWith({
      name: "examples",
      path: "docs/basic/examples.md",
      to: initialContent,
      headingLevel: 1,
    });
    await octokit.repos.createOrUpdateFile({
      ...repo_details,
      content: Buffer.from(initialContent).toString("base64"),
      path: "README.md",
      message: `Updated README on ${new Date().toISOString()}`,
      sha: readme.sha,
      branch: "main",
    });
  } catch (err) {
    console.error(
      `🚨 You've encountered a ${err.name} ➜ ${err.message} \n` +
        `💡 ProTip ➜ Please ensure your credentials are up-to-date or the path to your file exists.`
    );
    console.error({ repo_details });
    console.error(err);
  }
})();
async function updateSectionWith(options) {
  let update_options = Object.assign({}, { ...default_options }, options);
  let md = await readContentFromPath(update_options.path);
  let oldFences = getFenceForSection(update_options.from, update_options.name);
  let fence_options = {
    name: update_options.name,
    content: md,
    tabLevel: update_options.tabLevel,
    headingLevel: update_options.headingLevel,
    showHeading: update_options.showHeading,
    withKey: update_options.withKey,
    prefix: update_options.prefix,
    suffix: update_options.suffix,
  };
  let newFences = generateContentForSection({
    ...fence_options,
    withToc: false,
  });
  let oldTocFences = getFenceForSection(
    update_options.from,
    update_options.name,
    (isToc = true)
  );
  let newTocFences = generateContentForSection({
    ...fence_options,
    withToc: true,
  });
  let updatedContents = update_options.to.replace(oldFences.regex, newFences);
  updatedContents = updatedContents.replace(oldTocFences.regex, newTocFences);
  if (update_options.withToc)
    console.log(
      `✅ 🗜️ Rewrote Table of Contents for '${md.frontmatter.title}'`
    );
  console.log(`✅ 📝 Rewrote Section for '${md.frontmatter.title}'`);
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
  let section_options = Object.assign({}, { ...default_options }, options);
  let fence = getFence(section_options.name, section_options.withToc);
  let fenceContent = fence.start + "\n";
  if (section_options.withToc) {
    let lines = section_options.content.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent +=
        "  ".repeat(section_options.tabLevel) +
        lines[i] +
        (i !== len - 1 ? "\n" : "");
  } else {
    fenceContent += section_options.showHeading
      ? `${"#".repeat(section_options.headingLevel)} ` +
        section_options.prefix +
        section_options.content.frontmatter[section_options.withKey] +
        section_options.suffix +
        "\n\n"
      : "";
    fenceContent += section_options.content.body + "\n";
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
      `🚨 You've encountered a ${err.name} ➜ ${err.message} \n` +
        `💡 ProTip ➜ Please ensure the comments exist and are separated by a newline.`
    );

    console.error({ readme, sectionName });
    console.error(err);
  }
}
function getFence(sectionName, isToc = false) {
  let name = isToc ? sectionName + "-toc" : sectionName;
  let START_COMMENT = "<!--START-SECTION:" + name + "-->";
  let END_COMMENT = "<!--END-SECTION:" + name + "-->";
  return { start: START_COMMENT, end: END_COMMENT };
}
