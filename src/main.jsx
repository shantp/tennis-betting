import "babel-core/polyfill";

import React from "react";
import Router from "react-router";

import DataFilter from "./common/data_filter";
import MainRouter from "./routers/main";

const data = {
  "2015": require("./2015.json"),
  "2014": require("./2014.json")
}
const DOM_APP_EL_ID = "app";

let routes = MainRouter.getRoutes();

// Start the router
Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  let year = state.pathname.slice(1);
  let bets = data[year]
  React.render(<Handler data={bets} year={year} />, document.getElementById(DOM_APP_EL_ID));
});

// Boostrap
window.jQuery = require("jquery");
require("bootstrap-webpack");
require("./main.scss");