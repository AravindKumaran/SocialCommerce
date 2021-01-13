import React, {Component} from 'react';  
import { View, Text, TouchableOpacity } from 'react-native';  
import styles from './styles';

export class ProfileScreen extends Component {
    render() {
      return ( 
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.onPress} >
            <Text>Sign in</Text>
          </TouchableOpacity>
        </View>
        )
    }
}

export default ProfileScreen;
  
  
