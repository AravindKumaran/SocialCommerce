import React, {useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Text, Image, TouchableOpacity} from 'react-native';
import {API, graphqlOperation, Storage} from 'aws-amplify';

import Video from 'react-native-video';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';

// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { updatePost } from '../../graphql/mutations';
// import Fontisto from 'react-native-vector-icons/Fontisto';

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [paused, setPaused] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

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
  },[]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          <Video
          //  ref={ controls => controls = Video}
            source={{uri: videoUri}}
            style={styles.video}
            onError={(e) => console.log(e)}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
          />

          <View style={styles.uiContainer}>
            {/* <View style={styles.rightContainer}> */}
              {/* <Image
                style={styles.profilePicture}
                source={{uri: post.user.imageUri}}
              /> */}

              <TouchableOpacity style={{position: 'absolute', left: 25, bottom: "0%", top: "90%" }} /*onPress={onLikePress}*/ >
                <Fontisto name={'heart'} size={25} color={isLiked ? 'red' : 'white'} />
                {/* <Text style={styles.statsLabel}>{post.likes || 0}</Text> */}
              </TouchableOpacity>

              <View style={{position: 'absolute', right: 25, bottom: "0%", top: "90%" }}>
              <Fontisto name={'commenting'} size={25}  color="white" />
                {/* <Fontosio name={'heart'} size={40} color="white" /> */}
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>

              {/* <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View> */}

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

              <Image
                style={styles.songImage}
                source={{uri: post.song.imageUri}}
              />
            </View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Post;
