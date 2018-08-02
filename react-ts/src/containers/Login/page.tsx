import * as React from 'react'
import { Form, Input, Button } from 'antd'
import * as styles from './index.scss'

class Login extends React.Component<any, any> {
  login() {
    console.log(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.center}>
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true }]
            })(<Input placeholder='用户名' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true }]
            })(<Input placeholder='密码' type='password' />)}
          </Form.Item>
          <Form.Item>
            <Button onClick={() => this.login()}>Login</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
