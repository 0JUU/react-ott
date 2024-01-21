import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import axios from '../api/axios';
import "./Banner.css";
import styled from 'styled-components';

export default function Banner() {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        // 현재 상영 중인 영화 정보 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        // 여러 영화 중 영화 하나의 ID 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;
        // 특정 영화의 상세정보 가져오기(비디오 정보 포함)
        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
            params: {append_to_response: "videos"},
        });
        setMovie(movieDetail);
    }

    // 줄거리 요약
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    if(!isClicked) {
        return (
          <header
              className='banner'
              style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                  backgroundPosition: "top center",
                  backgroundSize: "cover",
              }}
          >
          <div className='banner__contents'>
              <h1 className='banner__title'>{movie.title || movie.name || movie.originam_name}</h1>
              <div className='banner__buttons'>
                  <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
                  <button className='banner__button info'>More Information</button>
              </div>
              <h1 className='banner__description'>{truncate(movie?.overview, 120)}</h1>
          </div>
          <div className='banner__fadeBottom' />
          </header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>
                    <iframe 
                        width="1950" 
                        height="900" 
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="autoplay; fullscreen;" 
                        allowfullscreen
                    ></iframe>
                </HomeContainer>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`;

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;