import '../styles/index.scss';

import ReactDOM from 'react-dom';

import App from 'ts/components/App';

const render = (Component: JSX.Element) => ReactDOM.render(
  Component,
  document.getElementById('root'),
);

render(<App/>);
