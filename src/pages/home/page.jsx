import React from 'react';
import DataFilter from '../../common/data_filter';
import LeagueToggle from '../../common/league_toggle';
import Results from '../../common/results';
import LineChart from '../../common/charts/d3_line_chart';
import {Table, Sort} from 'reactable';
import $ from 'jquery';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: $(window).width()
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this.setState(this.refreshData(this.props.data));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.refreshData(nextProps.data));
  }

  updateDimensions() {
    this.setState({
      width: $(window).width(),
      height: $(window).height()
    });
  }

  refreshData(data, league = '') {
    let bets = DataFilter.getBetsByLeague(data, league);
    let results = DataFilter.getResults(bets);
    let typeresults = DataFilter.getResultsByType(bets);
    let tourneyresults = DataFilter.getResultsByTourney(bets);
    return {
      bets,
      results,
      typeresults,
      tourneyresults
    };
  }

  changeLeague(league) {
    this.setState(this.refreshData(this.props.data, league));
  }

  render() {
    return (
      <div>
        <h4>Tennis Betting ~ {this.props.year} Season</h4>
        <LeagueToggle onLeagueChange={this.changeLeague.bind(this)} />
        <Results
          results={this.state.results} />
        <LineChart
          width={this.state.width}
          height="300"
          bets={this.state.bets} />
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

