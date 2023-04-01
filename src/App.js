// import React,{useState,useEffect} from 'react';

// import MoviesList from './components/MoviesList';
// import './App.css';

// function App() {

//   const[movies,setMovies]=useState([]);
//   const[loading, setLoading]=useState(false);
//   const[error, setError]=useState(null);
//   const [retryCount, setRetryCount] = useState(0);
//   const [retryTimer, setRetryTimer] = useState(null);


 
//   const fetchMovies = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://swapi.dev/api/film');
//       if (!response.ok) {
//         throw new Error('Something went wrong. Retrying...');
//       }
//       const data = await response.json();
//       const transformedMovies = data.results.map((movieData) => ({
//         id: movieData.episode_id,
//         title: movieData.title,
//         openingText: movieData.opening_crawl,
//         releaseDate: movieData.release_date,
//       }));
//       setMovies(transformedMovies);
//       setLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//       setRetryTimer(setTimeout(fetchMovies, 5000)); // Retry after 5 seconds
//       setRetryCount(retryCount + 1);
//     }
//   };

//   const handleCancelRetry = () => {
//     clearTimeout(retryTimer);
//     setRetryTimer(null);
//     setRetryCount(0);
//   };

//   useEffect(() => {
//     if (retryCount > 0) {
//       console.log(`Retrying API call in ${retryCount * 5} seconds...`);
//     }
//   }, [retryCount]);

//   useEffect(()=>{
   
//   },[]);
//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMovies}>Fetch Movies</button>
//         {retryCount > 0 && (
//           <button onClick={handleCancelRetry}>Cancel Retry</button>
//         )}
//       </section>
//       <section>
//         {!loading && <MoviesList movies={movies} />}
//         {loading && <p>Loading.....</p>}
//         {!loading && error && <p>{error}</p>}
//       </section>
//     </React.Fragment>
//   );
// }

// export default App;
import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;