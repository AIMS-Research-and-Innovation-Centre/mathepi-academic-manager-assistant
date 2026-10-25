const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const sourceDir = path.join(root, "paste-small-files");
const files = fs.readdirSync(sourceDir).filter((name) => /^\d+_.+\.gs$/.test(name)).sort();
const output = files.map((name) => fs.readFileSync(path.join(sourceDir, name), "utf8").trim()).join("\n\n") + "\n";

fs.writeFileSync(path.join(root, "Code.gs"), output, "utf8");
console.log(`Built Code.gs from ${files.length} source files.`);
