'use strict';

import React from 'react';
import accounting from 'accounting';
import _ from 'lodash';

export default class BetTypes extends React.Component {
  render() {
    return (
      <div id="betTypes">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Push</th>
            </tr>
          </thead>
          <tbody>
            {_.mapValues(this.props.results, function(result, name) {
              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{accounting.formatMoney(result.amount)}</td>
                  <td>{result.win}</td>
                  <td>{result.loss}</td>
                  <td>{result.push}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}