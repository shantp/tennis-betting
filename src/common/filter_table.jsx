import React from 'react';
import {Table, Sort} from 'reactable';
import Select from 'react-select';

export default class FilterTable extends React.Component {
  onTypeChange(val) {
    console.log(val);
  }

  render() {
    var options = [
      {value: 'one', label: 'One'},
      {value: 'two', label: 'Two'}
    ]
    return (
      <div>
        <Select
          name="types"
          options={options}
          multi={true}
          onChange={this.onTypeChange}
        />
        <Table
          className="table table-striped"
          id="bets-table"
          data={this.props.bets}
          columns={[
            {key: 'date', label: 'Date'},
            {key: 'tourney', label: 'Tournament'},
            {key: 'hero', label: 'Bet On'},
            {key: 'bettype', label: 'Type'},
            {key: 'result', label: 'Result'},
            {key: 'payout', label: 'Payout'}
          ]}
          itemsPerPage={10}
        />
      </div>
    )
  }
}