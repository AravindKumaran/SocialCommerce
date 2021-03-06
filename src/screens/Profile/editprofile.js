import React, {useEffect, useRef, useState, useCallback} from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ImageBackground, ScrollView, SafeAreaView, FlatList, ImageBase} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const EditProfile = () => {

return(
    <View style={styles.container}>

        <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 16}}> 
                    Edit Profile
                </Text>
                <TouchableOpacity>
                    <Image
                        style={styles.user}
                        source={require('../../assets/images/User.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', top: 20, right: 20}}>
                <TouchableOpacity>
                <Feather name={'edit'} size={15} style={{top: 17}} />
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '400' ,fontSize: 14, left: 30}}>Edit Profile Picture</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{padding: 30, alignItems: 'center',}}>
            <View>
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 16}}>Name</Text>
                <TextInput  placeholder={'Name'} placeholderTextColor = "#D50000" style={styles.input} />
            </View>

            <View style={{top: 20}}>
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 16}}>Username</Text>
                <TextInput placeholder={'Username'} placeholderTextColor = "#D50000" style={styles.input} />
            </View>

            <View style={{top: 40}}>
                <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 16}}>Bio</Text>
                <TextInput placeholder={'Bio'} placeholderTextColor = "#D50000" style={styles.input1} />
            </View>
        </View>

        <View style={{alignItems: 'center', top: 30}}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#5e37f4', '#518bf9', '#21fffc']} style={styles.Rectangle1} >
                <TouchableOpacity>
                    <Text style={{color: '#FFFFFF' ,fontFamily: 'Proxima Nova' ,fontWeight: '700' ,fontSize: 16}}>
                        Revert Changes
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
            
        </View>

    </View>
);
};
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A'
    },
    user: {
        height: 140,
        width: 140,
        borderRadius: 75,
        zIndex: 1,
        top: 20
      },
    input: {
        width: 300,
        height: 40,
        padding: 10,
        backgroundColor: '#232323',
        borderRadius: 15,
        alignItems: 'center',
      },  
    input1: {
        width: 300,
        height: 80,
        padding: 10,
        backgroundColor: '#232323',
        borderRadius: 15,
        alignItems: 'center',
      },  
    Rectangle1: {
        width: 300,
        height: 40, 
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    }
});