import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Container = (props) => {
  return (
    <LinearGradient colors={['red', 'yellow', 'green']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>{props}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default Container;
