import React, { Component } from 'React'
import { Route, Link } from 'react-router-dom'
import Detail from '../../components/Detail'

class List extends Component {
  render () {
    const { match } = this.props
    return (
      <div>
        List
        <hr />
        <Link to={`${match.url}/${+new Date()}`}>List - a </Link>
        <hr />
        <Link to="/">go back</Link>
        <Route path="/list/:id" component={Detail} />
      </div>
    )
  }
}

export default List
