import React from 'react';
import moment from 'moment';
import accounting from 'accounting';

require('./d3_line_chart_tooltip.scss');

export default class LineChartTooltip extends React.Component {

  renderBet(bet, index) {
    let line = bet.line > 0 ? '+' + bet.line : bet.line;
    let resultClass = 'tooltip-result ' + bet.result;
    return (
      <div className="tooltip-bet" key={index}>
        <div className={resultClass}>{bet.result}</div>
        <div className="tooltip-hero">{bet.hero}</div>
        {bet.bettype !== 'total' ? <div className="tooltip-line">{line}</div> : null}
        <div className="tooltip-payout">{accounting.formatMoney(bet.payout)}</div>
      </div>
    );
  }

  render() {
    let amountClass = this.props.data.amount > 0 ? 'amountpos' : 'amountneg';
    let bets = this.props.data.bets.map(this.renderBet);
    return (
      <div>
        <div className="tooltip-date">
          {moment(this.props.data.date).format('MMMM Do YYYY')}
        </div>
        <div className={"tooltip-amount " + amountClass}>
          {accounting.formatMoney(this.props.data.amount)}
        </div>
        <div className="tooltip-bets">
          {bets}
        </div>
      </div>
    );
  }
}