import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const[movies,setMovies]=useState([]);
  const[loading, setLoading]=useState(false);

  async function fetchMoviesHandler(){
    setLoading(true);
   const response= await fetch('https://swapi.dev/api/films');
      const data=await response.json();
  
      const transFormedMovies=data.results.map(movieData=>{
        return{
          id : movieData.episode_id,
          title : movieData.title,
          openingText : movieData.opening_crawl,
          releaseDate : movieData.release_date
        };
      });
     setMovies(transFormedMovies);
    setLoading(false);
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!loading && <MoviesList movies={movies} />}
        {loading && <p>Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
