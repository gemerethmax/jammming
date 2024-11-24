import React from 'react';
import './Track.css';

function Track(props) {
  
  const clickHandler = () => {
    props.setPlaylist((prev) => [
      ...prev,
      { name: props.name, artist: props.artist, album: props.album, id: props.id, uri: props.uri }, 
    ]);
  };

  return (
    <div>
      <p id="track">
        Song - {props.name} |
        Artist - {props.artist} |
        Album - {props.album}   
        <button onClick={clickHandler}>+</button>
      </p>
    </div>
  );
}

export default Track;