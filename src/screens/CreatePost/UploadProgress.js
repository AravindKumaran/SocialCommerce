import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import styles from './styles';
import * as Progress from 'react-native-progress';
import {Context} from '../../context/Store';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {createPost} from '../../graphql/mutations';

function UploadProgress({uploadingPost, setPostRerender}) {
    const [state, dispatch] = useContext(Context);

    useEffect(async () => {    
        //console.log('upload useeff', state.uploadStarted);    
        if(state.uploadProgress == 100){
            console.log('uploadProgress',100);     
            if(uploadingPost !== undefined){  
                //console.log(uploadingPost);              
                const posRes = await API.graphql(
                graphqlOperation(createPost, {input: uploadingPost}),
                );
                console.log('posRes', posRes);
                setPostRerender(true);
                setPostRerender(false);
            }      
            dispatch({type: 'uploadStarted', payload: false})       
            dispatch({type: 'uploadProgress', payload: 0})
        }else if(state.uploadError != null){
            dispatch({type: 'uploadStarted', payload: false})       
            dispatch({type: 'uploadProgress', payload: 0})
        }else if(state.uploadProgress > 0){
            console.log('uploadProgress',state.uploadProgress);
        }  
 
    }, [state.uploadProgress])

    return (       
        <View>
            {state.uploadStarted && 
                <View>
                    <Text>Uploading...</Text>
                    <Progress.Bar progress={state.uploadProgress} width={360} />
                </View>
            }            
        </View>
    )
}

export default UploadProgress
