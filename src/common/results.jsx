'use strict';

import React from 'react';
import accounting from 'accounting';

export default class Results extends React.Component {
  render() {
    return (
      <div id="results">
        <h4>Tennis Betting Results ~ {this.props.year}</h4>
        <div className="amount">
          <p>Amount</p>
          <h3 className={(this.props.results.amount > 0 ? 'amountpos' : 'amountneg')}>
            {accounting.formatMoney(this.props.results.amount)}
          </h3>
        </div>
        <div className="record">
          <p>Record</p>
          <h3>{this.props.results.win} - {this.props.results.loss} - {this.props.results.push}</h3>
        </div>
        <div className="roi">
          <p>ROI</p>
          <h3>{this.props.results.roi}%</h3>
        </div>
      </div>
    );
  }
}