const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { usage } = require("yargs");

const readmePath = path.resolve(__dirname, "./README.md");

function main(argv) {
  console.log(argv);
}

yargs(hideBin(process.argv))
  .command({
    command: "$0",
    describe: "Generate the README.md from docs/ folder",
    handler: main,
    builder: (yargs) => {
      return yargs.option("check", {
        type: "boolean",
        description:
          "Exits with 1 if the current README.md is out-of-date and should be regenerated.",
      });
    },
  })
  .usage("node $0 [args]")
  .help()
  .strict()
  .parse();
