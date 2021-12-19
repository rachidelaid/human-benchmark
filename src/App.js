import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Reaction from './pages/Reaction';
import Verbal from './pages/Verbal';
import Number from './pages/Number';
import Aim from './pages/Aim';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/reaction" element={<Reaction />} />
        <Route exact path="/verbal" element={<Verbal />} />
        <Route exact path="/number" element={<Number />} />
        <Route exact path="/aim" element={<Aim />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
