import React from 'react';

import {StyleSheet, View, Text, Image} from 'react-native';
import TimeAgo from 'react-native-timeago';
import AppText from '../../components/Common/AppText';

const NotifItem = ({item}) => {
  return (
    <View
      key={item.id}
      style={[
        styles.ntfCard,
        //    index === todayNotif.length - 1 ? {marginBottom: 100} : null,
      ]}>
      <View style={{width: 40, marginHorizontal: 10}}>
        <Image
          source={{uri: item.user.imageUri}}
          style={{
            height: 35,
            width: 35,
            borderRadius: 20,
            marginTop: 7,
          }}
        />
      </View>
      
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
            bottom: 10
          }}>
          <TimeAgo time={item.createdAt} />
        </AppText>
      </View>
      <View style={{width: 40, marginHorizontal: 10}}>
        <Image
          source={require('../../assets/images/i6.png')}
          style={{
            height: 35,
            width: 35,
            marginTop: 7,
          }}
        />
      </View>
    </View>
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
