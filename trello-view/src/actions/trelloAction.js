import axios from 'axios'
import ApiConstants from '../constants/ApiConstants';

const getloginSuccess = (res) => {
  if (res.data.authorized) {
    return {
      type: 'GET_LOGIN_SUCCESS',
      json: res.data
    }
  } else {
    window.location.href = ApiConstants.API_HOST + ApiConstants.AUTHORIZE_PATH
    return {
      type: 'REDIRECT_LOGIN',
      message: 'ログイン画面へ遷移します'
    }
  }
}

const getloginFailure = () => {  
  return {
    type: 'GET_LOGIN_FAILED',
    message: 'ログインに失敗しました。'
  }
}

export const login = () => {
  return (dispatch) => {
    return axios.get(ApiConstants.API_HOST + ApiConstants.LOGIN_URL_PATH)
      .then(res =>
        dispatch(getloginSuccess(res))
      ).catch(err => 
        dispatch(getloginFailure())
      )
  }
}