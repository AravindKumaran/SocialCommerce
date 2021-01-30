import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#383734',
    top: 0,
    height: '100%'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonRecord: {
    alignSelf: 'center',
    marginVertical: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    bottom: "12%",
    backgroundColor: '#ff4343',
  },
  buttonStop: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 30,
    width: 30,
    bottom: "12%",
    borderRadius: 3,
    backgroundColor: '#ff4343',
  },
});

export default styles;
