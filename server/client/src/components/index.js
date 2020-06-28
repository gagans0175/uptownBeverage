import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Header from './common/Header';
import Footer from './common/Footer';
import * as actions from '../actions';


class MainLanding extends React.Component {
  componentDidMount() {
    // this.props.fetchUser();
  }
  render() {
   
    return (
      <React.Fragment>
        {this.props.location.pathname !== '/' && <Header {...this.props} />}
        <Switch>
          {this.props.routesMap.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path} component={route.component} />
          ))}
        </Switch>
        {this.props.location.pathname !== '/' && <Footer {...this.props} />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connectStateAndProps(MainLanding));

