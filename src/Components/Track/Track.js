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
    <section id="track">
      <img id="trackPreview" src={props.img} alt={`${props.album} cover`} />
      <span>Song - {props.name} | </span>
      <span>Artist - {props.artist} | </span>
      <span>Album - {props.album} | </span>
      {props.preview && (
        <audio controls src={props.preview}>
          Your browser does not support the audio element.
        </audio>
      )}
      <button onClick={clickHandler}>+</button>
    </section>
  </div>
);
}

export default Track;