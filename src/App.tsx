import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import BrowsePage from './pages/BrowsePage';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/browse" element={<BrowsePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
