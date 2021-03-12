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
import Product from '../../screens/Product/index';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import DoubleClick from 'react-native-double-tap';
import Comments from './comments';
import PostLike from './postLike';
import {
  updatePost,
  createNotification,
  createUserNotification,
} from '../../graphql/mutations';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';

// import DoubleClick from 'react-native-single-double-click';

const user = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};
const user1 = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiilachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52b',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const Post = (props) => {
  const [post, setPost] = useState(props.post);

  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const [showMutedIcon, setShowMutedIcon] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);

  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const vidRef = useRef();
  const refRBSheet = useRef();
  const showRef = useRef();
  const showPauseRef = useRef();

  useEffect(() => {
    if (props.currentIndex === props.currentVisibleIndex) {
      // vidRef.current.resume();
      setPaused(false);
    } else {
      // vidRef.current.pause();
      setPaused(true);
    }
  }, [props.currentVisibleIndex]);

  // const onload = {() => {props.currentIndex === props.currentVisibleIndex}}

  const handlePostLike = async (cPost) => {
    if (cPost) {
      cPost.likes.push(user.id);
      const likes = cPost.likes;
      try {
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {id: cPost.id, likes},
          }),
        );
        const res = await API.graphql(
          graphqlOperation(createNotification, {
            input: {
              message: `liked your video`,
            },
          }),
        );
        console.log('ress', res.data.createNotification.id);
        const res2 = await API.graphql(
          graphqlOperation(createUserNotification, {
            input: {
              userID: user.id,
              notificationID: res.data.createNotification.id,
              read: false,
            },
          }),
        );

        console.log('ress', res2.data);
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

  const handleClick = () => {
    showPauseRef.current = null;
    if (showRef.current) {
      clearTimeout(showRef.current);
    }
    setMuted(!muted);
    setShowMutedIcon(true);
    showRef.current = setTimeout(() => {
      setShowMutedIcon(false);
    }, 1000);
  };

  const handleDoubleClick = () => {
    showRef.current = null;
    if (showPauseRef.current) {
      clearTimeout(showPauseRef.current);
    }
    setPaused(!paused);
    setShowPauseIcon(true);
    showPauseRef.current = setTimeout(() => {
      setShowPauseIcon(false);
    }, 1000);
  };

  // const handleOnVideoEnd = (e) => {
  //   if (props.currentIndex === 0) {
  //     console.log('Ennd', vidRef.current.seek(100));
  //   }
  // };

  return (
    <View style={styles.container}>
      <DoubleClick singleTap={handleClick} doubleTap={handleDoubleClick}>
        <View>
          <View style={styles.video}>
            {/* <VideoPlayer
              ref={vidRef}
              video={{uri: convertToProxyURL(props.post.videoUri)}}
              autoplay={true}
              videoWidth={1100}
              videoHeight={Dimensions.get('window').height * 2.3}
              // loop={true}
              resizeMode="cover"
              // paused={paused}
              // loop={props.currentIndex === 0}
              // onEnd={handleOnVideoEnd}
              // onEnd={(e) =>}
              // paused={paused}
              // muted={muted}
              // pauseOnPress={true}
              // fullScreenOnLongPress={true}
            /> */}

            <Video
              ref={(ref) => (vidRef.current = ref)}
              // ref={vidRef}
              source={{uri: convertToProxyURL(props.post.videoUri)}}
              style={styles.video}
              resizeMode={'cover'}
              repeat={props.currentIndex === 0}
              paused={paused}
              muted={muted}
              // controls={true}
            />
          </View>

          {showMutedIcon && (
            <View
              style={{
                position: 'absolute',
                bottom: '60%',
                left: '40%',
                height: 80,
                width: 80,
                backgroundColor: `rgba(0, 0, 0, 0.3)`,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              {muted ? (
                <Feather name="volume-x" size={50} color="#fff" />
              ) : (
                <Feather name="volume" size={75} color="#fff" />
              )}
            </View>
          )}
          {showPauseIcon && (
            <View
              style={{
                position: 'absolute',
                bottom: '60%',
                left: '40%',
                height: 80,
                width: 80,
                backgroundColor: `rgba(0, 0, 0, 0.3)`,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              {paused ? (
                <Feather name="play" size={60} color="#fff" />
              ) : (
                <Feather name="pause" size={50} color="#fff" />
              )}
            </View>
          )}

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
                height={Dimensions.get('window').height - 300}
                animationType="fade"
                closeOnDragDown={true}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'rgba(0,0,0,.6)',
                  },
                  draggableIcon: {
                    backgroundColor: '#C4C4C4',
                  },
                  container: {
                    backgroundColor: '#EBEBEB',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                  },
                }}>
                {/* <Image
                  source={require('../../assets/images/Comment.png')}
                  style={{
                    left: 335,
                    bottom: 410,
                    zIndex: 1,
                    position: 'absolute',
                  }}
                /> */}
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
      </DoubleClick>
    </View>
  );
};

export default Post;

// function useSimpleAndDoubleClick(actionSimpleClick, actionDoubleClick, delay = 250) {
//   const [click, setClick] = useState(0);

//   useEffect(() => {
//       const timer = setTimeout(() => {
//           // simple click
//           if (click === 1) actionSimpleClick();
//           setClick(0);
//       }, delay);

//       // the duration between this click and the previous one
//       // is less than the value of delay = double-click
//       if (click === 2) actionDoubleClick();

//       return () => clearTimeout(timer);

//   }, [click]);

//   return () => setClick(prev => prev + 1);
// }
