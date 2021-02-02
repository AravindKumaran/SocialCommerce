import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Text, Image, TouchableOpacity } from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';

import Video from 'react-native-video';
import styles from './styles';
import Product from '../../screens/Product/index';

// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { updatePost } from '../../graphql/mutations';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(false);
  const [isTouched, setTouched] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

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

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }
    setVideoUri(await Storage.get(post.videoUri));
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  return (
    <View style={styles.container}>
      {/* {shouldShow ? ( */}
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          <Video
            //  ref={ controls => controls = Video}
            source={{ uri: videoUri }}
            style={styles.video}
            onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
          />

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              {/* <Image
              source={require('../../assets/images/Profile_icon.png')}
              size={25}
            /> */}

              {/* {shouldShow ? ( */}

              <TouchableOpacity style={{ position: 'absolute', right: 15, bottom: 0, top: -20 }} /*onPress={onLikePress}*/ >
                {/* {shouldShow ? ( */}
                <Image
                  source={require('../../assets/images/Profile1_icon.png')}
                  size={25}
                />
                {/* <Fontisto name={'heart'} size={25} color={isLiked ? 'red' : 'white'} /> */}
                {/* <Text style={styles.statsLabel}>{post.likes || 0}</Text> */}
              </TouchableOpacity>

              <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 0, top: 50 }} /*onPress={onLikePress}*/ >
                <Image
                  source={require('../../assets/images/Like_icon.png')}
                  size={25}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 0, top: 105 }} onPress={() => setTouched(!isTouched)} >
                <>
                  {!isTouched ?
                    <Image
                      source={require('../../assets/images/Product_icon.png')}
                      size={25}
                    /> : <></>}
                  {isTouched && <Product />}
                </>
              </TouchableOpacity>

              {/* ) : ( */}

              <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 0, top: 250 }}>
                <Image
                  source={require('../../assets/images/Comment_icon.png')}
                  size={25}
                />
                {/* <Fontisto name={'commenting'} size={25}  color="white" /> */}
                {/* <Fontosio name={'heart'} size={40} color="white" /> */}
                {/* <Text style={styles.statsLabel}>{post.comments}</Text> */}
              </TouchableOpacity>

              {/* <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View> */}

            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.handle}>{post.user.username}</Text>
                <Image source={require('../../assets/images/Dot.png')} size={25} style={{ bottom: 15, left: 10 }} />
                <Text style={styles.description}>{post.description}</Text>

                {/* <View style={styles.songRow}> */}
                {/* <Entypo name={'beamed-note'} size={24} color="white" /> */}
                {/* <Text style={styles.songName}>{post.song.name}</Text> */}
                {/* </View> */}
              </View>
            </View>

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



// import React, { useState } from 'react';
// import { StyleSheet, View, Button, Image } from 'react-native';

// const App = () => {
//   const [shouldShow, setShouldShow] = useState(false);
//   return (
//       <View style={styles.container}>
//         {shouldShow ? (
//           <Image
//             source={{ uri:     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png'
//             }}
//             style={{ width: 250, height: 250 }}
//           />
//         ) : (
//         <Button
//           title="Hide/Show Component"
//           onPress={() => setShouldShow(!shouldShow)}
//         /> )}
//       </View>
//   );
// };


// const icon = this.props.active
//   ? require('./my-icon-active.png')
//   : require('./my-icon-inactive.png');
// <Image source={icon} />;
