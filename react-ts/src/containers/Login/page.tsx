import * as React from 'react'
import { Form, Input, Button } from 'antd'
import * as styles from './index.scss'

interface ILoginProps {
  form: any
  login: any
  history: any
}

class Login extends React.Component<ILoginProps, {}> {
  loginHandle() {
    const { form, login, history } = this.props
    console.log(this.props)
    form.validateFields((err: {}, values: any) => {
      if (!err) {
        login(values, history)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.center}>
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true }]
            })(<Input placeholder='用户名' autoComplete='off' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true }]
            })(<Input placeholder='密码' type='password' />)}
          </Form.Item>
          <Form.Item>
            <Button onClick={() => this.loginHandle()}>Login</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
