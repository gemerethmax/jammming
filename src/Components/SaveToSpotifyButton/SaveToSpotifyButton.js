import React from 'react';
import './SaveToSpotifyButton.css';

function SaveToSpotifyButton(props) {
  
  const getUserId = async (accessToken) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.id;
  };

  const handleSubmit = async () => {
    try {
      const accessToken = props.accessToken;
      const trackUris = props.playlistValue.map((song) => song.uri);

      // Get the user ID
      const userId = await getUserId(accessToken);

      // Step 1: Create a new playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: props.playlistName,
          description: 'New playlist description',
          public: false, // Set to true if you want the playlist to be public
        }),
      });

      if (!createPlaylistResponse.ok) {
        throw new Error(`HTTP error! Status: ${createPlaylistResponse.status}`);
      }

      const playlistData = await createPlaylistResponse.json();
      const playlistId = playlistData.id;

      // Step 2: Add tracks to the newly created playlist
      const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: trackUris,
        }),
      });

      if (!addTracksResponse.ok) {
        throw new Error(`HTTP error! Status: ${addTracksResponse.status}`);
      }

      console.log('Playlist created and tracks added successfully!');
      props.setPlaylist([]); // Clear the playlist
      alert(`You have saved your ${props.playlistName} playlist to Spotify`);
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  return (
    <div>
      <button id='saveToSpotifyButton' value={props.playlistValue} onClick={handleSubmit}>Save Playlist</button>
    </div>
  );
}

export default SaveToSpotifyButton;