const fs = require("fs");
const filesTopCopy = [
  {
    src: "../CONTRIBUTORS.md",
    dest: "src/pages/contributors.md",
  },
  {
    src: "../CONTRIBUTING.md",
    dest: "src/pages/contributing.md",
  },
];

function copyFile(src, dest) {
  fs.copyFile(src, dest, (err) => {
    if (err) {
      console.log("Error Found:", err);
    } else {
      console.log("Files copied");
    }
  });
}

filesTopCopy.forEach(({ src, dest }) => {
  copyFile(src, dest);
});
