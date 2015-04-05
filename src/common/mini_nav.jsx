import React from 'react';
import _ from 'lodash';

require('./mini_nav.scss');

export default class MiniNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [
        {value: 'atp', checked: true},
        {value: 'wta', checked: true}
      ]
    };
  }

  checkedChange(val) {
    let newBoxes = this.state.boxes.map(box => {
      return {
        value: box.value,
        checked: box.value === val ? !box.checked : box.checked
      };
    });
    if (_.every(newBoxes, {'checked': false})) {
      newBoxes = newBoxes.map(box => {
        return {
          value: box.value,
          checked: box.value !== val
        };
      });
    }
    let league = _.filter(newBoxes, {'checked': true});
    league = league.length > 1 ? '' : league[0].value.toLowerCase();
    this.props.onLeagueChange(league);
    this.setState({ boxes: newBoxes });
  }

  unitsChange(e) {
    let val = e.target.value;
    let valid = e.target.validity.valid;
    if (!val) val = 100;
    if (valid) this.props.onUnitsChange(val);
  }

  renderCheckboxes() {
    return this.state.boxes.map(box => {
      return (
        <label className="checkbox-inline" key={box.value}>
          <input
            id={box.value}
            type="checkbox"
            checked={box.checked}
            disabled={box.disabled}
            onChange={this.checkedChange.bind(this, box.value)}>
          </input> {box.value}
        </label>
      );
    });
  }

  renderUnitInput() {
    return (
      <label className="unit-input">
        Unit
        <input
          ref="unitInput"
          id="unit"
          type="number"
          placeholder="100"
          min={1}
          max={100000}
          onChange={this.unitsChange.bind(this)} />
      </label>
    );
  }

  render() {
    let checks = this.renderCheckboxes();
    let unit = this.renderUnitInput();
    return (
      <div className="mini-nav form-inline">
        {checks}
        {unit}
      </div>
    );
  }
}