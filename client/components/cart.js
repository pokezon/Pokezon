import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'
import {Checkout} from './checkout'
import {Link} from 'react-router-dom'
class Cart extends Component {
  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    return (
      <div className="text-center">
        <h1>hello from cart.js</h1>
        {this.props.cartItems.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
        <br />
        <button className="btn btn-success" type="button">
          <Link to="/checkout">Checkout</Link>
        </button>
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
