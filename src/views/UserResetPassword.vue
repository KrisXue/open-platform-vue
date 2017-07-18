<template>
	<div class="accounts-view personal-center" style="position: relative;margin: 97px 100px; width: auto;" v-loading.fullscreen="fullscreenLoading">
		<!--<el-row :gutter="20">
			<el-col :span="18">-->
				<div class="header" id='header'>
			      <mu-appbar style='background-color: #030329'>
			        <div class="inner" style="margin-left: 90px !important;">
			          <router-link to="/" exact>
			            <img class="logo" src="../assets/topbar_pic_logo.png" alt="logo">
			          </router-link>
			          <router-link to="/" style="">开发者</router-link>      
			          <router-link to="/doc" target='_blank'>|<span style='color:#57CF8D;margin-left: 30px;'>开发者文档</span></router-link> 
			        </div>
			      </mu-appbar>
			    </div>
				<div id="form" style="padding-top:5px; padding-left:0;">
					<p style="padding-left:40px; font-size:18px;">重设密码</p>
					<p style="text-align: center; color: #979797;margin-right: 28px;">本次登录为您的<span style="color:#57CF8D">初次登录</span>，为保证账号的安全性，需要您修改密码！</p>
					<br><br>
					<div style="width:70%; margin:0 7% 0 23%;">
						<span class="pre-text2">&nbsp;新&nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码</span>
						<input type="password" maxlength='30' class="input-line" v-model="newPassword"  @focus="handleFocus"  @blur="handleBlur" placeholder="请输入新密码" v-bind:class="{ error: isNewPasswordError }"
							style=" color: #999; height: 45px; width:51%; box-shadow: inset 0 1px 2px rgba(0,0,0,0.075); "
							>
						<span class="errorStyle" style="font-size: .9em;">{{passwordError}}</span>
						<span class="passwordTip" style="font-size: .9em;color:#57CF8D">{{passwordTip}}</span>
						<br><br>
						<span class="pre-text">确&nbsp;认&nbsp;密&nbsp;码</span>
						<input type="password" maxlength='30' class="input-line" v-model="confirmedPassword" @focus="handleConfirmFocus"  @blur="handleConfirmBlur" @keyup.enter="submit" placeholder="请确认新密码" v-bind:class="{ error: isConfirmedPasswordError }"
							style=" color: #999; height:45px; width:51%; box-shadow: inset 0 1px 2px rgba(0,0,0,0.075); margin-bottom: 13px;"
							>
						<span class="errorStyle" style="font-size: .9em;">{{passwordConfirmError}}</span>
						<span class="passwordConfirmTip" style="font-size: .9em;color:#57CF8D">{{passwordConfirmTip}}</span>
					
					<br><br><br>
					<mu-raised-button class="input-button" @click="submit()" label="重 设 密 码" :disabled="passwordError !== '' || passwordConfirmError !== '' || newPassword === '' || confirmedPassword === ''"
						style='width:247px;margin-left: 23%;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);
						       height:40px; box-shadow: 0px 6px 9px rgba(87,207,141,.4);'
						/>
					</div>
					<!--<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
					
				</div>
			<!--</el-col>
		</el-row>-->
	</div>
  
</template>

<script>
import userApi from 'src/api/userApi'
import MD5 from 'MD5';
import _ from 'lodash'
import $ from 'jquery'

export default {
  name: 'user-reset-password',
  beforeCreate () {
		this.$store.dispatch('doLogin')
  },
  created(){
  	$(document).ready(function(){
			var browserWidth = document.body.clientHeight - 180
			var minHeight = browserWidth + "px"
    	if(document.body.clientHeight>630){
	 			$("#form").css("height", minHeight)
	    }else{
	 			$("#form").css("height", "450px")
	    }
	    var browserWidth = document.body.clientWidth
		var headerWidth = browserWidth + "px"
		$("#header").css("width", headerWidth)
    })
  },
  data () {
    return {
      newPassword: '',
      confirmedPassword: '',
      passwordError: '',
      passwordConfirmError: '',
      isNewPasswordError:false,
      isConfirmedPasswordError:false,
      fullscreenLoading: false,
      passwordTip:'',
      passwordConfirmTip:''
    }
  },
 computed: {
    login () {
      return true
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
	if (this.newPassword === '') {
	    	this.isNewPasswordError = true
	        this.passwordError = '请输入新密码'
	        this.passwordTip = ''
      }
     if (this.confirmedPassword === '') {
    		this.isConfirmedPasswordError = true
        	this.passwordConfirmError = '请输入确认密码'
      }
     if(this.passwordError === '' && this.passwordConfirmError === ''){
	      var _this = this
	      var newPassword = MD5(this.newPassword).toString()
	      var confirmedPWD = MD5(this.confirmedPassword).toString()
	      var paramName = 'idOperator';
	      var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)")
	      var r = window.location.search.substr(1).match(reg)
	      if(r!=null){
	      	 var id = unescape(r[2])
	      }else{
	      	 var id = _this.$store.state.user.storeUser.id
	      }
		  window.console.log(id)
		  var data = {
		  	'idOperator' : id,
		  	'logPWD' : newPassword,
		  	'confirmedPWD' : confirmedPWD
		  }
		   _this.fullscreenLoading = true
	      userApi.resetPassword(data)
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
    checkPassword: _.debounce(
      function () {
      	var re = /\s+/g
      	if(re.test(this.newPassword)){
          this.isNewPasswordError = true
          this.passwordError = '密码不能包含空格'
          this.passwordTip =''
      	}
        if (this.newPassword.length > 30) {
          this.isNewPasswordError = true
          this.passwordError = '密码不超过30个字符'
          this.passwordTip =''
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
          this.passwordConfirmTip =''
      	}
        if(this.newPassword !== '' && this.confirmedPassword !== ''){
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
    newPassword () {
      this.passwordError = ''
      this.isNewPasswordError = false
      this.checkPassword()
      this.checkConfirmedPassword()
    },
    confirmedPassword () {
      this.passwordAgainError = ''
      this.isConfirmedPasswordError = false
      this.checkPassword()
      this.checkConfirmedPassword()
    }
  }
}
</script>
<style>
#form{
    background-color:#fff;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.08);
    padding-left:20px
}
.pre-text{
    padding-right: 15px;
    color:#8B9AAB	
}
.pre-text2{
    padding-right: 13px;
    color:#8B9AAB	
}
.input-line, .input-text{
	width:600px;
    margin-top: 6px;
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow inset: 0 1px 2px rgba(0, 0, 0, 0.075);
    outline: none 
}
input:focus{
    box-shadow: 0 0 3px #57CF8D;
    -webkit-input:focus;
    border-color: #57CF8D;
    box-shadow: 0 0 3px #57CF8D  ;
}
.errorStyle{
	color: #ff5957;
    font-size: 0.9em;
    padding-left: 5px;
    letter-spacing: 1px; 
}
.passwordTip{
	color: #ff5957;
    font-size: 0.9em;
    padding-left: 5px;
    letter-spacing: 1px; 
}
.error{
	border-color:#ff5957 !important;
	box-shadow: 0 0 3px #ff5957 !important;
	border: 1px solid #ff5957 !important;
}
.mu-raised-button.disabled {
    background-image: linear-gradient(44deg, #e6e6e6 0%, #e6e6e6 100%) !important;
    box-shadow: none;
    cursor: not-allowed;
}
</style>