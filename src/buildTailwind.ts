import * as fs from "fs";
import * as path from "path";
const postcss = require("postcss");
//@ts-ignore
const tailwind = require("tailwindcss");

function buildDistFile(
  filename: string,
  options: { outDir: string; configPath: string }
) {
  return new Promise((resolve, reject) => {
    console.log(`Processing ./${filename}.css...`);

    fs.readFile(`./node_modules/tailwindcss/${filename}.css`, (err, css) => {
      if (err) throw err;

      return postcss([tailwind(options.configPath), require("autoprefixer")])
        .process(css, {
          from: `./node_modules/tailwindcss/${filename}.css`,
          to: `./${filename}.css`,
          map: { inline: false }
        })
        .then((result: any) => {
          try {
            fs.mkdirSync(options.outDir, { recursive: true });
          } catch (error) {}
          const outFile = path.join(options.outDir, `${filename}.css`);
          fs.writeFileSync(outFile, result.css);
          return result;
        })
        .then(resolve)
        .catch((error: any) => {
          console.log(error);
          reject();
        });
    });
  });
}

export async function buildTailwind(options?: {
  outDir: string;
  configPath: string;
}) {
  console.info("Building Tailwind!");
  const configPath = path.join(".", "tailwind.config.js");

  await buildDistFile("tailwind", options || { configPath, outDir: "./out" });

  console.log("Finished Building Tailwind!");
}
