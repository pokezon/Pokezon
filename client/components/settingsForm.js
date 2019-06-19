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
      newUsername: '',
      password: ''
    })
  }

  render() {
    return (
      <div align="center">
        <br />
        <h2>
          ~~~<img
            src="https://thumbs.gfycat.com/AthleticDeliciousDartfrog-size_restricted.gif"
            width="8%"
          />~~~
        </h2>
        <div className="updateForm">
          <form onSubmit={this.handleSubmit} align="center">
            <div className="innerForm">
              <h3>Change Username</h3>

              <label htmlFor="currentUsername" id="brand-name">
                Current Username:{' '}
              </label>
              <input
                type="text"
                name="currentUsername"
                value={this.state.currentUsername}
                onChange={this.handleChange}
                id="brand-name"
                required
              />

              <br />

              <label htmlFor="newUsername" id="brand-name">
                New Username:{' '}
              </label>
              <input
                type="text"
                name="newUsername"
                value={this.state.newUsername}
                onChange={this.handleChange}
                required
              />

              <br />

              <input
                type="submit"
                className="btn btn-primary"
                id="brand-name"
              />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
