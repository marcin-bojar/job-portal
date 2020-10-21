import React from 'react';
import { shallow } from 'enzyme';

import CustomButton from './custom-button.component';

describe('CustomButton component', () => {
  it('renders CustomButton correctly', () => {
    const mockProps = {
      children: 'Zaloguj',
    };

    expect(shallow(<CustomButton {...mockProps} />)).toMatchSnapshot();
    expect(shallow(<CustomButton {...mockProps} />).props().children).toEqual(
      'Zaloguj'
    );
  });

  it('handles click event', () => {
    const mockCallback = jest.fn();
    const mockProps = {
      children: 'Zaloguj',
      onClick: mockCallback,
    };

    expect(mockCallback.mock.calls.length).toEqual(0);
    shallow(<CustomButton {...mockProps} />).simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(1);
    shallow(<CustomButton {...mockProps} />).simulate('click');
    expect(mockCallback.mock.calls.length).toEqual(2);
  });

  it('renders Google sign in button correctly', () => {
    const mockProps = {
      isGoogleSignIn: true,
    };

    expect(
      shallow(<CustomButton {...mockProps} />).hasClass('google custom-button')
    );
  });
});
