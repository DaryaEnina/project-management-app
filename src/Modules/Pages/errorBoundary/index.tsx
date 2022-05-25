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
    const { translate } = this.props;
    const { error } = this.state;

    if (this.state.hasError) {
      return (
        <Box className="error-boundary">
          <h3>{translate('something-went-wrong')}</h3>
          <h3>{translate('but-everything-is-fixable')}</h3>
          <h3>{translate('follow-the-instructions')}</h3>
          <ol className="error-boundary_list">
            <li>{translate('error-boundary-list-item-1')}</li>
            <li>
              {translate('error-boundary-list-item-2')}{' '}
              <Button
                className="error-boundary_btn"
                variant="text"
                onClick={() => this.props.navigate(Paths.home)}
              >
                {translate('welcome-page')}
              </Button>
              .
            </li>
            <li>{translate('error-boundary-list-item-3')}</li>
            <li>{translate('error-boundary-list-item-4', { error: error })}</li>
            <li>{translate('error-boundary-list-item-5')}</li>
          </ol>
          <div>{translate('error-boundary-thank-you')}</div>
        </Box>
      );
    }

    return this.props.children;
  }
}
