import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import Post from '../../components/Post';
import {Header} from 'react-native-elements';

const MyCustomLeftComponent = () => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontFamily: 'Proxima Nova',
        width: 200,
        fontWeight: '700',
      }}>
      Your Videos
    </Text>
  );
};

const NotifVideoPlay = ({navigation, route}) => {
  //   console.log('Route', route);
  return (
    <View style={styles.container}>
      <Header
        leftComponent={<MyCustomLeftComponent />}
        containerStyle={{
          backgroundColor: '#20232A',
          borderColor: '#20232A',
        }}
      />
      <Post post={route.params.item} currentIndex={0} currentVisibleIndex={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    color: '#fff',
  },
});

export default NotifVideoPlay;
