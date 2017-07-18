<template>
<div class="login-view">
  <div class="login-panel">
    <mu-text-field v-model="username" label="用户名" hintText="请输入用户名" :errorText="usernameError" type="text" fullWidth icon="person" labelFloat/><br/>
    <mu-text-field v-model="password" label="密码" hintText="请输入密码" :errorText="passwordError" type="password" fullWidth icon="lock" labelFloat/><br/>
    <captcha></captcha>
    <div class="button">     
      <mu-raised-button @click="doLogin" label="登录" class="login-button" primary/>
      <mu-raised-button @click="forgot" label="忘记密码" class="forgot-button"/>
    </div>
  </div>
</div>
</template>

<script>
import userApi from '../api/userApi'
import MD5 from 'MD5';
import Captcha from '../components/common/Captcha'
import axios from 'axios'

export default {
  name: 'login-view',
  components: { Captcha },
  beforeCreate () {
    // 使用验证码组件前，需要先清空组件的状态
    this.$store.dispatch('setCaptcha', '')
    this.$store.dispatch('setCaptchaError', '')
    // 如果已经登录，则调转到首页
    if (this.$store.state.user.login) {
      // 使用replace，不向浏览器的历史添加记录
      this.$router.replace('/')
    }
//  document.getElementsByClassName('header').CSS('visibility','none')
  },
  data () {
    return {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      failCount:''
    }
  },
  methods: {
    forgot () {
//  	if (this.username === '') {
//      this.usernameError = '请输入用户名'
//    }
//  	if(this.usernameError === ''){
//  		var user = {
//          		'logName' : this.username
//          	}
//       window.console.log(user)
//       this.$store.dispatch('forgot', user)
//  		 this.$router.push('/forgot')
//  	}
 			this.$store.dispatch('doLogin')
     	this.$router.push('/register')
    },
    doLogin () {
      if (this.username === '') {
        this.usernameError = '请输入用户名'
      }
      if (this.password === '') {
        this.passwordError = '请输入密码'
      }
      if (this.$store.state.captcha.captcha.length !== 4) {
        this.$store.dispatch('setCaptchaError', '请输入4位验证码')
      }
      if (this.usernameError === '' &&
          this.passwordError === '' &&
          this.$store.state.captcha.captchaError === '') {
        var data = {
          'logName': this.username,
					'logPWD': MD5(this.password).toString(),
          'verCode': this.$store.state.captcha.captcha
        }

        var _this = this
        userApi.login(data)
		.then(function (res) {
					//验证码错误
          if (res.data['msgCode'] == '00001') {
            _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定'
            })
            //提示验证码错误
            //this.$store.state.captcha.captchaError = res.data['message']
            // 清空验证码
            //_this.$store.dispatch('setCaptcha', '')
            //_this.$store.dispatch('setCaptchaError', '')
            // 刷新验证码
            //_this.$store.dispatch('changeCaptcha')
            
          } 
          //用户名密码错误
         if(res.data['msgCode'] === '00002'){
          	_this.$alert(res.data['message']+'！ 您本日已输入错误次数：'+res.data['failCount']+'次，您本日还可以输'+(5-res.data['failCount'])+'次!', '', {
            	confirmButtonText: '确定'
            })
          	 // 清空用户名
            //_this.username = ''
             // 清空密码
            //_this.password = ''
             //错误次数
           // _this.failCount =+ 1
            // 清空验证码
            //_this.$store.dispatch('setCaptcha', '')
            //_this.$store.dispatch('setCaptchaError', '')
            // 刷新验证码
            //_this.$store.dispatch('changeCaptcha')
          }
         //密码输入次数超过5次 账号锁定
         if (res.data['msgCode'] == '00017') {
            _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定'
            })
            //提示验证码错误
            //this.$store.state.captcha.captchaError = res.data['message']
            // 清空验证码
           // _this.$store.dispatch('setCaptcha', '')
            // 刷新验证码
            //_this.$store.dispatch('changeCaptcha')
            
          } 
          //登录成功
          if(res.data['msgCode'] === '00000')  {
            //判断是否更改过密码
            if(res.data['firstLogin']==0){
            	 _this.$router.push('/accounts/user-reset-password')
            	 var user = {
            		'logName' : res.data['logName']
            	}
			         _this.$store.dispatch('store', user)   
			         window.console.log(_this.$store.state.user.storeUser.logName)
            }else{
            //已修改过密码
            var data = {
            	'logName' : res.data['logName']
            }
              userApi.queryAccount(data)
					      .then(function (res) {
					      	if(res.data['msgCode'] === '00000'){
					      		var  account = {
					      			'id':res.data['id'],
					      			'companyName':res.data['componyName'],
					      			'componyShort':res.data['componyShort'],
					      			'address':res.data['address'],
					      			'connUser':res.data['connUser'],
					      			'telephone':res.data['telephone'],
					      			'email':res.data['email']
					      		} 
					      		_this.$store.dispatch('account', account)
					      		 window.console.log("account======="+_this.$store.state.user.account.connUser)
					      	}
					        
					      })
            var user = {
            		'logName' : res.data['logName'],
            		'userName':res.data['userName'],
            		'orgName':res.data['orgName'],
            		'mobile':res.data['mobile'],
            		'failCount':res.data['failCount'],
            	}
             _this.$store.dispatch('doLogin', user)
             _this.$router.push('/')
              }
          }
          

          
        })
        .catch(function (res) {
          if (res instanceof Error) {
            _this.loading = false
      		  _this.$alert('服务器开小差了，请稍后再试...', '', {
		          confirmButtonText: '确定',
		          type:'error'
            })
          } else {
            _this.loading = false
      		  _this.$alert('服务器开小差了，请稍后再试...', '', {
		          confirmButtonText: '确定',
		          type:'error'
            })
          }
        })
      }
    }
  },
  watch: {
    username () {
      this.usernameError = ''
    },
    password () {
      this.passwordError = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
/*.mu-raised-button-primary
  background-color #555*/
.login-view
  margin-top 50px
  h1
    background #864
  .login-panel
    width 300px
    height 300px
    margin 0 auto
    .button
      width 300px
      margin 0 auto
      .forgot-button
        margin-left 24px
      .login-button
        margin-left 76px



</style>
