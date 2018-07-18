import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live';

import {
  MarkdownBox,
  PropsTable,
  CodeExample,
} from 'ts/components/public';
import { ITableDataMeta } from 'ts/components/public/PropsTable';
import Button from './Button';

const md1: string = `
# title
## second
### third
- item 1
- item 2
- item 3

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

\`\`\`tsx
class FakeContent extends React.Component<any, any> {
  render () {
    return (
      <>
        <MarkdownBox source={md1}/>
      </>
    );
  }
}

export default FakeContent;
\`\`\`
`;

const fakeCode: string = `<Button>this is button</Button>`;
const fakeProps: ITableDataMeta[] = [
  {
    key: 'type',
    propName: 'type',
    type: 'string',
    required: 'no',
    defaultValue: 'Title',
    description: 'blablablabalbabblablablabalbabblablablabalbabblablablabalbabblablablabalbab',
  },
  {
    key: 'name',
    propName: 'name',
    type: 'string',
    required: 'no',
    defaultValue: 'Title',
    description: 'blablablabalbab',
  },
  {
    key: 'age',
    propName: 'age',
    type: 'number',
    required: 'no',
    defaultValue: 5,
    description: 'blablablabalbab',
  },
  {
    key: 'whatever',
    propName: 'whatever',
    type: 'string',
    required: 'no',
    defaultValue: 'Title',
    description: 'blablablabalbab',
  }
];

class FakeContent extends React.Component<any, any> {
  render () {
    return (
      <>
        <MarkdownBox source={md1}/>
        <PropsTable data={fakeProps}/>
        <CodeExample
          title="fadsfasfdasfasdfadsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafadsssssssssss"
          scope={{Button}}
          sourceCode={fakeCode}
        />
      </>
    );
  }
}

export default FakeContent;
