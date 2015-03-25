/**
 * App entry point
 */

import "babel-core/polyfill";

import React from "react";
import Router from "react-router";

import DataFilter from "./common/data_filter";
import MainRouter from "./routers/main";

var data2015 = require("./2015.json");
var data2014 = require("./2014.json");

const DOM_APP_EL_ID = "app";

let routes = MainRouter.getRoutes();

console.log(DataFilter.getResults(data2014));

console.log(DataFilter.getResultsByType(data2014));
/**
 * Given a set of routes and params associated with the current active state,
 * call #fetchData(params) on all Route Handlers that define that static method.
 *
 * This is the main mechanism by which a route handler (page)
 * requests its data.
 *
 * @example Defining a route handler that requests data
 *
 *  var SomePage = React.createClass({
 *    statics: {
 *      fetchData(params) {
 *        return getData({
 *          data: {...}
 *        })
 *      }
 *    }
 *  })
 *
 *  Given a Route handler:
 *    <Route name="some-page" handler={SomePage} />
 *
 *  when it becomes activated, it will be passed a {data} prop containing the response:
 *    <SomePage data="..." />
 *
 *
 * @param  {[Route]} routes list of activated routes
 * @param  {[Param]} params route params
 *
 * @return {Promise}        data containing responses mapped by route name
 */
let fetchData = function(routes, params) {
  let data = {};

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(resp => {
        data[route.name] = resp;
      })
    })
  ).then(() => data);
}

// Start the router
Router.run(routes, function(Handler, state) {
  fetchData(state.routes, state.params).then((data) => {
    React.render(<Handler data={data} />, document.getElementById(DOM_APP_EL_ID));
  });
});