import * as React from 'react'
import { Link } from 'react-router-dom'

interface IHomeProps {
  setName: () => void
  name: string
  homeReducer: object
  loginReducer: object
  setAuth: () => void
  history: object
}

class Home extends React.Component<any, {}> {
  changeName(value: string) {
    const { setName } = this.props
    setName(value)
  }
  logout() {
    const { setAuth, history } = this.props
    setAuth(false)
    history.replace('login')
  }
  render() {
    const { homeReducer, loginReducer } = this.props
    const { name } = homeReducer
    const { isAuth } = loginReducer
    if (isAuth) {
      return (
        <div>
          <div>Hello, {name}</div>
          <input value={name} onChange={(e) => this.changeName(e.target.value)} />
          <div onClick={() => this.logout()}>登出</div>
        </div>
      )
    }
    return (
      <div>
        <div>请先<Link to='login'>登录</Link></div>
      </div>
    )
  }
}

export default Home
