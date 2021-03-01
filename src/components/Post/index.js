import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {API, graphqlOperation, Storage} from 'aws-amplify';
import convertToProxyURL from 'react-native-video-cache';
import RBSheet from 'react-native-raw-bottom-sheet';

import styles from './styles';
import Product from '../../screens/Product/index';

import VideoPlayer from 'react-native-video-player';
import Comments from './comments';
import PostLike from './postLike';
import {updatePost} from '../../graphql/mutations';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const Post = (props) => {
  const [post, setPost] = useState(props.post);

  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(false);

  const vidRef = useRef(null);
  const refRBSheet = useRef();

  useEffect(() => {
    if (props.currentIndex === props.currentVisibleIndex) {
      vidRef.current.resume();
    } else {
      vidRef.current.pause();
    }
  }, [props.currentVisibleIndex]);

  const handlePostLike = async (cPost) => {
    if (cPost) {
      cPost.likes.push(user.id);
      const likes = cPost.likes;
      try {
        const res = await API.graphql(
          graphqlOperation(updatePost, {
            input: {id: cPost.id, likes},
          }),
        );
        // console.log('ress', res.data);
      } catch (err) {
        console.log('Error', err);
      }
    }
  };

  const handlePostUnLike = async (cPost) => {
    if (cPost?.likes?.length > 0) {
      const likesIndex = cPost.likes.findIndex((lkId) => lkId === user.id);
      if (likesIndex !== -1) {
        cPost.likes.splice(likesIndex, 1);
        const likes = cPost.likes;
        try {
          const res = await API.graphql(
            graphqlOperation(updatePost, {
              input: {id: cPost.id, likes},
            }),
          );
          // console.log('ress', res.data);
        } catch (err) {
          console.log('Error', err);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View>
          <View style={styles.video}>
            <VideoPlayer
              ref={vidRef}
              video={{uri: convertToProxyURL(props.post.videoUri)}}
              thumbnail={{
                uri:
                  'https://th.bing.com/th/id/OPA.0wlIXou2gXpavQ474C474?w=160&h=220&rs=1&o=5&dpr=1.25&pid=21.1',
              }}
              autoplay={true}
              videoWidth={1100}
              videoHeight={Dimensions.get('window').height * 2.3}
              loop={true}
              resizeMode="cover"
              pauseOnPress={true}
              disableControlsAutoHide={false}
              disableSeek={true}
            />
          </View>

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 15,
                  bottom: 0,
                  top: -20,
                }} /*onPress={onLikePress}*/
              >
                {/* {shouldShow ? ( */}
                {/* <Image
                  source={require('../../assets/images/Profile1_icon.png')}
                  size={25}
                /> */}
                {/* <Fontisto name={'heart'} size={25} color={isLiked ? 'red' : 'white'} /> */}
                {/* <Text style={styles.statsLabel}>{post.likes || 0}</Text> */}
                <>
                  {!isTouched ? (
                    <Image
                      source={require('../../assets/images/Profile1_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{top: -110, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Profile1_icon.png')}
                      size={25}
                      // tintColor={isTouched ? '#31d9fc' : 'white'}
                    />
                  )}
                </>
              </TouchableOpacity>

              <PostLike
                isTouched={isTouched}
                currentPost={post}
                likes={post.likes}
                onLike={handlePostLike}
                onUnlike={handlePostUnLike}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 0,
                  zIndex: 1,
                  top: 105,
                }}
                onPress={() => setTouched(!isTouched)}>
                <>
                  {!isTouched ? (
                    <Image
                      source={require('../../assets/images/Product_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{top: -110, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Product_icon1.png')}
                      size={25}
                    />
                  )}
                  {isTouched && <Product />}
                </>

                {/* <Image
                      source={require('../../assets/images/Bucket.png')}
                      size={25}
                      tintColor={isTouched ? '#31d9fc' : 'white'}
                      style={{ position: 'absolute', right: 11, bottom: 0, top: 8 }}
                    /> */}
              </TouchableOpacity>

              {/* ) : ( */}
              {/* top:` ${isPressed} ? " 20": "30" `  */}
              {/* style = { [ yourExternalStyle, { topStyle} ] } */}
              {/* style={Object.assign({}, styles.square, styles.round)} /> */}
              {/* [ {position: 'absolute', right: 20, bottom: 0, zIndex: 1} , {top: `${isTouched} ? "12%" : "14%" `} ] */}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 0,
                  top: 160,
                  zIndex: 1,
                }}
                onPress={() => setPressed(!isPressed)}></TouchableOpacity>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 0,
                  top: 160,
                  zIndex: 1,
                }}
                onPress={() => refRBSheet.current.open()}>
                <>
                  {!isTouched ? (
                    <Image
                      source={require('../../assets/images/Comment_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{top: 50, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Comment_icon.png')}
                      size={25}
                    />
                  )}
                </>
              </TouchableOpacity>

              <RBSheet
                ref={refRBSheet}
                height={Dimensions.get('window').height - 180}
                animationType="fade"
                customStyles={{
                  wrapper: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                  container: {
                    backgroundColor: '#fff',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                  },
                }}>
                <Comments postId={props.post.id} />
              </RBSheet>

              {/* {isClicked ?  : <></>} */}

              {/* <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View> */}
            </View>

            <View style={styles.bottomContainer}>
              <>
                {!isTouched ? (
                  <View>
                    <Text style={styles.handle}>{post.user.username}</Text>
                    <Image
                      source={require('../../assets/images/Dot.png')}
                      size={25}
                      style={{bottom: 15, left: 10}}
                    />
                    <Text style={styles.description}>{post.description}</Text>
                  </View>
                ) : (
                  <View />
                )}
              </>
            </View>

            {/* <View style={styles.songRow}> */}
            {/* <Entypo name={'beamed-note'} size={24} color="white" /> */}
            {/* <Text style={styles.songName}>{post.song.name}</Text> */}
            {/* </View> */}
            {/* <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description}>{post.description}</Text>

                <View style={styles.songRow}>
                  <Entypo name={'beamed-note'} size={24} color="white" />
                  <Text style={styles.songName}>{post.song.name}</Text>
                </View>
              </View>

              {/* <Image
                style={styles.songImage}
                source={{uri: post.song.imageUri}}
              /> */}
            {/* </View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
