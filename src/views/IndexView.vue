<template>
  <div class="index-view" v-loading.fullscreen="fullscreenLoading">
    <!-- <h1 @click='notice()'>{{msg}}</h1> -->
    <!--<div class="wrapper" v-if="!login">-->
    <div class="wrapper">
      <hot-movies></hot-movies>
    </div>
    <!--<div class="wrapper" v-if="login">
      <user-reset-password></user-reset-password>
    </div>-->
    <div class="loginWrapper" style='margin-left: 38%;' >
    	<div class='logoImg'>
    	  <div class='imgDiv'>
    	  	<img src="../assets/dengluye_pic_logo.png">
    	  </div>
    	  <div class='sep'>|</div>
    	  <div class='wenzi'>
    	  		开发者
    	  </div>
    	  	<!--</span>-->
    	</div>

      <div class="login-panel" style='text-align: center;width: 520px;'>
				    <!--<mu-text-field v-model="username" label="用户名" hintText="请输入用户名" :errorText="usernameError" type="text" fullWidth icon="person" labelFloat/><br/>
				    <mu-text-field v-model="password" label="密码" hintText="请输入密码" :errorText="passwordError" type="password" fullWidth icon="lock" labelFloat/><br/>-->
				<div id="Loginform" style="padding-top:5px; padding-left:0;">
					<div style="width:100%;">
						<div style='float: left;'>
							<el-input type="text"  v-model="username" placeholder="请输入用户名"
										style="margin-left:19px;"  size="large" v-bind:class="{ loginError: isNameError }" @keyup.enter.native="doLogin">
								<template slot="prepend"><img src='../assets/dengluye_icon_yonghuming.png' style="margin-top: 3px;"></img></template>
							</el-input>
					  </div>
						<div style='float: left;margin-top:8px'>
							<span class="errorStyle" style="font-size: .9em;color:#fff;">{{usernameError}}</span>
						</div>
							<div class='pwdText'>
								<el-input type="password"  maxlength='30' v-model="password" placeholder="请输入密码"
									style="margin-left:19px" size="large" v-bind:class="{ loginError: isPwdError }" @keyup.enter.native="doLogin">
									<template slot="prepend"><img src='../assets/dengluye_icon_mima.png' style="margin-top: 3px;"></img></template>
								</el-input>
							</div>
							<div class='pwdTextError'>
								<span class="errorStyle" style="font-size: .9em;color:#fff" >{{passwordError}}</span>
							</div>	
							<div>			
								<div style='float: left;' ><captcha @keyup.enter.native="doLogin"></captcha></div>
							</div>
							<div class="button" style='float: left;width:349px'>
				    		<div >
									<a @click="forgot" style='float: right;font-size: 14px;color: #57CF8D ;cursor:pointer' class='forgetText'> 忘记密码?</a><br><br>
								</div>
								<div class='wendang' >
						   		<div style='float:left;margin-right:10px;'>
						   			<img width="23px" height="23px" src="../assets/dengliuye_icon_kaifazhewendang.png">
						   		</div>
						   		<div style='float:left'>
					    			<router-link style='color: #57CF8D;cursor:pointer;' class='index-doc' to="/doc" target='_blank'>开发者文档</router-link>
					    		</div>
					    	</div>	    	
				      	<mu-raised-button @click="doLogin" label="马上登录" class="login-button" @keyup.enter.native="doLogin"/>
				    	</div>
						</div>							
					</div>
  			</div>
    	</div>
  	
	  	<footer style="background-color:#fff; color:#8998AA;font-size:14px;text-align: center;bottom:0; padding:40px 1px; float: left; width: 100%;"> 
	    	Copyright © 2017   www.open.starpos.com.cn   All Rights Reserved闽ICP备  B2-20050028-3号
	   </footer>
  	</div>
  </div>
</template>

<script>
import HotMovies from '../components/index/Slider.vue'
import Captcha from '../components/common/Captcha'
import MD5 from 'MD5'
import userApi from '../api/userApi'

export default {
  name: 'index-view',
  components: {
    HotMovies,
    Captcha,
    MD5,
    userApi
  },
   beforeCreate () {
    // 使用验证码组件前，需要先清空组件的状态
    this.$store.dispatch('setCaptcha', '')
    this.$store.dispatch('setCaptchaError', '')
    //清空所有缓存
    this.$store.dispatch('doLogout')
    // 如果已经登录，则调转到首页
    if (this.$store.state.user.login) {
      // 使用replace，不向浏览器的历史添加记录
      this.$router.replace('/')
    }
//  document.getElementById('header').style.display="none"
		this.index = true
  },
  data () {
    return {
      msg: 'Welcome to the index page!',
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
      failCount:'',
      isActive: true,
      isError:false,
      isNameError:false,
      isPwdError:false,
      fullscreenLoading: false
      
    }
  },
  computed: {
    login () {
      return this.$store.state.user.login
      window.console.log(this.$store.state.user.login)
    }
  },
  methods: {
  	goTo (route) {
      this.$router.push(route)
    },
    forgot () {
    	this.$router.push('/forgot')  		
    },
    doLogin () {
      if (this.username === '') {
        this.usernameError = '请输入用户名'
        this.isNameError = true
      }
      if (this.password === '') {
        this.passwordError = '请输入密码'
        this.isPwdError = true
      }
      if (this.$store.state.captcha.captcha.length == 0) {
        this.$store.dispatch('setCaptchaError', '请输入验证码')
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
        _this.fullscreenLoading = true
        userApi.login(data)
		.then(function (res) {
					//验证码错误
          if (res.data['msgCode'] == '00001') {
          	_this.fullscreenLoading = false
            _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定',
            	type:'error'
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
         		_this.fullscreenLoading = false
          	_this.$alert(res.data['message']+'！ 您本日已输入错误次数：'+res.data['failCount']+'次，您本日还可以输'+(5-res.data['failCount'])+'次!', '', {
            	confirmButtonText: '确定',
            	type:'info'
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
         		_this.fullscreenLoading = false
            _this.$alert(res.data['message'], '', {
            	confirmButtonText: '确定',
            	type:'error'
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
            	 _this.fullscreenLoading = false
            	 _this.$router.push('/user-reset-password')
            	 var user = {
            		'logName' : res.data['logName'],
            		'id' : res.data['idOperator']
            	}
			         _this.$store.dispatch('store', user)   
			         window.console.log(_this.$store.state.user.storeUser.logName)
            }else{
            //已修改过密码
            var user = {
            		'logName' : res.data['logName'],
            		'userName':res.data['userName'],
            		'orgName':res.data['orgName'],
            		'mobile':res.data['mobile'],
            		'failCount':res.data['failCount'],
            	}
             _this.$store.dispatch('doLogin', user)
             window.console.log("是否登录======="+_this.$store.state.user.login)
             _this.fullscreenLoading = false
             //_this.$router.push('/accounts/user-info')
             _this.$router.push('/application/upload-apps')
              }
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
h1
  background rgba(110, 86, 117, 0.22)
.index-view
  height auto
  overflow hidden
  padding 0
  background-color #fff !important
	#form
		.captcha-input
			.input-line
				font-size 0.9em
				color rgb(153, 153, 153)
				height 40px 
				width 65%
				margin-left -60px
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
		.changePassword&:disabled
			color #aaa
			border 1px solid #e9e9e9
		.pre-text
			/*letter-spacing 5px*/
			padding-right 15px
			color #8B9AAB
		input:focus
			border-color #57cf8d
			box-shadow 0 0 3px #57cf8d
			border 1px solid #57cf8d 
			outline none
		textarea:focus
			border-color #57cf8d
			box-shadow 0 0 3px #57cf8d
			outline none
.loginWrapper
  margin-top 20px auto
.el-button--primary 
	/*background-color #20a0ff 
	border-color #20a0ff */
	color #fff
.el-input__inner:focus
	border none 
	box-shadow none
	outline none
</style>
<style>
	/*.header{
		display: none;
	}*/
	@media (max-width:1200px) {
		footer{ margin-left: 6%; }
	}
	@media (min-width:1201px ) and (max-width:1400px) {
		footer{ margin-left:2%; }
	}
	@media (min-width:1401px ){
		footer{margin-left:0;}
	}
	@media screen and (min-width: 1600px){
		.loginWrapper{
			margin-left:40% !important;
		}
	}
	.slider-btn{
		display: none !important;
	}
	.slider-center{
		left:20% !important;
		bottom:3% !important
	}
	.slider-indicator-icon{
		margin: 0 .3rem !important;
		background-color: #FFFFFF !important;
		opacity: 0.5;
	}
	.slider-indicator-icon.slider-indicator-active{
    display: inline-block !important;
    width: 36px !important;
    height: 10px !important;
    margin: 0 .3rem !important;
    cursor: pointer !important;
    border-radius: 30px !important;
    background-color: #FFFFFF !important;
    opacity: 1;
	}
	.el-message-box__btns  {
		padding: 10px 35px 20px !important;
	}
	.el-button--primary {
		background-color: #57cf8d !important;
		border-color: #57cf8d !important;
		color: #fff !important;
		width:246px
	}
	.el-message-box__headerbtn .el-message-box__close :hover{
    color: #000;
}
  .captcha-input .input-line{
    color: #999;
    height: 40px;
    margin-left: -38px;
    width: 65%;
}
.el-input-group{
	width:330px !important
}
.el-input-group__append, .el-input-group__prepend{
	background-color: #fff !important;
}
.loginError .el-input__inner::-webkit-input-placeholder {
  color: #ff5957 !important;
}
.loginError .el-input__inner::-moz-placeholder {
  color: #ff5957 !important;
}
.loginError .el-input__inner:-ms-input-placeholder {
  color: #ff5957 !important;
}
.el-textarea__inner:focus{
		box-shadow: 0 0 3px #57cf8d !important;
		border-color: #57cf8d !important;
}
.el-select:focus{
		box-shadow: 0 0 3px #57cf8d ;
		border-color: #57cf8d ;
}
.el-input__inner:hover{
		box-shadow: 0 0 3px #57cf8d !important;
		border-color: #57cf8d !important;
}
.el-textarea__inner:hover{
		box-shadow: 0 0 3px #57cf8d ;
		border-color: #57cf8d !important;
}
input:focus{
			border-color:#57cf8d;
			box-shadow:0 0 3px #57cf8d;
			border:1px solid #57cf8d ;
			outline:none;
}
.el-input-group__append, .el-input-group__prepend{
	color: #8F99AA !important;
}
.el-input-group{
	border:1px solid #8f99aa;
	border-radius: 3px;
	height: 45px !important;
}
.el-input-group__append, .el-input-group__prepend {
    background-color: #fbfdff;
    color: #8F99AA;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: none !important; 
    border-radius: 4px;
    padding: 0 10px;
    width: 1px;
    white-space: nowrap;
}
#Loginform .el-input__inner {
    -moz-appearance: none;
    background-color: #fff;
    background-image: none;
  	border: none !important; 
    border-radius: 3px !important; 
    box-sizing: border-box;
    color: #8F99AA;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0 none;
    padding: 3px 10px 0px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0); 
}
#Loginform .el-input__inner:hover{
  border:none !important;
	box-shadow:none !important;
	outline:none
}
#Loginform .el-input__inner:focus{
  border:none !important;
	box-shadow:none !important;
	outline:none
}
.material-icons {
		padding-right: 10px;
		border-right: 1px solid #bfcbd9;
    font-family: 'Material Icons';
    font-weight: 400;
    font-style: normal;
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
}
.el-input-group__prepend img{
		border-right: 1px solid #8F99AA;
		padding-right: 10px;
}
.el-input__inner::placeholder{
	color:#8F99AA !important
}
.el-input__inner::-moz-placeholder{
	color:#8F99AA !important
}
.forgetText:hover,.index-doc:hover{
	color:#8F99AA !important
}
</style>
