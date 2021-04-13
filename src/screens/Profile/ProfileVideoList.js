import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  ImageOverlay,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Post from '../../components/Post';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const ProfileVideoList = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const focused = useIsFocused();
  // console.log('Fic', focused);

  // useEffect(() => {
  //   if (focused === false) {
  //     // console.log('False');
  //     navigation.goBack();
  //   }
  // }, [focused]);

  useEffect(() => {
    if (route?.params?.idx) {
      // flatListRef.current.scrollToIndex({index: route?.params?.idx});
      // setCurrentVisibleIndex(route?.params?.idx);
      setLoading(true);
      // const allPosts = [...posts];
      const allPosts = [...route?.params?.data];
      const prev = allPosts[route?.params?.idx];
      allPosts.splice(route?.params?.idx, 1);
      // console.log('Prev', prev);
      setPosts([prev, ...allPosts]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [route?.params?.idx]);

  const _renderItem = ({item, index}) => (
    <Post
      post={item}
      currentIndex={index}
      currentVisibleIndex={currentVisibleIndex}
    />
  );

  const _viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 75,
  });

  const _onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });
  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      <View style={{height: 65}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,
            padding: 10,
          }}>
          Your Videos
        </Text>
      </View>
      <FlatList
        data={posts}
        ref={flatListRef}
        // getItemLayout={(data, index) => ({
        //   length: vpHeight - 300,
        //   offset: vpHeight * 2.0 * index,
        //   index,
        // })}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height + 40}
        borderRadius={50}
        viewabilityConfig={_viewabilityConfig.current}
        onViewableItemsChanged={_onViewableItemsChanged.current}
      />
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

export default ProfileVideoList;
