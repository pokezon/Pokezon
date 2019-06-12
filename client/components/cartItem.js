import React, {Component} from 'react'
import {removingCartItem} from '../store/cart'
import {connect} from 'react-redux'

class CartItem extends Component {
  removeItem = id => {
    this.props.removeCartItem(id)
  }

  render() {
    const {product, quantity, id} = this.props.item
    return (
      <div>
        <h2>{product.name}</h2>
        {/* eventually to add ability to update quantity */}
        <h3>Quantity: {quantity}</h3>
        <h2>${product.price}</h2>
        <button onClick={() => this.removeItem(id)}>Delete</button>
      </div>
    )
  }
}

const dispatchToProps = dispatch => {
  return {
    removeCartItem: id => dispatch(removingCartItem(id))
  }
}

export default connect(null, dispatchToProps)(CartItem)
