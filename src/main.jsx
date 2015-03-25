/**
 * App entry point
 */

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
Router.run(routes, function(Handler, state) {
  let bets = data[state.pathname.slice(1)]
  React.render(<Handler data={bets} />, document.getElementById(DOM_APP_EL_ID));
});