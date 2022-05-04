import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Modules/Pages/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
