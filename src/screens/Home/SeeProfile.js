import React, {useEffect, useRef, useState, useCallback} from 'react';
import Profile from '../Profile';

function SeeProfile({navigation, route}) {
    return (               
        <Profile postUser={route?.params?.postUser}/>       
    )
}

export default SeeProfile
