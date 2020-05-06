import { CSSType } from "./index";
import * as fs from "fs";
import * as util from "util";
import * as path from "path";

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

interface Selector {
  prefix: string[];
  pseudo?: string;
  name: string;
}

function parseSelector(selector: string): Selector {
  if (!selector.startsWith(".")) {
    throw new Error("Invalid class selector: " + selector);
  }
  selector = selector.substring(1);
  selector = selector.replace(new RegExp("\\\\:", "g"), " ");
  const [rawSelector, ...prefix] = selector.split(" ").reverse();
  const [name, pseudo] = rawSelector.replace(":", " ").split(" ");
  return {
    prefix: prefix.reverse(),
    name,
    pseudo,
  };
}

function getFunctionName(selector: Selector) {
  const tokens = [...selector.prefix, selector.name];
  const functionName = tokens
    .map((token) =>
      token
        .replace(new RegExp("-", "g"), "_")
        .replace(new RegExp("\\\\/", "g"), "_")
    )
    .join("_")
    .replace("_>_:not(template)_~_", "");
  const RESERVED_KEYWORDS = new Set(["static"]);
  if (RESERVED_KEYWORDS.has(functionName)) {
    return functionName + "_";
  }
  return functionName;
}

function getType(functionName: string) {
  return functionName.toUpperCase();
}

function wrapWithMediaQuery(
  mediaQuery: string | undefined,
  ruleAsString: string
) {
  if (!mediaQuery) {
    return ruleAsString;
  }
  return `@media ${mediaQuery} {\n${ruleAsString}\n}`;
}
function wrapWithPseudoSelector(
  pseudoSelector: string | undefined,
  ruleAsString: string
) {
  if (!pseudoSelector) {
    return ruleAsString;
  }
  return `&:${pseudoSelector} {\n${ruleAsString}\n}`;
}

interface ParsedCSSType {
  returnType: string;
  functionName: string;
  code: string;
}

function generateGlobalStyle(globalTypes: CSSType[]): string {
  const globalStyles = globalTypes
    .map((type) => {
      return `${type.selector} {\n${type.rules
        .map((r) => wrapWithMediaQuery(r.mediaQuery, r.value))
        .join("\n")}}`;
    })
    .join("\n");

  return `export function getGlobalStyles() {\nreturn \`${globalStyles}\`;\n}\n`;
}

const HELPER_FUNCTIONS = `
type ExtendedStyled<T> = {
  [P in keyof T]: T[P] extends (
    template: TemplateStringsArray,
    ...args: any
  ) => any
    ? (...classes: TWClasses[]) => ReturnType<T[P]>
    : T[P];
};

export function extendStyled<T>(styled: T) {
  const cachedProperties: any = {};
  const extendedStyled: any = new Proxy(styled, {
    get: (styled: any, prop: any) => {
      if (!Object.prototype.hasOwnProperty.call(styled, prop)) {
        return styled[prop];
      }
      if (cachedProperties[prop]) {
        return cachedProperties[prop];
      }
      const wrappedProp = (...classes: TWClasses[]) =>
        styled[prop]\`
          \${tw(classes)}
        \`;
      cachedProperties[prop] = wrappedProp;
      return wrappedProp;
    }
  });
  return extendedStyled as ExtendedStyled<T>;
}

export function extendCss<
  T extends (template: TemplateStringsArray, ...args: any) => ReturnType<T>
>(css: T) {
  return (...classes: TWClasses[]) =>
    css\`
      \${tw(classes)}
    \`;
}
`;

export async function generateCode(
  types: CSSType[],
  globalTypes: CSSType[],
  outDir: string = "./out"
) {
  const parsedCSSTypes = types.map((type) => {
    const selector = parseSelector(type.selector);
    const functionName = getFunctionName(selector);
    const returnType = getType(functionName);

    const rulesAsString = type.rules
      .map((rule) => wrapWithMediaQuery(rule.mediaQuery, rule.value))
      .join("\n");

    const code = `export const ${functionName} = \`${wrapWithPseudoSelector(
      selector.pseudo,
      rulesAsString
    )}\` as ${returnType};`;

    return {
      returnType,
      functionName,
      code,
    } as ParsedCSSType;
  });

  const allReturnTypes = parsedCSSTypes.map((type) => type.returnType);
  const typeDefinitions = allReturnTypes
    .map((type) => `export type ${type} = "${type}";`)
    .join("\n");
  const classTypeDefinition = `export type TWClasses = ${allReturnTypes.join(
    " |\n"
  )};`;
  const mainFunction = `${typeDefinitions}\n${classTypeDefinition}\nexport function tw(classes: TWClasses[]) {return classes.join("\\n");}\n`;

  const rootPath = outDir;
  await mkdir(rootPath, { recursive: true });

  await writeFile(
    path.join(rootPath, "index.ts"),
    [
      generateGlobalStyle(globalTypes),
      ,
      mainFunction,
      parsedCSSTypes
        .map((parsed) => {
          return parsed.code;
        })
        .join("\n"),
      HELPER_FUNCTIONS,
    ].join("\n")
  );
}
