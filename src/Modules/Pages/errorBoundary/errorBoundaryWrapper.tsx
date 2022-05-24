import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '.';

export default (props: errorBoundaryProps) => {
  const navigate = useNavigate();

  return <ErrorBoundary {...props} navigate={navigate} />;
};
