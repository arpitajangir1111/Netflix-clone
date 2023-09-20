import { useEffect, useState } from "react";
import axios from "axios";
// import "./netflix.css";
// import netflixLogo from "./netflix-logo.png";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [stickySidebar, setStickySidebar] = useState(false);
  const img_base_path = "https://image.tmdb.org/t/p/original";
  const [showModal, setShowModal] = useState(false);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(
"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=85d9064ce389e960842c1be1e19a8e14"
        
      );
      setMovies(response1.data.results);
      console.log(await movieTrailer("Fast X"));
    }
    fetchData();

    async function getGenreList() {
      const response2 = await axios.get(
"https://api.themoviedb.org/3/genre/movie/list?language=en'&api_key=85d9064ce389e960842c1be1e19a8e14"
        
      );
      setGenres(response2.data.genres);
    }
    getGenreList();

    window.addEventListener("scroll", toggleSidebarStickyness);

    return () => {
      window.removeEventListener("scroll", toggleSidebarStickyness);
    };
  }, []);

  function toggleSidebarStickyness() {
    window.onscroll = () => {
      window.scrollY > 70 ? setStickySidebar(true) : setStickySidebar(false);
    };
  }

  function filterByGenre(e, id) {
    e.preventDefault();
    if (id === "ALL") setFilteredMovies(null);
    else {
      setFilteredMovies(null);
      setFilteredMovies(
        movies.filter((movie) => {
          return movie.genre_ids.includes(id);
        })
      );
      setSelectedGenre(
        genres.find((genre) => {
          return genre.id === id;
        }).name
      );
    }
  }

  async function watchTrailer(e, title) {
    e.preventDefault();
    const trailerURL = await movieTrailer(title);
    if (trailerURL) setShowModal(trailerURL.split("?v=")[1]);
  }

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="iframe-wrapper">
            <CloseIcon className="close-modal" onClick={() => setShowModal(false)}/>
            {<YouTube videoId={showModal} opts={opts} />}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="netflix">
        <div className="sidebar">
          <div className="logo">
             <img src="https://machow2.com/wp-content/uploads/2021/03/netflix-for-mac-cover.png" alt="" />
          </div>
          <ul
            style={
              stickySidebar
                ? { position: "sticky", top: "0" }
                : { position: "relative" }
            }
          >
            <li>
              <a href="" onClick={(e) => filterByGenre(e, "ALL")}>
                ALL
              </a>
            </li>
            {genres.map((genre, index) => {
              return (
                <li key={index}>
                  <a
                    href={"/genre/" + genre.id}
                    onClick={(e) => filterByGenre(e, genre.id)}
                  >
                    {genre.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {filteredMovies && filteredMovies.length > 0 ? (
          <div className="movies">
            <h3>Genre: {selectedGenre}</h3>
            <div className="movie-wrapper">
              {filteredMovies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={img_base_path + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : filteredMovies !== null && filteredMovies.length === 0 ? (
          <div className="movies">
            <h3>No Movie for this genre</h3>
          </div>
        ) : movies.length > 0 ? (
          <div className="movies">
            {/* <YouTube
              videoId="i3F4zEOfYWA"
              opts={opts}
            /> */}
            <div className="movie-wrapper">
              {movies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={img_base_path + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                    <a className="trailer-link" href="" onClick={(e) => watchTrailer(e, movie.title)}>
                      Watch Trailer
                    </a>
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;









// 'https://image.tmdb.org/t/p/original'

// "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=85d9064ce389e960842c1be1e19a8e14"


"https://api.themoviedb.org/3/genre/movie/list?language=en'&api_key=85d9064ce389e960842c1be1e19a8e14"

















