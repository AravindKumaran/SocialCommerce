import React, {createContext, useContext, useReducer} from 'react';

import {Auth, API, graphqlOperation} from 'aws-amplify';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: null,
  isAuthenticated: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };
    case 'USER_LOADED':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}

export function AuthProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      console.log('Userinfo', userInfo);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const loginUser = async (data) => {
    console.log('Data');
  };
  const registerUser = async (data) => {
    //  const getUserResponse = await API.graphql(
    //    graphqlOperation(getUser, {id: userInfo.attributes.sub}),
    //  );
  };

  const logoutUser = () => dispatch({type: 'LOGOUT'});

  const clearErrors = () => dispatch({type: 'CLEAR_ERRORS'});

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        loginUser,
        registerUser,
        logoutUser,
        loadUser,
        clearErrors,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
