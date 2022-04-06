import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken, getQuestions } from '../Helpers/triviaApi';
import Header from '../Components/Header';

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
    let questionsReturn = await getQuestions(token);
    const returnError = 3;
    if (questionsReturn.response_code === returnError) {
      const newToken = await getToken();
      questionsReturn = await getQuestions(newToken);
    }
    console.log(questionsReturn);
    this.setState({ questions: questionsReturn });
  }

  render() {
    const { questions } = this.state;
    return (
      <>
        <Header />
        <div>ed</div>
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
