import React from 'react';
import DataFilter from '../../common/data_filter';
import Results from '../../common/results';
import LineChart from '../../common/charts/d3_line_chart';
import FilterTable from '../../common/filter_table';
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
        <LineChart
          width="700"
          height="300"
          bets={this.state.bets} />
        {/*<FilterTable bets={this.state.bets} />*/}
        <Table
          className="table table-striped"
          id="types-table"
          data={this.state.typeresults}
          sortable={["type",
          {
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
          sortable={["type",
          {
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

