import React from 'react';
import {SearchBar} from 'react-native-elements';

export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({search}, () => this.props.onSearch(this.state.search));
  };

  foc = (event) => {
    if (event.key === 'Enter') {
      this.updateSearch;
      console.log('not pressed');
    } else {
      this.props.onSearch(this.state.search);
      console.log('pressed');
    }
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        containerStyle={{
          borderRadius: 40,
          width: '100%',
          backgroundColor: 'transparent',
          borderTopWidth: 1,
          borderTopColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#3F464F',
        }}
        inputContainerStyle={{
          borderRadius: 30,
          color: '#181818',
          height: 40,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#3F464F',
          borderBottomWidth: 1,
          borderBottomColor: '#3F464F',
          margin: 8,
          bottom: 5,
        }}
        inputStyle={{
          fontFamily: 'Proxima Nova',
          fontSize: 12,
          fontWeight: '400',
          color: '#ffffff',
          left: 5,
        }}
        searchIcon={{left: 6, size: 25, color: '#ffffff'}}
        placeholder="Search Settings"
        placeholderTextColor="#7D7D7D"
        onChangeText={this.updateSearch}
        value={search}
        onEndEditing={this.foc}
      />
    );
  }
}
