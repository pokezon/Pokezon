import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  Cart,
  SingleProduct,
  SettingsForm,
  Featured,
  Checkout,
  OrderHistory
} from './components'
import {me} from './store'
import {gettingCart, addingCartItem} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    this.props.gettingCart()
    if (!localStorage.getItem('LocalStorageCart')) {
      localStorage.setItem('LocalStorageCart', JSON.stringify([]))
    }
  }

  componentDidUpdate(prevProps) {
    const localStorageCart = JSON.parse(
      localStorage.getItem('LocalStorageCart')
    )
    const {isLoggedIn} = this.props

    if (isLoggedIn !== prevProps.isLoggedIn) {
      localStorageCart.forEach(item =>
        this.props.addingCartItem(item.product, item.quantity)
      )
      localStorage.setItem('LocalStorageCart', JSON.stringify([]))
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Featured} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/home/settings" component={SettingsForm} />
        <Route exact path="/cart/checkout" component={Checkout} />
        <Route exact path="/order-history" component={OrderHistory} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {/* <Route exact path="/home/settings" component={SettingsForm} /> */}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    gettingCart() {
      dispatch(gettingCart())
    },
    addingCartItem(product, quantity) {
      dispatch(addingCartItem(product, quantity))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
