import './index.css'

const LeftSideBox = props => {
  const {clickTabItem, isActive} = props

  const onClickThumbnailImage = () => {
    clickTabItem(id)
  }

  const activeClass = isActive ? 'bg-full-color' : 'not-full'
  return (
    <li className="listed-items">
      <div className="left-side-container">
        <div className="step-1-container">
          <button
            type="button"
            onClick={onClickThumbnailImage}
            className={`${activeClass}`}
          >
            1
          </button>
          <div className="side-heading-one-step">
            <h1 className="info">STEP 1</h1>
            <p className="para-info">Your Info</p>
          </div>
        </div>

        <div className="step-1-container">
          <button
            type="button"
            onClick={onClickThumbnailImage}
            className={`${activeClass}`}
          >
            2
          </button>
          <div className="side-heading-one-step">
            <h1 className="info">STEP 2</h1>
            <p className="para-info">SELECT PLAN</p>
          </div>
        </div>

        <div className="step-1-container">
          <button
            type="button"
            onClick={onClickThumbnailImage}
            className={`${activeClass}`}
          >
            3
          </button>
          <div className="side-heading-one-step">
            <h1 className="info">STEP 3</h1>
            <p className="para-info">ADD-ONS</p>
          </div>
        </div>

        <div className="step-1-container">
          <button
            type="button"
            onClick={onClickThumbnailImage}
            className={`${activeClass}`}
          >
            4
          </button>
          <div className="side-heading-one-step">
            <h1 className="info">STEP 4</h1>
            <p className="para-info">SUMMARY</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default LeftSideBox
