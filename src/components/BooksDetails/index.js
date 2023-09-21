import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BooksDetails extends Component {
  state = {bookDetailsData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        bookDetails: {
          id: data.book_details.id,
          authorName: data.book_details.author_name,
          coverPic: data.book_details.cover_pic,
          aboutBook: data.book_details.about_book,
          rating: data.book_details.rating,
          readStatus: data.book_details.read_status,
          title: data.book_details.title,
          aboutAuthor: data.book_details.about_author,
        },
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookDetailsData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getBookDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/djryeehgj/image/upload/v1694844063/cat_connection_mizrou.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-heading">Something went wrong, Please try again.</p>
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetailsData} = this.state
    const {bookDetails} = bookDetailsData
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails
    return (
      <div className="book-details-container">
        <div className="image-author-name-container">
          <img src={coverPic} alt={title} className="cover-pic" />
          <div className="author-name-title-container">
            <div className="title-author-heading">
              <h1 className="title">{title}</h1>
              <p className="author-heading">{authorName}</p>
            </div>
            <div className="rating-containers">
              <p className="ratings">Avg Rating: </p>
              <div className="star-paragraph-containers">
                <p className="icon-star">
                  <BsFillStarFill size="25" color="yellow" />
                  <p className="rating-paragraphs">{rating}</p>
                </p>
              </div>
            </div>
            <div className="status-container">
              <p className="status-heading">
                Status:
                <span className="status-paragraph">{readStatus}</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="about-author-about-book-container">
          <h1 className="about-heading">About Author</h1>
          <p className="about-paragraph">{aboutAuthor}</p>
          <h1 className="about-heading">About Book</h1>
          <p className="about-paragraph">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderAllBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return <> {this.renderBookDetailsSuccessView()} </>
      case apiStatusConstants.failure:
        return <> {this.renderFailureView()} </>
      case apiStatusConstants.inProgress:
        return <> {this.renderLoadingView()} </>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="header-footer-book-details-container">
        <Header shelves />
        <div className="book-details-container-items">
          {this.renderAllBookDetails()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default BooksDetails
