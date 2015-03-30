import React from 'react';
import Router from 'react-router';
let { Route, DefaultRoute, RouteHandler, Link, Redirect } = Router;

import HomePage from '../pages/home/page';


export default class MainRouter extends React.Component {
  render() {
    return (
      <div id="container">
        <div id="navigation">
          <header>
            <ul>
              <li><Link to="/2015">2015</Link></li>
              <li><Link to="/2014">2014</Link></li>
            </ul>
          </header>
        </div>

        <div id="main">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}

MainRouter.getRoutes = function() {
  return (
    <Route name="app" path="/" handler={MainRouter}>
      <Route name="year" path="/:yearId" handler={HomePage} />
      <Redirect from="/" to="/2015" />
    </Route>
  );
}