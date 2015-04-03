import React from 'react';
import _ from 'lodash';

export default class LeagueToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [
        {value: 'ATP', checked: true},
        {value: 'WTA', checked: true}
      ]
    };
  }

  formChange(val) {
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
    league = league.length > 1 ? 'all' : league[0].value.toLowerCase();
    this.props.onLeagueChange(league);
    this.setState({ boxes: newBoxes });
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
            onChange={this.formChange.bind(this, box.value)}>
          </input> {box.value}
        </label>
      );
    });
  }

  render() {
    let checks = this.renderCheckboxes();
    return (
      <div className="form-inline">
        {checks}
      </div>
    );
  }
}