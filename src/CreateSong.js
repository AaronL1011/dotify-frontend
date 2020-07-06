import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const CreateSong = () => {
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function createSong() {
    axios
      .post(`https://thawing-peak-04701.herokuapp.com/songs`, {
        song: {
          title: songTitle,
          artist: songArtist
        }
      })
      .then(() => setIsCreated(true))
      .catch(() => setErrorMessage('Something went wrong'));
  }

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
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
      <button onClick={createSong}>Create Song</button>
      {isCreated && <Redirect to='/' />}
    </div>
  );
};

export default CreateSong;
