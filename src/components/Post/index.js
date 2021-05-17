import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
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
import Slider from '../Post/slider';
import DoubleClick from '../Post/doubletap';
import Follow from './Follow';
import ViewsCount from './ViewsCount';
import {NavigationActions} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const Post = (props) => {
  //console.log('Props', props?.post?.user?.followers);
  const [post, setPost] = useState(props.post);
  // const navigation = useNavigation();
  const navigation = props.navigation;

  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const [showLikeIcon, setShowLikeIcon] = useState(false);
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

  const [message] = useState('Please sign in first');
  const [message1] = useState('Coming Soon!');

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.3,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };

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
  const likeIconRef = useRef();
  const showRef = useRef();
  const showPauseRef = useRef();

  useEffect(() => {
    if (!props.post?.videoUri?.startsWith('https')) {
      setVideoUri(
        `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${props.post?.videoUri}`,
      );
    } else {
      setVideoUri(props.post?.videoUri);
    }
  }, []);

  useEffect(async () => {
    if (props.currentIndex === props.currentVisibleIndex) {
      // vidRef.current.resume();
      setPaused(false);
    } else {
      // vidRef.current.pause();
      setPaused(true);
    }
  }, [props.currentVisibleIndex]);

  const handleView = async (value) => {
    // console.log('on handle view');
    if (post) {      
      try {
        post.views = value;
        await API.graphql(
          graphqlOperation(updatePost, {
            input: {id: post.id, views: post.views},
          }),
        ); 
        // console.log('view increased');       
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  }

  useEffect(() => {
    if(post?.user?.followers !== props.post?.user?.followers){
      //console.log('post usereff', post?.user?.followers)
      //console.log('props post usereff', props.post?.user?.followers)
      setPost(props.post)
    }    
  }, [props.post]);

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
          console.log('Cpost.likes', cPost.likes);
          cPost.likes.push(user.email);
          if (likeIconRef.current) {
            clearTimeout(likeIconRef.current);
          }
          setShowLikeIcon(true);
          likeIconRef.current = setTimeout(() => {
            setShowLikeIcon(false);
          }, 1000);
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
                userID: user.email,
                notificationID: res.data.createNotification.id,
                read: false,
                ownerID: cPost.user.id,
                postID: cPost.id,
              },
            }),
          );

          console.log('ress', res2.data);
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  const handlePostUnLike = async (cPost) => {
    if (cPost?.likes?.length > 0) {
      try {
        if (user) {
          const likesIndex = cPost.likes.findIndex(
            (lkId) => lkId === user.email,
          );
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
        ToastAndroid.show(message, ToastAndroid.SHORT);
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
              id: user.email,
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
          const frIndex = post.user.followers.findIndex(
            (f) => f.userId === userRes.data.getUser.id,
          );
          if (frIndex === -1) {
            post.user.followers.push(fw);
            const updatedFollowers = post.user.followers;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: postUser.id, followers: updatedFollowers},
              }),
            );
          }

          const fr = {
            userId: postUser.id,
            userName: postUser.username,
            imgUri: postUser.imageUri,
          };
          const fwIndex = userRes.data.getUser.following.findIndex(
            (f) => f.userId === postUser.id,
          );
          if (fwIndex === -1) {
            userRes.data.getUser.following.push(fr);
            const updatedFollowing = userRes.data.getUser.following;
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {id: user.email, following: updatedFollowing},
              }),
            );
          }
          props.setFollowRerender(true)
          props.setFollowRerender(false)

          console.log('FollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  const handleUnFollow = async (postUser) => {
    if (post?.user?.followers.length > 0) {
      try {
        if (user) {
          const frIndex = post.user.followers.findIndex(
            (f) => f.userId === user.email,
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
                id: user.email,
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
                      id: user.email,
                      following: updatedFollowing,
                    },
                  }),
                );
              }
            }
          }
          props.setFollowRerender(true)
          props.setFollowRerender(false)
          console.log('UnfollowDone');
        }
      } catch (error) {
        console.log('Please Login', error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
    }
  };

  const handleClick = () => {
    // console.log('Propsd', props?.muteAll);
    showPauseRef.current = null;
    if (showRef.current) {
      clearTimeout(showRef.current);
    }
    if (props?.setMuteAll) {
      props?.setMuteAll(!props?.muteAll);
      // console.log('df');
    } else {
      // console.log('TGH');
      setMuted(!muted);
    }
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

  const click = () => {
    setTouched(!isTouched);
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const showToast = () => {
    ToastAndroid.show(message1, ToastAndroid.SHORT);
  };

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
              poster={
                props.post?.thumbnail
                  ? `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${props.post?.thumbnail}`
                  : ''
              }
              posterResizeMode="cover"
              resizeMode={'cover'}
              repeat={props.currentIndex === 0}
              paused={paused}
              // muted={muted}
              muted={props?.muteAll || muted}
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
            {/* <Slider
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="red"
              maximumTrackTintColor="#292929"
              thumbTintColor="white"
              step={1}
              value={currentTime}
              onValueChange={onSeeking}
              style={{width: '100%', top: '87.5%'}}
            /> */}
          </View>

          {showLikeIcon && (
            // <Animatable.View
            //   animation={(fadeIn, fadeOut)}
            //   style={{
            //     position: 'absolute',
            //     bottom: '60%',
            //     left: '40%',
            //     height: 80,
            //     width: 80,
            //     backgroundColor: `rgba(0, 0, 0, 0.3)`,
            //     borderRadius: 60,
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     padding: 25,
            //   }}>
            //   <Image
            //     source={require('../../assets/images/Cl3.png')}
            //     size={50}
            //     style={{height: 50, width: 50}}
            //   />
            // </Animatable.View>
            <LottieView
              source={require('../../assets/images/likejson.json')}
              style={{
                bottom: '20%',
              }}
              autoPlay
              loop
            />
          )}
          {showMutedIcon && (
            <Animatable.View
              animation={zoomOut}
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
              {props?.muteAll || muted ? (
                <Feather name="volume-x" size={50} color="#fff" />
              ) : (
                <Feather name="volume-2" size={50} color="#fff" />
              )}
            </Animatable.View>
          )}
          {showPauseIcon && (
            <Animatable.View
              animation={zoomOut}
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
                <Feather name="play" size={50} color="#fff" />
              ) : (
                <Feather name="pause" size={50} color="#fff" />
              )}
            </Animatable.View>
          )}

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
                  showToast();
                }}>
                <>
                  {/* {!isTouched ? ( */}
                  <Image
                    style={{height: 45, width: 45, opacity: 0.7}}
                    source={require('../../assets/images/Product_icon.png')}
                    size={25}
                  />
                  {/* ) : (
                    <Image
                      style={{
                        // top: -110,
                        position: 'absolute',
                        right: 0,
                        height: 45,
                        width: 45,
                        opacity: 0.7,
                      }}
                      source={require('../../assets/images/Product_icon1.png')}
                      size={25}
                    />
                  )} */}
                  {/* {isTouched && <Product />} */}
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
                  {/* {!isTouched ? ( */}
                  <Image
                    style={{height: 45, width: 45, opacity: 0.7}}
                    source={require('../../assets/images/Comment_icon.png')}
                    size={25}
                  />

                  {comments?.length > 0 ? (
                    <View
                      style={{
                        backgroundColor: '#69FA89',
                        height: 15,
                        width: 25,
                        borderRadius: 10,
                        left: 10,
                        bottom: 8,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#3E4446',
                          fontSize: 10,
                          fontWeight: '400',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                        }}>
                        {comments?.length}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#69FA89',
                        height: 15,
                        width: 25,
                        borderRadius: 10,
                        left: 10,
                        bottom: 8,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#3E4446',
                          fontSize: 10,
                          fontWeight: '400',
                          textAlign: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          alignContent: 'center',
                        }}>
                        0
                      </Text>
                    </View>
                  )}
                  {/* ) : (
                    <Image
                      style={{
                        top: 50,
                        position: 'absolute',
                        right: 0,
                        height: 45,
                        width: 45,
                        opacity: 0.7,
                      }}
                      source={require('../../assets/images/Comment_icon.png')}
                      size={25}
                    />
                  )} */}
                </>
              </TouchableOpacity>

              <RBSheet
                ref={refRBSheet}
                height={Dimensions.get('window').height - 300}
                animationType="fade"
                closeOnDragDown={false}
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
                <View style={{marginTop: 22, height: 40, width: 40}}>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.close()}
                    style={{
                      top: 0,
                      left: 10,
                      position: 'absolute',
                    }}>
                    <Feather name="chevron-left" size={30} color="#20232A" />
                  </TouchableOpacity>
                </View>
                <Comments
                  postId={props.post?.id}
                  postUserId={props.post.user?.id}
                  curUser={user}
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
                {/* {!isTouched ? ( */}
                <>
                  <TouchableOpacity
                    style={{left: 10}}
                    onPress={() =>
                      // navigation.navigate('Profile', {
                      //   postUser: props.post.user,
                      // })
                      navigation.navigate('Profile', {
                        screen: 'Profile',
                        params: {
                          postUser: props.post.user,
                        },
                      })
                    }>
                    <Text style={styles.handle}>{post?.user?.username}</Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', top: 25}}>
                    <Image
                      source={require('../../assets/images/Dot.png')}
                      size={25}
                      style={{bottom: 18, left: 10}}
                    />
                    <Text style={styles.description}>{post.description}</Text>
                  </View>
                  <View style={{flexDirection: 'row', bottom: 0, left: 10}}>
                    <Feather name="eye" size={20} color="#fff" />
                    <Text
                      style={{
                        paddingLeft: 5,
                        color: '#fff',
                        fontFamily: 'Proxima Nova',
                        fontSize: 10,
                        fontWeight: '400',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <ViewsCount
                        OnIncView={handleView}
                        currentPost={post}
                        currentIndex={props.currentIndex}
                        currentVisibleIndex={props.currentVisibleIndex}
                      />
                    </Text>
                  </View>
                </>
                {/* ) : (
                  <View />
                )} */}
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
