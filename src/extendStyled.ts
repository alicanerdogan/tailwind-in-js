import { tw, TWClasses } from "./index";

type ExtendedStyled<T> = {
  [P in keyof T]: T[P] extends (
    template: TemplateStringsArray,
    ...args: any
  ) => any
  ? (classes: TWClasses[]) => ReturnType<T[P]>
  : never;
};

export function extendStyled<T>(styled: T) {
  const cachedProperties: any = {};
  const extendedStyled: any = new Proxy(styled, {
    get: (styled: any, prop: any) => {
      if (!styled.hasOwnProperty(prop)) {
        return styled[prop];
      }
      if (cachedProperties[prop]) {
        return cachedProperties[prop];
      }
      const wrappedProp = (classes: (TWClasses)[]) =>
        styled[prop]`
          ${tw(classes)}
        `;
      cachedProperties[prop] = wrappedProp;
      return wrappedProp;
    }
  });
  return extendedStyled as ExtendedStyled<T>;
}
