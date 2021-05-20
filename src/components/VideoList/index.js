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
import {Header} from 'react-native-elements';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const ProfileVideoList = ({navigation, route, idx, item, data, isCategory}) => {
  const flatListRef = useRef(null);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [muteAll, setMuteAll] = useState(false);
  const focused = useIsFocused();
  // console.log('Fic', focused);

  // useEffect(() => {
  //   if (focused === false) {
  //     // console.log('False');
  //     navigation.goBack();
  //   }
  // }, [focused]);

  useEffect(() => {
    if (idx>=0) {
      // flatListRef.current.scrollToIndex({index: idx});
      // setCurrentVisibleIndex(idx);
      setLoading(true);
      // const allPosts = [...posts];
      const allPosts = [...data];
      const prev = allPosts[idx];
      allPosts.splice(idx, 1);
      // console.log('Prev', prev);
      setPosts([prev, ...allPosts]);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [idx]);

  const _renderItem = ({item, index}) => (
    <Post
      post={item}
      currentIndex={index}
      currentVisibleIndex={currentVisibleIndex}
      muteAll={muteAll}
      setMuteAll={setMuteAll}
    />
  );

  const MyCustomLeftComponent = () => {
    return (
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Proxima Nova',
          width: 200,
          fontWeight: '700',
        }}>
        {isCategory?'Explore':'Posts'}
      </Text>
    );
  };

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
      <Header
        leftComponent={<MyCustomLeftComponent />}
        containerStyle={{
          backgroundColor: '#20232A',
          borderColor: '#20232A',
        }}
      />
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
