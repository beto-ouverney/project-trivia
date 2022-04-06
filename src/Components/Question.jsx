import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      button: false,
      answers: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.getrespostas();
  }

handleClick = () => {
  this.setState({ button: true });
}

handleClick2 = () => {
  const { index } = this.state;
  this.setState({ button: false, index: index + 1 }, () => this.getrespostas());
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
    const answers = [...incorrectAnswers, obj];
    this.setState({ answers });
  }

  render() {
    const { answers, button, index } = this.state;
    const { questions } = this.props;
    const { category, question } = questions[index];
    const shuffle = 0.5;
    return (

      <div>
        <div>
          <p data-testid="question-category">{category}</p>

          <p data-testid="question-text">{question}</p>
          <p>
            Tempo:
            {/* <span>{timer}</span> */}
          </p>
        </div>
        <div>
          {(answers.map((e) => (
            <button
              key={ e.response }
              type="button"
              data-testid={ e.testId }
              onClick={ this.handleClick }
            >
              {e.response}
            </button>
          )).sort(() => Math.random() - shuffle))}
          {button && <button type="button" onClick={ this.handleClick2 }>Próxima</button>}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  correct_answer: PropTypes.toString,
  incorrect_answers: PropTypes.string,
  category: PropTypes.string,
  question: PropTypes.string,
  updateIndex: PropTypes.func,
}.isRequired;
