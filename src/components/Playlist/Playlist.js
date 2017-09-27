import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={"New Playlist"}/>
          <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks}/>
          <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}

export default Playlist;
