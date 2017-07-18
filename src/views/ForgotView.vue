<template>
  <div class="forget-view" v-loading.fullscreen="fullscreenLoading" :element-loading-text="loadingText">
  	<div class="header" id='header' >
      <mu-appbar style='background-color: #04042A'>
        <div class="inner" style="margin-left: 90px !important;">
          <router-link to="/" exact>
            <img class="logo" src="../assets/topbar_pic_logo.png" alt="logo">
          </router-link>
          
          <router-link to="/doc" target='_blank'>|<span style='color:#57CF8D;margin-left: 30px;'>开发者文档</span></router-link>         
        </div>
      </mu-appbar>
    </div>
  	<p style="padding-left:40px;padding-top:19px;font-size:18px;">忘记密码</p>
    <div class="forget-step">
      <mu-stepper :activeStep="activeStep">
        <mu-step>
          <mu-step-label>
           		<span>邮箱验证</span> 
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
            	密码重置
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
     					重置成功
          </mu-step-label>
        </mu-step>
      </mu-stepper>
      <div class="forget-step-content">
        <template v-if="!finished">
          <div v-if="activeStep === 0" class="forget-step-one">
    				<div  style="padding-top:5px; padding-left:0;">
							<br>
							<div style="width:100%; margin:0 7% 0 7%;">
								<span class="pre-text">电&nbsp;子&nbsp;邮&nbsp;箱</span>
								<input type="text" class="input-line" v-model="email" placeholder="请输入您预留的邮箱"
									style=" color: #999; height: 45px; width:70%; outline none" v-bind:class="{ error: isEmailError }">
									<br />
								<span class="errorStyle" style=" padding-left: 100px;  font-size: .9em;color:#ff5957">{{emailError}}</span>
								<br><br>
									<span class='pre-text3' style="float: left;"> 验 &nbsp; 证&nbsp;&nbsp;  码</span>
									<today-movies style="position: relative; left: 43px; top: -20px;"></today-movies>
							<br><br><br>
		
							</div>	
						</div>
          </div>
          <div v-if="activeStep === 1" class="forget-step-two">
          <div  style="padding-top:5px; padding-left:0;">
							<br>
							<div style='text-align: center;margin-top:20px'>
	            	<img src="../assets/tankuang_pic_chenggong.png">
	            </div>
	            <div style='text-align: center;'>
	            	<h3 style="color: #57CF8D; font-size: 16px;">邮件发送成功！请查收您的邮件！</h3>
	            	<h4 style="color: #57CF8D; font-size: 16px;">邮件可能会被屏蔽，如未收到邮件，请在垃圾邮箱中查询下</h4>
	            </div>
					</div>
          </div>
          <div v-if="activeStep === 2" class="forget-step-three">
            <div style='text-align: center;margin-top:20px'>
            	<img src="../assets/tankuang_pic_chenggong.png">
            </div>
            <div style='text-align: center;'>
            	<h3>密码重置成功！<a @click="goToIndexPage" style='cursor:pointer;color: #57CF8D ;'>点这里</a>去首页登录吧！</h3>
            </div>
            
          </div>
          <div class="forget-button">
						  <mu-raised-button  class="forget-forward-button"  v-if ="activeStep === 0" label="下一步"  @click="handleNext" style='width:247px;margin-left: 100%;color:#FFFFFF;background:#57CF8D;
						       height:40px;margin-left:0;margin-top: 20px;background-color: rgb(87,207,141);'/>
          </div>
        </template>
      </div>
    </div>
   </div>
</template>

<script>
import commonApi from '../api/commonApi'
import userApi from '../api/userApi'
import _ from 'lodash'
import TodayMovies from '../components/common/CaptchaImg'
import $ from 'jquery'
export default {
  name: 'forget-view',
  components: { TodayMovies },
  beforeCreate () {
  	// 使用验证码组件前，需要先清空组件的状态
    this.$store.dispatch('setCaptcha', '')
    this.$store.dispatch('setCaptchaError', '')
		this.$store.dispatch('doLogin')
		$('.inner').css('margin','0px')
  },
  created(){
  	$(document).ready(function(){
			var browserWidth = document.body.clientHeight - 180
			var minHeight = browserWidth + "px"
    	if(document.body.clientHeight>640){
	 			$(".forget-view").css("height", minHeight)
	    }else{
	 			$(".forget-view").css("height", "460px")
	    }
	    var browserWidth = document.body.clientWidth
			var headerWidth = browserWidth + "px"
		 	$("#header").css("width", headerWidth)
    })
  },
  data () {
    return {
      activeStep: 0,
      username: '',
      email: '',
      password: '',
      passwordAgain: '',
      verification: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      passwordAgainError: '',
      verificationError: '',
      newPassword: '',
      confirmedPassword: '',
      passwordError: '',
      passwordConfirmError: '',
      isEmailError:false,
      isNewPassword:false,
      isConfirmedPassword:false,
      isError:false,
      fullscreenLoading: false,
      loadingText:''
      
      
    }
  },
 computed: {
    login () {
      return this.$store.state.user.login
      window.console.log(this.$store.state.user.login)
    }
  },
  methods: {
  	
    goToIndexPage () {
      this.$router.push('/')
    },
    countDown () {
      var _this = this
      this.sentEmailTimeout--
      this.sendEmailStatus = '剩余' + this.sentEmailTimeout + '秒'
      if (this.sentEmailTimeout > 0) {
        setTimeout(_this.countDown, 1000)
      } else {
        this.sendEmailStatus = '点击重发'
      }
    },
   sendEmail () {
      if (this.email === '') {
      	this.isEmailError = true
        this.emailError = '请输入邮箱'
      }
			if (this.$store.state.captcha.captcha.length == 0) {
			        this.$store.dispatch('setCaptchaError', '请输入验证码')
			      }
      if (this.emailError === '' &&
            this.$store.state.captcha.captchaError === '') {
        var data = {
          'email': this.email,
          'verCode': this.$store.state.captcha.captcha
        }
        this.fullscreenLoading = true
        var _this = this
        _this.loadingText = '邮件发送中，请稍后...'
        userApi.forgotPWD(data)
        .then(function (res) {
          if (res.data['msgCode'] !== '00000') {
          	 _this.fullscreenLoading = false
             _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定',
            	type:'error'
            })
             
            // 刷新验证码
            //_this.$store.dispatch('changeCaptcha')
            // 清空验证码
            //_this.$store.dispatch('setCaptcha', '')
          }else {
          	  // _this.$alert(res.data['message'], '', {
            //	confirmButtonText: '确定'
            //})
            _this.fullscreenLoading = false
            window.console.log('邮件发送成功！'+_this.activeStep)
          	_this.activeStep++
          }
          window.console.log(res.data)
        }).catch(function (res) {
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
    handleNext () {
		      if (this.activeStep === 0) {
			      if (this.email === '') {
			      	this.isEmailError = true
			        this.emailError = '请输入邮箱'
			      }
					if (this.$store.state.captcha.captcha.length == 0) {
					        this.$store.dispatch('setCaptchaError', '请输入验证码')
					      }
	        if (this.emailError === '' &&
	            this.$store.state.captcha.captchaError === '') {
	          //发送邮件
	          this.sendEmail()
	          //this.activeStep++
	          
	        }
      } else if (this.activeStep === 1) {
        
	      if (this.newPassword === '') {
	      	this.isNewPassword = true
	        this.passwordError = '请输入新密码'
	      }
	      if (this.confirmedPassword === '') {
	      	this.isConfirmedPassword = true
	        this.passwordConfirmError = '请输入确认密码'
	      }

        if (this.passwordError === '' &&
            this.passwordConfirmError === '' ) {

          // 重置密码
          this.submit()
          //this.activeStep++
        }
      } else {
        this.activeStep++
      }
    },
    reset () {
      this.activeStep = 0
      this.username = ''
      this.email = ''
      this.password = ''
      this.passwordAgain = ''
      this.verification = ''
      this.emailError = ''
      this.usernameError = ''
      this.passwordError = ''
      this.passwordAgainError = ''
      this.verificationError = ''
    },
    checkEmail: _.debounce(
      function () {
        window.console.log(this.email)
        var _this = this
        // 首先验证邮箱的格式
        /* eslint no-useless-escape: "off" */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(this.email)) {
          this.emailError = '邮箱格式不正确'
          this.isEmailError = true
          return
        }
      },
      // 等待时间
      0
    ),
    submit () {
      var _this = this
      var newPassword = MD5(this.newPassword).toString()
      var paramName = 'idOperator';
      var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)")
      var r = window.location.search.substr(1).match(reg)
      if(r!=null){
      	 var id = unescape(r[2])
      }
	  window.console.log(id)
	  var data = {
	  	'idOperator' : id,
	  	'logPWD' : newPassword
	  }
      userApi.resetPassword(data)
      .then(function (res) {
        if (res.data['msgCode'] !== '00000') {
            _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定',
            	type:'error'
            })
        } else {
          // 更新成功
           _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定',
            	type:'success'
            })
            this.activeStep++
          
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
    },
    checkPassword: _.debounce(
      function () {
      	var re = /\s+/g
      	if(re.test(this.newPassword)){
          this.isNewPassword = true
          this.passwordError = '密码不能包含空格'
      	}
        if (this.newPassword.length < 30) {
        	this.isNewPassword = true
          this.passwordError = '密码不超过30个字符!'
        }
      },
      0
    ),
    checkConfirmedPassword: _.debounce(
      function () {
        this.passwordConfirmError = ''
        var re = /\s+/g
      	if(re.test(this.confirmedPassword)){
          this.isConfirmedPassword = true
          this.passwordConfirmError = '密码不能包含空格'
      	}
        if (this.newPassword !== this.confirmedPassword) {
        	this.isConfirmedPassword = true
          this.passwordConfirmError = '两次输入的密码不一致'
        }
      },
      0
    )
  },
  watch: {
    email () {
      this.emailError = ''
      this.isEmailError = false
      this.checkEmail()
    },
    newPassword () {
      this.passwordError = ''
      this.isNewPassword = false
      this.checkPassword()
      //this.checkConfirmedPassword()
    },
    confirmedPassword () {
      this.passwordConfirmError = ''
      this.isConfirmedPassword = false
      this.checkConfirmedPassword()
    }
  }
}
</script>
<style lang="stylus" scoped>
.forget-view
  margin 97px 100px
  padding 0
  padding-bottom 100px
  background-color #fff
  box-shadow 0 2px 4px 0 rgba(0,0,0,0.08)
  .forget-step
    margin 0 20%
    /*background-color rgb(51, 31, 149)*/

    .forget-step-content
      width auto
      margin 0 auto
      /*background-color rgb(137, 25, 176)*/
      .forget-step-one

      .forget-step-two
		    #form
				  
				  background-color #fff
				  .errorStyle
				    color #ff5957
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
				  input:focus
				    border-color #57CF8D 
				    box-shadow 0 0 3px #57CF8D 
				  -webkit-input:focus
				    border-color #57CF8D
				    box-shadow 0 0 3px #57CF8D
				  .changePassword&:disabled
				    color #aaa
				    border 1px solid #e9e9e9
				  .pre-text
				    /*letter-spacing 5px*/
				    padding-right 15px
				    color #8B9AAB
        .password-score
          height 10px
          width 245px
          border 1px solid #ccc
          margin-left 55px
          .password-weak
            height 8px
            width 82px
            background-color #ff5957
          .password-medium
            height 8px
            width 165px
            background-color orange
          .password-strong
            height 8px
            background-color green
        .verification-area
          .verification-input
            float left
            width 200px
          .verification-button-div
            float left
            width 100px
            height 80px
            display table
            .verification-button
              float left
              margin-top 25%
              display table-cell
              vertical-align middle
      .forget-step-three

        .forget-back-button
          margin-left 0
        .forget-forward-button
          margin-left 100px
.el-button--primary 
    color #fff
    background-color #57cf8d
    border-color #57cf8d

</style>
<style>
.mu-step-label.active .mu-step-label-circle, .mu-step-label.completed .mu-step-label-circle {
    background-color: #57CF8D !important;
}
.mu-step-label.active .mu-step-label-icon, .mu-step-label.completed .mu-step-label-icon {
    color: #57CF8D !important;
}
.today-movies .errorStyle{
	position: relative;
	top: 40px;
	right: 420px;
	padding-left: 38px;
}
.pre-text3{
			padding-right: 15px;
			color: #8b9aab;
			font-size: 15px;
	} 
@media (min-width:1440px){
	.pre-text3{
			position: relative;
			top: 20px;
	}
	.today-movies .errorStyle{
		top: 50px !important;
	}
}

.error  {
	border-color:#ff5957 !important;
	box-shadow: 0 0 3px #ff5957 !important
}
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
    background-image: url('../assets/tankuang_pic_chenggong.png') !important;
}
.el-message-box__status.el-icon-circle-cross{
	color: transparent !important; 
    top: 20px !important;
    margin-left: 10px !important;
    background-size: 36px 36px !important;
    background-image: url('../assets/tankuang_pic_shibai.png') !important;
}
.el-message-box__status.el-icon-information{
		color: transparent !important; 
    top: 20px !important;
    margin-left: 10px !important;
    background-size: 36px 36px !important;
    background-image: url('../assets/tankuang_pic_tishi.png') !important;
}
.el-message-box__message{
	  margin-left: 50px !important;
	  margin-top: 20px !important;
}
.forget-button{
    width:20%;
    margin-left:37%;
    margin-top:30px;
    padding:10px;
}
/*.forget-forward-button {
		box-shadow: 0px 6px 9px rgba(87,207,141,.4) !important;
		}*/
.mu-raised-button{
		box-shadow: 0px 6px 9px rgba(87,207,141,.4) !important;
}
</style>
