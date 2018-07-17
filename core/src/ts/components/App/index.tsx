import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import routes, { IMtRoute } from 'ts/routes';
import Container from './Container';
import { NotFound } from 'ts/components/public';

interface IAppRoutersProps {
}

class App extends React.Component<IAppRoutersProps, {}> {

  // private renderRoutes (routes: IMtRoute[]) {
  //   const { isLoggedIn } = this.props;
  //   const isAdmin = isLoggedIn; // for now

  //   return routes.map(v => {
  //     if (isAdmin || !v.isEncrypted) {
  //       return (
  //         <Route
  //           key={v.name}
  //           path={v.path}
  //           exact={v.exact}
  //           component={v.component}
  //         />
  //       );
  //     }
  //   });
  // }

  public render () {
    return(
      <Router>
        <Container>
          <Switch>
            {
              // this.renderRoutes(routes)
            }
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
