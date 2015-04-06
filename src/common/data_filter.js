import _ from 'lodash';
import accounting from 'accounting';

class DataFilter {

  constructor() {
  }

  getResults(data, unitSize) {
    let amount = 0;
    let win = 0;
    let loss = 0;
    let push = 0;
    let invested = 0;
    let roi = 0;
    let totalBets = data.length;
    let avgUnit;
    let unitsAmount;
    let unitsInvested;
    let record = {};
    _.each(data, (bet) => {
      amount += bet.payout;
      if (bet.result === 'w') { win++; }
      if (bet.result === 'l') { loss++; }
      if (bet.result === 'p') { push++; }
      invested += bet.bet;
    });
    unitsInvested = invested/100;
    avgUnit = (unitsInvested / totalBets).toFixed(1);
    record = win + '-' + loss + '-' + push;
    unitsAmount = amount/100;
    amount = unitsAmount * unitSize;
    roi = (amount/invested * 100).toFixed(3)/1;
    return {amount, record, roi, avgUnit, totalBets};
  }

  getResultsByType(data, unitSize) {
    let typeresults = [];
    _.each(this.getBetsByType(data), (type, name) => {
      let results = {};
      results = this.getResults(type, unitSize);
      results.type = name.charAt(0).toUpperCase() + name.slice(1);
      results.amount = accounting.formatMoney(results.amount);
      typeresults.push(results);
    });
    return typeresults;
  }

  getResultsByTourney(data, unitSize) {
    let tourneyresults = [];
    _.each(this.getBetsByTourney(data), (tourney, name) => {
      let results = {};
      results = this.getResults(tourney, unitSize);
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

  getBetsGroupedByDate(data, unitSize) {
    let amount = 0;
    let convertedAmount;
    let unitsAmount;
    let lastUnitsAmount;
    let days = [];
    let lastDay;
    let change;
    _.each(data, (bet) => {
      if (bet.date !== lastDay) {
        let dayBets = _.filter(data, {date: bet.date});
        if (dayBets.length > 1) {
          _.each(dayBets, (daybet) => {
            amount += daybet.payout;
          });
        } else {
          amount += bet.payout;
        }
        unitsAmount = amount/100;
        change = unitsAmount - lastUnitsAmount;
        lastUnitsAmount = unitsAmount;
        lastDay = bet.date;
        convertedAmount = unitsAmount * unitSize;
        convertedAmount = Math.round(convertedAmount*100) / 100;
        days.push({
          date: bet.date,
          amount: convertedAmount,
          change: change,
          bets: _.sortBy(dayBets, 'payout').reverse()
        });
      }
    });
    return days;
  }

}

let dataFilter = new DataFilter();

export default dataFilter;