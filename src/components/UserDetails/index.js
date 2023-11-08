import {Component} from 'react'
import LeftSideBox from '../LeftSideBox'

import './index.css'

const arrayList = [
  {
    id: 0,
    name: 'UserDetail',
  },
  {
    id: 1,
    name: 'SelectPlan',
  },
  {
    id: 2,
    name: 'AddOneOption',
  },
]

class UserDetails extends Component {
  state = {
    userName: '',
    email: '',
    phoneNumber: '',
    step: 1,
    isSubmitted: true,
    arrayListItem: arrayList,
    activeThumbnailId: arrayList[0].id,
  }

  clickTabItem = id => {
    this.setState({activeThumbnailId: id})
  }

  onInputChange = event => {
    this.setState({userName: event.target.value})
  }

  onEmailChange = event => {
    this.setState({email: event.target.value})
  }

  onPhoneNumberChange = event => {
    this.setState({phoneNumber: event.target.value})
  }

  onSubmitButton = () => {
    const {isSubmitted} = this.state
    return isSubmitted && <button type="submit">Thank You</button>
  }

  prevStep = () => {
    const {step} = this.state
    this.setState({step: step + 1})
  }

  nextStep = () => {
    const {step, arrayListItem} = this.state
    if (step === arrayListItem.length) {
      return (
        <>
          <button type="button" onClick={this.onSubmitButton}>
            Confirm
          </button>
        </>
      )
    }
    return this.setState({step: step + 1})
  }

  render() {
    const {activeThumbnailId} = this.state
    const {userName, email, phoneNumber} = this.state
    return (
      <div className="box-container">
        <div className="card-container">
          <div className="left-side-container">
            <ul className="unordered-list">
              {arrayList.map(eachImage => (
                <LeftSideBox
                  key={eachImage.id}
                  isActive={activeThumbnailId === eachImage.id}
                  clickTabItem={this.clickTabItem}
                />
              ))}
            </ul>
          </div>
          <div className="right-side-container">
            <h1 className="personal-heading">Personal Info</h1>
            <p className="personal-paragraph">
              Please provide your name, email address and phone number
            </p>
            <form onSubmit={this.nextStep}>
              <div className="form-container">
                <label htmlFor="userName" className="user-name-label">
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  placeholder="e.g stephen King"
                  className="user-name-input"
                  onChange={this.onInputChange}
                />
              </div>

              <div className="form-container">
                <label htmlFor="email" className="user-name-label">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  placeholder="e.g stephenking@lorem.com"
                  className="user-name-input"
                  onChange={this.onEmailChange}
                />
              </div>

              <div className="form-container">
                <label htmlFor="phoneNumber" className="user-name-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  placeholder="e.g +1 234 567 890"
                  className="user-name-input"
                  onChange={this.onPhoneNUmberChange}
                />
              </div>
              <button type="button" className="next-button">
                Next step
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default UserDetails
