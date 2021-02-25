import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,Image,
  View, TouchableOpacity, Dimensions
} from 'react-native';

const In = () => {
  const user = [
    {
      name: 'Tamil25',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      comment: 'This is a good Product',
      createdat: '28 seconds ago',
      reply: 'Reply',
      likes: '22.5K',
      like: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Like-Icon-1024x1024.png'

    },
    {
      comment: 'You can but this product',
      name: 'Eren45',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      createdat: '28 minutes ago',
      reply: 'Reply',
      likes: '18.5K',
      like: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Like-Icon-1024x1024.png'
    },
    {
      comment: 'Received this product at exact time',
      name: 'Mikasa',
      photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
      createdat: '28 hours ago',
      reply: 'Reply',
      likes: '12.5K',
      like: 'https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Like-Icon-1024x1024.png'
    },
  ];
    return (
      <View style={styles.container}>

        <View>
              <Text style={styles.text1}>Comments</Text>
              <Image source={require('../../assets/images/Bline.png')} size={25} style={{ top: 280, left: 115, zIndex: 1 }} />
              <Image source={require('../../assets/images/Lline.png')} size={25} style={{ bottom: 240, right: 0, zIndex: 1 }} />
              <Image source={require('../../assets/images/Tline.png')} size={25} style={{ bottom: 270, left: 175, zIndex: 1 }} />
              <Image source={require('../../assets/images/Dline.png')} size={25} style={{ top: 230, left: 175, zIndex: 1 }} />
              </View>
        <View>
          
        {user.map((v, i) => {
          return (
            <View key={v.uid} style={{top: 10, margin: -30, left: 25}}>

              <View style={{right: 70, bottom: 70}}>
              <Text style={{ color: '#20232A', fontFamily: 'Proxima Nova' , fontWeight: '700', fontSize: 14 }}>{v.name}</Text>
              </View>

              <View style={{left: 50, bottom: 87}}>
              <Text style={{ color: '#20232A', right: 60, fontFamily: 'Proxima Nova' , fontWeight: '400', fontSize: 12}}>{v.comment}</Text>
              </View>

              <View style={{right: 130, bottom: 100, margin: 0}}>
                <Image source={{ uri: v.photo }} style={{ height: 30, width: 35, borderRadius: 20}} />
              </View>

              <View style={{right: 10, bottom: 110}}>
                <Text style={{ color: '#999999', right: 60,fontFamily: 'Proxima Nova' , fontWeight: '400', fontSize: 12}}>{v.createdat}</Text>
              </View>

              <View style={{left: 90, bottom: 126}}>
                <Text style={{ color: '#999999', right: 60,fontFamily: 'Proxima Nova' , fontWeight: '700', fontSize: 12}}>{v.reply}</Text>
              </View>

              <View style={{left: 260, bottom: 140}}>
                <Text style={{ color: '#999999', right: 60,fontFamily: 'Proxima Nova' , fontWeight: '700', fontSize: 10}}>{v.likes}</Text>
              </View>

              <View style={{left: 203, bottom: 180}}>
                <Image source={{ uri: v.like }} style={{ height: 20, width: 20}} />
              </View>

            </View>
          );
        })}
        </View>
      </View>
    );
};
  
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     paddingTop: Constants.statusBarHeight,
  //     backgroundColor: '#ecf0f1',
  //     padding: 8,
  //   },
  // });



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
    right: -20,
    bottom: 450,
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height - 170,
    backgroundColor: '#EDFDFF',
    borderRadius: 30, 
    zIndex: 1
  },
  img: {
    height: 110, 
    width: 100,
    right: 150,
    bottom: 100,
    borderRadius: 30
  },
   text1: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 150,
    bottom: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text2: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    width: 100,
    left: 0,
    bottom: 160,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text3: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 80,
    bottom: 140,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text4: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    left: 0,
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    top: 230, 
    right: 120
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: 230,
    right: 30
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default In;



// bottom: 450,
// width: Dimensions.get('window').width ,
// height: Dimensions.get('window').height - 170,
// backgroundColor: '#EDFDFF',
// borderRadius: 20, 
// zIndex: 1


// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import {
// KeyboardAvoidingView,
// StyleSheet,
// TextInput,
// Text,Image,
// View, TouchableOpacity, Dimensions
// } from 'react-native';

// export default class Input extends Component {



// static propTypes = {
// onSubmit: PropTypes.func.isRequired,
// };

// state = {
// text: undefined, // user's input
// };

// // Update state when input changes
// onChangeText = (text) => this.setState({ text });

// // Handle return press on the keyboard
// // NOTE: You don't really need it for this example, because
// // we're using a keyboard without return button, but I left it here
// // in case you'd want to switch to a different keyboard
// onSubmitEditing = ({ nativeEvent: { text } }) => this.setState({ text }, this.submit);

// // Call this.props.onSubmit handler and pass the comment
// submit = () => {
// const { text } = this.state;
// if (text) {
//   this.setState({ text: undefined }, () => this.props.onSubmit(text));
// } else {
//   alert('Please enter your comment first');
// }
// };

// render() {
// return (
//   // This moves children view with input field and submit button
//   // up above the keyboard when it's active

//   <KeyboardAvoidingView
//     behavior='position'
//   >
//     <View style={styles.container}>
//       {/* Comment input field */}
//       <View>
//         <Text style={styles.text1}>Comments</Text>
//         <Image source={require('../../assets/images/Bline.png')} size={25} style={{ top: 180, left: 120, zIndex: 1 }} />
//         <Image source={require('../../assets/images/Lline.png')} size={25} style={{ bottom: 240, right: 0, zIndex: 1 }} />
//         <Image source={require('../../assets/images/Tline.png')} size={25} style={{ bottom: 270, left: 175, zIndex: 1 }} />
//         <Image source={require('../../assets/images/Dline.png')} size={25} style={{ top: 130, left: 180, zIndex: 1 }} />
//       </View>
//       <TextInput
//         placeholder="Add a comment..."
//         keyboardType="twitter" // keyboard with no return button
//         autoFocus={true} // focus and show the keyboard
//         style={styles.input}
//         value={this.state.text}
//         onChangeText={this.onChangeText} // handle input changes
//         onSubmitEditing={this.onSubmitEditing} // handle submit event
//       />
//       {/* Post button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={this.submit}
//       >
//         {/* Apply inactive style if no input */}
//         <Text style={[styles.text, !this.state.text ? styles.inactive : []]}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   </KeyboardAvoidingView>
// );
// }

// }

// const styles = StyleSheet.create({
// container: {
// backgroundColor: '#FFF',
// flexDirection: 'row',
// borderTopWidth: 1,
// borderColor: '#EEE',
// alignItems: 'center',
// paddingLeft: 15,
// left: 15,
// bottom: 450,
// width: Dimensions.get('window').width ,
// height: Dimensions.get('window').height - 170,
// backgroundColor: 'red',
// borderRadius: 20, 
// zIndex: 1
// },
// text1: {
// color: '#20232A',
// position: 'absolute',
// fontFamily: 'Proxima Nova',
// fontWeight: '700',
// fontSize: 16,
// left: 150,
// bottom: 250,
// justifyContent: 'center',
// alignItems: 'center',
// alignContent: 'center',
// },
// input: {
// flex: 1,
// height: 40,
// fontSize: 15,
// top: 230, 
// right: 120
// },
// button: {
// height: 40,
// paddingHorizontal: 20,
// alignItems: 'center',
// justifyContent: 'center',
// top: 230,
// right: 30
// },
// inactive: {
// color: '#CCC',
// },
// text: {
// color: '#3F51B5',
// fontWeight: 'bold',
// fontFamily: 'Avenir',
// textAlign: 'center',
// fontSize: 15,
// },
// });





// import * as React from 'react';
// import { Text, View, StyleSheet, Image } from 'react-native';
// import Constants from 'expo-constants';

// const donorsData = [
// {
// isDonor: true,
// name: 'Nadi',
// photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
// uid: '2ZE',
// email: 'nadi@test.com',
// },
// {
// email: 'mz@test.com',
// isDonor: true,
// name: 'Mz',
// photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
// uid: 'Cb',
// },
// ];
// export default function App() {
// return (
// <View style={styles.container}>
//   {donorsData.map((v, i) => {
//     return (
//       <View
//         key={v.uid}
//         style={{
//           backgroundColor: 'white',
//           padding: 10,
//           margin: 5,
//           borderRadius: 10,
//         }}>
//         <Text>{v.name}</Text>
//         <Text>{v.email}</Text>
//         <Image source={{ uri: v.photo }} style={{ height: 150, flex: 1, borderRadius: 100 }} />
//       </View>
//     );
//   })}
// </View>
// );
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// paddingTop: Constants.statusBarHeight,
// backgroundColor: '#ecf0f1',
// padding: 8,
// },
// });