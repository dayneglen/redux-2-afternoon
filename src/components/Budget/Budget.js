import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import { requestBudgetData, addPurchase, removePurchase } from './../../ducks/budgetReducer';
import { requestUserData } from './../../ducks/userReducer'
import './Budget.css';


class Budget extends Component {

  componentDidMount() {
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    console.log(this.props)
    const { loading } = this.props.budget;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases removePurchase={this.props.removePurchase} purchases={this.props.budget.purchases} />
            </div>
            <div className='chart-container'>
              <Chart1 budgetLimit={this.props.budget.budgetLimit} purchases={this.props.budget.purchases} />
              <Chart2 purchases={this.props.budget.purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    budget: reduxState.budget,
    user: reduxState.user
  }
}

export default connect(mapStateToProps, { requestUserData, requestBudgetData, addPurchase, removePurchase })(Budget);
