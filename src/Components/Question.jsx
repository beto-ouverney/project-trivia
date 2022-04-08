import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Question.css';
import { scoreState, assertionsState } from '../redux/actions/FeedbackAction';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      index: 0,
      timer: 30,
      cantRespond: false,
      correct: 'correct-answer',
      assertions: 0,
    };
  }

  componentDidMount() {
    this.getrespostas();
    this.initTimer();
  }

getPontuaction = () => {
  const { questions, score, scoreDispatch } = this.props;
  const { index, timer } = this.state;
  const { difficulty } = questions[index];
  let bonus = 0;
  const hardPoint = 3;
  switch (difficulty) {
  case 'easy':
    bonus = 1;
    break;
  case 'medium':
    bonus = 2;
    break;
  default:
    bonus = hardPoint;
  }
  const basePoints = 10;
  const points = basePoints + (timer * bonus);
  const newScore = score + points;
  scoreDispatch(newScore);
}

decrementTimer = () => {
  const { timer } = this.state;
  if (timer <= 0) {
    const { interval } = this.state;
    this.setTimeOut();
    clearInterval(interval);
    const button = document.getElementById('next');
    button.className = 'show';
  } else {
    this.setState((prevState) => ({ timer: prevState.timer - 1 }));
  }
}

initTimer = () => {
  this.setState({ timer: 30 });
  const milliseconds = 1000;
  const interval = setInterval(this.decrementTimer, milliseconds);
  this.setState({ interval });
}

setTimeOut = () => {
  this.setState({ cantRespond: true });
}

changeClassAnswers = () => {
  const { correct } = this.state;
  const buttons = document.getElementById('alternatives').children;
  Array.from(buttons).forEach((button) => {
    if (button.id === correct) {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });
}

handleClick = ({ target }) => {
  const { interval, correct, assertions } = this.state;
  const button = document.getElementById('next');
  button.className = 'show';
  this.changeClassAnswers();
  this.setState({ cantRespond: true });
  clearInterval(interval);
  if (target.id === correct) {
    this.getPontuaction();
    this.setState({ assertions: assertions + 1 });
  }
}

handleNext = () => {
  const { index, assertions } = this.state;
  const { assertionsDispatch } = this.props;
  const endGame = 4;
  const button = document.getElementById('next');
  button.className = 'next';
  if (index < endGame) {
    this.setState({ index: index + 1,
      cantRespond: false },
    () => this.getrespostas());
  } else {
    const { history } = this.props;
    assertionsDispatch(assertions);
    history.push('/feedback');
  }
}

  getrespostas = () => {
    const { questions } = this.props;
    const { index } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrects } = questions[index];
    const obj = { response: correct,
      testId: 'correct-answer' };
    const incorrectAnswers = [];
    incorrects.forEach((e, i) => {
      const obj2 = { response: e,
        testId: `wrong-answer-${i}` };
      incorrectAnswers.push(obj2);
    });
    const answer = [...incorrectAnswers, obj];
    const shuffle = 0.5;
    const answers = answer.sort(() => Math.random() - shuffle);
    this.setState({ answers }, () => this.initTimer());
  }

  render() {
    const { answers, index, cantRespond, timer } = this.state;
    const { questions } = this.props;
    const { category, question } = questions[index];
    return (

      <div>
        <div>
          <p data-testid="question-category">{category}</p>

          <p data-testid="question-text">{question}</p>
          <p>{timer}</p>
        </div>
        <div>
          <div id="alternatives" data-testid="answer-options">
            {(answers.map((e) => (
              <button
                key={ e.response }
                type="button"
                data-testid={ e.testId }
                onClick={ this.handleClick }
                id={ e.testId }
                disabled={ cantRespond }
              >
                {e.response}
              </button>
            )))}
          </div>
          <button
            data-testid="btn-next"
            type="button"
            id="next"
            className="next"
            onClick={ this.handleNext }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (value) => dispatch(scoreState(value)),
  assertionsDispatch: (value) => dispatch(assertionsState(value)),
});

Question.propTypes = {
  correct_answer: PropTypes.toString,
  incorrect_answers: PropTypes.string,
  category: PropTypes.string,
  question: PropTypes.string,
  updateIndex: PropTypes.func,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
