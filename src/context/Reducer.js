const Reducer = (state, action) => {
    switch (action.type) {
        //background upload video
        case 'uploadStarted':
            return {
                ...state,
                uploadStarted: action.payload
            };
        case 'uploadProgress':
            return {
                ...state,
                uploadProgress: action.payload
            };
        case 'uploadError':
            return {
                ...state,
                uploadError: action.payload
            };
        
        //Global mute while routing
        case 'globalMuted':
            return {
                ...state,
                globalMuted: action.payload
            };

        //check user following while routing
        case 'userFollowing':
            return {
                ...state,
                userFollowing: action.payload
            };

        //check user unfollowing while routing
        case 'userUnFollowing':
            return {
                ...state,
                userUnFollowing: action.payload
            };
            
        default:
            return state;
    }
};

export default Reducer;