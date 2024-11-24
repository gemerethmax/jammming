import React from 'react';
import Track from '../Track/Track';
import './SearchResults.css';

function SearchResults(props) {
  const tracklist = props.value.map((song) => (
    <Track
      name={song.name}
      artist={song.artist}
      album={song.album}
      id={song.id} 
      uri={song.uri}
      setPlaylist={props.setPlaylist}
      
    />
  ));

  return (
    <div>
      <h2 class='searchResults'>Search Results</h2>
      <div>{tracklist}</div>
    </div>
  );
}

export default SearchResults;