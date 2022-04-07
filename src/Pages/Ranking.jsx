import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
goHomeClick = () => {
  const { history } = this.props;
  history.push('/');
}

/* name: nome-da-pessoa,
assertions: número-de-acertos,
score: pontuação,
gravatarEmail: email-da-pessoa, */

render() {
  return (
    <header className="btn-hanking">
      <h1 data-testid="ranking-title">RANKING</h1>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ this.goHomeClick }
      >
        Go Home
      </button>
    </header>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
