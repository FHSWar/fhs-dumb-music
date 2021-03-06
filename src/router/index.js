import Vue from 'vue'
import VueRouter from 'vue-router'

// 注意点: 以下的导入方式, 无论组件有没有被用到都会被加载进来
// import Recommend from '../views/Recommend'
// import Singer from '../views/Singer'
// import Rank from '../views/Rank'
// import Search from '../views/Search'

// 实现Vue组件的按需加载
const Recommend = (resolve) => {
  import('../views/Home-Recommend').then((module) => resolve(module))
}
const Detail = (resolve) => {
  import('../views/Detail-SongList').then((module) => resolve(module))
}
const Singer = (resolve) => {
  import('../views/Home-Singer').then((module) => resolve(module))
}
const Rank = (resolve) => {
  import('../views/Home-Rank').then((module) => resolve(module))
}
const Search = (resolve) => {
  import('../views/Home-Search').then((module) => resolve(module))
}
const Account = (resolve) => {
  import('../views/Account').then((module) => resolve(module))
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/recommend' }, // 这个如果不写, 进来时就出现所有选项卡都没选中的现象, 不理想
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/recommend', component: Recommend },
  { path: '/singer', component: Singer },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  { path: '/search', component: Search },
  { path: '/account', component: Account },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        // 第二个值是 type, 这冒号写法不如 query 舒服
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  }
]

const router = new VueRouter({
  /*
  注意点: 如果Router中使用的是history模式, 那么打包之后的项目不能刷新, 刷新就会出现404
  解决方案: 1.Router这两个不要使用history模式, 使用hash模式
            2.在服务端上面进行一些额外的配置
  * */
  // mode: 'hash',
  // 注意点: 如果需要使用预渲染的插件, 那么Router的模式必须是history模式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
