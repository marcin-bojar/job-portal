import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { SignUp } from './sign-up.component';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

const mockStore = configureStore([]);
let store = mockStore({});
store.dispatch = jest.fn();
let wrapper;
let props = {};

describe('SignUp component connected to redux store', () => {
  beforeEach(() => {
    props.signUpStart = jest.fn();
    wrapper = shallow(<SignUp store={store} {...props} />);
  });

  it('renders SignUp component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 4 FormInput components', () => {
    expect(wrapper.find(FormInput).length).toEqual(4);
  });

  it('calls signUpStart function when sign up button is clicked', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'signUpStart');
    mount(<SignUp store={store} {...props} />)
      .find(CustomButton)
      .simulate('click')
      .simulate('click');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('handles form input change correctly', () => {
    let mockEvent = {
      target: {
        name: 'displayName',
        value: 'abc',
      },
    };

    const mockState = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    wrapper.instance().setState(mockState);
    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state()).toEqual({
      displayName: 'abc',
      email: '',
      password: '',
      confirmPassword: '',
    });

    mockEvent = {
      target: {
        name: 'email',
        value: 'abc@gmail.com',
      },
    };

    wrapper.instance().handleChange(mockEvent);

    expect(wrapper.state()).toEqual({
      displayName: 'abc',
      email: 'abc@gmail.com',
      password: '',
      confirmPassword: '',
    });
  });
});
