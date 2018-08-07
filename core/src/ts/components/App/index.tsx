import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import routes, { IMtRoute } from 'ts/routes';
import Container from './Container';
import { NotFound } from 'ts/components/public';
import { pageContentComponent } from './pageContentComponent';
import { DictcContents } from 'ts/ext/consts';

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

  public componentDidMount () {
    // const pages = await getDictcConfig('pages');
    this.setState({
      routes: DictcContents !== undefined ? this.renderRoutes(JSON.parse(DictcContents as string)) : [],
    });
  }

  // TODO: add pages type
  private renderRoutes (pages: any[]) {
    const routes: JSX.Element[] = [];
    const testPathArr: string[] = []; // TODO: delete this
    function go (pages: any[], parentPath: string) {
      for (const page of pages) {
        const path = parentPath + '/' + page.name;
        if (!page.pages) {
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
    console.log('哈哈', testPathArr);

    go(pages, '');

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
