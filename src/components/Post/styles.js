import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height + 40,
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
    bottom: '9.5%',
    right: 0,
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    bottom: 170,
  },
  handle: {
    color: '#fff',
    fontFamily: 'Proxima Nova',
    fontSize: 20,
    fontWeight: '700',
    bottom: 0,
    left: 0,
    paddingRight: 15,
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
    left: 40,
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
  Rectangle1: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 30,
  },
  text3: {
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 10,
  },
  text4: {
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default styles;
