import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'
import BookItems from '../BookItems'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BooksShelvesRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    bookShelvesData: [],
    searchInput: '',
    search: '',
    activeFiltersValue: bookshelvesList[0].value,
    activeFiltersLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBooksShelves()
  }

  getBooksShelves = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {search, activeFiltersValue} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeFiltersValue}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookShelvesData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearchValue = () => {
    this.setState(
      prevState => ({search: prevState.searchInput}),
      this.getBooksShelves,
    )
  }

  onRetry = () => {
    this.getBooksShelves()
  }

  LoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#0284C7"
        height={100}
        width={100}
        align-self="center"
        display="flex"
        align-items="center"
      />
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

  renderBooksView = () => {
    const {bookShelvesData} = this.state
    return (
      <ul className="ordered-list-items">
        {bookShelvesData.map(eachBook => (
          <BookItems key={eachBook.id} details={eachBook} />
        ))}
      </ul>
    )
  }

  renderBookShelvesFailureView = () => {
    const {searchInput} = this.state
    return (
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/djryeehgj/image/upload/v1694843788/books_shelves_failure_view_hsi8uz.png"
          alt="failure view"
          className="failure-view"
        />
        <h1 className="failures-heading">
          Your search for {searchInput} did not find any matches.
        </h1>
      </div>
    )
  }

  onSuccessView = () => {
    const {bookShelvesData} = this.state
    if (bookShelvesData.length !== 0) {
      return <> {this.renderBooksView()}</>
    }
    return <> {this.renderBookShelvesFailureView()}</>
  }

  renderAllBooksView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return <>{this.onSuccessView()}</>
      case apiStatusConstants.failure:
        return <>{this.renderFailureView()}</>
      case apiStatusConstants.inProgress:
        return <>{this.LoadingView()}</>
      default:
        return null
    }
  }

  render() {
    const {activeFiltersLabel, activeFiltersValue, searchInput} = this.state
    return (
      <>
        <Header shelves />
        <div className="card-container-list">
          <div className="left-side-container">
            <h1 className="left-side-heading" key="title">
              Bookshelves
            </h1>
            <ul className="left-side-listed-items">
              {bookshelvesList.map(eachItem => {
                const activeFilterClass =
                  activeFiltersValue === eachItem.value ? 'activeItem' : ''
                const onClickFilter = () => {
                  this.setState(
                    {
                      activeFiltersValue: eachItem.value,
                      activeFiltersLabel: eachItem.label,
                    },
                    this.getBooksShelves,
                  )
                }

                return (
                  <li className="listed-item-details" key={eachItem.label}>
                    <button
                      type="button"
                      className={`active-filters ${activeFilterClass}`}
                      onClick={onClickFilter}
                    >
                      {eachItem.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="right-side-card-container">
            <div className="top-card-container">
              <h1 className="top-card-heading">{activeFiltersLabel} Books</h1>
              <div className="search-input-container">
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  className="search-inputs"
                  value={searchInput}
                  placeholder="Search..."
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onChangeSearchValue}
                  testid="searchButton"
                >
                  <BsSearch size="20" />
                </button>
              </div>
            </div>
            <div className="all-selected-books-items">
              {this.renderAllBooksView()}
            </div>
          </div>
        </div>

        <div className="small-screen-container">
          <div className="small-screen-search-input-container">
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              className="search-inputs"
              value={searchInput}
              placeholder="Search..."
            />
            <button
              type="button"
              className="btn"
              onClick={this.onChangeSearchValue}
              testid="searchButton"
            >
              <BsSearch size="35" />
            </button>
          </div>
          <div className="small-screen-books-shelves-container">
            <h1 className="left-side-heading">Bookshelves</h1>
            <ul className="small-screen-left-side-listed-items">
              {bookshelvesList.map(eachItem => {
                const activeSmallScreenFilterClass =
                  activeFiltersValue === eachItem.value
                    ? 'activeSmallScreenItem'
                    : ''
                const onClickFilter = () => {
                  this.setState(
                    {
                      activeFiltersValue: eachItem.value,
                      activeFiltersLabel: eachItem.label,
                    },
                    this.getBooksShelves,
                  )
                }

                return (
                  <li
                    className="small-screen-listed-item-details"
                    key={eachItem.label}
                  >
                    <button
                      type="button"
                      className={`active-filters ${activeSmallScreenFilterClass}`}
                      onClick={onClickFilter}
                    >
                      {eachItem.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="small-screen-all-selected-books-items">
            {this.renderAllBooksView()}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default BooksShelvesRoute
