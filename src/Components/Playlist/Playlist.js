import React from 'react';
import './Playlist.css';
import SaveToSpotifyButton from '../SaveToSpotifyButton/SaveToSpotifyButton';

function Playlist(props) {

  const removeSong = (id) => {
    const newPlaylist = props.value.filter((song) => song.id !== id);
    props.setPlaylist(newPlaylist);
  };

  const handleChange = (e) => {
    props.setPlaylistName(e.target.value);
  };


  return (
    <div class='playlist'>
      <h2 id='h2'>Playlist</h2>
      <input id='playlistInput' onChange={handleChange} type="text" placeholder="Playlist Name" />
      <ul>
        {props.value.map((song) => (
          <li key={song.id} className="playlistItem">
            {song.name} | {song.artist} | {song.album}
            <button onClick={() => removeSong(song.id)}>-</button>
          </li>
        ))}
      </ul>
      <SaveToSpotifyButton 
        accessToken={props.accessToken}
        setPlaylistName={props.setPlaylistName} 
        playlistValue={props.value} 
        playlistName={props.playlistName} 
        setPlaylist={props.setPlaylist}
        />
    </div>
  );
}

export default Playlist;