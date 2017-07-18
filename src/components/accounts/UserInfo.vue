<template>
  <div id="form" v-loading.fullscreen="fullscreenLoading">
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
    <p style="padding-left:45px;padding-top:19px;font-size:18px;">账户信息</p>
    <el-form style='margin-left:25%; margin-top: 4%;'>  
		    <span class="pre-text">公&nbsp;司&nbsp;名&nbsp;称</span>
		    <input type="text" class="input-line" v-model="account.componyName" :disabled="disable"
		    	v-bind:class="{ error: isNameError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyNameError}}</span>
	    	<br><br>
	    	<span class="pre-text">公&nbsp;司&nbsp;简&nbsp;称</span>
		    <input type="text" class="input-line" v-model="account.componyShort" :disabled="disabled"
		    	v-bind:class="{ error: isShortError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyShortError}}</span>
	    	<br><br>
	    	<span class="pre-text">公&nbsp;司&nbsp;地&nbsp;址</span>
		    <input type="text" class="input-line" v-model="account.address" :disabled="disabled"
		    	v-bind:class="{ error: isAddressError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyAddressError}}</span>
	    	<br><br>
	    	<span class="pre-text2">&nbsp;联&nbsp;&nbsp;&nbsp;系&nbsp;&nbsp;&nbsp;人</span>
		    <input type="text" class="input-line" v-model="account.connUser" :disabled="disabled"
		    	v-bind:class="{ error: isPersonError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyPersonError}}</span>
	    	<br><br>
	    	<span class="pre-text">联&nbsp;系&nbsp;电&nbsp;话</span>
		    <input type="text" class="input-line" v-model="account.telephone" :disabled="disabled"
		    	v-bind:class="{ error: isTelError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyTelError}}</span>
	    	<br><br>
	    	<span class="pre-text">联&nbsp;系&nbsp;邮&nbsp;箱</span>
		    <input type="text" class="input-line" v-model="account.email" :disabled="disable"
		    	v-bind:class="{ error: isMailError }"
	    	style="font-size: 0.9em; color: #999; height: 45px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);"
	    	>
	    	<span class="errorStyle" style="font-size: .9em;">{{emptyMailError}}</span>
	    	<br><br>
				<mu-raised-button class="input-button forget-forward-button" :label="edit === 0 ? '编辑' : '保存'"  
					 @click="editForm(edit)"  :disabled="emptyShortError !== '' || emptyAddressError !== '' || emptyPersonError !== '' || emptyTelError !==''|| account.componyShort === '' || account.address === '' || account.connUser === '' || account.telephone === ''"
					style="width:247px; margin-left:23%;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);
						     height:40px; margin-top:20px;"/>
    </el-form>
    <br><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
  </div>
</template>

<script>
import userApi from 'src/api/userApi'
import $ from 'jquery'
export default {
  name: 'user-info',
  beforeCreated () {
  	// 如果没有登录，跳转到登录页面
    if (!this.$store.state.user.login) {
      this.$router.replace('/')
    }
  },
 	created () {
  		this.get_account()
  		$(document).ready(function(){
				var browserWidth = document.body.clientHeight - 180
				var minHeight = browserWidth + "px"
				console.log(minHeight)
	    	if(document.body.clientHeight>800){
		 			$("#form").css("min-height", minHeight)
		    }else{
		 			$("#form").css("min-height", "600px")
		    }
    })
  },
  data () {
    return {
    	edit:0,
    	disabled:true,
    	disable:true,
      account: {
				componyName: '',
				componyShort: '',
				address: '',
				connUser: '',
				telephone: '',
				email: ''
      },
      isError:false,
      emptyNameError:'',
      isNameError:false,
      isShortError:false,
      isAddressError:false,
      isPersonError:false,
      isTelError:false,
      isMailError:false,
      fullscreenLoading: true
    }
  },
  methods: {
  	get_account() {
  		var data = {
    		'logName' : this.$store.state.user.user.logName
    	}
    	var _this = this
    	_this.fullscreenLoading = true
   		userApi.queryAccount(data)
					      .then(function (res) {
					      	if(res.data['msgCode'] === '00000'){
					      				_this.fullscreenLoading = false
					      				let account = res.data
					      				_this.account = account
					      				_this.$store.dispatch('account', account)
					      				if(account === 'undefined'){
					      					_this.account = _this.$store.state.user.account
					      				}
					      				
					      		} 
					      	if(res.data['msgCode'] === '00021'){
					      			_this.$alert(res.data['message'], '', {
					            	confirmButtonText: '确定',
					            	type:'error'
					            })
					      	}
					      })
  	},
  	checkEmpty(){
  		if(this.account.companyName === ""){
  			this.emptyNameError = "公司名称不能为空"
  			this.isNameError = true
  		}else{
  			this.emptyNameError = ""
  			this.isNameError = false
  		}
  		if(this.account.componyShort === ""){
  			this.emptyShortError = "公司简称不能为空"
  			this.isShortError = true
  		}else{
  			this.emptyShortError = ""
  			this.isShortError = false
  		}
  		if(this.account.address === ""){
  			this.emptyAddressError = "公司地址不能为空"
  			this.isAddressError = true
  		}else{
  			this.emptyAddressError = ""
  			this.isAddressError = false
  		}
  		if(this.account.connUser === ""){
  			this.emptyPersonError = "联系人不能为空"
  			this.isPersonError = true
  		}else{
  			this.emptyPersonError = ""
  			this.isPersonError = false
  		}
  		if(this.account.telephone === ""){
  			this.emptyTelError = "联系电话不能为空"
  			this.isTelError = true
  		}else{
  			this.emptyTelError = ""
  			this.isTelError = false
  		}
  		if(this.account.email === ""){
  			this.emptyMailError = "联系邮箱不能为空"
  			this.isMailError = true
  		}else{
  			this.emptyMailError = ""
  			this.isMailError = false
  		}
  		
  	},
  	editForm (edit) {
  		if(edit == 0){
  			//alert("修改");
  			this.disabled = false
  		  this.edit = 1
  		}else{
	  		//alert("保存");
	  		var _this = this
	  		if(_this.emptyNameError === '' && _this.emptyShortError === '' && _this.emptyAddressError === '' && _this.emptyPersonError === '' && _this.emptyTelError === '' && _this.emptyMailError === '' ){
	  			_this.fullscreenLoading = true
				   	userApi.saveAccount(this.account).then(function (res) {
		        if (res.data['msgCode'] !== '00000') {
		        	_this.fullscreenLoading = false
		          _this.$alert(res.data['message'], '', {
	            	confirmButtonText: '确定',
	            	type:'error'
	            })
		        } else {
		          // 更新成功
				  		if(edit == 1){
				  			_this.disabled = true
		  		  		_this.edit = 0
				  		}
				  		_this.fullscreenLoading = false
			        _this.$alert(res.data['message'], '', {
		            	confirmButtonText: '确定',
		            	type:'success'
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

	  		
  		}
  	},
  	checkTel: _.debounce(
      function () {
      	this.emptyTelError = ""
  			this.isTelError = false
        // 验证手机号
        var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/
        if (!re.test(this.account.telephone)) {
          this.isTelError = true
          this.emptyTelError = '手机格式不正确'
          return
        }
      },
      // 等待时间
      0
    ),
  },
  watch: {
  		'account.companyName' : 'checkEmpty',
  		'account.componyShort' : 'checkEmpty',
  		'account.address' : 'checkEmpty',
  		'account.connUser' : 'checkEmpty',
  		'account.telephone' : 'checkEmpty',
  		'account.telephone' : 'checkTel',
  		'account.email' : 'checkEmpty'
  }
}
</script>

<style lang="stylus" scoped>
.accounts-view
  #form
	  background-color #fff
	  box-shadow 0 2px 4px 0 rgba(0,0,0,0.08)
    padding-left 20px
    .input-line, .input-text
      width 360px
      margin-top 6px
      padding 6px 8px
      border 1px solid #ddd
      border-radius 3px
      background-color #fafafa
      box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.075) !important
    .input-text
      height 90px
    .face-area
      float right
      margin-right 40px
      img
        display block
        margin-bottom 20px
        border-radius 6px
      .upload-face
        width 100%
	  input:focus
    	border-color #57cf8d 
    	box-shadow 0 0 3px #57cf8d
    input
    	outline none
    	-webkit-outline none
	  .errorStyle
      color #ff5957
      font-size 0.8em
      padding-left 5px
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
.error{
	border:#ff5957;
}
/*.disabled{
	background-color:#FCFDFD;
}*/
.pre-text{
  padding-right:15px;
  color:#8B9AAB;
  font-size:15px;
}
.pre-text2{
	padding-right:13px;
	color:#8B9AAB;
  font-size:15px;
}
</style>