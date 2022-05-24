import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';

import './index.scss';
import { store } from './store/store';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>
);
