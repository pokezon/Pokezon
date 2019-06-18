import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingOrderHistory} from '../store/cart'

export class OrderHistory extends Component {
  componentDidMount() {
    this.props.gettingOrderHistory()
  }

  render() {
    return <div>OrderHistory</div>
  }
}

const mapStateToProps = state => ({
  orderHistory: state.orders.orderHistory
})

const mapDispatchToProps = dispatch => ({
  gettingOrderHistory: () => {
    dispatch(gettingOrderHistory())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
