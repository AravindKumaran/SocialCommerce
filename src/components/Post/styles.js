import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 15,
    right: 0,
    backgroundColor: '#20232A',
    width: '100%',
    height: Dimensions.get('window').height - 140,
    // marginTop: '0%'
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
    marginBottom: 7,
    // position: 'absolute',
    // zIndex: 1
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    bottom: 150,
  },
  handle: {
    color: '#fff',
    fontFamily: 'Proxima Nova',
    fontSize: 20,
    fontWeight: '700',
    bottom: 25,
    left: 10,
  },
  description: {
    color: '#fff',
    fontFamily: 'Proxima Nova',
    fontSize: 12,
    fontWeight: '400',
    bottom: 26,
    color: '#21FFFC',
    left: 17,
    zIndex: 1,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'flex-end',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
    bottom: 120,
    right: -10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },

  iconContainer: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default styles;
