const fs = require("fs/promises");
const path = require("path");
const Fm = require("front-matter");
const Toc = require("markdown-toc");
const prettier = require("prettier");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { usage } = require("yargs");

const repositoryRootPath = __dirname;
const readmePath = path.resolve(repositoryRootPath, "./README.md");
const defaultOptions = {
  withKey: "title",
  withToc: false,
  showHeading: true,
  headingLevel: 2,
  tabLevel: 1,
  prefix: "",
  suffix: "",
};

async function readContentFromPath(relativePath) {
  let MdDoc = await fs.readFile(path.join(repositoryRootPath, relativePath), {
    encoding: "utf8",
  });
  let MdContent = Fm(MdDoc.toString());
  let TableOfContents = Toc(MdContent.body).content;
  return {
    frontmatter: MdContent.attributes,
    body: MdContent.body,
    toc: TableOfContents,
  };
}

async function updateSectionWith(options) {
  const {
    from,
    headingLevel,
    name,
    path,
    prefix,
    showHeading,
    suffix,
    tabLevel,
    to,
    withKey,
    withToc,
  } = { ...defaultOptions, ...options };
  let md = await readContentFromPath(path);
  let oldFences = getFenceForSection(from, name);
  let fenceOptions = {
    name,
    content: md,
    tabLevel,
    headingLevel,
    showHeading,
    withKey,
    prefix,
    suffix,
  };
  let newFences = generateContentForSection({
    ...fenceOptions,
    withToc: false,
  });
  let oldTocFences = getFenceForSection(from, name, true);
  let newTocFences = generateContentForSection({
    ...fenceOptions,
    withToc: true,
  });
  let updatedContents = to.replace(oldFences.regex, newFences);
  updatedContents = updatedContents.replace(oldTocFences.regex, newTocFences);
  if (withToc)
    console.log(
      `✅ 🗜️ Rewrote Table of Contents for '${md.frontmatter.title}'`
    );
  console.log(`✅ 📝 Rewrote Section for '${md.frontmatter.title}'`);
  return updatedContents;
}

function generateContentForSection(options) {
  const {
    content,
    headingLevel,
    name,
    prefix,
    showHeading,
    suffix,
    tabLevel,
    withKey,
    withToc,
  } = {
    ...defaultOptions,
    ...options,
  };
  let fence = getFence(name, withToc);
  let fenceContent = fence.start + "\n";
  if (withToc) {
    let lines = content.toc.split("\n");
    for (let i = 0, len = lines.length; i < len; i += 1)
      fenceContent +=
        "  ".repeat(tabLevel) + lines[i] + (i !== len - 1 ? "\n" : "");
  } else {
    fenceContent += showHeading
      ? `${"#".repeat(headingLevel)} ` +
        prefix +
        content.frontmatter[withKey] +
        suffix +
        "\n\n"
      : "";
    fenceContent += content.body + "\n";
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

async function main(argv) {
  let currentReadme = await fs.readFile(readmePath, { encoding: "utf-8" });

  let pendingReadme = currentReadme;
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "setup",
    path: "docs/basic/setup.md",
    withToc: true,
    headingLevel: 1,
    prefix: "Section 1: ",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "basic-type-examples",
    path: "docs/basic/getting-started/basic-type-examples.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "function-components",
    path: "docs/basic/getting-started/function-components.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "hooks",
    path: "docs/basic/getting-started/hooks.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "class-components",
    path: "docs/basic/getting-started/class-components.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "default-props",
    path: "docs/basic/getting-started/default-props.md",
    showHeading: false,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "forms-and-events",
    path: "docs/basic/getting-started/forms-and-events.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "context",
    path: "docs/basic/getting-started/context.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "forward-create-ref",
    path: "docs/basic/getting-started/forward-create-ref.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "portals",
    path: "docs/basic/getting-started/portals.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "error-boundaries",
    path: "docs/basic/getting-started/error-boundaries.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "concurrent",
    path: "docs/basic/getting-started/concurrent.md",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "types",
    path: "docs/basic/troubleshooting/types.md",
    withToc: true,
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "operators",
    path: "docs/basic/troubleshooting/operators.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "utilities",
    path: "docs/basic/troubleshooting/utilities.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "ts-config",
    path: "docs/basic/troubleshooting/ts-config.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "official-typings-bugs",
    path: "docs/basic/troubleshooting/official-typings-bugs.md",
    headingLevel: 1,
    withKey: "sidebar_label",
    prefix: "Troubleshooting Handbook: ",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "non-ts-files",
    path: "docs/basic/troubleshooting/non-ts-files.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "non-ts-files",
    path: "docs/basic/troubleshooting/non-ts-files.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "useful-hooks",
    path: "docs/basic/useful-hooks.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "editor-integration",
    path: "docs/basic/editor-integration.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "linting",
    path: "docs/basic/linting.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "resources",
    path: "docs/basic/recommended/resources.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "talks",
    path: "docs/basic/recommended/talks.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "codebases",
    path: "docs/basic/recommended/codebases.md",
    headingLevel: 1,
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "learn-ts",
    path: "docs/basic/troubleshooting/learn-ts.md",
    headingLevel: 1,
    withKey: "sidebar_label",
  });
  pendingReadme = await updateSectionWith({
    from: currentReadme,
    to: pendingReadme,
    name: "examples",
    path: "docs/basic/examples.md",
    headingLevel: 1,
  });

  const prettierConfig = await prettier.resolveConfig(readmePath);
  pendingReadme = prettier.format(pendingReadme, {
    ...prettierConfig,
    filepath: path.basename(readmePath),
  });

  await fs.writeFile(readmePath, pendingReadme);
}

yargs(hideBin(process.argv))
  .command({
    command: "$0",
    describe: "Generate the README.md from docs/ folder",
    handler: main,
  })
  .usage("node $0 [args]")
  .help()
  .strict()
  .parse();
