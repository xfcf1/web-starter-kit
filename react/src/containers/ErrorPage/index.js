import React, { Component } from 'React'

class ErrorPage extends Component {
  back() {
    this.props.history.goBack()
  }
  loader () {
  }
  render() {
    return (
      <div>
        Error
        <hr />
        <a href="#" onClick={() => this.back()}>go back</a>
      </div>
    )
  }
}

export default ErrorPage
