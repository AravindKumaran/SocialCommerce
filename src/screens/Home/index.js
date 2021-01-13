import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, Image, ImageOverlay, StyleSheet } from 'react-native';
import Post from '../../components/Post';
import { API, graphqlOperation } from 'aws-amplify';
// import Bgimage from '../../assets/images/Plus.png';
// import Bgname from '../assets/images/Bg_name.png';

import { listPosts } from '../../graphql/queries';

const Home = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const unsubscribe = navigation.addListener('focus', async () => {
        try {
          const response = await API.graphql(graphqlOperation(listPosts));
          setPosts(response.data.listPosts.items);
        } catch (e) {
          console.error(e);
        }
      });
      // fetch all the posts
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
      } catch (e) {
        console.error(e);
      }
    };

    fetchPost();
  }, [navigation]);

  return (
    <View style={{  position: 'absolute', padding: 10, width: 400, height: 1500, top: 80, bottom: 50,
    paddingLeft: 4, paddingRight: 10, paddingBottom: 30, backgroundColor: '#292929' }}>
      <Image source={require('../../assets/images/Logo.png')} size= {15} style={{ right: 0, left:0, height: 80, paddingLeft: 2, paddingRight: 2, width: 400, top: -80, position: 'absolute', borderRadius: 20}} />
      {/* <Image source={require('../../assets/images/Background.png')}  style={{ top: -103, right: 10, paddingLeft: -50, position: 'absolute'}} /> */}
      {/* <Image name= {Bgimage}></Image> */}
      {/* <Image source={require('../assets/images/Bg_image')} style={{ width: 75, height: 75, borderRadius: 50, top: 20 }} /> */}
      {/* <Image source={require('../assets/images/Bg_name.png')} style={{ width: 75, height: 75, borderRadius: 50, top: 20 }} /> */}
    <FlatList      
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height - 160 }
        borderRadius= {50}
      />
    </View>
  );
};

export default Home;

