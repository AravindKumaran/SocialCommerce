import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import LinearGradient from 'react-native-linear-gradient';

const AppButton = ({title, onPress, btnStyle, txtStyle, iconName}) => {
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={onPress}>
      {iconName && (
        <Feather style={styles.icon} name={iconName} size={25} color="#fff" />
      )}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#5e37f4', '#518bf9', '#21fffc']}
        style={styles.button}>
        <Text style={[styles.text, txtStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#fc5c65',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Proxima Nova',
  },
});

export default AppButton;
