import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const AppTextInput = ({icon, numberOfLines = 1, width, ...rest}) => {
  return (
    <View style={[styles.container]}>
      {icon && (
        <Feather name={icon} size={20} color="#6e6969" style={styles.icon} />
      )}
      <TextInput
        style={styles.textInput}
        numberOfLines={numberOfLines}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    marginRight: 5,
    overflow: 'hidden',
    height: 45,
    color: '#FEFEFE',
    top: 15
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 12,
    fontWeight: '400',
    color: '#959595',
    flex: 1,
    textAlignVertical: 'top',
    width: '100%',
    height: 40,
    fontFamily: 'Proxima Nova'
  },
});

export default AppTextInput;
