import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import FirstPage from './pages/FirstPage/FirstPage';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Article from './pages/Article/Article';
import Item from './pages/Item/Item';
import Gallery from './pages/Gallery/Gallery';
import Pantry from './pages/Pantry/Pantry';
import PoemItem from './pages/PoemItem/PoemItem';

const App = () => {
  return (
    <div className='app'>
      {document.location.pathname !== '/' && (
        <Header />
      )}
      <main>
          <Routes>
            <Route path="/" index element={<FirstPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/for-kids" element={<Article />} />
            <Route path="/item" element={<Item />} />
            <Route path="/poem" element={<PoemItem />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pantry" element={<Pantry />} />
          </Routes>
      </main>
      {document.location.pathname !== '/' && (
        document.location.pathname === '/home' ? (
          <Footer theme='white' />
        ) : <Footer />
      )}
    </div>
  );
};

export default App;