import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'

import './index.css'

class Header extends Component {
  state = {navbarDisplay: false}

  onClickNavbar = () => {
    this.setState(prevState => ({navbarDisplay: !prevState.navbarDisplay}))
  }

  onCrossButton = () => {
    this.setState({navbarDisplay: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {home, shelves} = this.props
    const activeFavorite = home ? 'active-tab-item' : ''
    const activeShelves = shelves ? 'active-tab-item' : ''
    const {navbarDisplay} = this.state

    return (
      <>
        <nav className="nav-bar-container">
          <div className="content-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/djryeehgj/image/upload/v1694843631/book_hub_logo_bwzfuj.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <ul className="home-shelves-container">
              <Link to="/" className="link-items">
                <li className={`tab-item ${activeFavorite}`}>
                  <h1 className="home-link">Home</h1>
                </li>
              </Link>

              <Link to="/shelf" className="link-items">
                <li className={`tab-item ${activeShelves}`}>
                  <h1 className="home-link">Bookshelves</h1>
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="header-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        <nav className="small-size-container-item">
          <div className="card-small-size-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/djryeehgj/image/upload/v1694843631/book_hub_logo_bwzfuj.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <button
              className="nav-bar-button"
              onClick={this.onClickNavbar}
              type="button"
            >
              <FiMenu className="fi-menu" />
            </button>
          </div>

          {navbarDisplay && (
            <ul className="home-shelves-container">
              <Link to="/" className="link-items">
                <li className={`tab-item ${activeFavorite}`}>
                  <h1 className="home-link">Home</h1>
                </li>
              </Link>

              <Link to="/shelf" className="link-items">
                <li className={`tab-item ${activeFavorite}`}>
                  <h1 className="home-link">Bookshelves</h1>
                </li>
              </Link>

              <button
                type="button"
                className="header-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>

              <button
                className="cross-button"
                onClick={this.onCrossButton}
                type="button"
              >
                <RiCloseCircleFill className="fi-menu" />
              </button>
            </ul>
          )}
        </nav>
      </>
    )
  }
}
export default withRouter(Header)
