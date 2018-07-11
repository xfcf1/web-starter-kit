import NoFind from './containers/noFind'
import Home from './containers/home'
import Login from './containers/login'
import List from './containers/list'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/list',
        component: List
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '*', component: NoFind }
]

export default routes
