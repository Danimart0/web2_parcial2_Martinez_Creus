// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import RecipePage from './pages/RecipePage';
import CategoryPage from './pages/categoryPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
