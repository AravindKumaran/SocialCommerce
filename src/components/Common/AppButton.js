import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const AppButton = ({title, onPress, btnStyle, txtStyle, iconName}) => {
  return (
    <TouchableOpacity style={[styles.button, btnStyle]} onPress={onPress}>
      {iconName && (
        <Feather style={styles.icon} name={iconName} size={25} color="#fff" />
      )}
      <Text style={[styles.text, txtStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fc5c65',
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
  },
});

export default AppButton;
