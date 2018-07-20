
export interface IDictcConfig {
  title: string;
  footerText?: string;
  theme?: 'light' | 'dark';
  [propName: string]: any;
}

export { default as projectName } from './info';

type IParsePropTypes = (p: React.Component) => any;

declare const parsePropTypes: IParsePropTypes;

export { parsePropTypes };
