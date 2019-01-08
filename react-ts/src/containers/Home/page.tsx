import * as React from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history'
import { ILoginReducer } from '../../modules/login'
import { IHomeReducer } from '../../modules/home'

interface IProps {
  setName: (t: string) => void
  name: string
  homeReducer: IHomeReducer
  loginReducer: ILoginReducer
  setAuth: (t: boolean) => void
  history: History
}

class Home extends React.Component<IProps> {
  changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { setName } = this.props
    setName(e.target.value)
  }
  logout = () => {
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
          <input value={name} onChange={this.changeName} />
          <div onClick={this.logout}>登出</div>
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
