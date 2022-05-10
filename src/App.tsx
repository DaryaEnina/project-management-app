import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Modules/Pages/Welcome';
import Template from './Modules/Template';
import { SignInSignUp } from './Modules/Pages/signinSignup';
import { Paths } from './constants';
import Board from './Modules/Pages/board';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.home} element={<Template />}>
          <Route index element={<Welcome />} />
          <Route path={Paths.signIn} element={<SignInSignUp isRegistrationMode={false} />} />
          <Route path={Paths.signUp} element={<SignInSignUp isRegistrationMode={true} />} />
          <Route path={Paths.board} element={<Board />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
