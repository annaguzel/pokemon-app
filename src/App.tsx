import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokeList from './components/PokeList/PokeList';
import PokeDetail from './components/PokeDetail/PokeDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pokemon/:id" element={<PokeDetail />} />
        <Route path="/" element={<PokeList />} />
      </Routes>
    </Router>
  );
};

export default App;
