import React from 'react';
import axios from 'axios';

const DeleteSong = ({ songId, onDelete }) => {
  function deleteSong() {
    axios
      .delete(`https://thawing-peak-04701.herokuapp.com/songs/${songId}`)
      .then(onDelete);
  }

  return <button onClick={deleteSong}>X</button>;
};

export default DeleteSong;
