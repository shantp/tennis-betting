"use strict";

import React from 'react';
import DataFilter from '../../common/data_filter';
import Results from '../../common/results';
import {Table, Sort} from 'reactable';


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
    let tourneyresults = DataFilter.getResultsByTourney(data);
    console.log(tourneyresults);
    return {
      bets,
      results,
      typeresults,
      tourneyresults
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
          id="types-table"
          data={this.state.typeresults}
          sortable={[{
            column: "amount",
            sortFunction: Sort.Currency
          }]}
          columns={[
            {key: "type", label: "Type"},
            {key: "amount", label: "Amount"},
            {key: "record", label: "Record"},
          ]} />
        <Table
          className="table table-striped"
          id="tourney-table"
          data={this.state.tourneyresults}
          sortable={[{
            column: "amount",
            sortFunction: Sort.Currency
          }]}
          columns={[
            {key: "type", label: "Tournament"},
            {key: "amount", label: "Amount"},
            {key: "record", label: "Record"},
          ]} />
      </div>
    )
  }
}

