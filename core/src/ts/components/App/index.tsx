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
      routes: DictcContents !== undefined ? this.renderRoutes(DictcContents) : [],
    });
  }

  // TODO: add pages type
  private renderRoutes (pages: any[]) {
    const routes: JSX.Element[] = [];
    const testPathArr: string[] = []; // TODO: delete this
    function go (pages: any[], parentPath: string) {
      for (const v of pages) {
        const path = parentPath + '/' + v.name;
        if (!v.pages) {
          routes.push(
            <Route
              key={v.name}
              path={path}
              exact
              component={pageContentComponent(v.content)}
            />
          );
          testPathArr.push(path);
        } else {
          go(v.pages, path);
        }
      }
    }

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
