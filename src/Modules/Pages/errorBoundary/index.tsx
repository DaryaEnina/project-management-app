import { Component } from 'react';
import { Box, Button } from '@mui/material';

import './errorBoundary.scss';
import { Paths } from '../../../constants';

interface State {
  hasError: boolean;
  error: string;
}

export class ErrorBoundary extends Component<errorBoundaryProps, State> {
  constructor(props: errorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true, error: _.message as string };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box className="error-boundary">
          <h3>Что-то пошло не так</h3>
          <h3>Но всё поправимо!</h3>
          <h3>Следуйте инструкциям:</h3>
          <ol className="error-boundary_list">
            <li>
              Для начала нажмите клавишу F5 на своей клавиатуре. В случае, если ошибка не серьезна,
              это поможет.
            </li>
            <li>
              Если ошибка повторяется и нажатие F5 не помогает, попробуйте открыть другие страницы
              сайта и нажмите клавишу F5: например,{' '}
              <Button
                className="error-boundary_btn"
                variant="text"
                onClick={() => this.props.navigate(Paths.home)}
              >
                {'Страница приветствия'}
              </Button>
              .
            </li>
            <li>
              Если другие страницы сайта открываются, а недоступна лишь текущая, попробуйте
              вернуться к ней через некоторое время. Возможно, на сайте ведутся профилактические
              работы.
            </li>
            <li>
              Если же ошибка на данной странице повторяется постоянно, напишите нам о ней с
              подробным описанием: в каком случае проявляется, какой url страницы, какой текст
              ошибки ({this.state.error}), на какую почту вы зарегистрированы на нашем сайте — на
              адрес support@pma.by.
            </li>
            <li>
              Если работа сайта нестабильна, недоступно большинство страниц, — значит, проблема
              серьезная и с ней уже разбираются. Пожалуйста, запаситесь терпением.
            </li>
          </ol>
          <div>Спасибо, что выбираете нас!</div>
        </Box>
      );
    }

    return this.props.children;
  }
}
