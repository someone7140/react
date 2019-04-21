import {connect} from 'react-redux';
import SearchApp from '../components/SearchApp';
import { setWord } from '../actions/searchAction'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWord:(click_word) => dispatch(setWord(click_word)),
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(SearchApp);
