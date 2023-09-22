import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItems = props => {
  const {details} = props
  const {id, title, readStatus, rating, authorName, coverPic} = details
  return (
    <Link to={`/books/${id}`} className="link-items">
      <li className="book-item-list">
        <div className="listed-items">
          <div className="image-content-containers">
            <img src={coverPic} alt={title} className="cover-pics" />
          </div>
          <div className="status-rating-author-container">
            <div className="title-author-name-heading">
              <h1 className="title-heading">{title}</h1>
              <p className="author-name-title">{authorName}</p>
            </div>
            <div className="rating-container-items">
              <p className="rating-heading">Avg Rating:</p>
              <div className="star-rating-container-items">
                <p className="icon-star">
                  <BsFillStarFill size="20" color="yellow" />
                </p>
                <p className="ratings">{rating}</p>
              </div>
            </div>
            <div className="status-containers">
              <p className="status-headings">Status: </p>
              <p className="status-paragraphs">{readStatus}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default BookItems
