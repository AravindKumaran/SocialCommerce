import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 142 ,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 15,
    right: 0,
    borderRadius: 10,
    // backgroundColor: '#292929',
    // borderWidth: 10
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    marginBottom: 7
  },
  // bottomContainer: {
  //   padding: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  // },
  // handle: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '700',
  //   marginBottom: 10,
  // },
  // description: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '300',
  //   marginBottom: 10,
  // },
  // songRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // songName: {
  //   color: '#fff',
  //   fontSize: 16,
  //   marginLeft: 5,
  // },

  // songImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   borderWidth: 2,
  //   borderColor: '#fff',
  //   alignItems: 'flex-end',
  // },

  //  right container
  // rightContainer: {
  //   alignSelf: 'flex-end',
  //   height: 300,
  //   justifyContent: 'space-between',
  //   marginRight: 5,
  // },
  // profilePicture: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   borderWidth: 2,
  //   borderColor: '#fff',
  // },

  // iconContainer: {
  //   alignItems: 'center',
  // },
  // statsLabel: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '600',
  //   marginTop: 5,
  // },
});

export default styles;
