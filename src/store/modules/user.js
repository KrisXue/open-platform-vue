import * as types from '../mutation-types'
import Store from '../../utils/store.js'
import Courier from '../../utils/courier.js'
import userApi from '../../api/userApi.js'

const state = {
  login: false,
  show:false,
  user: {
    logName: '',
    userName: '',
    orgName: '',
    mobile: ''
  },
  expireTime: '',
  messages: {
    'sMessages': [],
    'uMessages': []
  }
}

const mutations = {
  [types.LOGIN] (state, user) {
    state.login = true
    state.user = user
    state.expireTime = new Date().getTime() + 30 * 60 * 1000
    // 加入储存中
    Store.save('user', state)
  },
  [types.STORE] (state, storeUser) {
    state.login = false
    state.storeUser = storeUser
    state.expireTime = new Date().getTime() + 30 * 60 * 1000
    // 加入储存中
    Store.save('storeUser', state)
  },
   [types.ACCOUNT] (state, account) {
    state.login = true
    state.account = account
    state.expireTime = new Date().getTime() + 30 * 60 * 1000
    // 加入储存中
    Store.save('account', state)
  },
  [types.SHOW] (state) {
    state.show = true
    state.expireTime = new Date().getTime() + 30 * 60 * 1000
    // 加入储存中
    Store.save('true', state)
  },
  [types.LOGOUT] (state) {
    window.console.log('in notification mutations: LOGOUT')
    state.login = false
    state.user = {}
    state.account = {}
    state.storeUser = {}
    state.expireTime = ''
    Store.remove('user')
    Store.remove('account')
    Store.remove('storeUser')
  },
  [types.SET_SYSTEM_MESSAGES] (state, message) {
    state.messages['sMessages'].push(message)
  },
  [types.SET_USER_MESSAGES] (state, message) {
    state.messages['uMessages'].push(message)
  }
}

// actions
const actions = {
	store({dispatch, commit}, user){
		commit(types.STORE, user)
	},
  doLogin ({dispatch, commit}, user) {
    commit(types.LOGIN, user)
  },
  account ({dispatch, commit}, account) {
    commit(types.ACCOUNT, account)
  },
  show ({commit}) {
    commit(types.SHOW)
  },
  doLogout ({commit}) {
    commit(types.LOGOUT)
  },
  connectStomp ({commit}, id) {
    function systemMessage (message) {
      // window.console.log('--------------scallback--------------')
      // window.console.log(JSON.parse(message.body))
      commit(types.SET_SYSTEM_MESSAGES, JSON.parse(message.body))
    }
    function userMessage (message) {
      // window.console.log(JSON.parse(message.body))
      commit(types.SET_USER_MESSAGES, JSON.parse(message.body))
    }
    Courier.connect(id, systemMessage, userMessage)
  },
  sendMessageByStomp (msg) {
    Courier.sendMessage(msg)
  },
  sendSimpleMessage ({commit}, simpleMessage) {
    // window.console.log(simpleMessage)
    // window.console.log('----------------------------')
    userApi.sendMessage(simpleMessage)
  }
}

export default {
  state,
  mutations,
  actions
}
