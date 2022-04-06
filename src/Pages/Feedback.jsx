import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  btnPlayAgain = () => {
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
        <p data-testid="feedback-total-score">{`Score: ${score}`}</p>
        <p data-testid="feedback-total-question">{`Assertions: ${assertions}`}</p>
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

/* const mapDispatchToProps = (dispatch) => ({

}); */

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps, null/* mapDispatchToProps */)(Feedback);
