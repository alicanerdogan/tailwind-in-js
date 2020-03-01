import * as css from "css";
import * as fs from "fs";
import * as util from "util";
import { generateCode } from "./generateCode";

const readFile = util.promisify(fs.readFile);

type CSSRule =
  | css.Rule
  | css.Comment
  | css.Charset
  | css.CustomMedia
  | css.Document
  | css.FontFace
  | css.Host
  | css.Import
  | css.KeyFrames
  | css.Media
  | css.Namespace
  | css.Page
  | css.Supports;

export interface CSSType {
  selector: string;
  rules: {
    mediaQuery?: string;
    value: string;
  }[];
}

function isCSSRule(rule: CSSRule): rule is css.Rule {
  return rule.type === "rule";
}
function isMediaRule(rule: CSSRule): rule is css.Media {
  return rule.type === "media";
}

function convertDeclarationIntoString(cssDeclaration: css.Declaration) {
  return `${cssDeclaration.property}: ${cssDeclaration.value};`;
}

function convertDeclarationsIntoString(cssDeclarations: css.Declaration[]) {
  return cssDeclarations
    .filter(cssDeclaration => cssDeclaration.type === "declaration")
    .map(convertDeclarationIntoString)
    .join("\n");
}

function assertUnprocessedDeclarations(
  selector: string,
  cssDeclarations: css.Declaration[]
) {
  const unprocessedDeclarations = cssDeclarations.filter(
    cssDeclaration => cssDeclaration.type !== "declaration"
  );
  if (unprocessedDeclarations.length > 0) {
    console.warn(
      `${selector}: unprocessed declaration count is ${unprocessedDeclarations.length}`
    );
  }
}

function getCSSRuleAsString(
  selector: string,
  cssDeclarations: css.Declaration[]
) {
  assertUnprocessedDeclarations(selector, cssDeclarations);
  return convertDeclarationsIntoString(cssDeclarations);
}

function generateCSSType(
  selector: string,
  cssDeclarations: css.Declaration[],
  mediaQuery?: string
): CSSType {
  return {
    selector,
    rules: [
      {
        mediaQuery,
        value: getCSSRuleAsString(selector, cssDeclarations)
      }
    ]
  };
}

function generateGlobalCSSTypes(
  existingMap: Map<string, CSSType>,
  ruleMap: Map<string, css.Declaration[]>,
  mediaQuery?: string
): Map<string, CSSType> {
  const selectorDeclarationsPair = Array.from(ruleMap.entries());
  selectorDeclarationsPair
    .filter(([selector]) => !selector.startsWith("."))
    .forEach(([selector, declarations]) => {
      const cssType = generateCSSType(selector, declarations, mediaQuery);
      const existingCssType = existingMap.get(cssType.selector);
      if (existingCssType) {
        existingCssType.rules.push(...cssType.rules);
      } else {
        existingMap.set(cssType.selector, cssType);
      }
    });
  return existingMap;
}

function generateCSSTypes(
  existingMap: Map<string, CSSType>,
  ruleMap: Map<string, css.Declaration[]>,
  mediaQuery?: string
): Map<string, CSSType> {
  const selectorDeclarationsPair = Array.from(ruleMap.entries());
  selectorDeclarationsPair
    .filter(([selector]) => selector.startsWith("."))
    .forEach(([selector, declarations]) => {
      const cssType = generateCSSType(selector, declarations, mediaQuery);
      const existingCssType = existingMap.get(cssType.selector);
      if (existingCssType) {
        existingCssType.rules.push(...cssType.rules);
      } else {
        existingMap.set(cssType.selector, cssType);
      }
    });
  return existingMap;
}

function generateSelectorMap(rules: css.Rule[]) {
  const selectorMap = new Map<string, css.Declaration[]>();
  rules.forEach(rule => {
    const selectors: string[] = rule.selectors || [];
    selectors.forEach(selector => {
      if (["-ms-input"].some(vendorPrefix => selector.includes(vendorPrefix))) {
        return;
      }
      const list = selectorMap.get(selector) || [];
      list.push(...(rule.declarations || []));
      selectorMap.set(selector, list);
    });
  });
  return selectorMap;
}

export async function parseCSS(
  tailwindCss = "./out/tailwind.css",
  outDirPath?: string
) {
  const cssFile = await readFile(tailwindCss);
  const stylesheet = css.parse(cssFile.toString());
  if (!stylesheet.stylesheet) {
    return;
  }

  const map = new Map<string, CSSType>();
  const globalTypesMap = new Map<string, CSSType>();
  const allRulesExceptComments = stylesheet.stylesheet.rules.filter(isCSSRule);

  const selectorMap = generateSelectorMap(allRulesExceptComments);
  generateCSSTypes(map, selectorMap);
  generateGlobalCSSTypes(globalTypesMap, selectorMap);

  const allMediaRules = stylesheet.stylesheet.rules.filter(isMediaRule);
  allMediaRules.forEach(mediaRules => {
    const selectorMap = generateSelectorMap(
      (mediaRules.rules || []).filter(isCSSRule)
    );
    generateCSSTypes(map, selectorMap, mediaRules.media);
    generateGlobalCSSTypes(globalTypesMap, selectorMap, mediaRules.media);
  });

  await generateCode(
    Array.from(map.values()),
    Array.from(globalTypesMap.values()),
    outDirPath
  );
}
