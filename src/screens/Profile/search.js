import React from 'react';
import  { Component } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";


import { SearchBar } from 'react-native-elements';

export default class Searchbar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
        <SearchBar
                    containerStyle={{borderRadius: 40, width: '100%', backgroundColor: '#1A1A1A', top: -1, height: 30}}
                    inputContainerStyle={{borderRadius: 30, color: '#181818', height: 35}}
                    inputStyle={{fontFamily: 'Proxima Nova', fontSize: 15, fontWeight: '400', color: '#51565E', left: 5, }}
                    searchIcon={{left: 6, size: 25, color: '#ffffff'}}
                    placeholder="Search Followers"
                    onChangeText={this.updateSearch}
                    value={search}
                  />
    );
  }
}
