// import React from 'react';

// import {StyleSheet, View, Text} from 'react-native';

// const Notification = () => {
//   return (
//     <View style={styles.container}>
//       <Text>Notifications</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//     color: '#fff',
//   },
// });

// export default Notification;


import React, {Component} from 'react';
import {View} from 'react-native';
import styles from '../../components/Post/styles';

export default class MyLayout extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        width: 400,
        height: 400,
        backgroundColor: 'blue',
      }}>
        <View style={{left: 5, top: 5}}>
        <View style={{
          flex: 1,
          width: 166,
          height: 257,
          position: 'absolute',
          backgroundColor: 'red'
        }} />
        <View style={{
          flex: 1,
          width: 166,
          height: 173,
          top: 262,
          position: 'absolute',
          backgroundColor: 'pink'
        }} />
        <View style={{
          flex: 1,
          width: 166,
          height: 125,
          top: 442,
          position: 'absolute',
          backgroundColor: 'yellow'
        }} />
        </View>

        <View style={{right: -5, top: 5}}>
        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          position: 'absolute',
          backgroundColor: 'orange'
        }} />
        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          position: 'absolute',
          backgroundColor: 'green'
        }} />
        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          top: 115,
          position: 'absolute',
          backgroundColor: 'black'
        }} />
        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          top: 115,
          position: 'absolute',
          backgroundColor: 'violet'
        }} />
        <View style={{
          flex: 1,
          width: 215,
          height: 257,
          left: 171,
          top: 230,
          position: 'absolute',
          backgroundColor: 'purple'
        }} />
        <View style={{
          flex: 1,
          width: 215,
          height: 166,
          left: 171,
          top: 495,
          position: 'absolute',
          backgroundColor: 'grey'
        }} />
        </View>
      </View>
    );
  }
};



