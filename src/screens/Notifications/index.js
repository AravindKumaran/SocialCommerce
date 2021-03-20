import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {API, graphqlOperation, Storage, Auth} from 'aws-amplify';
import {listUserNotifications} from '../../graphql/queries';
import AppText from '../../components/Common/AppText';
import AppButton from '../../components/Common/AppButton';
import {useIsFocused} from '@react-navigation/native';
import {Linking} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotifItem from './NotifItem';

const user = [
  {
    name: 'Tamil25',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '11m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
  {
    name: 'Eren45',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '22m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
  {
    name: 'Mikasa',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '33m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
  {
    name: 'Armin65',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '44m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
  {
    name: 'Levi75',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '50m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
  {
    name: 'Hange85',
    photo: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
    comment: 'commented on your photo.',
    createdat: '56m',
    reply: 'Reply',
    liked: 'https://i.stack.imgur.com/t8vJf.jpg?s=328&g=1',
  },
];

const user1 = {
  __typename: 'User',
  createdAt: '2021-01-01T17:03:46.393Z',
  email: 'asfiidarlachu@gmail.com',
  id: '0914c457-106d-4937-b44f-f430e611a52a',
  imageUri: 'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  updatedAt: '2021-01-01T17:03:46.393Z',
  username: 'Asfiya begum',
};

const checkYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.getDate();
};

const Notifications = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [notifications, setNotifications] = useState([]);

  const [olderNotif, setOlderNotif] = useState([]);
  const [todayNotif, setTodayNotif] = useState([]);
  const [yesterdayNotif, setYesterdayNotif] = useState([]);

  const getAllNotifications = async () => {
    try {
      setLoading(true);
      const res = await API.graphql(
        graphqlOperation(
          listUserNotifications,
          //   , {
          //   filter: {
          //     userID: {eq: user1.id},
          //   },
          // }
        ),
      );
      // console.log('ress', res.data.listUserNotifications.items[0]);
      const allItems = res.data.listUserNotifications.items;
      const sortedItems = allItems.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      const tod = [];
      const yes = [];
      const old = [];
      sortedItems.forEach((item) => {
        const today = new Date().getDate();
        const cDate = new Date(item.createdAt).getDate();
        if (cDate === today) {
          tod.push(item);
        } else if (cDate === checkYesterday()) {
          yes.push(item);
        } else {
          old.push(item);
        }
      });
      setTodayNotif(tod);
      setYesterdayNotif(yes);
      setOlderNotif(old);
      // setNotifications(sortedItems);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setLoading(false);
      setRefreshing(false);
      console.log('Error', err);
    }
  };

  useEffect(() => {
    getAllNotifications();
    return () => {
      setTodayNotif([]);
      setOlderNotif([]);
      setYesterdayNotif([]);
    };
  }, [isFocused === true]);

  const onGoogle = async () => {
    // Auth.federatedSignIn({provider: 'Google'});
    // await Auth.signOut();
    console.log('Called');
    // return;
    Auth.federatedSignIn();

    // const federatedInfo = await Cache.getItem('federatedInfo');
    // console.log('Info', federatedInfo);

    return;
    try {
      // const url = 'https://www.google.com';
      const url =
        'https://tiktok24dfe314-24dfe314-demo.auth.us-east-2.amazoncognito.com/login?redirect_uri=tiktok%3A%2F%2F&response_type=code&client_id=7dcbjoer98feb1f4spbn5p0g4l&identity_provider=google&scope=phone%20email%20openid%20profile%20aws.cognito.signin.user.admin&state=HcXprhpFinnP0yJWLg97AzKH0WvvD348&code_challenge=zyasMIpb4FzSb_x3T91xzwFKlQp_X5o3CV_L60nS1lM&code_challenge_method=S256&errorMessage=Login+option+is+not+available.+Please+try+another+one';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTodayNotif([]);
    setOlderNotif([]);
    setYesterdayNotif([]);
    getAllNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20, padding: 15}}>
        <Text style={styles.text}>Notifications</Text>
        <View
          style={{
            marginTop: '5%',
            borderBottomColor: '#51565D',
            borderBottomWidth: 1,
          }}
        />
        {/* <Image
          source={require('../../assets/images/Line5.png')}
          size={25}
          style={{width: '100%', paddingTop: 5, top: 10, }}
        /> */}
      </View>
      {/* {loading && <Text>Loading...</Text>} */}
      {loading && <LoadingIndicator visible={loading} />}
      {/* <AppButton title="Google" onPress={onGoogle} /> */}

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {todayNotif.length > 0 && (
          <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginLeft: '17%',
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                }}
              />
              <View>
                <Text style={styles.text1}>Today</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                  marginRight: '17%',
                }}
              />
            </View>
            {todayNotif.map((item, index) => (
              <NotifItem item={item} key={item.id} />
            ))}
          </View>
        )}
        {yesterdayNotif.length > 0 && (
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginLeft: '17%',
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                }}
              />
              <View>
                <Text style={styles.text1}>Yesterday</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                  marginRight: '17%',
                }}
              />
            </View>
            {yesterdayNotif.map((item, index) => (
              <NotifItem item={item} key={item.id} />
            ))}
          </View>
        )}
        {olderNotif.length > 0 && (
          <View style={{marginTop: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginLeft: '17%',
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                }}
              />
              <View>
                <Text style={styles.text1}>Older</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#51565D',
                  marginRight: '17%',
                }}
              />
            </View>
            {olderNotif.map((item, index) => (
              <NotifItem item={item} key={item.id} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* <FlatList
        data={notifications}
        renderItem={_renderItem}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      /> */}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232A',
    color: '#fff',
  },

  ntfCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc7c7',
    padding: 10,
    paddingBottom: 20,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Proxima Nova',
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'left',
  },
  text1: {
    color: '#51565D',
    fontFamily: 'Proxima Nova',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    paddingRight: '5%',
    paddingLeft: '5%',
  },
});
