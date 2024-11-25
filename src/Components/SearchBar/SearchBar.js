import React from 'react';
import { useState, useEffect } from 'react';
import './SearchBar.css';




function SearchBar(props) {
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
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchItem)}&type=album%2Ctrack%2Cplaylist%2Cartist&market=US&limit=50&offset=0&include_external=audio`, 
            {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${props.accessToken}`, // Include access token in headers
                'Content-Type': 'application/json',
              },
            });

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json(); // Parse JSON response
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
              }
            })
            props.setResults(trackItems);
           
          }
        }, [data]);

        
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
    </div>
  );
}

export default SearchBar;
