import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults:[],
      playlistName:'',
      playlistTracks:[]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {

    let tracksInList = this.state.playlistTracks;
    if (!tracksInList.includes(track)) {
      tracksInList.push(track);
    }

    this.setState({playlistTracks:tracksInList});
  }

  removeTrack(track) {
    let tracksInList = this.state.playlistTracks;
    tracksInList.splice(track.id,1);

    this.setState({playlistTracks:tracksInList});
  }

  updatePlaylistName(name) {
    this.setState({playlistName:name});
  }

  savePlaylist() {
    let tracksInList = this.state.playlistTracks;
    let trackUris = [];
    tracksInList.forEach(track => {
      trackUris.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({playlistName:'New Playlist', playlistTracks: []});
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults:searchResults});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
