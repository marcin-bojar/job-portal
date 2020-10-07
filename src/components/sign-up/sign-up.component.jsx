import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  auth,
  createUserDocumentFromUserAuth,
} from '../../firebase/firebase.utils';

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

  handleSubmit = async e => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Hasła nie są takie same! Spróbuj ponownie.');
    } else {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        alert(`Gratulacje ${displayName}, Twoje konto zostało utworzone`);
        createUserDocumentFromUserAuth(user, { displayName });
        this.setState({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="sign-up__title">Zarejestruj się</h2>
        <form>
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
          <div className="button-wrapper">
            <CustomButton handleClick={this.handleSubmit}>
              Zarejestruj
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
