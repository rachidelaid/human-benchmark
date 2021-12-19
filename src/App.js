import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Reaction from './pages/Reaction';
import Verbal from './pages/Verbal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/reaction" element={<Reaction />} />
        <Route exact path="/verbal" element={<Verbal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
