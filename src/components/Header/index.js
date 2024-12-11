import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="headerComp">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="websiteLogo"
      />
      <ul className="headerOptions">
        <li className="option">
          {' '}
          <Link to="/" className="optionLink">
            {' '}
            Home{' '}
          </Link>{' '}
        </li>
        <li className="option">
          <Link to="/jobs" className="optionLink">
            {' '}
            Jobs{' '}
          </Link>{' '}
        </li>
      </ul>
      <button className="logoutBtn" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
