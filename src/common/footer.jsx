import React from 'react';

require('./footer.scss');

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <ul>
          <li>View on <a href="https://github.com/shantp/tennis-betting">Github</a></li>
        </ul>
      </footer>
    );
  }
}