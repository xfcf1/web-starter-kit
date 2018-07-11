import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import styles from './styles/base.scss'
import Header from './components/Header'
// import Login from './containers/Login'
import Home from './containers/Home'
import List from './containers/List'
import ErrorPage from './containers/ErrorPage'

const Login = Loadable({
  loader: () => import('./containers/Login'),
  loading: () => <div>Loading...</div>
})

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Main>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route exact path="/list/:id" component={List} />
      </Main>
      <Route component={ErrorPage} />
    </Switch>
  </Router>
)

class Main extends Component {
  render() {
    const children = this.props.children
    return (
      <div>
        <Header />
        <div className={styles.container}>{children}</div>
      </div>
    )
  }
}

export default App
