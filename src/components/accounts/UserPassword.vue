<template>
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
    <p style="padding-left:40px;padding-top:19px;font-size:18px;">密码修改</p>
    <div style="width:70%; margin:5% 7% 0 23%;">
	    <span class="pre-text">原&nbsp;始&nbsp;密&nbsp;码</span>
	    <input type="password" maxlength='30' class="input-line" v-model="oldPassword" v-bind:class="{ error: isOldPasswordError }"  @focus="handleOldFocus"  @blur="handleOldBlur" placeholder="请输入原始密码"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;"
	    	>
	    <span class="errorStyle" style="font-size: .9em;">{{oldPasswordError}}</span>
	     <span class="passwordOldTip" style="font-size: .9em;color:#57CF8D">{{passwordOldTip}}</span>
	    <br><br>
	    <span class="pre-text2">&nbsp;&nbsp;新&nbsp;&nbsp;密&nbsp;&nbsp;码</span>
	    <input type="password" maxlength='30' class="input-line" v-model="newPassword" v-bind:class="{ error: isNewPasswordError }" @focus="handleFocus"  @blur="handleBlur" placeholder="请输入新密码"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;"
	    	>
	    <span class="errorStyle" style="font-size: .9em;">{{passwordError}}</span>
	    <span class="passwordTip" style="font-size: .9em;color:#57CF8D">{{passwordTip}}</span>
	    <br><br>
	    <span class="pre-text">确&nbsp;认&nbsp;密&nbsp;码</span>
	    <input type="password" maxlength='30' class="input-line" v-model="confirmedPassword" v-bind:class="{ error: isConfirmedPasswordError }" @focus="handleConfirmFocus"  @blur="handleConfirmBlur" placeholder="请确认新密码"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;"
	    	>
	    <span class="errorStyle" style="font-size: .9em;" >{{passwordConfirmError}}</span>
	    <span class="passwordConfirmTip" style="font-size: .9em;color:#57CF8D">{{passwordConfirmTip}}</span>
	    <br><br><br>
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	    <mu-raised-button class="input-button forget-forward-button user-pswd-button"  @click="submit()" label="提 交 修 改" :disabled="passwordError !== '' || passwordConfirmError !== '' || oldPasswordError !== '' || oldPassword === '' || newPassword === '' || confirmedPassword === ''"
	    style='width:247px;margin-left: 17%;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);
						       height:45px;'
	    />
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
  	$(document).ready(function(){
				var browserWidth = document.body.clientHeight - 180
				var minHeight = browserWidth + "px"
				console.log(minHeight)
	    	if(document.body.clientHeight>600){
		 			$("#form").css("min-height", minHeight)
		    }else{
		 			$("#form").css("min-height", "430px")
		    }
    })
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmedPassword: '',
      oldPasswordError: '',
      passwordError: '',
      passwordConfirmError: '',
      logName:'',
      isOldPasswordError:false,
      isNewPasswordError:false,
      isConfirmedPasswordError:false,
      fullscreenLoading: false,
      passwordOldTip:'',
      passwordTip:'',
      passwordConfirmTip:''
    }
  },
  methods: {
  	handleOldFocus(){
  		if(this.oldPasswordError!==''){
  			this.passwordOldTip = ''
  		}else{
  			this.passwordOldTip = '不超过30个字符'
  		}
  	},
  	handleOldBlur(){
  		this.passwordOldTip = ''
  	},
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
  	handleConfirmFocus(){
  		if(this.passwordConfirmError!==''){
  			this.passwordConfirmTip = ''
  		}else{
  			this.passwordConfirmTip = '不超过30个字符'
  		}
  		
  	},
  	handleConfirmBlur(){
  		this.passwordConfirmTip = ''
  	},
    submit () {
					var _this = this
		      if (this.oldPassword === '') {
			       this.isOldPasswordError = true
			       this.oldPasswordError = '请输入原始密码'
			      }
		      if (this.newPassword === '') {
			       this.isNewPasswordError = true
			       this.passwordError = '请输入新密码'
			      }
		      if (this.confirmedPassword === '') {
			       this.isConfirmedPasswordError = true
			       this.passwordConfirmError = '请输入确认密码'
			      }
			    if (this.oldPasswordError === '' &&
			        this.passwordError === ''&&
			    		this.passwordConfirmError=== '') {
					    var oldPassword = MD5(this.oldPassword).toString()
				      var newPassword = MD5(this.newPassword).toString()
				      var confirmedPassword = MD5(this.confirmedPassword).toString()
				      if(_this.$store.state.user.storeUser == 'undefined'){
				      	_this.logName = _this.$store.state.user.storeUser.logName
				      }else{
				      	_this.logName = _this.$store.state.user.user.logName
				      }
				      var data = {
				      	'logName' :_this.logName,
				      	'logPWD' : oldPassword,
				      	'newLogPWD': newPassword,
				      	'confirmedPWD':confirmedPassword
				      }
				      _this.fullscreenLoading = true
				      userApi.updatePassword(data)
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
							          _this.$store.dispatch('doLogout')
							          _this.$router.push('/')
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
    checkOldPassword: _.debounce(
      function () {
      	var re = /\s+/g
      	if(re.test(this.oldPassword)){
        	this.isOldPasswordError = true
          this.oldPasswordError = '密码不能包含空格'
          this.passwordOldTip = ''
      	}
        if (this.oldPassword.length > 30) {
        	this.isOldPasswordError = true
          this.oldPasswordError = '密码不超过30个字符'
          this.passwordOldTip = ''
        }
      },
      0
    ),
    checkPassword: _.debounce(
      function () {
      	var re = /\s+/g
      	if(re.test(this.newPassword)){
        	this.isNewPasswordError = true
          this.passwordError = '密码不能包含空格'
          this.passwordTip = ''
      	}
        if (this.newPassword.length > 30) {
        	this.isNewPasswordError = true
          this.passwordError = '密码不超过30个字符'
          this.passwordTip = ''
        }
      },
      0
    ),
    checkConfirmedPassword: _.debounce(
      function () {
        this.passwordConfirmError = ''
        this.isConfirmedPasswordError = false
        var re = /\s+/g
      	if(re.test(this.confirmedPassword)){
        	this.isConfirmedPasswordError = true
          this.passwordConfirmError = '密码不能包含空格'
          this.passwordConfirmTip = ''
      	}
        if (this.confirmedPassword.length > 30) {
        	this.isConfirmedPasswordError = true
          this.passwordConfirmError = '密码不超过30个字符'
          this.passwordConfirmTip = ''
        }
        if(this.newPassword !==''&&this.confirmedPassword !== ''){
		        if (this.newPassword !== this.confirmedPassword) {
		        	this.isConfirmedPasswordError = true
		          this.passwordConfirmError = '两次输入的密码不一致'
		          this.passwordConfirmTip = ''
		        }
        }
      },
      0
    )
  },
  watch: {
    oldPassword () {
      this.oldPasswordError = ''
      this.isOldPasswordError = false
      this.checkOldPassword()
    },
    newPassword () {
      this.passwordError = ''
      this.isNewPasswordError = false
      this.checkPassword()
      this.checkConfirmedPassword()
    },
    confirmedPassword () {
      this.passwordConfirmError = ''
      this.isConfirmedPasswordError = false
      this.checkConfirmedPassword()
    }
  }
}
</script>

<style lang="stylus" scoped>

.accounts-view
  #form
    /*height 600px*/
    background-color #fff
    .errorStyle
      color #ff5957
      font-size 0.9em
      padding-left 5px
      letter-spacing 1px
    .input-line, .input-text
      width 600px
      margin-top 6px
      padding 6px 8px
      border 1px solid #ddd
      border-radius 3px
      /*background-color #fafafa*/
      box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.075)
      outline none
    .changePassword
      &:disabled
        color #aaa
        border 1px solid #e9e9e9
    .pre-text
    	padding-right 15px
    	color #8B9AAB
    .pre-text2
    	padding-right 16px
    	color #8B9AAB
    input:focus
    	border-color #57cf8d 
    	box-shadow 0 0 3px #57cf8d
    input
    	outline none
    	-webkit-outline none
</style>
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
.mu-raised-button.disabled {
    background-image: linear-gradient(44deg, #e6e6e6 0%, #e6e6e6 100%) !important;
    box-shadow: none;
    cursor: not-allowed;
}
@media (min-width:1401px ) and (max-width:1600px){
	.user-pswd-button{
		margin-left: 15% !important;
	}
	.email-button{
		margin-left: 21% !important;
	}
}
@media (min-width:1201px ) and (max-width:1400px){
	.user-pswd-button{
		margin-left: 13% !important;
	}
	.email-button{
		margin-left: 20% !important;
	}
}
@media (max-width:1200px){
	.user-pswd-button{
		margin-left: 12% !important;
	}
	.email-button{
		margin-left: 20% !important;
	}
}
</style>