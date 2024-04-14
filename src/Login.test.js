import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login'; // Adjust the path as necessary

describe('Login component tests', () => {
  test('renders the Login component without crashing', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Login')).toBeInTheDocument();
  });
});
