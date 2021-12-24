import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Reaction from './pages/Reaction';
import Verbal from './pages/Verbal';
import Number from './pages/Number';
import Aim from './pages/Aim';
import Sequence from './pages/Sequence';
import Visual from './pages/Visual';
import Chimp from './pages/Chimp';
import Typing from './pages/Typing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/reaction" element={<Reaction />} />
        <Route exact path="/verbal" element={<Verbal />} />
        <Route exact path="/number" element={<Number />} />
        <Route exact path="/aim" element={<Aim />} />
        <Route exact path="/sequence" element={<Sequence />} />
        <Route exact path="/visual" element={<Visual />} />
        <Route exact path="/chimp" element={<Chimp />} />
        <Route exact path="/typing" element={<Typing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
