import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as landingActions from '../actions';
import * as NotificationActions from '../components/common/NotificationBar/actions';
import LoginComponent from'../components/Login';

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    errors: state.errors
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...landingActions, ...NotificationActions }, dispatch)
});

const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connectStateAndProps(LoginComponent));
