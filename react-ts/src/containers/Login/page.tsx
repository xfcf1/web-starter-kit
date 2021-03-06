import * as React from 'react'
import { Form, Input, Button } from 'antd'
import { History } from 'history'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as styles from './index.scss'

export interface IProps {
  login: (str: object[], history: History) => void,
  history: History,
  form: WrappedFormUtils
}

class Login extends React.Component<IProps> {
  loginHandle() {
    const { form, login, history } = this.props
    form.validateFields((err: object[] | null, values: object[]) => {
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
