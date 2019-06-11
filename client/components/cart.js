import React, {Component} from 'react'
import CartItem from './cartItem'

class Cart extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <CartItem />
        Product Name Product Quantity(input) delete icon
      </div>
    )
  }
}

export default Cart
