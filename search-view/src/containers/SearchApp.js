import { connect } from 'react-redux';
import SearchApp from '../components/SearchApp';
import { setWord, setInputWord, setSelectValue, handlePageClick, setPrepareForNewsApi,
         getNewsFailure, getNewsSuccess, getNewsFromApi } from '../actions/searchAction'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInputWord:(input) => dispatch(setInputWord(input)),
    setSelectValue:(input) => dispatch(setSelectValue(input)),
    setWord:(click_word) => dispatch(setWord(click_word)),
    handlePageClick:(page) => dispatch(handlePageClick(page)),
    getNewsFromApi:(word, page, select) => dispatch(getNewsFromApi(word, page, select)),
    setPrepareForNewsApi:(word) => dispatch(setPrepareForNewsApi(word)),
    getNewsFailure:() => dispatch(getNewsFailure()),
    getNewsSuccess:(res, select, word, page) => dispatch(getNewsSuccess(res, select, word, page))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(SearchApp);
