import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  btnPlayAgain () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertions, score } = this.props;
    const minScore = 3;
    return (
      <div>
        <p data-testid="feedback-text">
          { assertions > minScore ? 'Well Done!' : 'Could be better...' }
        </p>
        <p data-testid="feedback-total-score">{`Placar: ${ score }`}</p>
        <p data-testid="feedback-total-question">{`Corretas: ${ assertions }`}</p>
        <button
          data-testid="btn-play-again"
          onClick={}
        >
          Play Again
        </button>
      </div>
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

/* const mapDispatchToProps = (dispatch) => ({

}); */

Feedback.proTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default connect(mapStateToProps, null/* mapDispatchToProps */)(Feedback);
