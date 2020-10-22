import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './homepage.component';

it('renders HomePage', () => {
  expect(shallow(<HomePage />)).toMatchSnapshot();
});
