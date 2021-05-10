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
    this.setState({search},()=>this.props.onSearch(this.state.search));   
  };
  
  render() {
    const {search} = this.state;

    return (
      <SearchBar
        containerStyle={{
          borderRadius: 40,
          width: '100%',
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#585858',
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
          fontSize: 15,
          fontWeight: '400',
          color: '#ffffff',
          left: 5,
        }}
        searchIcon={{left: 6, size: 25, color: '#ffffff'}}
        placeholder="Search"
        placeholderTextColor="#ffffff"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
