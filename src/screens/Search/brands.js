import { coverer } from 'aws-amplify-react-native/dist/AmplifyUI';
import React, {Component, useState} from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { FlatList, ScrollView } from 'react-native';
import styles from '../../components/Post/styles';
// import Video from 'react-native-af-video-player'
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';

const Brands = () => {
  const [paused, setPaused] = useState(false);
  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  return (
      <View style={{
        flex: 1,
        width: 400,
        height: 400,
        top: 150,
        backgroundColor: '#20232A'
      }}>
        <View style={{left: 5, top: 5}}>
        {/* <TouchableWithoutFeedback onPress={onPlayPausePress}> */}
        <View style={{
          flex: 1,
          width: 166,
          height: 257,
          position: 'absolute',
          // backgroundColor: 'red'
        }} >
        <Video
        repeat={false}
        // paused={true}
        // thumbnail={{ uri: 'https://th.bing.com/th/id/OPA.0wlIXou2gXpavQ474C474?w=160&h=220&rs=1&o=5&dpr=1.25&pid=21.1' }}
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        
        {/* <Image source={require('../../assets/images/R1.png')} />  */}
        </View>
        {/* </TouchableWithoutFeedback> */}
        <View style={{
          flex: 1,
          width: 166,
          height: 173,
          top: 262,
          position: 'absolute',
          // backgroundColor: 'pink'
        }} >
        <Video
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R2.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 166,
          height: 120,
          top: 442,
          position: 'absolute',
          // backgroundColor: 'yellow'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R3.png')} />  */}
        </View>

        </View>

        <View style={{right: -5, top: 5}}>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          position: 'absolute',
          // backgroundColor: 'orange'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R4.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          position: 'absolute',
          // backgroundColor: 'green'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R5.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 171,
          top: 115,
          position: 'absolute',
          // backgroundColor: 'black'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R6.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 103,
          height: 108,
          left: 280,
          top: 115,
          position: 'absolute',
          // backgroundColor: 'violet'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R7.png')} />  */}
        </View>

        <View style={{
          flex: 1,
          width: 215,
          height: 257,
          left: 171,
          top: 230,
          position: 'absolute',
          // backgroundColor: 'purple'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>
        
        <View style={{
          flex: 1,
          width: 215,
          height: 166,
          left: 171,
          top: 495,
          position: 'absolute',
          // backgroundColor: 'grey'
        }} >
        <Video 
        source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"}} 
        resizeMode='cover'
        style={StyleSheet.absoluteFill}
        />
        {/* <Image source={require('../../assets/images/R8.png')} />  */}
        </View>
        </View>
      </View>
  );
};

export default Brands;