import React, { MouseEventHandler } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalNewBoard from './ModalNewBoard';

describe('<ModalNewBoard />', () => {
  const func: MouseEventHandler = () => {
    console.log('handler');
  };
  test('it should mount', () => {
    render(<ModalNewBoard message="ModalNewBoard" isOpen={true} onClose={func} />);

    const modalNewBoard = screen.getByTestId('ModalNewBoard');

    expect(modalNewBoard).toBeInTheDocument();
  });
});
