import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
      this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(event) {
    this.setState({searchTerm:event.target.value});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button  onClick={this.search}>SEARCH</button>
      </div>
    )
  }
}

export default SearchBar;
