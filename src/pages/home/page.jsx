"use strict";

import React from 'react';
import DataFilter from '../../common/data_filter';
import Results from '../../common/results';
import BetTypes from '../../common/bet_types';


export default class HomePage extends React.Component {
  componentWillMount() {
    this.setState(this.refreshData(this.props.data));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.refreshData(nextProps.data));
  }

  refreshData(data) {
    let bets = data;
    let results = DataFilter.getResults(data);
    let typeresults = DataFilter.getResultsByType(data);
    return {
      bets,
      results,
      typeresults
    };
  }

  render() {
    return (
      <div>
        <Results results={this.state.results} year="2014" />
        <BetTypes results={this.state.typeresults} />
      </div>
    )
  }
}