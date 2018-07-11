import React, { Component } from 'React'
import { Button, Form, Input } from 'antd'
import styles from './login.scss'

class Login extends Component {
  login() {
    const { login, history, form } = this.props
    form.validateFields((errs, values) => {
      if (!errs) {
        login(values, history)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.warp}>
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true }]
            })(<Input placeholder="用户名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true }]
            })(<Input placeholder="密码" type="password" />)}
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
