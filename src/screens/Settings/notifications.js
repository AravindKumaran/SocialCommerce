import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {ImageBackground} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

const Notifications = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text1}>Notifications</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            alignSelf: 'center',
            alignSelf: 'flex-start',
            marginLeft: 10,
            bottom: 20,
          }}>
          <Feather name={'chevron-left'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 30, marginTop: 30}}>
        <View>
          <Text style={styles.text2}>Push Notifications</Text>
          <ToggleSwitch
            isOn={false}
            onColor="#21FFFC"
            offColor="#595959"
            label="Pause all notifications"
            labelStyle={{
              color: '#FFFFFF',
              fontWeight: '400',
              fontFamily: 'Proxima Nova',
              fontSize: 16,
            }}
            onToggle={(isOn) => console.log('changed to : ', isOn)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.text2}>Notification sound</Text>
          <ToggleSwitch
            isOn={true}
            onColor="#21FFFC"
            offColor="#595959"
            label="Play sound"
            labelStyle={{
              color: '#FFFFFF',
              fontWeight: '400',
              fontFamily: 'Proxima Nova',
              fontSize: 16,
            }}
            onToggle={(isOn) => console.log('changed to : ', isOn)}
          />
        </View>
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
  },
  text2: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
    marginBottom: 20,
  },
  text3: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: 'Proxima Nova',
    fontSize: 16,
  },
});

export default Notifications;
