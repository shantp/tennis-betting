import React from 'react';

require('./footer.scss');

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p>&#9679; View on <a href="https://github.com/shantp/tennis-betting">Github</a></p>
      </footer>
    );
  }
}