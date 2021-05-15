import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: '5%',
    backgroundColor: '#20232A',
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
    bottom: 0,
    backgroundColor: '#ff4343',
    zIndex: 1,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonStop: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 30,
    width: 30,
    bottom: 0,
    borderRadius: 3,
    backgroundColor: '#ff4343',
    borderWidth: 2,
    borderColor: 'white',
  },
  gallery: {
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    top: '93%',
    right: 30,
  },
  right: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15,
    right: 20,
    marginTop: '35%',
  },
});

export default styles;
