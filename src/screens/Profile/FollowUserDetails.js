import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {API, graphqlOperation, Storage, Auth, Hub} from 'aws-amplify';
import {getUser} from '../../graphql/queries';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Follow1 from '../../components/Post/Follow1';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const FollowUserDetails = ({thirdUserId}) => {
  const [thirdUser, setThirdUser] = useState(null)
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {  
    try {
        setLoading(true);
        const userRes = await API.graphql(
            graphqlOperation(getUser, {
            id: thirdUserId
            })
        );
        //console.log('thirduserRes', userRes.data.getUser);

        setThirdUser(userRes.data.getUser);
        setLoading(false)
    } catch (error) {
        console.log('get FollowUserDetails err', error);
    }
  }, []);

  return (
    <View>
        {thirdUser &&
            <Follow1 thirdUser={thirdUser} />
        }
    </View>
  );
};

export default FollowUserDetails;
