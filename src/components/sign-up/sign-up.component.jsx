import React from 'react';

import FormInput from '../form-input/form-input.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="sign-up__title">Zarejestruj się</h2>
        <FormInput
          type="text"
          name="displayName"
          label="Nazwa"
          value={displayName}
          onChange={this.handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          label="Hasło"
          value={password}
          onChange={this.handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          label="Potwierdź hasło"
          value={confirmPassword}
          onChange={this.handleChange}
          required
        />
      </div>
    );
  }
}

export default SignUp;
