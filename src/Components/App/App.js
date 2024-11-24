
import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';


import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Utility/Spotify/Spotify';



function App() {


  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Extract token from URL hash fragment
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

    if (hash.access_token) {
      const expirationTime = new Date().getTime() + hash.expires_in * 1000; // expires_in is in seconds

      // Save token and expiration time
      setAccessToken(hash.access_token);
      localStorage.setItem('spotifyAccessToken', hash.access_token);
      localStorage.setItem('spotifyExpirationTime', expirationTime);

      // Clear the URL to avoid token leaking
      window.history.replaceState({}, document.title, "/");
    } else {
      setError("Access token not found. Please log in to Spotify.");
    }
  }, []);

  // Handle token expiration
  useEffect(() => {
    if (accessToken) {
      const expirationTime = localStorage.getItem('spotifyExpirationTime');
      const currentTime = new Date().getTime();

      // Check if token is expired
      if (currentTime > expirationTime) {
        setAccessToken(null);
        localStorage.removeItem('spotifyAccessToken');
        localStorage.removeItem('spotifyExpirationTime');
        setError("Session expired. Please log in again.");
      } else {
        // Set a timeout to clear the token upon expiration
        const timeout = expirationTime - currentTime;
        const tokenTimeout = setTimeout(() => {
          setAccessToken(null);
          localStorage.removeItem('spotifyAccessToken');
          localStorage.removeItem('spotifyExpirationTime');
          setError("Session expired. Please log in again.");
        }, timeout);

        return () => clearTimeout(tokenTimeout); // Cleanup on component unmount
      }
    }
  }, [accessToken]);

  return (
    <div className="App">
      <header className="App-header">
         <Spotify accessToken={accessToken} setAccessToken={setAccessToken} error={error} setError={setError}/>
      </header>
      <main>
        <SearchBar  accessToken={accessToken} results={results} setResults={setResults}/>  
        <div className="results-playlist">
          <SearchResults value={results} playlist={playlist} setPlaylist={setPlaylist} />
          <Playlist accessToken={accessToken} playlistName={playlistName} setPlaylistName={setPlaylistName} value={playlist} setPlaylist={setPlaylist} />
        </div>
      </main>
    </div>
  );
}

export default App;

















/* My beliefs on what needs to be done:

1. Obtain the Search Bar Value
2. Take the Search Bar Value and pass it to the Spotify API with a fetch the Search Button's onClick event
3. Take the return value from the Spotify API Fetch and display it in the Search Results component with the individual Track components
4. When the user clicks on a Track component, it will be pushed to the Track List component array which will be displayed in the Playlist component
5. When the user clicks on the Save to Spotify Button, the Track List will be saved to the user's Spotify account as a playlist with a post request to the Spotify API

*/

 
  
