declare module "katex/dist/contrib/auto-render" {
  interface KatexAutoRenderOptions {
    delimiters?: {
      left: string;
      right: string;
      display: boolean;
    }[];
    ignoredTags?: string[];
    ignoredClasses?: string[];
    errorCallback?: (msg: string, err: Error) => void;
    preProcess?: (math: string) => string;
    throwOnError?: boolean;
  }

  export default function renderMathInElement(
    element: HTMLElement,
    options?: KatexAutoRenderOptions
  ): void;
}
