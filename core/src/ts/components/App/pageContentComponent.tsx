// import parsePropTypes from 'parse-prop-types';

import {
  MarkdownBox,
  CodeExample,
} from 'ts/components/public';

import dictcContext from 'ts/out/dictcContext';

type ContentElementType = {
  type: 'md';
  content: string;
} | {
  type: 'demo';
  title: string;
  code: string;
  scope: {
    [scopeName: string]: string;
  }
} | {
  type: 'props';
  component: React.Component;
  testProps?: any;
  parsedProps: any;
};

interface IResultContent {
  type: 'plain' | 'code';
  content: string;
}

const pageContentComponent = (mdString: string) => {
  const resultContents: IResultContent[] = [];
  const plainContents = mdString.split(/```[tj]sx[\s\S]*?```/);
  const codeContents = mdString.match(/```[tj]sx[\s\S]*?```/g);
  if (codeContents === null) {
    resultContents.push({
      type: 'plain',
      content: plainContents[0]
    });
  } else {
    let i = 0;
    while (i < plainContents.length) {
      resultContents.push({
        type: 'plain',
        content: plainContents[i]
      });
      i < codeContents.length && resultContents.push({
        type: 'code',
        content: codeContents[i].replace(/```[jt]sx/, '').replace(/```/, '')
      });
      i++;
    }
  }

  return () => (
    <>
      {
       resultContents.map((v, i) => {
        if (v.type === 'plain') {
          return <MarkdownBox key={i} source={v.content} />;
        } else if (v.type === 'code') {
          return (
            <CodeExample
              key={i}
              scope={dictcContext}
              sourceCode={v.content}
              title={'Title'}
            />
          );
        }})
      }
    </>
  );
};

export { pageContentComponent };
