import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../LocalStorage';
import RankLine from '../Components/RankLine';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

goHomeClick = () => {
  const { history } = this.props;
  history.push('/');
}

getRanking = () => {
  const result = getRanking();
  const ranking = result.sort((a, b) => b.score - a.score);
  this.setState({ ranking });
}

render() {
  const { ranking } = this.state;
  return (
    <>
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
      <ul>
        { ranking.map((player, index) => (
          <RankLine
            key={ player.name }
            index={ index }
            player={ player }
          />
        ))}
      </ul>
    </>
  );
}
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;
