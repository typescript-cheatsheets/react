const { readFileSync } = require("fs");

const spellcheck = require("danger-plugin-spellcheck").default;

const edited = [...danger.git.modified_files, ...danger.git.created_files];
edited.forEach((file) => {
  const content = readFileSync(file, "utf8");
  if (content.includes("Typescript")) {
    const fileURL = danger.github.utils.fileLinks([file])[0];
    warn(
      `Found "Typescript" in ${fileURL} - you want to [use "TypeScript"](https://www.staging-typescript.org/branding)`
    );
  }
});

/*
// Spellcheck would be nice but this is a little too eager
// TODO: add back spellcheck? https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/commit/843200836b168332d31e3c991a883d49dbcaf3f8
*/
