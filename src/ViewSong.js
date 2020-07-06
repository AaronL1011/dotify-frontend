import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewSong = (props) => {
  const [song, setSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(`https://thawing-peak-04701.herokuapp.com/songs/${props.songId}`)
      .then((res) => {
        setIsLoading(false);
        setSong(res.data);
      })
      .catch((e) => {
        setErrorMessage('There was a problem, please refresh and try again');
        setIsLoading(false);
      });
  }, [props.songId]);

  return (
    <div>
      {errorMessage && <h3>{errorMessage}</h3>}
      {!isLoading ? (
        <li>
          {song.title} by {song.artist}
        </li>
      ) : (
        <h2>Loading...</h2>
      )}
      <Link to='/'>View all songs</Link>&nbsp;
      <Link to={`/songs/${song.id}/edit`}>Edit this Song</Link>
    </div>
  );
};

export default ViewSong;
