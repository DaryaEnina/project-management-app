import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '.';

export default (props: errorBoundaryProps) => {
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  return <ErrorBoundary {...props} navigate={navigate} translate={translate} />;
};
