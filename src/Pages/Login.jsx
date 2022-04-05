import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../Helpers/triviaApi';
import { TokenAction } from '../redux/actions/TokenAction';
import { LoginAction } from '../redux/actions/LoginAction';
import SettingsBtn from '../Components/SettingsBtn';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      email: '',
      btnLoginDisabled: true,
    };
  }

  validateForm = () => {
    const regularExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const { login, email } = this.state;
    const minLength = 3;
    if (login.length >= minLength && email.match(regularExpression)) {
      this.setState({ btnLoginDisabled: false });
    } else {
      this.setState({ btnLoginDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateForm());
  }

  handleClick= async () => {
    const { history, tokenDispatch, loginDispatch } = this.props;
    const token = await getToken();
    console.log('aqui');
    loginDispatch(this.state);
    tokenDispatch(token);
    history.push('/triviagame');
  }

  render() {
    const { login, email, btnLoginDisabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <SettingsBtn history={ history } />
        <label htmlFor="login">
          <input
            type="text"
            data-testid="input-player-name"
            placeholder="Coloque seu nome"
            id="login"
            name="login"
            value={ login }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Coloque seu e-mail"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ btnLoginDisabled }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: (value) => dispatch(TokenAction(value)),
  loginDispatch: (value) => dispatch(LoginAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  tokenDispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;
