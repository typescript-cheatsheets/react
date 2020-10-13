const fs = require("fs");
const filesTopCopy = [
  {
    src: "../CONTRIBUTORS.md",
    dest: "../docs/contributors.md",
    hideHeader: true,
  },
  {
    src: "../CONTRIBUTING.md",
    dest: "../docs/contributing.md",
    hideHeader: true,
  },
];

const generatingPageOptions = `---
hide_title: true
---

`;

function writeNewFile(src, dest) {
  const fileContent = fs.readFileSync(src).toString();
  const data = new Uint8Array(Buffer.from(generatingPageOptions + fileContent));

  fs.writeFile(dest, data, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      console.log("Files added");
    }
  });
}

function copyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      console.log("Files copied");
    }
  });
}

filesTopCopy.forEach(({ src, dest, hideHeader }) => {
  if (hideHeader) {
    writeNewFile(src, dest);
  } else {
    copyFile(src, dest);
  }
});
