import {Link, withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onClickButton = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djryeehgj/image/upload/v1694844164/pagenot_found_fpgkvr.png"
        alt="not found"
        className="not-found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we are sorry, the page you requested could not be found, please go back
        to the home page
      </p>
      <Link to="/" className="not-found-link-button">
        <button
          className="not-found-button"
          type="button"
          onClick={onClickButton}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}
export default withRouter(NotFound)
