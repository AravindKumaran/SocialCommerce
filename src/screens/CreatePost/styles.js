import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#20232A',
  },
  text1: {
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    top: 10,
  },
  textInput: {
    margin: 20,
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3F464F',
    height: 220,
    width: 235,
    right: 20,
    color: 'white',
    // paddingBottom: 180,
    textAlignVertical: "top"
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    height: 100,
    marginHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

export default styles;
