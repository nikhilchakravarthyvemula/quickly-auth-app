import React from 'react';
import { render } from '@testing-library/react';
import Signup from './Signup'; // Adjust the path as necessary

describe('Signup component tests', () => {
  test('renders the Signup component without crashing', () => {
    const { getByText } = render(<Signup />);
    expect(getByText('Sign Up')).toBeInTheDocument();
  });
});
