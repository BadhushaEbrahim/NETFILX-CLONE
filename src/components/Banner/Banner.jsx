import React, { useEffect, useState } from 'react'
import { API_KEY } from '../../constants/constants'
import { imageUrl } from '../../constants/constants'
import axios from '../../constants/axios'
import "./Banner.css"

function Banner() {
    const [movie, setmovie] = useState()
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
          .then((response) => {
            const { results } = response.data;
            const randomIndex = Math.floor(Math.random() * results.length);
            const randomMovie = results[randomIndex];
            setmovie(randomMovie);
          });
      }, []);
      
    return (

        <div
            style={
                { backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : "movie not found"})` }
            }
            className='Banner'>
            <div className='Banner_Content'>
                <h1 className='Banner_Title'>{movie ? movie.title : ""}</h1>
                <div className='Banner_Button'>
                    <button className='Button'>Play</button>
                    <button className='Button'>My List</button>
                </div>
                <h1 className='Banner_Discription'>{movie ? movie.overview : ""}</h1>
                <div className="Fade_Bottom"></div>
            </div>
        </div>
    )
}

export default Banner