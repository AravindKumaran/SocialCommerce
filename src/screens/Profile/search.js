import React from 'react';
import {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {SearchBar} from 'react-native-elements';

export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({search});
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
          borderBottomColor: 'transparent',
        }}
        inputContainerStyle={{
          borderRadius: 30,
          color: '#181818',
          height: 35,
          backgroundColor: '#181818',
          borderTopWidth: 1,
          borderTopColor: '#3F464F',
        }}
        inputStyle={{
          fontFamily: 'Proxima Nova',
          fontSize: 15,
          fontWeight: '400',
          color: '#ffffff',
          left: 5,
        }}
        searchIcon={{left: 6, size: 25, color: '#ffffff'}}
        placeholder="Search followers"
        placeholderTextColor="#51565E"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
