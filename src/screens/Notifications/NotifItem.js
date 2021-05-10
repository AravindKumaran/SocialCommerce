import React from 'react';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import TimeAgo from 'react-native-timeago';
import {useNavigation} from '@react-navigation/native';
import AppText from '../../components/Common/AppText';

const NotifItem = ({item}) => {
  const navigation = useNavigation();

  return (
    <>
      <View
        key={item.id}
        style={[
          styles.ntfCard,
          //    index === todayNotif.length - 1 ? {marginBottom: 100} : null,
        ]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Profile', {
              screen: 'Profile',
              params: {
                postUser: item.user,
              },
            })
          }
          style={{width: 40, marginHorizontal: 10}}>
          <Image
            source={{
              uri: item?.user?.imageUri.startsWith('https')
                ? item?.user?.imageUri
                : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${item?.user?.imageUri}`,
            }}
            style={{
              height: 35,
              width: 35,
              borderRadius: 20,
              marginTop: 7,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, top: 5}}>
          <AppText style={{color: '#fff', fontSize: 12, fontWeight: '700'}}>
            {item.user.username}
            <AppText style={{fontSize: 12, color: '#fff', fontWeight: '400'}}>
              {item.notification.message}
            </AppText>
          </AppText>

          <AppText
            style={{
              color: '#5C5C5C',
              fontSize: 12,
              fontWeight: '400',
              bottom: 10,
            }}>
            <TimeAgo time={item.createdAt} />
          </AppText>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NotifVideoPlay', {
              item: {...item.post, user: item.user},
            })
          }
          style={{width: 40, marginHorizontal: 10}}>
          <Image
            source={{
              uri: item?.post?.thumbnail.startsWith('https')
                ? item?.post?.thumbnail
                : `https://liveboxc7d791528cf44cb0b92efd2c8b1c077762739-staging.s3.ap-south-1.amazonaws.com/public/${item.post?.thumbnail}`,
            }}
            style={{
              height: 35,
              width: 35,
              marginTop: 7,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ntfCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 0,
    marginHorizontal: 10,
    padding: 5,
    // paddingBottom: 12,
  },
});

export default NotifItem;
