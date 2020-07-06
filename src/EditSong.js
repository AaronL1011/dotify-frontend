import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const EditSong = (props) => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/songs/${props.songId}`)
      .then((res) => {
        setIsLoading(false);
        setSongTitle(res.data.title);
        setSongArtist(res.data.artist);
      })
      .catch((e) => {
        setErrorMessage('There was a problem, please refresh and try again');
        setIsLoading(false);
      });
  }, [props.songId]);

  function editSong() {
    axios
      .put(`https://thawing-peak-04701.herokuapp.com/songs/${props.songId}`, {
        song: {
          title: songTitle,
          artist: songArtist
        }
      })
      .then(() => setIsEdited(true))
      .catch(() => setErrorMessage('Something went wrong'));
  }

  return (
    <div>
      {errorMessage && <h3>{errorMessage}</h3>}
      {!isLoading ? (
        <div>
          <input
            placeholder='Song Title'
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <input
            placeholder='Song Artist'
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />
          <button onClick={editSong}>Update Song</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      {isEdited && <Redirect to={`/songs/${props.songId}`} />}
      <Link to='/'>View all songs</Link>
    </div>
  );
};

export default EditSong;
