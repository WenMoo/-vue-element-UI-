import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import layout from '@/views/layout'
import Order from '@/views/order'
import Admin from '@/views/admin'
import Course from '@/views/course'
import Investigation from '@/views/investigation'
import Consult from '@/views/consult'
import Slideshow from '@/views/slideshow'
import School from '@/views/school'
import User from '@/views/user'
import Complaint from '@/views/complaint'
import Category from '@/views/category'
import ClassTime from '@/views/classTime'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',//路由的name不同于组件的name，方便动态传递参数
    component: Login
  },
  {
    path: '/layout',
    //命名路由 layout有一个默认子路由时，给该路由起名字没有意义，所以会抱一个警告，正确的做法是：如果有默认子路由，就不要给父路由起名
     name: 'layout',
    component: layout,
    children: [
      {
        path: '/order',
        name: 'order',//路由的name不同于组件的name，方便动态传递参数
        component: Order
      },
      {
        path: '/admin',
        name: 'admin',//路由的name不同于组件的name，方便动态传递参数
        component: Admin
      },
      {
        path: '/course',
        name: 'course',//路由的name不同于组件的name，方便动态传递参数
        component: Course
      },
      {
        path: '/investigation',
        name: 'investigation',//路由的name不同于组件的name，方便动态传递参数
        component: Investigation
      },
      {
        path: '/consult',
        name: 'consult',//路由的name不同于组件的name，方便动态传递参数
        component: Consult
      },
      {
        path: '/slideshow',
        name: 'slideshow',//路由的name不同于组件的name，方便动态传递参数
        component: Slideshow
      },
      {
        path: '/school',
        name: 'school',//路由的name不同于组件的name，方便动态传递参数
        component: School
      },
      {
        path: '/user',
        name: 'user',//路由的name不同于组件的name，方便动态传递参数
        component: User
      },
      {
        path: '/complaint',
        name: 'complaint',//路由的name不同于组件的name，方便动态传递参数
        component: Complaint
      },
      {
        path: '/category',
        name: 'category',//路由的name不同于组件的name，方便动态传递参数
        component: Category
      },
      {
        path: '/classTime',
        name: 'classTime',//路由的name不同于组件的name，方便动态传递参数
        component: ClassTime
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

//导航守卫:防止直接从路径中输入进入页面
// router.beforeEach((to, from, next) => {
//   // console.log('页面进入');
//   // console.log(to);
//   // console.log(from);
//   // next()
//
//   const user = JSON.parse(window.localStorage.getItem('user'));
//
//   if(to.path !== '/login') {
//         if(user) {
//           next()
//         }else{
//           next('/login')
//         }
//   }else {
//     next()
//   }
//
// })

export default router
