import { Component, ReactNode } from 'react';
import { Paper } from '@mui/material';

import './errorBoundary.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Paper className="error-boundary">custom error</Paper>;
    }

    return this.props.children;
  }
}
