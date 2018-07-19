import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import routes, { IMtRoute } from 'ts/routes';
import Container from './Container';
import { NotFound } from 'ts/components/public';
import { getDictcConfig } from 'ts/ext/config';
import { pageContentComponent } from './pageContentComponent';

// import xxx from '/home/matt/Projects/github.com/yuqingc/notebook1/mtr/docs/start.md';

const testComponent = (content: string) => () => (
  <div>{content}</div>
);

interface IAppProps {
}

interface IAppState {
  routes: JSX.Element[] | null;
}

class App extends React.Component<IAppProps, IAppState> {

  constructor (props: any) {
    super(props);
    this.state = {
      routes: null,
    };
  }

  public async componentDidMount () {
    const pages = await getDictcConfig('pages');
    this.setState({
      routes: this.renderRoutes(pages)
    });
  }

  // TODO: add pages type
  private renderRoutes (pages: any[]) {
    console.log('pagessszzz', pages);
    const routes: JSX.Element[] = [];
    const testPathArr: string[] = []; // TODO: delete this
    function go (pages: any[], parentPath: string) {
      for (const page of pages) {
        const path = parentPath + '/' + page.name;
        if (!page.subPages) {
          console.log('xxxxxxxx', page.content);
          routes.push(
            <Route
              key={page.name}
              path={path}
              exact
              component={pageContentComponent(page.content)}
            />
          );
          testPathArr.push(path);
        } else {
          go(page.subPages, path);
        }
      }
    }

    go(pages, '');
    console.log('哈哈哈哈', routes);

    return routes;
  }

  public render () {
    const { routes } = this.state;

    return(
      <Router>
        <Container>
          <Switch>
            {
              routes
            }
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
