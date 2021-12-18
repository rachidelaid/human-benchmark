import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Reaction from './pages/Reaction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/reaction" element={<Reaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
