import _ from 'lodash';
import accounting from 'accounting';

class DataFilter {

  constructor() {
  }

  getResults(data) {
    let amount = 0;
    let win = 0;
    let loss = 0;
    let push = 0;
    let invested = 0;
    let roi = 0;
    let totalBets = data.length;
    let averageBet;
    let record = {};
    _.each(data, (bet) => {
      amount += bet.payout;
      if (bet.result === 'w') { win++; }
      if (bet.result === 'l') { loss++; }
      if (bet.result === 'p') { push++; }
      invested += bet.bet;
    });
    averageBet = invested/totalBets;
    record = win + '-' + loss + '-' + push;
    amount = Math.round(amount*100) / 100;
    roi = (amount/invested * 100).toFixed(3)/1;
    return {amount, record, roi, averageBet, totalBets};
  }

  getResultsByType(data) {
    let typeresults = [];
    _.each(this.getBetsByType(data), (type, name) => {
      let results = {};
      results = this.getResults(type);
      results.type = name.charAt(0).toUpperCase() + name.slice(1);
      results.amount = accounting.formatMoney(results.amount);
      typeresults.push(results);
    });
    return typeresults;
  }

  getResultsByTourney(data) {
    let tourneyresults = [];
    _.each(this.getBetsByTourney(data), (tourney, name) => {
      let results = {};
      results = this.getResults(tourney);
      results.type = name;
      results.amount = accounting.formatMoney(results.amount);
      tourneyresults.push(results);
    });
    return tourneyresults;
  }

  getBetsByLeague(data, league = '') {
    let bets = league ? _.filter(data, {league: league}) : data;
    return bets;
  }

  getBetsByType(data) {
    let types = [];
    let bets = {};
    _.each(data, (bet) => {
      types.push(bet.bettype);
    });
    types = _.uniq(types).sort();
    _.each(types, (type) => {
      bets[type] = _.filter(data, {bettype: type});
    });
    return bets;
  }

  getBetsByTourney(data) {
    let tourneys = [];
    let bets = {};
    _.each(data, (bet) => {
      if (bet.tourney) { tourneys.push(bet.tourney); }
    });
    tourneys = _.uniq(tourneys).sort();
    _.each(tourneys, (tourney) => {
      bets[tourney] = _.filter(data, {tourney});
    });
    return bets;
  }

}

let dataFilter = new DataFilter();

export default dataFilter;