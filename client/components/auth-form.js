import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, gettingCart} from '../store'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name} id="auth-form">
        <div className="form-group">
          <label htmlFor="username">
            <small>Username:</small>
          </label>
          <input
            className="form-control"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        {name === 'signup' ? (
          <div className="form-group">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
        ) : (
          ''
        )}
        <div className="form-group">
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button className="btn btn-success" type="submit">
            {displayName}
          </button>
          <div className="divider" />
          <a href="/auth/google">
            <button className="btn btn-danger" type="button">
              {displayName} with Google
            </button>
          </a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      const email = evt.target.email ? evt.target.email.value : {}
      // {} is placeholder for email which is required arg for auth but is not collected at login. Hacky?
      dispatch(auth(username, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
