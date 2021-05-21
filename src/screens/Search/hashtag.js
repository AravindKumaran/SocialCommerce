import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';


import FullScreenVideo from './fullScreenVideo';
import HashTagVideoList from './HashTagVideoList';
import { log } from 'react-native-reanimated';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const hashTags = [
  {
    name: '#LockdownChef',
  },
  {
    name: '#StayhomeStayFit',
  },
  {
    name: '#Livestylist',
  },
  {
    name: '#Trendingfashion',
  },
  {
    name: '#Liveboxlivenow',
  },
];

const HashTag = () => {  

  return (
    <View style={styles.container}>
      
      {hashTags.map( (h,i) => (        
        <View key={`${h.name}-${i}`}>
          <Text style={styles.hashTag}>{h.name }</Text>
          <Text style={styles.trending}>Trending Hashtag</Text>
          <Text style={styles.views}>24.2M Views</Text>
          
          <HashTagVideoList
             hashTagName={h.name}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,    
  },
  hashTag: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 18,
    textAlign: 'left',
  },
  trending: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    textAlign: 'left',
  },
  views: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    textAlign: 'right',
    bottom: 25,
    marginRight: 10,
  },
});

export default HashTag;
