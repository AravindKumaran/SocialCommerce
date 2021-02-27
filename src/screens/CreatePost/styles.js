import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textInput: {
    margin: 20,
    backgroundColor: 'white',
    fontFamily: 'Proxima Nova',
    fontSize: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    height: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default styles;
