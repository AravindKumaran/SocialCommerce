const Reducer = (state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default Reducer;