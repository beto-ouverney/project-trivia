import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SettingsBtn extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Settings
        </button>

      </div>
    );
  }
}

SettingsBtn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequire;
