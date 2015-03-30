import React from 'react';
import d3 from 'd3';
import _ from 'lodash';

export default class LineChart extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    d3.selectAll('#linechart > *').remove();

    let margin = {top: 20, right: 20, bottom: 30, left: 60};
    let width = this.props.width - margin.left - margin.right;
    let height = this.props.height - margin.top - margin.bottom;

    let parseDate = d3.time.format('%x').parse;
    let bisectDate = d3.bisector((d) => { return d.date; }).left;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);

    let xAxis = d3.svg.axis().scale(x).orient('bottom');
    let yAxis = d3.svg.axis().scale(y).orient('left');

    let line = d3.svg.line()
      .x((d) => {return x(d.date); })
      .y((d) => {return y(d.amount); });

    let svg = d3.select('#linechart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    let mousemove = () => {
      let x0 = x.invert(d3.mouse(svg.node())[0]);
      let i = bisectDate(this.props.bets, x0, 1);
      let d0 = this.props.bets[i-1];
      let d1 = this.props.bets[i];
      let d = x0 - d0.date > d1.date - x0 ? d1: d0;
      focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.amount) + ')');
      focus.select('text').text(d.amount);
    };

    let focus = svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('text')
      .attr('x', 9)
      .attr('dy', '.35em');

    _.each(this.props.bets, (d) => {
      if (typeof d.date === 'string') {
        d.date = parseDate(d.date);
      }
    });

    x.domain(d3.extent(this.props.bets, (d) => { return d.date; }));
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

    svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => { focus.style('display', null); })
      .on('mouseout', () => { focus.style('display', 'none'); })
      .on('mousemove', mousemove);
  }

  render() {
    return (
      <div id="linechart" />
    );
  }
}