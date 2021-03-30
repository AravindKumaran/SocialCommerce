import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Modal} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts} from '../../graphql/queries';

import TrendingVideo from './trendingVideo';
import FullScreenVideo from './fullScreenVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

// const uris = [
//   {
//     key: 1,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 2,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 3,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 4,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 5,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 6,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 7,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 8,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 9,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 10,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 11,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 12,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 13,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 14,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
//   {
//     key: 15,
//     uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//     height: 200,
//     width: '33.33%',
//   },
// ];

const Trending = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const [curIdx, setCurIdx] = useState(0);
  const [uris, setUris] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        // console.log('Ress', response.data.listPosts.items[0]);
        const allItems = response.data.listPosts.items;
        const sortedItems = allItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        console.log('sortedItems', sortedItems[0]);

        setUris(sortedItems);
      } catch (e) {
        console.log('Caledd');
        console.error(e);
      }
    };

    fetchPost();
  }, []);

  const handleFullScreen = useCallback(
    (idx, btn) => {
      if (btn) {
        setFullScreen(false);
        return;
      }
      setFullScreen(true);
      setCurIdx(idx);
    },
    [fullScreen],
  );

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      height={item.height}
      fullScreen={fullScreen}
      onFullScreen={handleFullScreen}
    />
  );

  // if (fullScreen) {
  //   return (
  //     <Modal>
  //       <FullScreenVideo
  //         data={uris}
  //         fullScreen={fullScreen}
  //         handleFullScreen={handleFullScreen}
  //         idx={curIdx}
  //       />
  //     </Modal>
  //   );
  // }

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={uris}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 100,
  },
});

export default Trending;
