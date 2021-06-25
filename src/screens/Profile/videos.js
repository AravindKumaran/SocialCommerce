import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import TrendingVideo from '../Search/trendingVideo';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listPosts, getUser} from '../../graphql/queries';
import Feather from 'react-native-vector-icons/Feather';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import {Context} from '../../context/Store';

const vpHeight = Dimensions.get('window').height;
const vpWidth = Dimensions.get('window').width;

const Videos = ({userId, postLength, isProfile, isSeeProfile}) => {
  console.log('ghg', userId, postLength);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curLimit, setCurLimit] = useState(15);
  const [nextToken, setNextToken] = useState(undefined);
  const [isLoader, setLoader] = useState(false);

  const [globalState, globalDispatch] = useContext(Context);

  useEffect(() => {
    const fetchPost = async () => {
      try {        
        setLoading(true);

        // const response = await API.graphql(
        //   graphqlOperation(listPosts, {
        //     limit: curLimit,
        //     filter: {
        //       userID: {eq: userId},
        //       isDeleted: {ne: true}
        //     },
        //   }),
        // );
        // const allItems = response.data.listPosts.items;
        // setNextToken(response.data.listPosts.nextToken);

        const response = await API.graphql(
          graphqlOperation(getUser, {  
            id: userId, 
            postLimit: curLimit,                      
            postFilter: {
              isDeleted: {ne: true}
            }            
          })
        );      
        const allItems = response.data.getUser.posts.items;
        
        console.log('allItems', allItems.length);
        setNextToken(response.data.getUser.posts.nextToken);
        setPosts(allItems);
        setLoading(false);
      } catch (e) {
        console.log('Caledd');
        setLoading(false);
        console.error(e);
      }
    };

    fetchPost();
  }, [userId, postLength, globalState?.postDeleted]);

  const getMorePosts = async () => {
    console.log('I am called222');
    try {
      if (nextToken) {
        setLoader(true);

        // const response = await API.graphql(
        //   graphqlOperation(listPosts, {
        //     limit: curLimit + 15,
        //     filter: {
        //       userID: {eq: userId},
        //       isDeleted: {ne: true}
        //     },
        //     nextToken,
        //   }),
        // );
        // setCurLimit((lim) => lim + 15);
        // setNextToken(response.data.listPosts.nextToken);
        // setPosts((post) => [...post, ...response.data.listPosts.items]);

        const response = await API.graphql(
            graphqlOperation(getUser, {
              id: userId,  
              postLimit: curLimit + 15,
              postFilter: {
                isDeleted: {ne: true}
              },
              postNextToken:nextToken
            })
          );
          console.log('getMorePosts', response.data.getUser.posts.items.length);
          setCurLimit((lim) => lim + 15);
          setNextToken(response.data.getUser.posts.nextToken);
          setPosts((post) => [...post, ...response.data.getUser.posts.items]);

        setLoader(false);
      }
    } catch (error) {
      console.log('Pagination Error', error);
      setLoader(false);
    }
  };

  const _renderItem = ({item, index}) => (
    <TrendingVideo
      videoUri={item.videoUri}
      idx={index}
      item={item}
      isProfile={isProfile}
      isSeeProfile={isSeeProfile}
      data={posts}
      poster={item?.thumbnail}
    />
  );

  const renderFooter = () => {
    return (
      <View
        style={{
          position: 'relative',
          width: vpWidth,
          height: 50,
          bottom: 120,
          // paddingVertical: 0,
          // marginTop: 0,
          // marginBottom: 0,
        }}>
        {isLoader ? (
          <ActivityIndicator size={'large'} animating color="white" />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading && <LoadingIndicator visible={loading} />}
      <FlatList
        nestedScrollEnabled={true}
        data={posts}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={getMorePosts}
        onEndReachedThreshold={0.5}
        style={{height: Dimensions.get('window').height}}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 50,
  },
});

export default Videos;
