import React, { useEffect, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
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
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height - 70 }
      />
    </View>
  );
};

export default Home;
