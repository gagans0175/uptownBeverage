import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from './actions';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import '../../../assets/css/notification.css';

const ParentContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-around;
align-items: center;
align-content: center;
height: 10vh;
background-color: #DCA73B;
`;

const ChildContainer1 = styled.div`
width: 20%;
padding: 0 4vh;
`;
const ChildContainer2 = styled.div`
width: 80%;
padding:0 4vh;
`;

const MSG = styled.h5`

`;
class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.checkNotification(this.props.page);
  }

  // componentWillReceiveProps(nextProps) {
  //   const page = nextprops.page;
  //   if(page && page !== this.props.page) {
  //     this.props.checkNotification(page);
  //   }
  // }
  render(){
    const { isNotificationVisible, type, message} = this.props;

    return(
      <React.Fragment>
      {isNotificationVisible && 
        <ParentContainer>    
          <ChildContainer1>
            LOGO
          </ChildContainer1>
          <ChildContainer2>
            <MSG dangerouslySetInnerHTML={{ __html: message }} />
          </ChildContainer2>
        </ParentContainer>
      }
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state) =>({
  isNotificationVisible: (state.notification) ? state.notification.isNotificationVisible : false,
  message: (state.notification) ? state.notification.message : '',
  type: (state.notification) ? state.notification.type : ''
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);