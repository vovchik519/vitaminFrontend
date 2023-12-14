import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import FirstPage from './pages/FirstPage/FirstPage';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Article from './pages/Article/Article';
import Item from './pages/Item/Item';
import Gallery from './pages/Gallery/Gallery';
import Pantry from './pages/Pantry/Pantry';
import PoemItem from './pages/PoemItem/PoemItem';
import Preloader from './components/Preloader/Preloader';

const App = () => {
  let server = 'https://vitamin-strapi.onrender.com';
  let lang = localStorage.getItem('selectedLanguage');
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [navigation]);

  const location = useLocation().pathname;
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='app'>
      {isLoading ? (
        <Preloader />
      ) : null}
      <div>
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
      </div>
    </div>

  );
};

export default App;