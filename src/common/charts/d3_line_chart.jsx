import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import accounting from 'accounting';
import moment from 'moment';

require('./d3_line_chart.scss');

export default class LineChart extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  makeTooltip(bet) {
    var line = bet.line > 0 ? '+' + bet.line : bet.line;
    if (bet.bettype === 'total') { line = ''; };
    var payoutClass = bet.payout > 0 ? 'betpos' : 'betneg';
    if (bet.payout === 0) { payoutClass = 'betpush'; };
    var payout = accounting.formatMoney(bet.payout);
    var amountClass = bet.amount > 0 ? 'amountpos' : 'amountneg';
    var amount = accounting.formatMoney(bet.amount);
    var nicedate = moment(bet.date).format('MMMM Do YYYY');
    return `
      <div class="tipdate">
        ${nicedate}
      </div>
      <div class="tipline">
        ${bet.hero} ${line}
      </div>
      <div class="tippayout ${payoutClass}">
        ${payout}
      </div>
      <div class="tipamount ${amountClass}">
        ${amount}
      </div>`;
  }

  drawChart() {
    d3.selectAll('#linechart > *').remove();

    let margin = {top: 20, right: 20, bottom: 30, left: 60};
    let width = this.props.width - margin.left - margin.right;
    let height = this.props.height - margin.top - margin.bottom;

    let parseDate = d3.time.format('%x').parse;
    let bisectDate = d3.bisector((d) => { return d.dateObj; }).left;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);

    let xAxis = d3.svg.axis().scale(x).orient('bottom');
    let yAxis = d3.svg.axis().scale(y).orient('left');

    let line = d3.svg.line()
      .x((d) => {return x(d.dateObj); })
      .y((d) => {return y(d.amount); });

    let svg = d3.select('#linechart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    let tooltip = d3.select('#linechart').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    let mousemove = () => {
      let x0 = x.invert(d3.mouse(svg.node())[0]);
      let i = bisectDate(this.props.bets, x0, 1);
      let d0 = this.props.bets[i-1];
      let d1 = this.props.bets[i];
      let d = x0 - d0.dateObj > d1.dateObj - x0 ? d1: d0;
      let chartTop = d3.select('#linechart').node().offsetTop;
      tooltip.html(this.makeTooltip(d));
      tooltip.style('left', (x(d.dateObj) + margin.left + 10 + 'px'))
        .style('top', (y(d.amount) + chartTop + 'px'));
    };

    _.each(this.props.bets, (d) => {
      if (typeof d.date === 'string') {
        d.dateObj = parseDate(d.date);
      }
    });

    x.domain(d3.extent(this.props.bets, (d) => { return d.dateObj; }));
    y.domain(d3.extent(this.props.bets, (d) => { return d.amount; }));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Amount ($)');

    svg.append('path')
      .datum(this.props.bets)
      .attr('class', 'line')
      .attr('d', line);

    svg.selectAll('.dot')
      .data(this.props.bets)
      .enter().append('circle')
      .attr('cx', (d) => { return x(d.dateObj); })
      .attr('cy', (d) => { return y(d.amount); })
      .attr('r', 3)
      .attr('class', 'dot');

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => { tooltip.style('opacity', 1); })
      .on('mouseout', () => { tooltip.style('opacity', 0); })
      .on('mousemove', mousemove);
  }

  render() {
    return (
      <div id="linechart" />
    );
  }
}