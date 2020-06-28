import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as landingActions from '../actions';
import DasboardComponent from'../components/DasboardComponent';

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...landingActions }, dispatch)
});

const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connectStateAndProps(DasboardComponent));
