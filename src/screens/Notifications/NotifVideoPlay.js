import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Post from '../../components/Post';

const NotifVideoPlay = ({navigation, route}) => {
  //   console.log('Route', route);
  return (
    <View style={styles.container}>
      <Post post={route.params.item} currentIndex={0} currentVisibleIndex={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    color: '#fff',
    paddingTop: 40,
  },
});

export default NotifVideoPlay;
