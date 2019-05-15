import axios from 'axios'
import ApiConstants from '../constants/ApiConstants';
import search_store from '../store/searchStore'

export const setWord = (word) => {
  return {
    type: 'SET_WORD',
    click_word: word
  }
};

export const setInputWord = (value) => {
  return {
    type: 'SET_INPUT_WORD',
    input: value
  }
};

export const setSelectValue = (value) => {
  return {
    type: 'SET_SELECT_VALUE',
    select: value
  }
};

export const handlePageClick = (page) => {
  var state = search_store.getState();
  if(page.selected + 1 == state.input_page) {
    return {
      type: 'dummy'
    }
  } else {
    return (dispatch) => {
      dispatch(getNewsFromApi(state.searched_word, page.selected + 1, state.select_value));
    }
  }
};

export const setPrepareForNewsApi = (word) => {
  return {
    type: 'SET_PREPARE_NEWS_API',
    message: '記事を取得中です…',
    value: word
  }
};

export const getNewsFailure = () => {  
  return {
    type: 'GET_NEWS_FAILED',
    message: '記事の取得に失敗しました'
  }
}

export const getNewsSuccess = (res, select, word, page) => {
  if (res.data && res.data.status_code === 200) {
    if (select === "news") {
      return {
        type: 'GET_NEWS_SUCCESS_NEWS',
        message: '',
        json: res.data,
        page: page
      }
    } else {
      return {
        type: 'GET_NEWS_SUCCESS_ALL',
        message: '',
        json: res.data,
        word: word,
        page: page
      }
    }

  } else {
    return {
      type: 'GET_NEWS_FAILED',
      message: '記事の取得に失敗しました'
    }
  }
}

export const getNewsFromApi = (word, page, select) => {
  return (dispatch) => {
    dispatch(setPrepareForNewsApi(word))
    return axios.get(ApiConstants.API_HOST + ApiConstants.SEARCH_NEWS_PATH + "word=" + word + "&page=" + page)
      .then(res =>
        dispatch(getNewsSuccess(res, select, word, page))
      ).catch(err =>
        dispatch(getNewsFailure())
      )
  }
};
