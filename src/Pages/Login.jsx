import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      email: '',
      btnLoginDisabled: true,

    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validateEmail = () => {
    const regularExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const { login, email } = this.state;
    const minLength = 3;
  }

  render() {
    const { login, email, btnLoginDisabled } = this.state;
    return (
      <div>
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
            type="text"
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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
