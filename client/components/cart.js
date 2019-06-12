import React, {Component} from 'react'
import CartItem from './cartItem'

class Cart extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>HI</h1>
        <CartItem />
      </div>
    )
  }
}

export default Cart
