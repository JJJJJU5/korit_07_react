import { useState, useEffect } from "react";
import Movie from "../components/Movie"


function Home() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async() => {
    const res = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
    const json = await res.json();
    setMovies(json.data.movies)
    setLoading(false);
  }
  useEffect(() => {
    getMovies()
  },[])

  return (
    <div className="home-container">
      {
        isLoading? (
          <h1 className="movie-grid"> 로딩 중🚀</h1>
        ): (
          <div className="movie-grid">
            {
              movies.map(movie => (
                <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image}
                summary={movie.summary}
                title={movie.title}
                genres={movie.genres}
                />))
            }
          </div>
        )

      }
      
    </div>
  );
}

export default Home;