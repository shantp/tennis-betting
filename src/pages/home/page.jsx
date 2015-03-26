"use strict";

import React from 'react';
import DataFilter from '../../common/data_filter';
import Results from '../../common/results';
import {Table} from 'reactable';


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
        <Results
          results={this.state.results}
          year={this.props.year} />
        <Table
          className="table table-striped"
          id="table"
          data={this.state.typeresults}
          sortable={true}
          columns={[
            {key: "type", label: "Type"},
            {key: "amount", label: "Amount"},
            {key: "win", label: "Win"},
            {key: "loss", label: "Loss"},
            {key: "push", label: "Push"},
          ]} />
      </div>
    )
  }
}