import React from 'react';
import Track from '../Track/Track';
import './SearchResults.css';

function SearchResults(props) {

  const [count, setCount] = React.useState(0);

  const tracklist = props.value.map((song) => (
    <Track
      name={song.name}
      artist={song.artist}
      album={song.album}
      id={song.id} 
      uri={song.uri}
      setPlaylist={props.setPlaylist}
      preview={song.preview}
      
    />
  ));

    

  return (
    <div>
    <h2 className='searchResults'>Search Results</h2>
      {count === 0 && tracklist.slice(0, 20).map((track, index) => (
        <div key={index}>{track}</div>
      ))}
      {count === 1 && tracklist.slice(0, 30).map((track, index) => (
        <div key={index}>{track}</div>
      ))}
      {count === 2 && tracklist.slice(0, 40).map((track, index) => (
        <div key={index}>{track}</div>
      ))}
      {count === 3 && tracklist.slice(0, 50).map((track, index) => (
        <div key={index}>{track}</div>
      ))}
      {count >= 4 && tracklist.slice(0, 50).map((track, index) => (
        <div key={index}>{track}</div>
      ))}
      {count >= 4 && <p style={{ color: 'Red', fontSize: 24, fontWeight: 'bold'}}>Sorry, no more results available!</p>}
        <button onClick={() => setCount(prevCount => prevCount + 1)} id="showMoreButton">Show More Results</button>
      </div>
  );
}

export default SearchResults;