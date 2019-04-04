const initialState = {
  id:'',
  name: '',
  isLogin: false,
  message: ''
};

export default function trelloReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LOGIN_SUCCESS':
      return {
        ...state,
        id: action.json.username,
        name: action.json.fullName,
        isLogin: true,
        message: ''
      };
    case 'REDIRECT_LOGIN':
      return {
        ...state,
        message: action.message
      };
    case 'GET_LOGIN_FAILED':
      return {
        ...state,
        message: action.message
      };
    default:
      return state
  }
}
