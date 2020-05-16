import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import services from "./components/services";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/services" component={services} />
    </Switch>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
