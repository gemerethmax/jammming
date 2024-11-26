import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ setResults, accessToken }) {
  const [searchItem, setSearchItem] = useState('');
  const [data, setData] = useState(null); // State to store API response data
  const [error, setError] = useState(null); // State to handle errors

  const handleClick = async () => {
    if (!searchItem.trim()) {
      setError('Please enter a search term');
      return;
    }

    setError(null);

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchItem)}&type=track`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result); // Save data in state
    } catch (err) {
      setError(`Failed to fetch data: ${err.message}`); // Handle errors
    }
  };

  useEffect(() => {
    if (data) {
      let items = data.tracks.items;
      let trackItems = items.map((song) => {
        return {
          id: song.id,
          name: song.name,
          artist: song.artists[0].name,
          album: song.album.name,
          uri: song.uri,
          preview: song.preview_url
        };
      });
      setResults(trackItems);
    }

    // Cleanup function to reset data state
    return () => {
      setData(null);
    };
  }, [data, setResults]);

  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search by Title, Artist, or Genre"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button id='button' onClick={handleClick}>SEARCH</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SearchBar;
