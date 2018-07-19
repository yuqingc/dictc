import {
  MarkdownBox,
  CodeExample,
} from 'ts/components/public';

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
  type: 'props',
  component: React.Component
};

// todo add page type
const pageContentComponent = (content: string | any[]) => {
  if (typeof content === 'string') {
    return () => (
      <MarkdownBox source={content} />
    );
  } else if (Object.prototype.toString.call(content) === '[object Array]') {
    return () => (
      <>
        {
          content.map((v: ContentElementType, i: number) => {
            switch (v.type) {
              case 'md':
                return (
                  <MarkdownBox
                    key={i}
                    source={v.content}
                  />
                );
              case 'demo':
                return (
                  <CodeExample
                    key={i}
                    scope={v.scope}
                    sourceCode={v.code}
                    title={v.title}
                  />
                );
              case 'props':
                console.log('look', (v as any).component.propTypes);
                break;
              default:
                return <div>nothing here</div>;
            }
          })
        }
      </>
    );
  }
};

export { pageContentComponent };
