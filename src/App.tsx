import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Modules/Pages/Welcome';
import Template from './Modules/Template';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Welcome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
