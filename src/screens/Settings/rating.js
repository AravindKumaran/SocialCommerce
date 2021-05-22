import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import AppButton from '../../components/Common/AppButton';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Rating = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(2);
  const [maxRating, setmaxRating] = useState([1, 2, 3, 4, 5]);

  const CustomRatingBar = () => {
    return (
      <View style={styles.ratingbar}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setRating(item)}>
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating
                    ? require('../../assets/images/star_filled.png')
                    : require('../../assets/images/star_corner.png')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Rate us</Text>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignSelf: 'center',
            alignSelf: 'flex-start',
            marginLeft: 10,
            bottom: 40,
          }}>
          <Feather name={'chevron-left'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={{width: '80%', alignSelf: 'center'}}>
        <Text style={styles.text1}>
          Please rate us based on your experience here
        </Text>
        <CustomRatingBar />
        <AppButton
          style={{top: 0}}
          // onPress={handleSignIn}
          title="Submit"
        />
        <Image
          source={require('../../assets/images/manwithstars.png')}
          style={styles.image1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: 'transparent',
  },
  text1: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    marginBottom: 20,
  },
  image1: {
    bottom: 0,
  },
  ratingbar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  starImgStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});

export default Rating;
