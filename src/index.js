import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './index.scss';
import './custom.scss';
import Welcome from './components/welcome/Welcome';
import Dashboard from './components/Dashboard/DashboardMain/DashboardMain'
import * as serviceWorker from './serviceWorker';
import { Helmet } from "react-helmet";
import conf from './conf/configuration' 

import ContactUs from './components/Contactus';
import AboutUs from './components/Aboutus';
import Pricing from './components/Pricing';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Refund from './components/Refund';

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{conf.meta.title}</title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content={conf.meta.description} />
      <meta name="keywords" content={conf.meta.keywords} />
    </Helmet>
    <Router>
      <Route exact path="/" component={Welcome} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/resume/:step"  component={Welcome} />

      <Route path="/aboutus" component={ AboutUs } />
      <Route path="/contactus" component={ ContactUs } />
      <Route path="/privacy" component={ Privacy } />
      <Route path="/pricing" component={ Pricing } />
      <Route path="/terms" component={ Terms } />
      <Route path="/refund" component={ Refund } />

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
