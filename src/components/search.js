import React from 'react';

import initAutocomplete from '../utils/autocomplete';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  dropState() {
    this.setState({
      text: '',
      term: ''
    });
  }

  componentDidMount() {
    initAutocomplete('autocomplete', this.props.updatePlaces, this.dropState.bind(this));
  }

  handlePlaceChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          className="search-field"
          id="autocomplete"
          onChange={this.handlePlaceChange}
          placeholder="Enter place name"
          value={this.state.term}
        />
      </div>
    );
  }
}
