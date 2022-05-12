import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Task from './Task';

describe('<Task />', () => {
  test('it should mount', () => {
    render(<Task title="title" order={1} id="id" />);

    const task = screen.getByTestId('title');

    expect(task).toBeInTheDocument();
  });
});
