// import React, {Component} from 'react';
// import { View, StyleSheet } from 'react-native';
// import Video from 'react-native-video';
// import InViewPort from 'react-native-inviewport'; 
// // import { Video } from 'expo-av';
// // import InViewPort from './InViewPort';

// // this wouldn't work in the snack so I just copied the file and added it manually.

// export default class VideoPlayer extends React.Component {

//   pauseVideo = () => {
//     if(this.video) {
//       this.video.pauseAsync();
//     }
//   }

//   playVideo = () => {
//     if(this.video) {
//       this.video.playAsync();
//     }
//   }

//   handlePlaying = (isVisible) => {
//     isVisible ? this.playVideo() : this.pauseVideo();
//   }

//   render() {
//       return (
//         <View style={styles.container}>
//          <InViewPort onChange={this.handlePlaying}>
//           <Video
//             ref={ref => {this.video = ref}}
//             source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
//             rate={1.0}
//             volume={1.0}
//             isMuted={false}
//             resizeMode="cover"
//             shouldPlay
//             style={{ width: 300, height: 300 }}
//           />
//           </InViewPort>
//         </View>
//       )
//   }  
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });