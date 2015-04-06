import React from 'react';
import DataFilter from '../../common/data_filter';
import MiniNav from '../../common/mini_nav';
import Results from '../../common/results';
import LineChart from '../../common/charts/d3_line_chart';
import Tabs from 'react-simpletabs';
import {Table, Sort} from 'reactable';
import Footer from '../../common/footer';
import $ from 'jquery';

require('./tabs.scss');


export default class YearPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: $(window).width(),
      unitSize: 100,
      league: ''
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

  componentWillUp

  updateDimensions() {
    this.setState({
      width: $(window).width(),
      height: $(window).height()
    });
  }

  refreshData(data, league = this.state.league, unitSize = this.state.unitSize) {
    let bets = DataFilter.getBetsByLeague(data, league);
    let results = DataFilter.getResults(bets, unitSize);
    let typeResults = DataFilter.getResultsByType(bets, unitSize);
    let tourneyResults = DataFilter.getResultsByTourney(bets, unitSize);
    let lineChartBets = DataFilter.getBetsGroupedByDate(bets, unitSize);
    return {
      league,
      unitSize,
      bets,
      results,
      typeResults,
      tourneyResults,
      lineChartBets
    };
  }

  changeLeague(league) {
    this.setState(this.refreshData(this.props.data, league));
  }

  changeUnitSize(value) {
    this.setState(this.refreshData(this.props.data, this.state.league, Number(value)));
  }

  render() {
    return (
      <div>
        <MiniNav
          onLeagueChange={this.changeLeague.bind(this)}
          onUnitsChange={this.changeUnitSize.bind(this)} />
        <Results
          results={this.state.results} />
        <LineChart
          unitSize={this.state.unitSize}
          width={this.state.width}
          height="288"
          bets={this.state.lineChartBets} />
        <Tabs>
          <Tabs.Panel title='Bet Types'>
            <Table
              className="table table-striped"
              id="types-table"
              data={this.state.typeResults}
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
          </Tabs.Panel>
          <Tabs.Panel title='Grand Slams'>
            <Table
              className="table table-striped"
              id="tourney-table"
              data={this.state.tourneyResults}
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
          </Tabs.Panel>
        </Tabs>
        <Footer />
      </div>
    )
  }
}

