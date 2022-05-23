import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Modules/Pages/Welcome';
import Template from './Modules/Template';
import { SignInSignUp } from './Modules/Pages/signinSignup';
import { Paths } from './constants';
import Board from './Modules/Pages/board';
import { Main } from './Modules/Pages/main';
import './i18n';
import { NotFoundPage } from './Modules/Pages/404';
import Profile from './Modules/Pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.home} element={<Template />}>
          <Route index element={<Welcome />} />
          <Route path={Paths.auth} element={<SignInSignUp />} />
          <Route path={Paths.main} element={<Main />} />
          <Route path={Paths.board} element={<Board />} />
          <Route path={Paths.profile} element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
