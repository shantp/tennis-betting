'use strict';

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
  }

  render() {
    return (
      <div id="linechart" />
    );
  }
}