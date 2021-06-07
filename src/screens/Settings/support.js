import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AppButton from '../../components/Common/AppButton';
// import Mailer from 'react-native-mail';

const Support = ({user, saveUser, closeSheet}) => {
  console.log('user', user);
  console.log('Userss', user?.id);
  const [query, setQuery] = useState(user?.query || '');
  const [message, setMessage] = useState(user?.message || '');

  const handleEmail = () => {
    Mailer.mail(
      {
        subject: 'Livebox Support',
        recipients: ['liveboxtechnologies@gmail.com'],
        // ccRecipients: ['supportCC@example.com'],
        // bccRecipients: ['supportBCC@example.com'],
        // body: '<b></b>',
        // customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
        isHTML: true,
        // attachments: [
        //   {
        //     // Specify either `path` or `uri` to indicate where to find the file data.
        //     // The API used to create or locate the file will usually indicate which it returns.
        //     // An absolute path will look like: /cacheDir/photos/some image.jpg
        //     // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
        //     path: '', // The absolute path of the file from which to read data.
        //     uri: '', // The uri of the file from which to read the data.
        //     // Specify either `type` or `mimeType` to indicate the type of data.
        //     type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        //     mimeType: '', // - use only if you want to use custom type
        //     name: '', // Optional: Custom filename for attachment
        //   },
        // ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Support</Text>
      <View style={{alignItems: 'center'}}>
        <View style={{marginVertical: 30}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '400',
              fontSize: 12,
              left: 10,
            }}>
            Query
          </Text>
          <TextInput
            style={styles.input}
            value={query}
            defaultValue={query}
            onChangeText={(e) => setQuery(e)}
          />
        </View>
        <View style={{top: 0}}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'Proxima Nova',
              fontWeight: '400',
              fontSize: 12,
              left: 10,
            }}>
            Message
          </Text>
          <TextInput
            style={styles.input1}
            value={message}
            defaultValue={message}
            onChangeText={(e) => setMessage(e)}
            maxLength={50}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', paddingTop: 0, margin: 20}}>
        <AppButton onPress={handleEmail} title="Submit" />
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
  input: {
    width: 300,
    height: 50,
    padding: 10,
    top: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: '#737373',
  },
  input1: {
    width: 300,
    height: 120,
    padding: 10,
    top: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 14,
    borderWidth: 0.5,
    borderColor: '#737373',
    paddingBottom: 75,
  },
});

export default Support;
