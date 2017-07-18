import { appApi } from './api'
import axios from 'axios'
import querystring from 'querystring'

export default {
  infoMaintain (data) {
    return axios({
      method: 'post',
      url: appApi.infoMaintainUrl(),
      data: data,
      withCredentials: true
    })
 },
	saveInfoMaintain (data){
	 	 return axios({
      method: 'post',
      url: appApi.saveInfoMaintainUrl(),
      data: data,
      withCredentials: true
    })
	},
	submitInfoMaintain (data){
	 	 return axios({
      method: 'post',
      url: appApi.submitInfoMaintainUrl(),
      data: data,
      withCredentials: true
    })
	},
	queryAppInfoBeanList (data){
	 	 return axios({
      method: 'post',
      url: appApi.queryAppInfoBeanListUrl(),
      data: data,
      withCredentials: true
    })
	},
	queryInfoMaintain(data){
		return axios({
      method: 'post',
      url: appApi.queryInfoMaintainUrl(),
      data: data,
      withCredentials: true
    })
	},
	recallInfoMaintain (data){
	 	 return axios({
      method: 'post',
      url: appApi.recallInfoMaintainUrl(),
      data: data,
      withCredentials: true
    })
	},
	
		uploadApk (){
	 	 return appApi.uploadApkUrl()
	},
		uploadLogo (){
	 	 return appApi.uploadLogoUrl()
	},
		uploadPic (){
	 	 return appApi.uploadPicUrl()
	},
		deleteFile (data){
	 	 return axios({
      method: 'post',
      url: appApi.deleteFileUrl(),
      data: data,
      withCredentials: true
    })
	},
			readAPK (data){
	 	 return axios({
      method: 'post',
      url: appApi.readAPKUrl(),
      data: data,
      withCredentials: true
    })
	},
}
