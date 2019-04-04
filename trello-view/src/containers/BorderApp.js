import {connect} from 'react-redux';
import BorderApp from '../components/BorderApp';

function mapStateToProps({id, name, message}) {
  return {id ,name, message};
}

export default connect(mapStateToProps)(BorderApp);
