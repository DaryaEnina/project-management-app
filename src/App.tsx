import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Modules/Pages/Welcome';
import Template from './Modules/Template';
import { Login } from './Modules/Pages/login';
import { Paths } from './constants';
import Board from './Modules/Pages/board';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Paths.home} element={<Template />}>
          <Route index element={<Welcome />} />
          <Route path={Paths.login} element={<Login />} />
          <Route path={Paths.board} element={<Board />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
