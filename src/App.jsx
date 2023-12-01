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
    <BrowserRouter>
      <Routes>
        <div className='app'>
          {document.location.pathname !== '/' && (
            < Header />
          )}
          <main>
            <Route path="/" index element={<FirstPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/for-kids" element={<Article />} />
            <Route path="/item" element={<Item />} />
            <Route path="/poem" element={<PoemItem />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pantry" element={<Pantry />} />
          </main>
          {document.location.pathname !== '/' && (
            document.location.pathname === '/home' ? (
              <Footer theme='white' />
            ) : <Footer />
          )}
        </div>
      </Routes>
    </BrowserRouter >
  );
};

export default App;