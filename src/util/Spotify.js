let accessToken;

const redirectUri = "http://sad-bucket.surge.sh";
const clientId = "a0100935745f465f9cee3261eeabb101";

const Spotify = {
  getAccessToken() {

    if(accessToken) {
      return accessToken;
    }

    const returnedToken = window.location.href.match(/access_token=([^&]*)/);
    const returnedExpiry = window.location.href.match(/expires_in=([^&]*)/);

    if(returnedToken && returnedExpiry) {
      accessToken = returnedToken[1];
      const expiresIn = Number(returnedExpiry[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authorizeUrl;
    }

  },

  search(term) {
   const token = Spotify.getAccessToken();
   return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
     headers: { Authorization: `Bearer ${token}` }
   }).then(response => {
     return response.json();
   }).then(jsonResponse => {
     if (jsonResponse.tracks) {
       return jsonResponse.tracks.items.map(track => ({
         id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
       }));
     } else {
       return [];
     }
   });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const token = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` }

    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
        headers:headers,
        method:'POST',
        body:JSON.stringify({name:name})
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
          const playlistID = jsonResponse.id

          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
            headers:headers,
            method:'POST',
            body:JSON.stringify({uris:trackUris})
          });
      });
    });
  }
};

export default Spotify;
