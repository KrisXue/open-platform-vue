40<template>
 <div id="form"  v-loading.fullscreen="fullscreenLoading">
 	<div class="header" id='header'>
      <mu-appbar style='background-color: #030329'>
        <div class="inner" style="margin-left:18.5%; ">
          <router-link to="/" exact>
            <img class="logo" src="../../assets/topbar_pic_logo.png" alt="logo">
          </router-link>
          <router-link to="/" style="">开发者</router-link> 
          <router-link to="/doc" target='_blank'>|<span style='color:#57CF8D;margin-left: 30px;'>开发者文档</span></router-link> 
        </div>
      </mu-appbar>
    </div>
 	<p style="padding-left:40px;padding-top:19px;font-size:18px;">邮箱修改</p>
 	<p class="email-tips">当前预留邮箱为<span style="color:#57CF8D">{{email}}</span>，如果该邮箱有变动，请及时更换以免造成账户信息被盗！</p>
  	<div class="email-panel"> 
    <div style="width:70%; margin:0 7% 0 23%;">
		<span class="pre-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码</span>
		<input type="password" maxlength='30' class="input-line" @focus="handleFocus"  @blur="handleBlur" v-model="password" placeholder="请输入密码" v-bind:class="{ error: isPasswordError }"style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);">
		<span class="errorStyle" style="font-size: .9em;color #ff5957;padding-left: 5px;">{{passwordError}}</span>
		<span class="passwordTip" style="font-size: .9em;color:#57CF8D">{{passwordTip}}</span>
		<br><br>
		<span class="pre-text" style="padding-right: 16px;">&nbsp;&nbsp;&nbsp;新&nbsp;&nbsp;邮&nbsp;&nbsp;箱</span>
		<input type="text" class="input-line" v-model="newEmail" placeholder="请输入新邮箱" v-bind:class="{ error: isNewEmail }"
			style="font-size: 0.9em; color: #999; height:45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);">
		<span class="errorStyle" style="font-size: .9em;color #ff5957;padding-left: 5px;">{{newEmailError}}</span>
		<br><br>
		<span class="pre-text" style="padding-right: 19px;">确&nbsp;认&nbsp;邮&nbsp;箱</span>
		<input type="text" class="input-line" v-model="confirmNewEmail" placeholder="请输入确认邮箱" v-bind:class="{ error: isConfirmNewEmail }"
			style="font-size: 0.9em; color: #999; height:45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);">
		<span class="errorStyle" style="font-size: .9em;color #ff5957;padding-left: 5px;">{{confirmNewEmailError}}</span>
					
		<br><br><br>
		<mu-raised-button class="sendEmail-button forget-forward-button email-button"  @click="modifyEmail()" label="提交修改" :disabled="passwordError !== '' || newEmailError !== '' || confirmNewEmailError !== '' || password === '' || newEmail === '' || confirmNewEmail === ''"
			style='width:247px;margin-left: 23%;color:#FFFFFF; background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%) !important; height:45px;'/>
	</div>
  </div>
</div>
</template>


<script>
import userApi from 'src/api/userApi'
import MD5 from 'MD5'
import _ from 'lodash'
import $ from 'jquery'

export default {
  name: 'user-password',
  created(){
  	this.getEmail()
  	$(document).ready(function(){
				var browserWidth = document.body.clientHeight - 180
				var minHeight = browserWidth + "px"
				console.log(minHeight)
	    	if(document.body.clientHeight>640){
		 			$("#form").css("min-height", minHeight)
		    }else{
		 			$("#form").css("min-height", "460px")
		    }
    })
  },
  data () {
    return {
      password: '',
      oldEmail:'',
      newEmail: '',
      confirmNewEmail: '',
      passwordError: '',
      newEmailError: '',
      confirmNewEmailError: '',
      isPasswordError:false,
      isNewEmail:false,
      isConfirmNewEmail:false,
      email: '',
      fullscreenLoading:true,
      passwordTip:''
      
    }
  },
  methods: {
  	handleFocus(){
  		if(this.passwordError!==''){
  			this.passwordTip = ''
  		}else{
  			this.passwordTip = '不超过30个字符'
  		}
  	},
  	handleBlur(){
  		this.passwordTip = ''
  	},
  	getEmail(){
  		var data = {
    		'logName' : this.$store.state.user.user.logName
    	}
    	var _this = this
    	_this.fullscreenLoading = true
   		userApi.queryAccount(data)
					      .then(function (res) {
					      	if(res.data['msgCode'] === '00000'){
					      				_this.fullscreenLoading = false
					      				let email = res.data['email']
					      				_this.email = email
					      		} 
					      })
  	},
    modifyEmail () {
    	
		if (this.password === '') {
	    	this.isPasswordError = true
	        this.passwordError = '请输入密码'
      }
    	if (this.newEmail === '') {
    		this.isNewEmail = true
        	this.newEmailError = '请输入邮箱'
      }
    	if (this.confirmNewEmail === '') {
    		this.isConfirmNewEmail = true
        	this.confirmNewEmailError = '请输入确认邮箱'
      }
    	 if (this.passwordError === '' && this.newEmailError === '' && this.confirmNewEmailError === '') {
		      var password = MD5(this.password).toString()
		      var data = {
		      	'logName' : this.$store.state.user.user.logName,
		      	'logPWD' : password,
		      	'email' : this.newEmail,
		      	'confirmEmail' : this.confirmNewEmail
		      }
		      var _this = this
		      _this.fullscreenLoading = true
		      userApi.modifyEmail(data)
		      .then(function (res) {
		        if (res.data['msgCode'] !== '00000') {
		        	_this.fullscreenLoading = false
		          	_this.$alert(res.data['message'], '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
		        } else {
		          // 更新成功
		         	  _this.fullscreenLoading = false
		        	  _this.$alert(res.data['message'], '', {
		            	confirmButtonText: '确定',
		            	type:'success'
		           }).then(() => {
						_this.getEmail()
					    _this.$router.replace('/accounts/user-info')
					    })
		        }
		      })
		      .catch(function (res) {
		        if (res instanceof Error) {
		          _this.fullscreenLoading = false
		          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            confirmButtonText: '确定',
		            type:'error'
            	  })
		        } else {
		          _this.fullscreenLoading = false
		          _this.$alert('服务器开小差了，请稍后再试...', '', {
	            	confirmButtonText: '确定',
	            	type:'error'
            	  })
		        }
		      })
            }
    },
    checkPassword: _.debounce(
      function () {
      	var re = /\s+/g
      	if(re.test(this.password)){
          this.isPasswordError = true
          this.passwordError = '密码不能包含空格'
          this.passwordTip =''
      	}
        if (this.password.length > 30) {
          this.isPasswordError = true
          this.passwordError = '密码不超过30个字符'
          this.passwordTip =''
        }
      },
      0
    ),
    checkNewEmail: _.debounce(
      function () {
        // 首先验证邮箱的格式
        /* eslint no-useless-escape: "off" */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(this.newEmail)) {
          this.isNewEmail = true
          this.newEmailError = '邮箱格式不正确'
          return
        }
      },
      // 等待时间
      0
    ),
    checkConfirmNewEmail: _.debounce(
      function () {
        // 验证邮箱的格式
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(this.confirmNewEmail)) {
          this.isConfirmNewEmail = true
          this.confirmNewEmailError = '邮箱格式不正确'
          return
        }
      },
      // 等待时间
      0
    ),
    checkCompareEmail: _.debounce(
      function () {
      	this.isConfirmNewEmail = false
      	this.confirmNewEmailError = ''
      	if(this.newEmail !=='' && this.newEmail !==''){
	      	if (this.newEmail !== this.confirmNewEmail) {
	        	this.isConfirmNewEmail = true
	          	this.confirmNewEmailError = '两次输入的邮箱不一致'
	        }
      	}
      },
      0
    )
},
  watch: {
  	password(){
  		this.passwordError = ''
  		this.isPasswordError = false
  		this.checkPassword()
  	},
    newEmail () {
      this.newEmailError = ''
      this.isNewEmail = false
      this.checkNewEmail()
      this.checkCompareEmail()
    },
    confirmNewEmail () {
      this.confirmNewEmailError = ''
      this.isConfirmNewEmail = false
      this.checkConfirmNewEmail()
      this.checkCompareEmail()
    }
  }
}
</script>
<style>
.el-message-box__content{
	clear:both;
	margin:0 auto;
	text-align: center !important;
	margin-right: 55px !important;
}
.el-message-box__status{
	position:relative;
	left: 50%;
}
.el-message-box__status.el-icon-circle-check {
    color: transparent !important; 
    top: 20px !important;
    margin-left: 10px !important;
    background-size: 36px 36px !important;
    background-image: url('../../assets/tankuang_pic_chenggong.png') !important;
}
.el-message-box__status.el-icon-circle-cross{
	color: transparent !important; 
    top: 20px !important;
    margin-left: 10px !important;
    background-size: 36px 36px !important;
    background-image: url('../../assets/tankuang_pic_shibai.png') !important;
}
.el-message-box__status.el-icon-information{
		color: transparent !important; 
    top: 20px !important;
    margin-left: 10px !important;
    background-size: 36px 36px !important;
    background-image: url('../../assets/tankuang_pic_tishi.png') !important;
}
.el-message-box__message{
	  margin-left: 50px !important;
	  margin-top: 20px !important;
}
#form{
	margin-top: 50px;
}
.email-tips{
	text-align: center; 
	color: #979797;
	margin-right: 28px;
	margin-top: 4%;
}
</style>