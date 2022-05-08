import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Column from './Column';

describe('<Column />', () => {
  test('it should mount', () => {
    render(<Column />);

    const column = screen.getByTestId('Column');

    expect(column).toBeInTheDocument();
  });
});
