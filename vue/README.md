#### 搭建Vue脚手架

### 创建目录
先创建一个主目录再创建如下4个目录
+ vue
  + build（项目打包配置）
  + mock (本地调试服务器)
  + src（具体项目相关）
  + test（测试目录）

### 项目的一些基本配置
1. .gitignore是必须的，写上你不想上传的文件或者目录名称
2. 在项目根目录运行 `npm init` 全部敲回车，会在目录中生成一个package.json的文件
3. 创建.eslintrc文件主要是用于规范多人操作的编码规范，我们写一些最简单的够用就行。插件需要安装html否则会报红。其他具体配置含义请自行阅读eslint官方文档。
    ```json
    {
      "extends": "standard",
      "plugins": [
        "html"
      ],
      "rules": {
        "space-before-function-paren": "off",
        "no-debugger": "off"
      }
    }
    ```
    既然用到了standard及eslint的相关插件就需要我们去安装了
    ```
    yarn add standard eslint-plugin-html -D
    ```

### webpack
  1. 进入build目录，webpack的所有配置都会集中在这里
  2. 创建下面的文件，我们提供本地、测试及生产三个环境进行区分打包
  - index.html（SPA载体）
  - config.js（公用配置）
  - webpack.base.js（基础的webpack配置）
  - webpack.local.js（本地服务环境）
  - webpack.uat.js（测试环境打包）
  - webpack.prod.js（生产环境打包）
  3. 打开index.html，写入如下代码
      ```html
      <!DOCTYPE html>
      <html lang="zh-CN">

      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

        <title>
          <%= htmlWebpackPlugin.options.title %>
        </title>
      </head>

      <body>
        <div id="app"></div>
      </body>

      </html>
      ```
  `htmlWebpackPlugin.options.title`这个东西下面会说，然后加一个id为app的空的div作为vue的载体

  4. 打开config.js
  - 写上本地调试服务器的端口7777、页面的标题
  - output写打包的输出目录一般都是dist
  - extensions 里面写上你需要webpack自动匹配的文件类型
  - alias 你想要起的别名，比如一个js文件里面有很多的公用方法，但是这个js文件你不想每次引用都通过很长的相对路径来写，那就可以在这里先把绝对路径写了，后面直接引入react一样就行了
      ```js
      const path = require('path')

      module.exports = {
        port: '7777',
        title: '用户中心',
        outputDir: 'dist',
        alias: {
          '~config': path.join(__dirname, 'config.js')
        },
        extensions: ['.js', '.jsx', '.css', '.scss', '.json']
      }

      ```

  5. 打开webpack.base.js，写一些基本的配置，然后把配置抛出去。
  - 基本的出入口不用解释了。配置js、jsx的解析器用babel-loader（需要一起装babel-core）
  - 用到插件html-webpack-plugin，能把我们想要东西注入到index.html里面去，比如title、js。既上面提到的`htmlWebpackPlugin.options.title`
  - webpack-dashboard这个东西是为了控制台好看加的，如果不想要可以删掉
  - 到这里需要安装相关依赖`yarn add webpack html-webpack-plugin webpack-dashboard babel-core babel-loader -D`
      ```js
      const path = require('path')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const rootPath = path.join(__dirname, '..')
      const templatePath = path.join(__dirname, 'index.html')
      const DashboardPlugin = require('webpack-dashboard/plugin')
      const config = require('./config')

      module.exports = {
        entry: path.join(rootPath, 'src', 'index.js'),
        output: {
          filename: '[name].[hash].js',
          path: path.join(rootPath, config.outputDir)
        },
        resolve: {
          extensions: config.extensions,
          alias: config.alias
        },
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            }
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: config.title,
            template: templatePath,
            filename: './index.html'
          }),
          new DashboardPlugin()
        ]
      }


      ```
  - 为了用上es6等装逼写法需要在根目录创建一个.babelrc文件，写上如下内容
      ```js
      {
        "presets": ["env", "react"],
        "plugins": [
          "transform-object-rest-spread",
          "transform-decorators-legacy",
          "transform-async-to-generator",
          "transform-runtime",
          "syntax-dynamic-import",
          ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
          }]
        ]
      }
      ```
  - presets 里面写上env就能拥有基本的es6及以下的能力，再加一个react就能解析react了
  - `transform-object-rest-spread`使你能用`...`
  - `transform-decorators-legacy`使你能用`@`
  - `transform-async-to-generator`使你能用`async-await`
  - `transform-runtime`使你的最终打包文件更加小（具体原理自行Google）
  - `syntax-dynamic-import`为动态路由做准备
  - import里面的相关的都是Antd的默认配置可以参照官网
  - 需要安装依赖`yarn add babel-plugin-import babel-plugin-syntax-dynamic-import babel-plugin-transform-async-to-generator babel-plugin-transform-decorators-legacy babel-plugin-transform-object-rest-spread babel-plugin-transform-runtime babel-preset-env babel-preset-react -D`

  6. webpack.local.js写本地调试的配置
   - 先引入base配置
   - 因为是本地开发所以mode给成development
   - 为了方便调用不同环境的API，所以再定义一个环境变量APP_ENV为local
   - 配置css及scss相关并开启modules，这里都是简写
   - 最后就是devServer的配置了
   - 需要安装的依赖`yarn add webpack-dev-server css-loader node-sass sass-loader style-loader -D`
      ```js
      const path = require('path')
      const webpack = require('webpack')
      const base = require('./webpack.base')
      const config = require('./config')

      base.mode = 'development'
      base.plugins.push(
        new webpack.DefinePlugin({
          'process.env.APP_ENV': JSON.stringify('local')
        })
      )
      base.module.rules.push(
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
            'sass-loader'
          ]
        }
      )
      base.devServer = {
        contentBase: path.join(__dirname, '..', config.outputDir),
        compress: true,
        port: config.port,
        historyApiFallback: true
      }
      module.exports = base

      ```
   7. webpack.uat.js 打包到测试环境的配置
   - 这里的mode就是production了
   - 默认的配置会把css跟js打在一包里面，这样文件太大了。我们需要把css代码分离成一个单独的文件。用到插件`mini-css-extract-plugin`
   - 我们需要让webpack自动补全浏览器前缀用postcss
   - 项目根目录创建postcss.config.js
      ```js
      module.exports = {
        plugins: [
          require('precss'),
          require('autoprefixer')
        ]
      }
      ```
   - 然后定义环境变量APP_ENV改成uat就完成了
   - 需要安装依赖`yarn add mini-css-extract-plugin postcss-loader autoprefixer precss -D`
      ```js
      const webpack = require('webpack')
      const base = require('./webpack.base')
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')

      base.mode = 'production'
      base.module.rules.push(
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&minimize',
            'postcss-loader',
            'sass-loader'
          ]
        }
      )
      base.plugins.push(
        new webpack.DefinePlugin({
          'process.env.APP_ENV': JSON.stringify('uat')
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css',
          chunkFilename: '[id].[hash].css'
        })
      )
      module.exports = base

      ```
   8. webpack.prod.js 打包到正式环境的配置
   - 这里如果自己没有特殊需求的话只需要把环境变量APP_ENV改成uat就完成了
   9. 到这里所有的webpack就配置完成了，但是要怎么用呢？
   - 回到package.json文件
   - 里面有个scripts，这里默认有个test，先不管他，我们加上几个我们要的命令（如果没用到webpack-dashboard，请删除）
      - clean （清空dist目录）
      - start （启动本地调试server）
      - build:uat （打包uat）
      - build:prod （打包正式）
   - clean 里面用到了依赖rimraf用来清空dist目录
   - start及其他两个打包的用到了cli`--config`后面跟上对应的配置文件就行了
   - 如果想打包uat环境 直接敲`npm run build:uat`就行了，其他以此类推
   - 安装依赖`yarn add rimraf webpack-cli -D`
      ```js
        "scripts": {
          "clean": "rimraf ./dist",
          "start": "webpack-dashboard -- webpack-dev-server --config build/webpack.local.js",
          "build:uat": "npm run clean && webpack --config build/webpack.uat.js",
          "build:prod": "npm run clean && webpack --config build/webpack.prod.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        }
      ```
   10. 如果现在直接`npm run build:prod`会报错说entry no find。因为我们的base里面的entry所需要的`src/index.js`文件根本没有
### React配置
1. 接上文src目录创建一个index.js，随便写点什么，再`npm run build:uat`就可以看见打包的东西了
2. 清空index.js开始配置react了
3. 创建如下目录和文件
  - assets（字体、icon目录）
  - components（组件目录）
  - containers（页面目录）
  - moudles（redux相关目录）
  - styles（样式相关）
  - tools （常量、公用函数等等乱七八糟的东西都丢这里）
  - app.js
  - index.js（已经有了）
4. 编辑index.js
    ```js
    import React from 'react'
    import ReactDom from 'react-dom'
    import { Provider } from 'react-redux'
    import { createStore, applyMiddleware } from 'redux'
    import thunk from 'redux-thunk'
    import { createLogger } from 'redux-logger'
    import reducer from './moudles'
    import App from './app'

    const logger = createLogger()
    const store = createStore(reducer, applyMiddleware(thunk, logger))

    ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('app')
    )

    ```
  - 用redux的话，需要用`Provider`包装并且传入store
  - store里面可以加上log的中间件（当然可以通过process.env.APP_ENV来判断是否需要log）
  - redux-thunk可以让你执行异步，比如请求API。因为默认redux是同步的
  - reducer 见下文
  - App 见下文
  - 需要安装依赖`yarn add react react-dom react-redux redux redux-thunk redux-logger`（这里不需要`-D`了）
5. 接下来做页面login相关
  - containers下面创建一个Login目录
  - 进入Login
  - 创建index.js、login.scss、page.js三个文件
  - page.js里面写login的页面相关，这里用到了Antd的form
  - 安装依赖`yarn add antd`
    ```js
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

    ```
  - login.scss，注意这里因为开启了css module，所以用法是`className={styles.warp}`而不是直接写`wrap`
    ```css
    .warp {
      margin: 40px auto 0;
      width: 500px;
    }
    ```
  - index.js 里面就要写与redux相关的connect（不知道connect是什么的，自行看react-redux的文档）
    ```js
    import Page from './page'
    import { bindActionCreators } from 'redux'
    import { connect } from 'react-redux'
    import * as actions from '../../moudles/login'

    const mapState = state => ({
      loginReducer: state.loginReducer
    })

    const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

    export default connect(mapState, mapDispatch)(Page)

    ```
  - 然后我们这里用了`../../moudles/login`
  - 进入moudles，创建两个文件index.js、login.js
    - 打开index.js
    ```js
    import { combineReducers } from 'redux'
    import loginReducer from './login'

    export default combineReducers({
      loginReducer
    })

    ```
    - 打开login.js，我们做了一个请求，请求成功以后修改isAuth状态，并且跳转到首页
    ```js
    import { createAction, createReducer } from 'redux-act'
    import { Message } from 'antd'
    import fetch from '../tools/fetch'
    import API from '../tools/constants'

    export const setAuth = createAction('修改登录状态')

    export function login({ username, password }, history) {
      return async (dispatch, getState) => {
        const isAuth = await fetch(API.LOGIN, { username, password })
        if (isAuth.code === 0) {
          dispatch(setAuth(true))
          history.push('/')
        } else {
          Message.error('登录失败')
        }
      }
    }

    const initialState = {
      isAuth: false
    }

    export default createReducer(
      {
        [setAuth]: (state, data) => {
          return { ...state, isAuth: data }
        }
      },
      initialState
    )

    ```
    - 这里用到一个关键的插件`redux-act`（自行学习）
    - 需要安装的依赖`yarn add redux-act`
  - 进入`server/fetch`，写一个公用的请求方法
  - 安装依赖`yarn add axios`
    ```js
    import axios from 'axios'
    import API from './constants'

    export default function fetch(url, data) {
      try {
        return new Promise((resolve, reject) => {
          axios.post(`${API.domain}${url}`, data).then(data => {
            if (data.data.code === 0) {
              resolve(data.data)
            } else {
              resolve(data.data)
            }
          }).catch(e => {
            reject(data.data)
          })
        })
      } catch (e) {
        console.log(e)
      }
    }

    ```
  - 进入`tools/constants`，定义一些环境及接口，`~config`就是我们定义的alias
    ```js
    import config from '~config'

    const ENV = process.env.APP_ENV

    let domain = ''
    if (ENV === 'local') {
      domain = `localhost:${config.port}`
    } else if (ENV === 'dev') {
      domain = 'http:dev'
    } else if (ENV === 'uat') {
      domain = 'http:uat'
    } else if (ENV === 'prod') {
      domain = 'http:prod'
    }

    export default {
      domain,
      LOGIN: '/login'
    }

    ```
  - 然后我们如法炮制创建一些其他页面（Home、ErrorPage、List），以及components目录下的一些组件（Detail、Header、Menu）
  - 最后就到了router这里了
  - 编辑app.js
  - 想做动态路由的话就需要用到`react-loadable`
  - 安装依赖`yarn add react-loadable react-router-dom`
    ```js
    import React, { Component } from 'react'
    import { HashRouter as Router, Route, Switch } from 'react-router-dom'
    import Loadable from 'react-loadable'
    import styles from './styles/base.scss'
    import Header from './components/Header'
    import Home from './containers/Home'
    import List from './containers/List'
    import ErrorPage from './containers/ErrorPage'
    // import Login from './containers/Login'

    const Login = Loadable({
      loader: () => import('./containers/Login'),
      loading: () => (<div>Loading...</div>)
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

    ```
### mock server
1. 我们用express（在vue的脚手架里面，我们用koa）
2. 为了让这里也用上es6，我们还要加一个.babelrc文件
    ```js
    {
      "presets": ["env"],
      "plugins": [
        "transform-runtime"
      ]
    }
    ```
3. 在mock目录新建两个文件app.js，index.js，
  - index.js
    ```js
    require('babel-core/register')
    require('./app.js')
    ```
  - app.js设置一些header跟解析json就可以用了
  - 安装依赖`yarn add express body-parser -D`
    ```js
    import express from 'express'
    import bodyParser from 'body-parser'

    const app = express()
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, x-token'
      )
      res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      if (req.method === 'OPTIONS') {
        res.sendStatus(200)
      } else {
        next()
      }
    })
    app.use(bodyParser.json())

    app.post('/login', (req, res) => {
      const { username, password } = req.body
      if (username === 'alex' && password === '111') {
        res.send({ code: 0, data: '登录成功' })
      } else {
        res.send({ code: 1, data: '登录失败' })
      }
    })

    app.listen(9001)

    ```
  - 在package.json里面的scripts里面加一个命令`"mock": "nodemon mock/index.js",`
  - 安装依赖`yarn add nodemon -D`
  - `nodemon`会自动刷新你的node服务
### test

