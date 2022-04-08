import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Header from '../Components/Header';
import { scoreState, resetData } from '../redux/actions/FeedbackAction';
import { setToLocalStorage } from '../LocalStorage';

class Feedback extends Component {
  componentDidMount() {
    this.addToRanking();
  }

  btnPlayAgain = () => {
    const { history, score, updateScore, resetGame } = this.props;
    updateScore(score);
    resetGame();
    history.push('/');
  }

  btnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

addToRanking = () => {
  const { score, gravatarEmail, name } = this.props;
  const hash = md5(gravatarEmail).toString();
  const imgUrl = `https://www.gravatar.com/avatar/${hash}`;
  const player = {
    name,
    score,
    picture: imgUrl,
  };
  const { resetGame } = this.props;
  resetGame();
  setToLocalStorage(player);
}

render() {
  const { assertions, score } = this.props;
  const minScore = 3;
  return (
    <div>
      <Header />
      <p data-testid="feedback-text">
        { assertions >= minScore ? 'Well Done!' : 'Could be better...' }
      </p>
      <p data-testid="feedback-total-score">{score}</p>
      <p data-testid="feedback-total-question">{assertions}</p>
      <button
        data-testid="btn-play-again"
        type="button"
        onClick={ this.btnPlayAgain }
      >
        Play Again
      </button>
      <button
        data-testid="btn-ranking"
        type="button"
        onClick={ this.btnRanking }
      >
        Ranking
      </button>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(scoreState(score)),
  resetGame: () => dispatch(resetData()),
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  updateScore: PropTypes.func,
  resetGame: PropTypes.func,
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
