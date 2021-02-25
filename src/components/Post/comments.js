import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Post from '../../components/Post';
import { API, graphqlOperation, Storage } from 'aws-amplify';

const Comment = () => {
  // const [comment, setComment] = useState('');
  // const [post, setPost] = useState(props.post);
  return (
    <View style={styles.coverer}>
      {/* <LinearGradient colors={["#EFFAFF", "#EDFDFF"]} style={styles.linearGradient}> */}
        
        <Image source={require('../../assets/images/Bline.png')} size={25} style={{ top: 250, left: 0 }} />
        <Image source={require('../../assets/images/Lline.png')} size={25} style={{ bottom: 255, right: 150 }} />
        <Image source={require('../../assets/images/Tline.png')} size={25} style={{ bottom: 280, left: 0 }} />
        <Image source={require('../../assets/images/Dline.png')} size={25} style={{ top: 200, left: 0 }} />
        <Text style={styles.text1}>Comments</Text>

        {/* <Text style={styles.text2}>Enter your comments</Text> */}
        {/* <Image style={styles.img}>{post.user.userimage}</Image> */}
        {/* <Text style={styles.handle}>{post.user.username}</Text> */}
        {/* <Text style={styles.statsLabel}>{post.comments}</Text> */}
        
      {/* </LinearGradient>  */}

    </View>
  );
};

const styles = StyleSheet.create({
  coverer: {
    
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    right: 240,
    bottom: 400,
    width: '290%',
    height: '420%',
    backgroundColor: '#EFFAFF',
    zIndex: 1
  },
  linearGradient: {
    // width: '100%',
    // height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text1: {
    color: '#20232A',
    position: 'absolute',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 16,
    // left: 30,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text2: {
    color: 'green'
  },
  text: {
    color: 'green'
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  textInput: {
    margin: 10,
    backgroundColor: 'white',
  },
});

export default Comment;