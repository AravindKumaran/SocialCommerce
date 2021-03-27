import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {API, graphqlOperation, Storage, Auth, Hub} from 'aws-amplify';
import convertToProxyURL from 'react-native-video-cache';
import RBSheet from 'react-native-raw-bottom-sheet';
import Product from '../../screens/Product/index';
import Video from 'react-native-video';
import Comments from './comments';
import PostLike from './postLike';
import {
  updatePost,
  createNotification,
  createUserNotification,
  updateUser,
} from '../../graphql/mutations';
import {getUser} from '../../graphql/queries';
import styles from './styles';
import Slider from 'react-native-slider';
import DoubleClick from '../Post/doubletap';
import Follow from './Follow';

// import DoubleClick from 'react-native-double-tap';
// import Slider from '@react-native-community/slider';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
// import {makeStyles, withStyles} from '@material-ui/core/styles';
// import ProgressBar from '../Post/slider';
// import { duration } from 'moment';
// import Modal from 'react-native-modal';
// import Feather from 'react-native-vector-icons/Feather';
// import Controls from '../Post/controls';
// import VideoPlayer from 'react-native-video-player';
// import VideoPlayer from 'react-native-video-controls';
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
  const [modalVisible, setModalVisible] = useState(false);

  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({payload: {event, data}}) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getCurrentUser().then((userData) => {
            // console.log('User', userData);
            if (userData?.attributes) {
              setUser(userData.attributes);
            }
          });
          break;
        case 'signOut':
          // console.log('Hub sign out');
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getCurrentUser().then((userData) => {
      if (userData?.attributes) {
        setUser(userData.attributes);
      }
    });
  }, []);

  function getCurrentUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log('Not signed in'));
  }

  const vidRef = useRef();
  const refRBSheet = useRef();
  const showRef = useRef();
  const showPauseRef = useRef();
  const playerRef = useRef();
  const videoPlayer = useRef();

  useEffect(() => {
    if (!props.post.videoUri.startsWith('https')) {
      setVideoUri(
        `https://tiktok23f096015e564dd1964361d5c47fb832221214-demo.s3.us-east-2.amazonaws.com/public/${props.post.videoUri}`,
      );
    } else {
      setVideoUri(props.post.videoUri);
    }
  }, []);

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
      if (cPost.likes === null) {
        cPost.likes = [];
      }
      // console.log('post', cPost.likes);
      try {
        // const userInfo = await Auth.currentAuthenticatedUser({
        //   bypassCache: true,
        // });
        // const userId = userInfo.attributes.sub;
        if (user) {
          cPost.likes.push(user.sub);
          const likes = cPost.likes;
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
          // console.log('ress', res.data.createNotification.id);
          const res2 = await API.graphql(
            graphqlOperation(createUserNotification, {
              input: {
                userID: user.sub,
                notificationID: res.data.createNotification.id,
                read: false,
                ownerID: cPost.user.id,
              },
            }),
          );

          console.log('ress', res2.data);
        }
      } catch (error) {
        console.log('Please Login', error);
        alert('Please sign in first');
      }
    }
  };

  const handlePostUnLike = async (cPost) => {
    if (cPost?.likes?.length > 0) {
      try {
        if (user) {
          const likesIndex = cPost.likes.findIndex((lkId) => lkId === user.sub);
          if (likesIndex !== -1) {
            cPost.likes.splice(likesIndex, 1);
            const likes = cPost.likes;
            const res = await API.graphql(
              graphqlOperation(updatePost, {
                input: {id: cPost.id, likes},
              }),
            );

            console.log('Ress', res.data);
          }
        }
      } catch (err) {
        console.log('Error', err);
        alert('Please sign in first');
      }
    }
  };

  const handleFollow = async (postUser) => {
    if (post) {
      if (post.user.followers === null) {
        post.user.followers = [];
      }

      try {
        if (user) {
          const userRes = await API.graphql(
            graphqlOperation(getUser, {
              id: user.sub,
            }),
          );
          if (userRes.data.getUser.followers === null) {
            userRes.data.getUser.followers = [];
          }
          if (userRes.data.getUser.following === null) {
            userRes.data.getUser.following = [];
          }
          const fw = {
            userId: userRes.data.getUser.id,
            userName: userRes.data.getUser.username,
            imgUri: userRes.data.getUser.imageUri,
          };
          post.user.followers.push(fw);
          const updatedFollowers = post.user.followers;
          await API.graphql(
            graphqlOperation(updateUser, {
              input: {id: postUser.id, followers: updatedFollowers},
            }),
          );
          const fr = {
            userId: postUser.id,
            userName: postUser.username,
            imgUri: postUser.imageUri,
          };
          userRes.data.getUser.following.push(fr);
          const updatedFollowing = userRes.data.getUser.following;
          await API.graphql(
            graphqlOperation(updateUser, {
              input: {id: user.sub, following: updatedFollowing},
            }),
          );
          console.log('FollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        alert('Please sign in first');
      }
    }
  };

  const handleUnFollow = async (postUser) => {
    if (post?.user?.followers.length > 0) {
      try {
        if (user) {
          const frIndex = post.user.followers.findIndex(
            (f) => f.userId === user.sub,
          );
          if (frIndex !== -1) {
            post.user.followers.splice(frIndex, 1);
            const updatedFollowers = post.user.followers;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: postUser.id, followers: updatedFollowers},
              }),
            );

            const userRes = await API.graphql(
              graphqlOperation(getUser, {
                id: user.sub,
              }),
            );
            if (userRes.data.getUser?.following?.length > 0) {
              const fwIndex = userRes.data.getUser.following.findIndex(
                (f) => f.userId === postUser.id,
              );
              if (fwIndex !== -1) {
                userRes.data.getUser.following.splice(fwIndex, 1);
                const updatedFollowing = userRes.data.getUser.following;
                await API.graphql(
                  graphqlOperation(updateUser, {
                    input: {
                      id: user.sub,
                      following: updatedFollowing,
                    },
                  }),
                );
              }
            }
          }
          console.log('UnfollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        alert('Please sign in first');
      }
    }
  };

  const handleClick = () => {
    showPauseRef.current = null;
    if (showRef.current) {
      clearTimeout(showRef.current);
    }
    setMuted(!muted);
    // setShowMutedIcon(true);
    showRef.current = setTimeout(() => {
      // setShowMutedIcon(false);
    }, 1000);
  };

  const handleDoubleClick = () => {
    showRef.current = null;
    if (showPauseRef.current) {
      clearTimeout(showPauseRef.current);
    }
    setPaused(!paused);
    // setShowPauseIcon(true);
    showPauseRef.current = setTimeout(() => {
      // setShowPauseIcon(false);
    }, 1000);
  };

  const click = () => {
    setTouched(!isTouched);
  };

  // const handleOnVideoEnd = (e) => {
  //   if (props.currentIndex === 0) {
  //     console.log('Ennd', vidRef.current.seek(100));
  //   }
  // };

  // const onload = ({duration}) => this.setState({duration});
  // const progress = ({currentTime}) => this.setState({currentTime});

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const onSlide = (e, newValue) => {
    console.log(newValue);
    setState({
      ...state,
      seek: parseFloat(newValue * duration),
      unseek: newValue === 0 ? true : false,
    });
  };

  // function onSeek(data: OnSeekData) {
  //   videoRef.current.seek(data.seekTime);
  //   setState({...state, currentTime: data.seekTime});
  // }

  // onslide = slide => {
  //   this.video.seek(slide * this.state.duration);
  //   clearTimeout(this.overlayTimer);
  //   this.overlayTimer = setTimeout(() => this.setState({ overlay: false}))
  // }

  // function ValueLabelComponent(props) {
  //   const {children, open, value} = props;
  // }

  // const handleSeekChange = (e, newValue) => {
  //   console.log({newValue});
  //   setState({...state, played: parseFloat(newValue / 100)});
  // };

  return (
    <View style={styles.container}>
      <DoubleClick
        singleTap={isTouched ? click : handleClick}
        doubleTap={handleDoubleClick}>
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
              source={{uri: convertToProxyURL(videoUri)}}
              style={styles.video}
              resizeMode={'cover'}
              repeat={props.currentIndex === 0}
              paused={paused}
              muted={muted}
              onProgress={onProgress}
              onLoad={onLoad}
            />

            {/* <MediaControls
              duration={duration}
              isLoading={isLoading}
              progress={currentTime}
              onSeek={onSeek}
              onSeeking={onSeeking}
              mainColor={'red'}
            /> */}
            <Slider
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="red"
              maximumTrackTintColor="#292929"
              thumbTintColor="white"
              step={1}
              value={currentTime}
              onValueChange={onSeeking}
              style={{width: '100%', top: '87.5%'}}
            />
          </View>

          {/* {showMutedIcon && (
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
          )} */}

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              {/* <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 15,
                  bottom: 0,
                  top: -20,
                }}
                onPress={() => console.log('Herlo')}>
                <>
                  {!isTouched ? (
                    <Image
                      source={require('../../assets/images/p2.png')}
                      size={35}
                      style={{height: 65, width: 60, bottom: 5}}
                    />
                  ) : (
                    <Image
                      style={{
                        top: -110,
                        position: 'absolute',
                        right: 0,
                        height: 60,
                        width: 60,
                      }}
                      source={require('../../assets/images/p2.png')}
                      size={35}
                      // tintColor={isTouched ? '#31d9fc' : 'white'}
                    />
                  )}
                </>
              </TouchableOpacity> */}

              <Follow
                isTouched={isTouched}
                onFollow={handleFollow}
                onUnFollow={handleUnFollow}
                user={user}
                currentPost={post}
              />

              <PostLike
                isTouched={isTouched}
                currentPost={post}
                likes={post.likes}
                onLike={handlePostLike}
                onUnlike={handlePostUnLike}
                user={user}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 0,
                  zIndex: 1,
                  top: 105,
                }}
                onPress={() => {
                  setTouched(!isTouched);
                }}>
                <>
                  {!isTouched ? (
                    <Image
                      style={{height: 45, width: 45}}
                      source={require('../../assets/images/Product_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{
                        top: -110,
                        position: 'absolute',
                        right: 0,
                        height: 45,
                        width: 45,
                      }}
                      source={require('../../assets/images/Product_icon1.png')}
                      size={25}
                    />
                  )}
                  {isTouched && <Product />}
                </>
              </TouchableOpacity>
              {/* </Modal> */}

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
                  backgroundColor: 'red',
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
                      style={{height: 45, width: 45}}
                      source={require('../../assets/images/Comment_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{
                        top: 50,
                        position: 'absolute',
                        right: 0,
                        height: 45,
                        width: 45,
                      }}
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
                <Comments
                  postId={props.post.id}
                  postUserId={props.post.user.id}
                />
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
                    <Text style={styles.handle}>{post?.user?.username}</Text>
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
