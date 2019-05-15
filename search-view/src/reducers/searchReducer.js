const initialState = {
  news_object: {},
  message: '',
  search_url: '',
  wiki_url: '',
  click_word: '',
  input_word: '',
  input_page: 1,
  send_enable: false,
  searched_word: '',
  select_value: 'news'
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECT_VALUE':
      return {
        ...state,
        select_value: action.select
      }
    case 'SET_INPUT_WORD':
      return {
        ...state,
        input_word: action.input,
        send_enable: action.input.length > 0
      }
    case 'SET_WORD':
      return {
        ...state,
        search_url: "https://www.bing.com/search?q=" + action.click_word,
        wiki_url: "https://ja.wikipedia.org/wiki/" + action.click_word
      }
    case 'SET_PREPARE_NEWS_API':
      return {
        ...state,
        news_object: {},
        message: action.message,
        searched_word: action.value
      }
    case 'GET_NEWS_FAILED':
      return {
        ...state,
        news_object: {},
        message: action.message
      }
    case 'GET_NEWS_SUCCESS_NEWS':
      return {
        ...state,
        news_object: action.json,
        message: '',
        input_page: action.page
      }
    case 'GET_NEWS_SUCCESS_ALL':
      return {
        ...state,
        news_object: action.json,
        message: '',
        search_url: "https://www.bing.com/search?q=" + action.word,
        wiki_url: "https://ja.wikipedia.org/wiki/" + action.word,
        input_page: action.page
      }
    default:
      return state
  }
}
