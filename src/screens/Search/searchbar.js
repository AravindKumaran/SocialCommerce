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
          backgroundColor: '#20232A',
          top: -1,
        }}
        inputContainerStyle={{borderRadius: 30, color: '#20232A'}}
        inputStyle={{
          fontFamily: 'Proxima Nova',
          fontSize: 15,
          fontWeight: '400',
          color: '#ffffff',
          left: 5,
        }}
        searchIcon={{left: 6, size: 25, color: '#ffffff'}}
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

// import { SearchBar } from 'react-native-elements';
// import React from 'react';
// import {StyleSheet, View, Text, Image} from 'react-native';
// import { Col, Row, Grid } from "react-native-easy-grid";

// export default class Notification extends React.Component {
//   state = {
//     search: '',
//   };

//   updateSearch = (search) => {
//     this.setState({ search });
//   };

//   render() {
//     const { search } = this.state;

//     return (
//       <View style={styles.container}>

//         <View>
//           <SearchBar
//             containerStyle={{borderRadius: 40, width: '100%', backgroundColor: 'white', top: -1}}
//             inputContainerStyle={{borderRadius: 20, color: '#282D34'}}
//             inputStyle={{fontFamily: 'Proxima Nova', fontSize: 15, fontWeight: '400', color: '#51565E', left: 5, }}
//             searchIcon={{left: 6, size: 25, color: '#ffffff'}}
//             placeholder="Search"
//             onChangeText={this.updateSearch}
//             value={search}
//           />
//         </View>

//         <View style={{top: -66}}>
//           <Image style={{top: 64, position: 'absolute', right: 15}} source={require('../../assets/images/Line2.png')} size={25} />
//           <Image style={{top: 220, position: 'absolute', right: 15}} source={require('../../assets/images/Line2.png')} size={25} />
//           <Text style={{top: 80, position: 'absolute', left: 50, color: '#282D34', fontWeight: '700', fontFamily: 'Proxima Nova', }}>Categories</Text>
//           <Text style={{top: 80, position: 'absolute', right: 50, color: '#282D34', fontWeight: '700', fontFamily: 'Proxima Nova', }}>Brands</Text>
//           <Text style={{top: 240, position: 'absolute', left: 150, color: '#282D34', fontWeight: '700', fontFamily: 'Proxima Nova', }}>Top Trending</Text>
//         </View>

//         <View style={{alignContent: 'space-around', top: 20}}>
//         <Image style={{top: 40, position: 'absolute', left: 20, width:50, height: 50}} source={require('../../assets/images/Image1.png')} size={15} />
//           <Text style={{top: 100, position: 'absolute', left: 30, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', }}>Men</Text>

//         <Image style={{top: 40, position: 'absolute', left: 100, width:50, height: 50}} source={require('../../assets/images/Image2.png')} size={25} />
//           <Text style={{top: 100, position: 'absolute', left: 100, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', }}>Women</Text>

//         <Image style={{top: 40, position: 'absolute', left: 170, width:50, height: 50}} source={require('../../assets/images/Image3.png')} size={25} />
//           <Text style={{top: 100, position: 'absolute', left: 180, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', }}>Kids</Text>

//         <Image style={{top: 40, position: 'absolute', right: 100, width:50, height: 50}} source={require('../../assets/images/Image4.png')} size={25} />
//           <Text style={{top: 100, position: 'absolute', right: 100, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', }}>Apparels</Text>

//         <Image style={{top: 40, position: 'absolute', right: 30, width:50, height: 50}} source={require('../../assets/images/Image5.png')} size={25} />
//           <Text style={{top: 100, position: 'absolute', right: 30, color: '#282D34', fontWeight: '400', fontFamily: 'Proxima Nova', }}>Beauty</Text>
//         </View>

//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container:{

//   }
// })
