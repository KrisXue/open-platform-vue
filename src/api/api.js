const host = process.env.NODE_ENV === 'production'
//?'http://172.16.10.173:8080/open-platform-service'
//:'http://172.16.10.173:8080/open-platform-service'
?'https://121.196.197.140:8180/open-platform-service'
:'https://121.196.197.140:8180/open-platform-service'
//?'https://open-test.starpos.com.cn/open-platform-service'
//:'https://open-test.starpos.com.cn/open-platform-service'
//?'http://121.196.197.140:7280/open-platform-service'
//:'http://121.196.197.140:7280/open-platform-service'
export const commonApi = {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  // GET
  captchaUrl: () => host + '/admin/findVerCode'
  
}

export const userApi = {
  // POST
	loginUrl: () => host + '/admin/login',	
	//POST
	forgetPWDUrl: () => host + '/admin/forgetPWD',
	// POST
  resetPasswordUrl: () => host + '/admin/resetPWD',
  // POST
  updatePasswordUrl: () => host + '/admin/modifyPWD',
  //POST
  queryAccountUrl: () => host + '/admin/queryAccount',
  //POST
  saveAccountUrl : () => host + '/admin/saveAccount',
  //POST
  modifyEmailUrl : () => host + '/admin/modifyEmail'  
}

export const appApi = {
	//POST
	infoMaintainUrl: () => host + '/openerPlatform/infoMaintain',
	//POST
	saveInfoMaintainUrl: () => host + '/openerPlatform/saveInfoMaintain',
	//POST
	submitInfoMaintainUrl:() => host + '/openerPlatform/submitInfoMaintain',
	//POST
	queryAppInfoBeanListUrl: () => host + '/openerPlatform/queryAppInfoBeanList',
	//POST
	queryInfoMaintainUrl:() => host + '/openerPlatform/queryInfoMaintain',
	//POST
	recallInfoMaintainUrl:() => host + '/openerPlatform/recallInfoMaintain',
	//POST
	uploadApkUrl: () => host + '/version/fileUpload?fileType=apk',
	//POST
	uploadLogoUrl: () => host + '/version/fileUpload?fileType=logo',
	//POST
	uploadPicUrl: () => host + '/version/fileUpload?fileType=pic',
	//POST
	deleteFileUrl:() => host + '/version/delFile',
	//POST
	readAPKUrl:() => host + '/version/readAPK'
}
