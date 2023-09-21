import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isShownError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({isShownError: true, errorMsg})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-val">
          Username*
        </label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          className="input-val"
          id="username"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-val">
          Password*
        </label>
        <input
          type="password"
          placeholder="Enter username"
          value={password}
          className="input-val"
          id="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {isShownError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card-container">
          <div className="image-container">
            <img
              src="https://res.cloudinary.com/djryeehgj/image/upload/v1694844332/Rectangle_1467login_book_1_gmtjgl.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <img
                src="https://res.cloudinary.com/djryeehgj/image/upload/v1694843631/book_hub_logo_bwzfuj.png"
                alt="login website logo"
                className="website-logo"
              />
              <div className="label-input-container">
                {this.renderUsernameField()}
              </div>
              <div className="label-input-container">
                {this.renderPasswordField()}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {isShownError ? <p className="error-msg">{errorMsg}</p> : ''}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginRoute
