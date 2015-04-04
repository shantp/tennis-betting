import React from 'react';
import accounting from 'accounting';

require('./results.scss');

export default class Results extends React.Component {
  render() {
    return (
      <div id="results">
        <div className="amount">
          <p>Amount</p>
          <h3 className={(this.props.results.amount < 0 ? 'negative' : 'positive')}>
            {accounting.formatMoney(this.props.results.amount)}
          </h3>
        </div>
        <div className="record">
          <p>Record</p>
          <h3>{this.props.results.record}</h3>
        </div>
        <div className="roi">
          <p>ROI</p>
          <h3>{this.props.results.roi}%</h3>
        </div>
        <div className="average">
          <p>Average Bet Size</p>
          <h3>{accounting.formatMoney(this.props.results.averageBet)}</h3>
        </div>
        <div className="total">
          <p>Bets Made</p>
          <h3>{this.props.results.totalBets}</h3>
        </div>
      </div>
    );
  }
}