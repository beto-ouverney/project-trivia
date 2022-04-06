import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getQuestions } from '../Helpers/triviaApi';
import Header from '../Components/Header';
import Question from '../Components/Question';

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { token } = this.props;
    const questionsReturn = await getQuestions(token);
    const returnError = 3;
    if (questionsReturn.response_code === returnError) {
      const newToken = await getToken();
      const questionsReturn2 = await getQuestions(newToken);
      this.setState({ questions: questionsReturn2.results });
    } else {
      this.setState({ questions: questionsReturn.results });
    }
  }

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <>
        <Header />
        {questions.length > 0 && <Question
          questions={ questions }
        />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(TriviaGame);

TriviaGame.propTypes = ({
  token: PropTypes.string,
}).isRequired;
