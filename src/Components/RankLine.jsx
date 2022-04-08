import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RankLine extends Component {
  render() {
    const { player, index } = this.props;
    const { name, score, picture } = player;
    return (
      <li>
        <img src={ picture } alt={ name } />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </li>
    );
  }
}

RankLine.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  index: PropTypes.number,
}.isRequired;
