### 前端基本脚手架搭建

- 目录
  - react
  - vue
  - react + typescript
  - vue + typescript
  - svelte

### 功能&配置
编辑器 VS Code

babel es6、async&await


- webpack
  - 区分多环境打包
  - 使用scss
  - 样式单独抽取成独立文件
  - css模块化
  - 样式兼容postcss
- mock server
  - koa
  - 简单响应一个login接口
- react
  - router
    - login
    - index（与other公用header组件）
    - other
    - 404
  - redux
  - Antd UI框架
  - axios请求接口
- vue
  - router
    - login
    - index（与other公用header组件）
    - other
    - 404
  - vuex
  - Element UI框架
  - axios请求接口

### vscode 自动修复配置
eslint：
```

    "editor.formatOnSave": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": [
            "html"
        ],
        "extensions": [
            ".js",
            ".vue"
        ]
    },
    "eslint.autoFixOnSave": true,
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": [
            "css",
            "html",
            "less"
        ]
    },
    "tslint.autoFixOnSave": true
```
