import * as _React from 'react';

declare global {
  const React: typeof _React;
}

declare module "*.md" {
  const value: string;
  export default value;
}
