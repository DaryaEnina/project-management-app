import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Column from './Column';

describe('<Column />', () => {
  test('it should mount', () => {
    render(<Column title="title" order={1} id="id" tasks={[]} />);

    const title = screen.getByTestId('title');

    expect(title).toBeInTheDocument();
  });
});
