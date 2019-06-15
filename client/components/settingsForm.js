import React, {Component} from 'react'
import axios from 'axios'

export default class SettingsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUsername: '',
      newUsername: '',
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
      currentUsername: '',
      newUsername: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} align="center">
        <br />
        <h2>Change Username</h2>

        <label htmlFor="currentUsername">Current Username: </label>
        <input
          type="text"
          name="currentUsername"
          value={this.state.currentUsername}
          onChange={this.handleChange}
          required
        />

        <br />

        <label htmlFor="newUsername">New Username: </label>
        <input
          type="text"
          name="newUsername"
          value={this.state.newUsername}
          onChange={this.handleChange}
          required
        />

        <br />

        <input type="submit" className="btn btn-primary" />
      </form>
    )
  }
}
