import { userApi } from './api'
import axios from 'axios'
import querystring from 'querystring'

export default {
  login (data) {
    return axios({
      method: 'post',
      url: userApi.loginUrl(),
      data: data,
      withCredentials: true
    })
  },
  forgotPWD (data) {
  	return axios({
      method: 'post',
      url: userApi.forgetPWDUrl(),
      data: data,
      withCredentials: true
    })
  },
  queryAccount (data) {
  	return axios({
      method: 'post',
      url: userApi.queryAccountUrl(),
      data: data,
      withCredentials: true
   })
  },
  saveAccount (data){
  	return axios({
      method: 'post',
      url: userApi.saveAccountUrl(),
      data: data,
      withCredentials: true
   })
  },
  updatePassword (data) {
    return axios({
      method: 'post',
      url: userApi.updatePasswordUrl(),
      data: data,
      withCredentials: true
    }
    )
  },
  resetPassword (data) {
    return axios({
      method: 'post',
      url: userApi.resetPasswordUrl(),
      data: data,
      withCredentials: true
    }
    )
  },
  modifyEmail(data){
  	return axios({
      method: 'post',
      url: userApi.modifyEmailUrl(),
      data: data,
      withCredentials: true
    }
    )
  }
}
