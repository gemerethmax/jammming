import React from 'react';
import './Spotify.css';

function Spotify({accessToken}) {
  
 ;

  const clientId = '4ef475061ffd426f8eb2c3648d409095';
  const redirectUri = 'http://localhost:3000/callback';
  const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(clientId)}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  
  return (
    <div>
      <h1>Jammming</h1>
      
      {accessToken ? (
        <div>
          <h2>Success!</h2>
          <p>You're logged in to Spotify!</p>
        </div>
      ) : (
        <> 
          <a href={authUrl}>Please log in to Spotify here</a>
        </>
      )}
    </div>
  );
}

export default Spotify;