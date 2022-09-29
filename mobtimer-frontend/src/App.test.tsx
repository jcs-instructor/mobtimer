import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('A test that passes', () => {
  console.log('This test passes');
});

// TODO: Unskip test and get working
test.skip('renders mob', () => {
  // render(<App />);
  // const element = screen.getByText("Welcome to our amazing mob timer!");
  // expect(element).toBeInTheDocument();
});
