import { LOADING_UI, SET_USER, CLEAR_ERRORS, SET_ERRORS, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(error => {
      catchError(error)
      dispatch({type: SET_UNAUTHENTICATED})
    });
};

export const loginUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
  axios
    .post('/login', userData)
    .then(res => {
      userAuthorization(res.data.token)
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch(error => {
      catchError(error)
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({
    type: SET_UNAUTHENTICATED
  })
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios.post('/user',userDetails)
  .then(()=>{
    dispatch(getUserData());
  })
  .catch(err => {
    catchError(err)
  })
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
axios
  .post('/signup', newUserData)
  .then(res => {
    userAuthorization(res.data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  })
  .catch(error => {
    catchError(error)
  });
};

export const userAuthorization = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const catchError = (error) => (dispatch) => {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
}

export const uploadImage  = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })  
  axios.post('user/image',formData).then(()=>{
    dispatch(getUserData());
  })
  .catch(error => {
    catchError(error);
  })
}