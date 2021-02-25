import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView, Dimensions } from "react-native";
import Searchbar from '../../screens/Search/searchbar';
import Trending from '../../screens/Search/trending';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import Home from '../Home/index';

// import Home from '../../screens/Home/index';
// import Post from '../../components/Post/index';
// import MasonryList from "react-native-masonry-list/src/MasonryList";

const ActiveStyle = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 10,
        left: 100,
        transform: [{
          rotate: '-180deg'
        }],
      }}
      source={require('../../assets/images/blur.png')}
      width={15}
      height={15}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 55,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        left: 125
      }}>
    </View>
  </>
);

const ActiveStyle1 = () => (
  <>
    <Image
      style={{
        position: 'absolute',
        bottom: 10,
        right: 78,
        transform: [{
          rotate: '-180deg'
        }],
      }}
      source={require('../../assets/images/blur.png')}
      width={5}
      height={5}
    />
    <View
      style={{
        width: 27,
        height: 4,
        borderRadius: 14,
        position: 'absolute',
        bottom: 53,
        borderBottomColor: '#21FFFC',
        borderBottomWidth: 4,
        right: 105
      }}>
    </View>
  </>
);

const Categories = (props) => {
  const [post, setPost] = useState(props.post);
  const [isTouched, setTouched] = useState(true);
  const [isPressed, setPressed] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getVideoUri();
  }, []);


  return (
    <View style={styles.container}>

      <Searchbar />
      
      <View style={styles.cat}>
        <Image style={{top: 80, left: 15}} source={require('../../assets/images/Line2.png')} size={15} />
        <TouchableOpacity style={styles.type1} onPress={() => {setTouched(!isTouched); setPressed(!isPressed)}}>
          <Text style={{color: !isTouched ? '#FFFFFF' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16,}}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.type2} onPress={() => {setPressed(!isPressed); setTouched(!isTouched)}}>
          <Text style={{color: !isPressed ? '#FFFFFF' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16,}}>Brands</Text>
        </TouchableOpacity>
        <Image style={{top: 180, left: 15}} source={require('../../assets/images/Line2.png')} size={15} />

        <TouchableOpacity style={styles.type3} onPress={() => setClicked(!isClicked)}>
          <Text style={{color: !isClicked ? '#FFFFFF' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16}}>Top Trending</Text>
        </TouchableOpacity>
      </View>


      {isTouched && isPressed==false ? (
      <View style={styles.container1}>
        <ActiveStyle />
        <TouchableOpacity style={styles.t1}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image1.png')} size={15} /> 
          <Text style={styles.text1}>Men</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t2}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image2.png')} size={15} /> 
          <Text style={styles.text2}>Women</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t3}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image3.png')} size={15} /> 
          <Text style={styles.text3}>Kids</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t4}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image4.png')} size={15} /> 
          <Text style={styles.text4}>Apparels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t5}>
          <Image style={{height: 50, width: 50}} source={require('../../assets/images/Image5.png')} size={15} /> 
          <Text style={styles.text5}>Beauty</Text>
        </TouchableOpacity>

        <View>
          <Trending />
        </View>

      </View>



      ) : (<></>) }

      {isPressed && isTouched==false ? (
      <View style={styles.container2}>
        <ActiveStyle1 />
        <TouchableOpacity style={styles.t6}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L1.png')} size={15} /> 
          <Text style={styles.text6}>Adidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t7}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L2.png')} size={15} /> 
          <Text style={styles.text7}>Armani</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t8}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L3.png')} size={15} /> 
          <Text style={styles.text8}>Beats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t9}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L4.png')} size={15} /> 
          <Text style={styles.text9}>Bose</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.t10}>
          <Image style={{height: 75, width: 75}} source={require('../../assets/images/L5.png')} size={15} /> 
          <Text style={styles.text10}>Hugo Boss</Text>
        </TouchableOpacity>

        <View>
          <Trending />
        </View>

        {/* <Home /> */}

        {/* <View style={styles.video}>
          <VideoPlayer
            video={{uri : videoUri }}
            thumbnail={{ uri: 'https://th.bing.com/th/id/OPA.0wlIXou2gXpavQ474C474?w=160&h=220&rs=1&o=5&dpr=1.25&pid=21.1' }}
            autoplay
            videoWidth={1100}
            videoHeight={Dimensions.get('window').height * 1.4}
            loop={true}
            resizeMode='cover'
            pauseOnPress={true}
            paused={false}
            disableControlsAutoHide={false}
          />
      </View> */}

      </View>
      ) : (<></>) }
      
      {/* {isClicked ? 
        <Trending />
      : <></> } */}

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#20232A',
    height: 1000
    // zIndex: 1
  },
  cat: {
    top: -80, 
  },
  type1:{
    top: 100, left: 100,
  },
  type2:{
    top: 78, right: -250,
  },
  type3:{
    top: 200, right: -150,
  },
  category:{
    // color: isPressed ? '#282D34' : '#21FFFC', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16, 
  },
  brand:{
    color: '#FFFFFF', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16, tintColor: '#21FFFC'
  },
  trend:{
    color: '#FFFFFF', fontWeight: '700', fontFamily: 'Proxima Nova', fontSize: 16
  },
  container1:{
    top: -10,
    // backgroundColor: '#20232A',
    // zIndex: 1
  },
  text1:{
    top: 10,  left: 10, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text2:{
    top: 10,  left: 0, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text3:{
    top: 10, left: 10, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text4:{
    top: 10,  right: 0, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text5:{
    top: 10,  right: -5, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  t1:{
    top: 0,
    left: 10,
    zIndex: 1,
    position: 'absolute'
  },
  t2:{
    top: 0,
    left: 90,
    zIndex: 1,
    position: 'absolute'
  },
  t3:{
    top: 0,
    left: 170,
    zIndex: 1,
    position: 'absolute'
  },
  t4:{
    top: 0,
    right: 90,
    zIndex: 1,
    position: 'absolute'
  },
  t5:{
    top: 0,
    right: 10,
    zIndex: 1,
    position: 'absolute'
  },
  container2:{
    top: -10,
    // backgroundColor: '#20232A',
    // zIndex: 1
  },
  text6:{
    top: -10,  left: 15, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text7:{
    top: -10,  left: 15, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text8:{
    top: -10, left: 20, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text9:{
    top: -10,  right: -25, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  text10:{
    top: -10,  right: -5, color: '#FFFFFF', fontWeight: '400', fontFamily: 'Proxima Nova', 
  },
  t6:{
    top: -5,
    left: 0,
    zIndex: 1,
    position: 'absolute'
  },
  t7:{
    top: -5,
    left: 80,
    zIndex: 1,
    position: 'absolute'
  },
  t8:{
    top: -5,
    left: 155,
    zIndex: 1,
    position: 'absolute'
  },
  t9:{
    top: -5,
    right: 80,
    zIndex: 1,
    position: 'absolute'
  },
  t10:{
    top: -5,
    right: 0,
    zIndex: 1,
    position: 'absolute'
  },
  video:{
    top: 150
  }
});

export default Categories;