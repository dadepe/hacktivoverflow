import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import QuestionPage from '../views/QuestionPage.vue'
import AskPage from '../views/AskPage.vue'
import EditQuestion from '../views/EditQuestion.vue'
import MyQuestions from '../views/MyQuestions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/questions/:id',
    name: 'questionPage',
    component: QuestionPage
  },
  {
    path: '/ask',
    name: 'askPage',
    component: AskPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/editQuestion/:id',
    name: 'editQuestion',
    component: EditQuestion
  },
  {
    path: '/myQuestions',
    name: 'myQuestions',
    component: MyQuestions
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
