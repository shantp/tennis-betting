import _ from "lodash";
import accounting from "accounting";

class DataFilter {

  constructor() {
  }

  getResults(data) {
    let amount = 0, win = 0, loss = 0, push = 0, invested = 0, roi = 0;
    let record = {};
    _.each(data, function(bet) {
      amount += bet.payout;
      if (bet.result === 'w') { win++; }
      if (bet.result === 'l') { loss++; }
      if (bet.result === 'p') { push++; }
      invested += bet.bet;
    });
    record = win + " - " + loss + " - " + push;
    amount = Math.round(amount*100) / 100;
    roi = (amount/invested * 100).toFixed(3)/1;
    return {amount, record, roi};
  }

  getResultsByType(data) {
    let that = this;
    let typeresults = [];
    _.each(this.getBetsByType(data), function(type, name) {
      let results = {}
      results = that.getResults(type);
      results.type = name.charAt(0).toUpperCase() + name.slice(1);
      results.amount = accounting.formatMoney(results.amount);
      typeresults.push(results);
    });
    return typeresults;
  }

  getResultsByTourney(data) {
    let that = this;
    let tourneyresults = [];
    _.each(this.getBetsByTourney(data), function(tourney, name) {
      let results = {};
      results = that.getResults(tourney);
      results.type = name;
      results.amount = accounting.formatMoney(results.amount);
      tourneyresults.push(results);
    });
    return tourneyresults;
  }

  getBetsByType(data) {
    let types = [], bets = {};
    _.each(data, function(bet) {
      types.push(bet.bettype);
    });
    types = _.uniq(types).sort();
    _.each(types, function(type) {
      bets[type] = _.filter(data, {bettype: type});
    });
    return bets;
  }

  getBetsByTourney(data) {
    let tourneys = [], bets = {};
    _.each(data, function(bet) {
      if (bet.tourney != "") { tourneys.push(bet.tourney); }
    });
    tourneys = _.uniq(tourneys).sort();
    _.each(tourneys, function(tourney) {
      bets[tourney] = _.filter(data, {tourney: tourney});
    });
    return bets;
  }

}

let data_filter = new DataFilter();

export default data_filter;