import React from 'react';
import styled from 'styled-components';


const MainContainer = styled.div`
padding-top: 8vh;
padding-bottom: 8vh;
width: 100%;
padding-right: 15px;
padding-left: 15px;
margin-right: auto;
margin-left: auto;
`;

const FluidRow = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center!important;
box-sizing: border-box;
flex: 0 1 auto;
width: 100%;
max-width: 90vw;
padding: 15px 0;
margin: 8vh auto 0 auto;
`;

const itemsList = [
  {
    itemHeading: 'Submit a Timesheet',
    itemBody: 'Enter timesheet for an employee.',
    buttontext: 'Continue',
    redirectURL: '/timesheet'
  },
  {
    itemHeading: 'Calculate Prices',
    itemBody: 'I don\'t know how to calculate',
    buttontext: 'Continue',
    redirectURL: '/checkPrices'
  },
  {
    itemHeading: 'Check Inventory',
    itemBody: 'Lets check the inventory.',
    buttontext: 'Continue',
    redirectURL: '/checkInventory'
  },
  {
    itemHeading: 'Time waste',
    itemBody: 'This is my favorite activity.',
    buttontext: 'Continue',
    redirectURL: '/others'
  }
];
export default class DashboardComponent extends React.PureComponent {
  renderItemsList = () => {
    const html = itemsList.map(item =>{
      return (
        <div className="col-sm-12 col-md-6 py-3">
          <div className="card text-center">
            <div className="card-header">
              {item.itemHeading}
            </div>
          
            <div className="card-body">
              <p className="card-text">{item.itemBody}</p>
              <a href={item.redirectURL} className="btn btn-warning">{item.buttontext}</a>
            </div>
          </div>
        </div>)
      });
    return (
      html
    )
  }
  render(){
    console.log('Dasbboard Props', this.props);
    return(
      <MainContainer>
        <FluidRow className="">
          {this.renderItemsList()}
          
        </FluidRow>
      </MainContainer>
    )
  }

}