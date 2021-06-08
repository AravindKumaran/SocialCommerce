import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import styles from './styles';
import * as Progress from 'react-native-progress';
import {Context} from '../../context/Store';
import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {createPost, createHashTag, createPostHashTag} from '../../graphql/mutations';
import {listHashTags} from '../../graphql/queries';

function UploadProgress({uploadingPost, hashTag, setPostRerender}) {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {  
        const uploadVideoProgress = async () => {
            //console.log('upload useeff', state.uploadStarted);    
            if(state.uploadProgress == 100){
                //console.log('uploadProgress',100);     
                if(uploadingPost !== undefined){  
                    //console.log('uploadingPost',uploadingPost); 
                                
                    const posRes = await API.graphql(
                        graphqlOperation(createPost, {input: uploadingPost}),
                    );
                    console.log('posRes', posRes);

                    if(hashTag){
                        hashTag.map(async (h) => {
                            const response = await API.graphql(
                                graphqlOperation(listHashTags, {
                                    filter: {
                                        name: {eq: h}
                                    }
                                }),
                            )

                            console.log('response', response)

                            if(!response.data.listHashTags.items){
                                const hashTagRes = await API.graphql(
                                    graphqlOperation(createHashTag, {input: {name: h}}),
                                )
                                const postHashTagRes = await API.graphql(
                                    graphqlOperation(createPostHashTag, 
                                        {
                                            input: {
                                                postID: posRes.data.createPost.id, 
                                                hashTagID: hashTagRes.data.createHashTag.id
                                            }
                                        }
                                    ),
                                )                            
                            }else{
                                const postHashTagRes = await API.graphql(
                                    graphqlOperation(createPostHashTag, 
                                        {
                                            input: {
                                                postID: posRes.data.createPost.id, 
                                                hashTagID: response.data.createHashTag.id
                                            }
                                        }
                                    ),
                                ) 
                            }
                            console.log('postHashTagRes', postHashTagRes)
                        })
                    }

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
        }
        uploadVideoProgress();
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
