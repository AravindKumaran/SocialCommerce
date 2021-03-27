import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import TrendingVideo from './trendingVideo';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const uris = [
  {
    key: 1,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 2,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 3,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 4,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 5,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 6,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 7,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 8,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 9,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 10,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 11,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 12,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 13,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 14,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
  {
    key: 15,
    uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    height: 200,
    width: '33.33%',
  },
];

const Trending = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.uri}
      idx={index}
      height={item.height}
      width={item.width}
    />
  );

  const Item = (dataItem, key) => {
    return <TrendingVideo key={key} videoUri={dataItem.uri} />;
  };

  const click = (dataItem, index) => {
    return (
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <TrendingVideo idx={index === 0} videoUri={dataItem.uri} />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={uris}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  modal: {
    flex: 1,
    padding: 30,
  },
});

export default Trending;
