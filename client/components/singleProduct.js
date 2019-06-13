import React, {Component} from 'react'
import {gettingProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addingCartItem} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  addItem = product => {
    this.props.addCartItem(product)
    // that is dispatch
  }

  render() {
    const product = this.props.product
    if (!product) {
      return (
        <div>
          <h1>NOT DISCOVERED YET</h1>
        </div>
      )
    } else {
      return (
        <div className="text-center">
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="200" />
          <h2>The {product.type} Pokemon</h2>
          <h4>${product.price}</h4>
          <h3>{product.description}</h3>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => this.addItem(product)}
            >
              Add To Cart
            </button>
          </div>
          <br />
          <Link to="/products">
            <button className="btn btn-dark">Back to All Products </button>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({product: state.products.selectedProduct})

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(gettingProduct(id)),
  addCartItem: product => dispatch(addingCartItem(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

//hi
