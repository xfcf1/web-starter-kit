import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './containers/Home'
import Login from './containers/Login'
import ErrorPage from './containers/ErrorPage'
import * as styles from './styles/base.scss'

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Main>
        <Route exact path='/' component={Home} />
      </Main>
      <Route component={ErrorPage} />
    </Switch>
  </Router>
)

class Main extends React.Component {
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
