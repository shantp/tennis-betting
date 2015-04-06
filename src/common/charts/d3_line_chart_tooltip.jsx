import React from 'react';
import moment from 'moment';
import accounting from 'accounting';

require('./d3_line_chart_tooltip.scss');

export default class LineChartTooltip extends React.Component {

  renderBet(bet, index) {
    let line = bet.line > 0 ? '+' + bet.line : bet.line;
    let resultClass = 'tooltip-result ' + bet.result;
    let payoutClass = 'tooltip-payout ';
    let payout = (bet.payout/100) * this.props.unitSize;
    if (payout > 0) payoutClass+= 'positive';
    if (payout < 0) payoutClass+= 'negative';
    if (payout === 0) payoutClass+= 'push';
    return (
      <div className="tooltip-bet" key={index}>
        <div className={resultClass}>{bet.result}</div>
        <div className="tooltip-hero">{bet.hero}</div>
        {bet.bettype !== 'total' ? <div className="tooltip-line">{line}</div> : null}
        <div className={payoutClass}>{accounting.formatMoney(payout)}</div>
      </div>
    );
  }

  renderChange(change) {
    let arrow;
    let changeClass = "tooltip-change ";
    if (change > 0) {
      arrow = <div className="arrow-up"></div>;
      changeClass += 'positive';
    } else if (change < 0) {
      arrow = <div className="arrow-down"></div>;
      changeClass += 'negative';
    }
    return (
      <div className={changeClass}>
        {arrow}
        {accounting.formatMoney(change * this.props.unitSize)}
      </div>
    );
  }

  render() {
    let amountClass = this.props.data.amount > 0 ? 'positive' : 'negative';
    let bets = this.props.data.bets.map(this.renderBet.bind(this));
    return (
      <div>
        <div className="tooltip-date">
          {moment(this.props.data.date).format('MMMM Do YYYY')}
        </div>
        <div className="tooltip-status">
          <div className={"tooltip-amount " + amountClass}>
            {accounting.formatMoney(this.props.data.amount)}
          </div>
          {!isNaN(this.props.data.change) && this.props.data.change !== 0 ? this.renderChange(this.props.data.change) : null}
        </div>
        <div className="tooltip-bets">
          {bets}
        </div>
      </div>
    );
  }
}