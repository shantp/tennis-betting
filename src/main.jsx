import 'babel-core/polyfill';

import React from 'react';
import Router from 'react-router';
import $ from 'jquery';

import MainRouter from './routers/main';

const data = {
  '2015': require('./2015.json'),
  '2014': require('./2014.json')
};
const DOM_APP_EL_ID = 'app';

let routes = MainRouter.getRoutes();

// Start the router
Router.run(routes, function(Handler, state) {
  let year = state.pathname.slice(1);
  let bets = data[year];
  React.render(<Handler data={bets} year={year} />, document.getElementById(DOM_APP_EL_ID));
});

// Boostrap & Normalize
window.jQuery = $;
require('../node_modules/normalize.css/normalize.css');
require('bootstrap-webpack');
require('./main.scss');