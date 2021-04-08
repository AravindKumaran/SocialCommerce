import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  BackHandler,
} from 'react-native';
// import {useIsFocused, CommonActions} from '@react-navigation/native';
import Post from '../../components/Post';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const TrendingVideoList = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  useEffect(() => {
    if (route?.params?.idx) {
      flatListRef.current.scrollToIndex({index: route?.params?.idx});
      setCurrentVisibleIndex(route?.params?.idx);
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
      <View style={{height: 65}}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,
            padding: 10,
          }}>
          {route?.params?.title || 'Top Trending'}
        </Text>
      </View>
      <FlatList
        data={route?.params?.data}
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: vpHeight + 10,
          offset: vpHeight * 1.07 * index,
          index,
        })}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').height + 45}
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

export default TrendingVideoList;
