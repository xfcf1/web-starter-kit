import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Home extends Component {
  modifyName(val) {
    const { modifyName, getName } = this.props
    modifyName(val)
    getName()
  }
  render() {
    const { homeReducer } = this.props
    const { name } = homeReducer
    return (
      <div>
        Home <a onClick={() => this.modifyName(`${name}2`)}>{name}</a>
        <hr />
        <Link to="/list">List</Link>
        <hr />
        <Link to="/login">Logout</Link>
      </div>
    )
  }
}
export default Home

Home.propTypes = {
  homeReducer: PropTypes.object
}
