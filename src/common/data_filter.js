import _ from "lodash";

class DataFilter {

  constructor() {
  }

  getResults(data) {
    let amount = 0, win = 0, loss = 0, push = 0, invested = 0, roi = 0;
    _.each(data, function(bet) {
      amount += bet.payout;
      if (bet.result === 'w') { win++; }
      if (bet.result === 'l') { loss++; }
      if (bet.result === 'p') { push++; }
      invested += bet.bet;
    });
    amount = Math.round(amount*100) / 100;
    roi = (amount/invested * 100).toFixed(3)/1;
    return {amount, win, loss, push, roi};
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

  getResultsByType(data) {
    let that = this;
    let typeresults = [];
    _.each(this.getBetsByType(data), function(type, name){
      let results = {}
      results = that.getResults(type);
      results.type = name.charAt(0).toUpperCase() + name.slice(1);
      typeresults.push(results);
    });
    return typeresults;
  }

}

let data_filter = new DataFilter();

export default data_filter;