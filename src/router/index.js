import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotView from '../views/ForgotView.vue'
import ForgotResetView from '../views/ForgotResetView.vue'
import UserResetPassword from '../views/UserResetPassword.vue'
import NotFoundView from '../views/NotFoundView.vue'
import AccountsView from '../views/AccountsView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import DocView from '../views/DocumentView.vue'



import UserPassword from '../components/accounts/UserPassword.vue'
import UserInfo from '../components/accounts/UserInfo.vue'
import UserEmail from '../components/accounts/UserEmail.vue'


import MyApps from '../components/application/MyApps.vue'
import UploadApps from '../components/application/UploadApps.vue'


export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: IndexView },
    { path: '/login', component: LoginView },
  	{ path: '/forgot', component: ForgotView },
  	{ path: '/forgot-reset', component: ForgotResetView },
    { path: '/user-reset-password', component: UserResetPassword },
    { path: '/doc', component: DocView },
    {
      path: '/accounts',
      component: AccountsView,
      children: [
        {
          path: 'user-password',
          components: {
            accountsView: UserPassword
          }
        },
        {
          path: 'user-info',
          components: {
            accountsView: UserInfo
          }
        },
        {
          path: 'user-email',
          components: {
            accountsView: UserEmail
          }
        }
      ]
    },
    {
      path: '/application',
      component: AccountsView,
      children: [
        {
        	name:'myApps',
          path: 'my-apps',
          components: {
            accountsView: MyApps
          }
        },
        {
        	name:'uploadApps',
          path: 'upload-apps',
          components: {
            accountsView: UploadApps
          }
        }
      ]
    },
    { path: '/*', component: NotFoundView }
  ]
})
