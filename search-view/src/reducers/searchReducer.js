const initialState = {
  search_url:'',
  wiki_url:'',
  click_word:''
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_WORD':
      return {
        ...state,
        search_url: "https://www.bing.com/search?q=" + action.click_word,
        wiki_url: "https://ja.wikipedia.org/wiki/" + action.click_word
      }
    default:
      return state
  }
}
