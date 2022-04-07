import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { scoreState, resetData } from '../redux/actions/FeedbackAction';

class Feedback extends Component {
  btnPlayAgain = () => {
    const { history, score, updateScore, resetGame } = this.props;
    updateScore(score);
    resetGame();
    history.push('/');
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(scoreState(score)),
  resetGame: () => dispatch(resetData()),
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  updateScore: PropTypes.func,
  resetGame: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
