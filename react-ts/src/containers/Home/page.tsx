import * as React from 'react'

interface IHomeProps {
  setName: any
  name: string
  homeReducer: any
}

class Home extends React.Component<IHomeProps, {}> {
  changeName(value: string) {
    const { setName } = this.props
    setName(value)
  }
  render() {
    const { homeReducer } = this.props
    const { name } = homeReducer
    return (
      <div>
        <div>Hello, {name}</div>
        <input value={name} onChange={e => this.changeName(e.target.value)} />
      </div>
    )
  }
}

export default Home
