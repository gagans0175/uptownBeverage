import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as landingActions from '../actions';
import * as notifications from '../components/common/NotificationBar/actions';
import RegisterComponent from'../components/Register';

const mapStateToProps = state => {
  return {
    userState: state && state.authReducer ?  state.authReducer : {}
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...landingActions, ...notifications }, dispatch)
});

const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connectStateAndProps(RegisterComponent));
