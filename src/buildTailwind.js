const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const tailwind = require("tailwindcss");

const configPath = path.join(".", "tailwind.config.js");

function buildDistFile(filename) {
  return new Promise((resolve, reject) => {
    console.log(`Processing ./${filename}.css...`);

    fs.readFile(`./node_modules/tailwindcss/${filename}.css`, (err, css) => {
      if (err) throw err;

      return postcss([tailwind(configPath), require("autoprefixer")])
        .process(css, {
          from: `./node_modules/tailwindcss/${filename}.css`,
          to: `./${filename}.css`,
          map: { inline: false }
        })
        .then(result => {
          fs.mkdirSync(`./out`);
          fs.writeFileSync(`./out/${filename}.css`, result.css);
          return result;
        })
        .then(resolve)
        .catch(error => {
          console.log(error);
          reject();
        });
    });
  });
}

console.info("Building Tailwind!");

Promise.all([buildDistFile("tailwind")]).then(() => {
  console.log("Finished Building Tailwind!");
});
