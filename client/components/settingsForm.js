import React, {Component} from 'react'
import axios from 'axios'

export default class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await axios.put('/api/home/settings', this.state)
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Change Username</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <input type="submit" className="btn btn-primary" />
      </form>
    )
  }
}
