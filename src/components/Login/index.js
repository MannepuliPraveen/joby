import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  onSuccessView = token => {
    Cookies.set('jwtToken', token, {expires: 10})
    const {history} = this.props
    history.replace('/')
  }
  onFailureView = errorMsg => {
    this.setState({showErrorMsg: errorMsg})
  }
  onSubmitLoginForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessView(data.jwt_token)
    } else {
      this.onFailureView(data.error_msg)
    }
    this.setState({username: '', password: ''})
  }
  render() {
    const {showErrorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginRoute">
        <div className="login">
          <div className="websiteLogoContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="loginWebsiteLogo"
            />
          </div>
          <form className="form" onSubmit={this.onSubmitLoginForm}>
            <label htmlFor="username" className="labels">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="loginInputs"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="labels">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="loginInputs"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="loginBtn">
              Login
            </button>
            <p>{showErrorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
