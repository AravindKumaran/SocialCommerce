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

import {color} from 'react-native-reanimated';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';
import Comments from './comments';

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(false);
  const [isTouched, setTouched] = useState(false);
  const [isPressed, setPressed] = useState(false);
  const [isClicked, setClicked] = useState(false);

  const vidRef = useRef(null);
  const refRBSheet = useRef();

  useEffect(() => {
    if (props.currentIndex === props.currentVisibleIndex) {
      vidRef.current.resume();
    } else {
      vidRef.current.pause();
    }
  }, [props.currentVisibleIndex]);

  // const tag = () => {
  //   setTouched(!isTouched);
  // };

  // const [shouldShow, setShouldShow] = useState(true);

  // const onLikePress  = async () => {
  //   const likesToAdd = isLiked ? -1 : 1;
  //   const postLikes = post.likes[0];
  //   setPost({
  //     ...post,
  //     likes: [postLikes + likesToAdd],
  //   });
  //   const response = await API.graphql(
  //     graphqlOperation(updatePost, { input: {likes: [postLikes + likesToAdd], id: post.id} }),
  //   );
  //   setIsLiked(!isLiked);
  // };

  return (
    <View style={styles.container}>
      {/* {shouldShow ? ( */}
      <TouchableWithoutFeedback>
        <View>
          <View style={styles.video}>
            {/* <InViewPort onChange={this.handlePlaying}> */}
            <VideoPlayer
              ref={vidRef}
              //  ref={ controls => controls = Video}
              // video={{uri: props.post.videoUri}}
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
              // style={styles.video}
              pauseOnPress={true}
              // paused={true}
              disableControlsAutoHide={false}
              disableSeek={true}
              // hideControlsOnStart={false}
              // customStyles={wrapper}
              // onError={(e) => console.log(e)}
              // resizeMode={'cover'}
              // repeat={true}
              // paused={paused}
              // playInBackground={false}
              // onLoad={onLoad}
              // onEnd={onEnd}
              // onLoadStart={onLoadStart}
              // controls={true}
              // muted={true}
            />
            {/* </InViewPort> */}
          </View>

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              {/* <Image
              source={require('../../assets/images/Profile_icon.png')}
              size={25}
              /> */}

              {/* {shouldShow ? ( */}

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

              <TouchableOpacity
                style={{position: 'absolute', right: 20, bottom: 0, top: 50}}
                onPress={() => setLiked(!isLiked)} /*onPress={onLikePress}*/
              >
                <>
                  {!isLiked ? (
                    <Image
                      source={require('../../assets/images/Like_icon.png')}
                      size={25}
                    />
                  ) : (
                    <Image
                      style={{top: 0, position: 'absolute', right: -60}}
                      source={require('../../assets/images/Like_icon1.png')}
                      size={25}
                    />
                  )}

                  {!isLiked && isTouched ? (
                    <Image
                      style={{top: -110, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Like_icon.png')}
                      size={25}
                    />
                  ) : isLiked && !isTouched ? (
                    <Image
                      style={{top: 0, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Like_icon1.png')}
                      size={25}
                    />
                  ) : !isLiked && !isTouched ? (
                    <Image
                      style={{top: 0, position: 'absolute', right: -60}}
                      source={require('../../assets/images/Like_icon.png')}
                      size={25}
                    />
                  ) : isLiked && isTouched ? (
                    <Image
                      style={{top: -110, position: 'absolute', right: 0}}
                      source={require('../../assets/images/Like_icon1.png')}
                      size={25}
                    />
                  ) : (
                    <View />
                  )}

                  {/* if ({isLiked===true && isTouched===false}) {
                    <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                  }
                  else if ({isLiked===false && isTouched===true}) {
                    <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} />
                  }
                  else if ({isLiked===true && isTouched===true}) {
                    <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                  }
                  else if ({isLiked===false && isTouched===false}){
                    <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} />
                  }
                  else{
                    <Image source={require('../../assets/images/Like_icon.png')}  size={25} />
                  } */}

                  {/* {!isLiked && isTouched ? (
                    <Image source={require('../../assets/images/Like_icon.png')}  size={25} />
                    ) : (
                    <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                    ) }

                  {isLiked && !isTouched ? (
                    <Image source={require('../../assets/images/Like_icon.png')}  size={25} />
                    ) : (
                    <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} />
                    ) }

                  {!isLiked && !isTouched ? (
                    <Image source={require('../../assets/images/Like_icon.png')}  size={25} />
                    ) : (
                    <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                    ) }

                  {isLiked && isTouched ? (
                    <Image source={require('../../assets/images/Like_icon.png')}  size={25} />
                    ) : (
                    <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} />
                    ) }  */}

                  {/* {!isLiked && isTouched }
                      <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                       {isLiked && !isTouched}
                              <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} />
                               {!isLiked && !isTouched}
                                      <Image style={{top: 0, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon1.png')} size={25} />
                                       {isLiked && isTouched}
                                              <Image style={{top: -110, position: 'absolute', right: 0}} source={require('../../assets/images/Like_icon.png')} size={25} /> */}
                </>
              </TouchableOpacity>

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
                      // tintColor={isTouched ? '#31d9fc' : 'white'}
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
                // onPress={() => setClicked(!isClicked)}
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
                      // tintColor={isTouched ? '#31d9fc' : 'white'}
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
