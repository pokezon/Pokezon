import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        {!this.props.allProducts ? (
          'WEBSITE SEIZED BY THE U.S. GOVERNMENT'
        ) : (
          <div>
            <h2>Our Wonderful Collection</h2>
            {this.props.allProducts.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h4>{product.name}</h4>
                    <img src={product.imageUrl} />
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.products.allProducts})

// FOR ME(AMNEET): PRODUCTS LAYER IS CREATED FROM REDUCER SO U NEED TO GO TO THAT LAYER

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(gettingAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
