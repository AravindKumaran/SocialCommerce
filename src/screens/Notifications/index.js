import React from 'react';

import {StyleSheet, View, Text, Images, Dimensions} from 'react-native';

const Notification = () => {
  return (
    <View style={styles.coverer}>
      <Text>Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  coverer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
  },
});

export default Notification;


