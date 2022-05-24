import { Component } from 'react';
import { Box, Button } from '@mui/material';

import './errorBoundary.scss';
import { Paths } from '../../../constants';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<errorBoundaryProps, State> {
  constructor(props: errorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className="error-boundary">
          <h4>Что-то пошло не так</h4>
          <h4>Но всё поправимо!</h4>
          <h4>Следуйте инструкциям:</h4>
          <ol className="error-boundary_list">
            <li>
              Для начала нажмите клавишу F5 на своей клавиатуре. В случае, если ошибка не серьезна,
              это поможет.
            </li>
            <li>
              Если ошибка повторяется и нажатие F5 не помогает, попробуйте открыть другие страницы
              сайта: например,{' '}
              <Button
                className="error-boundary_btn"
                variant="text"
                onClick={() => this.props.navigate(Paths.home)}
              >
                {'Страница приветствия'}
              </Button>
              .
            </li>
          </ol>
        </Box>
      );
    }

    return this.props.children;
  }
}
