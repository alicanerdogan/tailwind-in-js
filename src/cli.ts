import * as path from "path";
import * as fs from "fs";
import { buildTailwind } from "./buildTailwind";
import { parseCSS } from "./code";

async function main() {
  const [, , configPath, outDirPath] = process.argv;

  const cssOutputPath = outDirPath;

  await buildTailwind({ configPath, outDir: cssOutputPath });

  const tailwindCss = path.join(cssOutputPath, "tailwind.css");

  await parseCSS(tailwindCss, outDirPath);

  fs.unlinkSync(tailwindCss);
}

main();
