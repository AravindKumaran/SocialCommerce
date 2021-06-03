import React, {useEffect, useRef, useState, useCallback} from 'react';
import VideoList from '../../components/VideoList';

function SeeProfileVideoList({navigation, route}) {
    return (               
        <VideoList 
            idx={route?.params?.idx} 
            item={route?.params?.item} 
            data={route?.params?.data}

        />     
    )
}

export default SeeProfileVideoList