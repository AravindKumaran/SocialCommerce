import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions, Image, ImageOverlay, StyleSheet } from 'react-native';
import Post from '../../components/Post';
import { API, graphqlOperation } from 'aws-amplify';
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
    <View style={{  position: 'absolute', padding: 10, width: 417, height: 1500, top: 80, bottom: 50,
    paddingLeft: 4, marginRight: 4, paddingBottom: 30, backgroundColor: '#292929' }}>
      <Image source={require('../../assets/images/Logo.png')} size= {15} style={{overlayColor: '#292929', right: 0, left:0, height: 85, paddingLeft: 2, paddingRight: 2, width: 470, top: -80, position: 'absolute', borderBottomRightRadius: 30}} />
      {/* <Image source={require('../../assets/images/Line.png')} size= {5} style={{position: 'absolute', width: 50, right: 50, height: 45, top: -60, resizeMode: 'stretch'}} /> */}
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

