import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, Image, ImageOverlay, StyleSheet, TouchableOpacity } from 'react-native';
import Post from '../../components/Post';
import { API, graphqlOperation } from 'aws-amplify';
import { listPosts } from '../../graphql/queries';
import Product from '../../screens/Product/index';

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
    <View style={{  position: 'absolute', padding: 10, width: '100%', height: '100%', top: 55, bottom: 55,
    paddingLeft: 4, paddingRight: 4, marginRight: 4, paddingBottom: 30, backgroundColor: '#292929' }}>
      <Image source={require('../../assets/images/Logo.png')} size= {15} style={{overlayColor: '#292929', backgroundColor: '#292929', right: 0, left: 0, paddingLeft: 4, paddingRight: 4, height: 80,  width: '103%', top: -70, position: 'absolute', borderBottomRightRadius: 30}} />
      <FlatList      
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height - 142 }
        borderRadius= {50}
      />
    </View>
  );
};

export default Home;


// <View style={{  position: 'absolute', padding: 10, width: 417, height: 1500, top: 55, bottom: 55,
//     paddingLeft: 4, paddingRight: 30, marginRight: 4, paddingBottom: 30, backgroundColor: '#292929' }}></View>