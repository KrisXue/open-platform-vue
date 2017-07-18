<template>
  <div id="app">
    <notification
    :options.sync="options"
    :show.sync="show">
    </notification>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import Notification from './components/common/Notification'
import Store from './utils/store.js'
import $ from 'jquery'

export default {
  components: {
    Notification
  },
  created () {
    this.user = JSON.parse(JSON.stringify(this.$store.state.user.user))
    this.checkBrowser()
  },
  beforeCreate () {
    let user = Store.fetch('user')
    if (user['expireTime'] > new Date().getTime()) {
      this.$store.dispatch('doLogin', user['user'])
    }
   
  },
  data () {
    return {
      defaultAvatar,
      stompClient: null,
      open: false,
      docked: true
    }
  },
  computed: {
    show () {
      return this.$store.state.notification.show
    },
    options () {
      return this.$store.state.notification.options
    },
    login () {
      return this.$store.state.user.login
    }
  },
  methods: {
  	checkBrowser(){
			if(document.all){ 
			    this.$alert('请将浏览器升级到IE9以上', '', {
		            	confirmButtonText: '确定',
		            	type:'info'
		            })
			}

	},
    goTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('doLogout')
      this.$router.push('/')
    },
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    send () {
      window.location.href = "www.baidu.com"
    }
  }
}
</script>

<style lang="stylus">
body
  font-family "Microsoft Yahei",Arial,"Lantinghei SC","Hiragino Sans GB","Helvetica Neue",Helvetica,Arial,sans-serif
  background-color #ECF3F7 !important
  margin 0
  
a
  color #34495e
  text-decoration none
  
.mu-appbar 
    background-color #03a9f4

.header
  z-index 999
  max-width 100%
  height 55px
  top 0
  left 0
  right 0
  position fixed
  .inner
    padding-left 0px
    padding-bottom 10px
    font-size 16px
    font-family "Microsoft YaHei"
    a
      color rgba(255, 255, 255, .8)
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #fff
      &.router-link-active
        color #fff
        font-weight 400
  .icon-contaner
    cursor pointer
  .avatar
    margin-left 35px
    margin-right 15px
    img
      width 135%

.logo
  width 100%
  margin-right 10px
  display inline-block
  vertical-align middle

.view
  padding 0 100px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  body
    font-size 14px
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none

/* 个人中心统一样式 */
.personal-center
  width 100%
  margin-top 50px
  margin-left auto
  margin-right auto
  padding 0
/*  padding-bottom 60px*/
  .menu
    border 1px solid #d8d8d8
    border-radius 3px
    h2
      margin-top 0
      margin-bottom 0
      padding 8px 10px 8px 20px
      border-bottom 1px solid #eee
      border-top-radius 2px
      background-color #f7f7f7
    .menu-item
      display block
      padding 8px 10px 8px 8px
      /*border-bottom 1px solid #eee*/
      cursor pointer
    a
      color #111
  .input-button
    border-radius 3px
    width 102px
    height 32px
    background-color #eee
    border 1px solid #e9e9e9
    font-size 14px
    box-shadow 0px 1px 1px rgba(0, 0, 0, 0.3)
    cursor pointer
    &:hover
      border 1px solid #d1d1d1
  
</style>
<style>
	html{
		height:100%;
	}
	body{
		height: 100%;
		font-family: "Microsoft Yahei",Arial,"Lantinghei SC","Hiragino Sans GB","Helvetica Neue",Helvetica,Arial,sans-serif !important; 
		-webkit-font-family: "Microsoft Yahei",Arial,"Lantinghei SC","Hiragino Sans GB","Helvetica Neue",Helvetica,Arial,sans-serif !important;
		-ms-font-family: "Microsoft Yahei",Arial,"Lantinghei SC","Hiragino Sans GB","Helvetica Neue",Helvetica,Arial,sans-serif !important; 
		-o-font-family: "Microsoft Yahei",Arial,"Lantinghei SC","Hiragino Sans GB","Helvetica Neue",Helvetica,Arial,sans-serif !important; 
	}
	
@media screen and (min-width: 1441px) { 
  .slider {height: auto !important}
	  /*向上三角形*/
	.triangle_border_up{
	    width:0;
	    height:0;
	    border-width:0 30px 30px;
	    border-style:solid;
	    border-color:transparent transparent #fff;/*透明 透明  灰*/
	    margin:40px auto;
	    margin-top:-30px;
	    position:relative;
	}
  .logoImg{
  	margin:20px 0 40px 30px;
  	padding-bottom: 20px;
  }
  .imgDiv{
  	float:left;
  	text-align: center;
  	margin-right: 20px;
  }
  .imgDiv img{
  	width:100%;
  	height:100%;
  }
  .sep{
  	width: 1px;
  	font-size: 1.5em;
  	color:rgba(119,131,152,.6);
  	float:left;
  	margin-left: 20px;
  	margin-top:5px;
  	text-align: center;
  }
  .wenzi{
  	font-size: 2em;
  	color: #778398;
  	float:left;
  	margin-left: 32px
  }
  .pwdText{
  	float: left;
  	margin-top:20px
  }
  .pwdTextError{
  	float: left;
  	margin-top:26px
  }	
  .captcha-input{
		padding-top: 20px;
	}
	.captcha-img{
		padding-top: 15px;
		float: left;
	}
	.captchaError{
		float: left;
		margin-top:26px;
		padding-left: 5px;
	}
	.forgetText{
		margin-top:0px
	}
	.wendang{
		float:left;
		margin-top: 15px;
		margin-left: 20px;
	}
	.login-button{
		login-button:10px
	}
	.login-button{
		margin-top:10px !important;
		width:146px !important;
		margin-left: 78px !important;
		color:#FFFFFF !important;
		background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%) !important;
	}
	.captchaText{
		float: left;
		color: #999;
		margin-top:3%;
		color:#8998AA
	}
} 
@media screen and (max-width: 1440px) { 
  .slider {height: auto !important}
  /*向上三角形*/
	.triangle_border_up{
	    width:0;
	    height:0;
	    border-width:0 20px 20px;
	    border-style:solid;
	    border-color:transparent transparent #fff;/*透明 透明  灰*/
	    margin:40px auto;
	    margin-top:-20px;
	    position:relative;
	}
  .logoImg{
  	margin:30px 0 20px 20px;
  	padding-bottom: 20px;
  }
  .imgDiv{
  	float:left;
  	text-align: center;
  	/*margin-right: 20px;*/
  }
  .imgDiv img{
  	width:80%;
  	height:80%
  }
  .sep{
  	width: 1px;
  	font-size: 1.3em;
  	color:rgba(119,131,152,.6);
  	float:left;
  	margin-top:6px;
  	margin-left: 30px;
  	text-align: center;
  }
  .wenzi{
  	font-size: 1.8em;
  	color: #778398;
  	float:left;
  	margin-left: 40px
  }
  .pwdText{
  	float: left;
  	margin-top:10px
  }
  .pwdTextError{
  	float: left;
  	margin-top:16px
  }		
	.captcha-input{
		padding-top: 10px;
	}
  .button{
  	margin-top: -10px
  }
  .login-button{
  	margin-top: -10px
  }
  .captcha-img{
		padding-top: 5px;
		float: left;
	}
	.captchaError{
		float: left;
		margin-top:16px;
		padding-left: 5px;
	}
	.forgetText{
		margin-top:-10px
	}
	.wendang{
		float:left;
		margin-left: 20px;
		margin-top:-15px;
	}
	.login-button{
		top:-20px !important;
		width:146px !important;
		margin-left: 80px !important;
		color:#FFFFFF !important;
		background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%) !important;
	}
	.captchaText{
		float: left;
		color: #999;
		margin-top:4%;
		color:#8998AA
	}
} 
@media screen and (max-width: 1200px) { 
  .slider {height: 300px !important}
} 
@media screen and (max-width: 900px) { 
  .slider {height: 300 !important}
} 
@media screen and (max-width: 500px) { 
  .slider {height: 300px !important} 
} 

.el-loading-mask {
    background-color: #000 !important;
		height: 100%;
    left: 0;
    opacity: 0.5;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000 !important;
}
.el-loading-spinner .path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #57cf8d !important;
    stroke-linecap: round;
}
.el-input__inner{
	border: 1px solid #bfcbd9 !important;
}
.el-message-box__headerbtn .el-message-box__close {
    color: transparent !important; 
    background-image: url('assets/tankuang_icon_close.png') !important;
    margin-left: 0px !important;
    background-size: 16px 16px !important;
}
.el-message-box__title{
	display: none !important;
}
.el-message-box {
    backface-visibility: hidden;
    background-color: #fff;
    border-radius: 3px;
    display: inline-block;
    font-size: 16px;
    height: 228px;
    overflow: hidden;
    text-align: left;
    vertical-align: middle;
    width: 418px;
}
.el-message-box__content{
	padding-top:35px !important;
	padding: 35px 20px 20px 20px !important;
}
.el-message-box__headerbtn{
	top:5px !important;
	right: 5px !important;
}
.el-message-box__header{
	padding: 25px !important;
}
.el-button--default{
	box-shadow: 0px 6px 9px rgba(87,207,141,.4);
}
.el-message-box__message p{
	font-size: 16px;
	color: #585858;
}
</style>