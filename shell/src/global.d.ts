declare module '*.scss' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.svg' {
  import type { FunctionComponent, SVGAttributes } from 'react';
  const content: FunctionComponent<SVGAttributes<SVGElement>>;
  export default content;
}

declare module 'remote/Remote' {
  import type { FunctionComponent } from 'react';
  const content: FunctionComponent<any>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare var initialLanguage: string;
declare var initialI18nStore: Record<string, any>;
