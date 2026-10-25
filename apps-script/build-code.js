const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const sourceDir = path.join(root, "paste-small-files");
const files = fs.readdirSync(sourceDir).filter((name) => /^\d+_.+\.gs$/.test(name)).sort();
const output = files.map((name) => fs.readFileSync(path.join(sourceDir, name), "utf8").trim()).join("\n\n") + "\n";
const runtimeFiles = files.filter((name) => name !== "00_Config.gs");
const runtimeOutput = runtimeFiles.map((name) => fs.readFileSync(path.join(sourceDir, name), "utf8").trim()).join("\n\n") + "\n";

fs.writeFileSync(path.join(root, "Code.gs"), output, "utf8");
fs.writeFileSync(path.join(root, "Code_Runtime.gs"), runtimeOutput, "utf8");
console.log(`Built Code.gs from ${files.length} source files and Code_Runtime.gs from ${runtimeFiles.length} runtime files.`);
