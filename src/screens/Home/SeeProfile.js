import React, {useEffect, useRef, useState, useCallback} from 'react';
import Profile from '../Profile';

function SeeProfile({navigation, route}) {
    return (               
        <Profile thirdUser={route?.params?.thirdUser}/>       
    )
}

export default SeeProfile
