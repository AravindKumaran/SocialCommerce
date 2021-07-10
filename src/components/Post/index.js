/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ImageBackground,
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
  updatePostHashTag,
} from '../../graphql/mutations';
import {getUser, getPost, listPostHashTags} from '../../graphql/queries';
import styles from './styles';
import Slider from '../Post/slider';
import DoubleClick from '../Post/doubletap';
import Follow from './Follow';
import Follow1 from './Follow1';
import ViewsCount from './ViewsCount';
import {NavigationActions} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import {Context} from '../../context/Store';
import {S3_URL} from '@env';

console.log('S3_URL', S3_URL);

const Post = (props) => {
  //console.log('props.post.user', props.post.user)
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
  const [commentLength, setCommentLength] = useState();
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(props?.muteAll);
  const [videoUri, setVideoUri] = useState('');

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [commentss, setCommentss] = useState(props.post?.comments?.items);

  const [message] = useState('Please sign in first');
  const [message1] = useState('Coming Soon!');
  const [delete_msg] = useState('Video is deleted!');

  const [isFollow, setIsFollow] = useState(false);

  const [globalState, globalDispatch] = useContext(Context);

  const [isEdited, setEdited] = useState(false);

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
    const getComments = async () => {
      try {
        setIsLoading(true);
        const res = await API.graphql(
          graphqlOperation(getPost, {
            id: props.post?.id,
          }),
        );
        console.log('ress', res?.data?.getPost?.comments?.items?.length);
        setCommentLength(res?.data?.getPost?.comments?.items?.length);
        // console.log('length', sortedItems.length);
        // setCommentLength(sortedItems.length);
        // setCommentss(sortedItems);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log('Error', err);
      }
    };
    getComments();
    // console.log('commentLength', commentLength);
  }, [commentss]);

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
      setVideoUri(`${S3_URL}${props.post?.videoUri}`);
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
  };

  useEffect(() => {
    if (post?.user?.followers !== props.post?.user?.followers) {
      //console.log('post usereff', post?.user?.followers)
      //console.log('props post usereff', props.post?.user?.followers)
      setPost(props.post);
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

  useEffect(() => {
    //console.log('props?.muteAll', props?.muteAll);
    setMuted(props?.muteAll);
  }, [props?.muteAll]);

  const handleClick = () => {
    //console.log('Propsd', props?.muteAll);
    console.log('Propsd', props?.muteAll);
    showPauseRef.current = null;
    if (showRef.current) {
      clearTimeout(showRef.current);
    }

    console.log('muted', muted);
    setMuted(!muted);

    if (props?.setMuteAll) {
      setTimeout(() => {
        props?.setMuteAll(!props?.muteAll);
        globalDispatch({type: 'globalMuted', payload: !props?.muteAll});
      }, 0);
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

  const myCustomShare = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Enter your message: ',
      url: videoUri,
      social: Share.Social.WHATSAPP,
      whatsAppNumber: '919999999999',
      filename: 'test',
    };
    console.log('url', videoUri);

    try {
      const ShareResponse = await Share.shareSingle(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const deletePost = async () => {
    setIsLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updatePost, {
          input: {id: post.id, isDeleted: true},
        }),
      );

      const res = await API.graphql(
        graphqlOperation(listPostHashTags, {
          filter: {
            postID: {eq: post.id},
          },
        }),
      );

      const listPostHashTagsRes = res.data.listPostHashTags.items;

      if (listPostHashTagsRes.length) {
        listPostHashTagsRes.map(async (p, i) => {
          await API.graphql(
            graphqlOperation(updatePostHashTag, {
              input: {id: p.id, postDeleted: true},
            }),
          );
        });
      }

      globalDispatch({type: 'postDeleted', payload: true});
      setTimeout(() => {
        globalDispatch({type: 'postDeleted', payload: false});
      }, 100);
      setIsLoading(false);
      ToastAndroid.show(delete_msg, ToastAndroid.SHORT);
    } catch (error) {
      setIsLoading(false);
      console.log('delete post err', error);
    }
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
                props.post?.thumbnail ? `${S3_URL}${props.post?.thumbnail}` : ''
              }
              posterResizeMode="cover"
              resizeMode={'cover'}
              repeat={true}
              paused={paused}
              muted={muted}
              // muted={props?.muteAll || muted}
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
              {/* {props?.muteAll || muted ? ( */}
              {muted ? (
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
            {post.user.id === user?.email && (
              <View style={{flex: 1, alignItems: 'flex-end', margin: 10}}>
                {!isEdited ? (
                  <TouchableOpacity onPress={() => setEdited(true)}>
                    <ImageBackground
                      style={{
                        backgroundColor: '#363E45',
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        justifyContent: 'center',
                        opacity: 0.3,
                      }}></ImageBackground>
                    <Feather
                      name="bar-chart"
                      size={25}
                      color="#FFFFFF"
                      style={{
                        transform: [{scaleX: -1}, {rotate: '90deg'}],
                        alignSelf: 'center',
                        bottom: 40,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <ImageBackground
                      // source={require('../../assets/images/Editpost.png')}
                      style={{
                        width: 100,
                        height: 125,
                        backgroundColor: '#363E45',
                        borderRadius: 10,
                        opacity: 0.3,
                      }}></ImageBackground>
                    <View style={{flex: 1, bottom: 125}}>
                      <TouchableOpacity onPress={() => setEdited(false)}>
                        <Feather
                          name="bar-chart"
                          size={20}
                          color="#FFFFFF"
                          style={{
                            transform: [{scaleX: -1}, {rotate: '90deg'}],
                            alignSelf: 'flex-end',
                            margin: 5,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={{margin: 15}}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('CreatePost', {
                              editPost: true,
                              postId: post.id,
                              videoUri: S3_URL + post.videoUri,
                              thumbnailUri: S3_URL + post.thumbnail,
                              description: post.description,
                              category: post.category,
                              brand: post.brand,
                              languages: post.languages,
                              audience: post.audience,
                            });
                          }}>
                          <Text style={styles.text4}>Edit Post</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            borderWidth: 0.5,
                            borderColor: 'rgba(163, 163, 163, 0.44)',
                            marginVertical: 5,
                            width: '75%',
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            deletePost();
                          }}>
                          <Text style={styles.text4}>Delete Post</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              </View>
            )}

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
                // onFollow={handleFollow}
                // onUnFollow={handleUnFollow}
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
                  top: 110,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  setTouched(!isTouched);
                  showToast();
                }}>
                <>
                  {/* {!isTouched ? ( */}
                  {/* <Image
                    style={{height: 45, width: 45, opacity: 0.7}}
                    source={require('../../assets/images/Product_icon.png')}
                    size={25}
                  /> */}
                  <ImageBackground
                    style={{
                      backgroundColor: '#363E45',
                      height: 55,
                      width: 55,
                      borderRadius: 50,
                      opacity: 0.3,
                      justifyContent: 'center',
                    }}></ImageBackground>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: 'center',
                      right: 42.5,
                      bottom: 67.5,
                    }}
                    source={require('../../assets/images/shop-bag.png')}
                  />
                  {/* ) : (
                    <ImageBackground
                    style={{
                        backgroundColor: '#363E45',
                      height: 55,
                      width: 55,
                      borderRadius: 50,
                      opacity: 0.3,
                      justifyContent: 'center',
                    }}></ImageBackground>
                  <Image
                    style={{
                    height: 30,
                      width: 30,
                      alignSelf: 'center',
                      right: 42.5,
                      bottom: 67.5,
                    }}
                    source={require('../../assets/images/shop-bag-selected.png')}
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
                  right: 15,
                  bottom: 0,
                  top: 170,
                  zIndex: 1,
                  flexDirection: 'row',
                }}
                onPress={() => refRBSheet.current.open()}>
                <>
                  {/* {!isTouched ? ( */}
                  {/* <Image
                    style={{height: 45, width: 45, opacity: 0.7}}
                    source={require('../../assets/images/Comment_icon.png')}
                    size={25}
                  /> */}
                  <ImageBackground
                    style={{
                      backgroundColor: '#363E45',
                      height: 55,
                      width: 55,
                      borderRadius: 50,
                      opacity: 0.3,
                      left: 30,
                      justifyContent: 'center',
                    }}></ImageBackground>

                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: 'center',
                      right: 12.5,
                      bottom: 37.5,
                    }}
                    source={require('../../assets/images/comments.png')}
                  />
                  <View
                    style={{
                      backgroundColor: '#69FA89',
                      height: 12.5,
                      width: 35,
                      borderRadius: 10,
                      top: 45,
                      right: 45,
                      justifyContent: 'center',
                      zIndex: 1,
                    }}>
                    <Text
                      style={{
                        color: '#3E4446',
                        fontSize: 10,
                        fontWeight: '700',
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center',
                      }}>
                      {commentLength > 0 ? commentLength : 0}
                    </Text>
                  </View>
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
                  setCommentss={setCommentss}
                />
              </RBSheet>
              {/* {isClicked ?  : <></>} */}

              {/* <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View> */}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 0,
                  zIndex: 1,
                  bottom: 10,
                  flexDirection: 'row',
                }}
                onPress={myCustomShare}>
                <>
                  {/* {!isTouched ? ( */}
                  {/* <Image
                    style={{height: 45, width: 45, opacity: 0.7}}
                    source={require('../../assets/images/Whatsapp.png')}
                    size={25}
                  /> */}
                  <ImageBackground
                    style={{
                      backgroundColor: '#363E45',
                      height: 55,
                      width: 55,
                      borderRadius: 50,
                      opacity: 0.3,
                      justifyContent: 'center',
                    }}></ImageBackground>
                  <Image
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: 'center',
                      right: 42.5,
                    }}
                    source={require('../../assets/images/Cl8.png')}
                  />
                  {/* ) : (
                         <ImageBackground
                    style={{
                      backgroundColor: '#363E45',
                      height: 50,
                      width: 50,
                      borderRadius: 50,
                      opacity: 0.3,
                      justifyContent: 'center',
                    }}></ImageBackground>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      alignSelf: 'center',
                      right: 35,
                    }}
                    source={require('../../assets/images/Cl6.png')}
                  />
                  )} */}
                  {/* {isTouched && <Product />} */}
                </>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer}>
              <>
                {/* {!isTouched ? ( */}
                <>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{left: 10}}
                      onPress={() =>
                        // navigation.navigate('Profile', {
                        //   postUser: props.post.user,
                        // })
                        // navigation.navigate('Profile', {
                        //   screen: 'Profile',
                        //   params: {
                        //     postUser: props?.post?.user,
                        //   },
                        // })

                        navigation.navigate('SeeProfile', {
                          screen: 'SeeProfile',
                          thirdUser: props?.post?.user,
                        })
                      }>
                      <Text style={styles.handle}>{post?.user?.username}</Text>
                    </TouchableOpacity>
                    <Follow1 thirdUser={post.user} />
                  </View>
                  <View style={{flexDirection: 'row', top: 22.5}}>
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
