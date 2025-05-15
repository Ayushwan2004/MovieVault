import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Watchlist from './components/Watchlist';
import Banner from './components/Banner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  let [watchList, setwatchList] = useState([]);

  let HandleAddToWatchList = (movieObj) => {
    let newWatchlist = [...watchList, movieObj];
    setwatchList(newWatchlist);
    localStorage.setItem('MoviesApp', JSON.stringify(newWatchlist));
    console.log(newWatchlist);
  };

  let HandleRemoveFromWatchList = (movieObj) => {
    let FilteredWatchList = watchList.filter((movie) => movie.id !== movieObj.id);
    setwatchList(FilteredWatchList);
    localStorage.setItem('MoviesApp', JSON.stringify(FilteredWatchList));
    console.log(FilteredWatchList);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('MoviesApp');
    if (moviesFromLocalStorage) {
      setwatchList(JSON.parse(moviesFromLocalStorage));
    }
  }, []); // ← run once on component mount

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                HandleAddToWatchList={HandleAddToWatchList}
                HandleRemoveFromWatchList={HandleRemoveFromWatchList}
                watchList={watchList}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchList={watchList} setwatchList={setwatchList}
              HandleRemoveFromWatchList={HandleRemoveFromWatchList}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
