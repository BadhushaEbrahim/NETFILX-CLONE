import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { API_KEY } from '../../constants/constants';
import axios from '../../constants/axios';
import { imageUrl } from '../../constants/constants';
import "./RowPost.css";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  useEffect(() => {
    axios.get(props.url)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key);
          setShowVideoPlayer(true); // Show the video player
        } else {
          console.log('No videos found for this movie.');
        }
      })
      .catch(error => {
        console.error("Error fetching video for the movie:", error);
      });
  }

  const handleCloseVideo = () => {
    setUrlId(null); // Clear the video ID
    setShowVideoPlayer(false); // Hide the video player
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleMovie(movie.id)}
            className={props.isSmall ? 'smallposter' : 'poster'}
            src={`${imageUrl}${movie.backdrop_path}`}
            alt="Poster"
          />
        ))}
      </div>
      {showVideoPlayer && (
        <div className="video-player">
          <Youtube videoId={urlId} opts={opts} />
          <div className="close-overlay" onClick={handleCloseVideo}>
            <span className="close-button">X</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RowPost;
