import { connect } from 'react-redux';
import ArticleApp from '../components/ArticleApp';
import { setWord } from '../actions/searchAction'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWord:(click_word) => dispatch(setWord(click_word))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(ArticleApp);
