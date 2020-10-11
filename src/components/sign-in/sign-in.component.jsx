import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { emailSignInStart } from '../../redux/user/user.actions';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { emailSignIn } = this.props;

    emailSignIn(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="sign-in">
        <h2 className="sign-in__title">Zaloguj się</h2>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            label="Email"
            value={email}
            handleChange={this.handleChange}
            required
          />

          <FormInput
            type="password"
            name="password"
            label="Hasło"
            value={password}
            handleChange={this.handleChange}
            required
          />
          <div className="button-wrapper">
            <CustomButton handleClick={this.handleSubmit}>Zaloguj</CustomButton>
            <CustomButton
              type="button"
              isGoogleSignIn
              handleClick={signInWithGoogle}
            >
              Zaloguj z Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignIn: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
