import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    return (
      <div>
        <h1>hello from cart.js</h1>
        {this.props.cartItems.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart())
})

export default connect(mapStateToProps, dispatchToProps)(Cart)
