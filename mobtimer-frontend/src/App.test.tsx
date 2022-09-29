import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: Unskip test and get working
test('renders mob', () => {
  render(<App />);
  const element = screen.getByText("Welcome to our amazing mob timer!");
  // expect(element).toBeInTheDocument();
});
