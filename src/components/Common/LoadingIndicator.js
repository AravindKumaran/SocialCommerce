import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';

function LoadingIndicator({bgc, visible = false}) {
  if (!visible) return null;

  return (
    <View
      style={[styles.overlay, bgc ? {backgroundColor: 'transparent'} : null]}>
      <ActivityIndicator
        animating={true}
        color={bgc ? 'bgc' : 'white'}
        size="large"
      />
      {/* {title && (
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#333'}}>
          {title}
        </Text>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: '#20232A',
    height: '100%',
    opacity: 0.8,
    width: '100%',
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingIndicator;
