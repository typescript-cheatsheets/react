const fs = require("fs");

const src = process.argv[2];
const dest = process.argv[3];
const hideHeader = process.argv[4];

const generatingPageOptions = `---
hide_title: true
---

`;

function writeNewFile() {
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

function copyFile() {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      console.log("Files copied");
    }
  });
}

if (hideHeader) {
  writeNewFile();
} else {
  copyFile();
}
