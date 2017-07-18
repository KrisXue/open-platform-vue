<template>
  <div class="captcha">
    <div class="captcha-input" >	
			<!--<input type="captcha" class="input-line" v-model="captcha" placeholder="请输入验证码" style="font-size: 0.9em; color: #999; height: 40px; width:65%;">-->
    	<el-input type="captcha"  v-model="captcha" placeholder="请输入验证码" style="margin-left:10px" size="large" v-bind:class="{ loginError: isCatchaError }">
					<template slot="prepend"><img src='../../assets/denglu_icon_yanzhengma.png' style="margin-top: 3px;width:30px;height:20px;margin-left: 2px;"></template>
			</el-input>
    </div>
    <div class="captcha-img" >
      <img :src="captchaUrl"  @click="changeCaptcha" alt="点击刷新" />
    </div>
    <div class="captchaError" >
    	<span class="errorStyle" style="color:#fff;margin-top:20px;padding-left: 0px;">{{captchaError}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'captcha',
  data(){
  	return {
  		isCatchaError : false
  	}
  },
  computed: {
    captcha: {
      get () {
        return this.$store.state.captcha.captcha
      },
      set (val) {
        this.$store.dispatch('setCaptcha', val)
      }
    },
    captchaError () {
    	if(this.$store.state.captcha.captchaError){
    		this.isCatchaError = true
    	}else{
    		this.isCatchaError = false
    	}
      return this.$store.state.captcha.captchaError
    },
    captchaUrl () {
      return this.$store.state.captcha.captchaUrl
    }
  },
  methods: {
    changeCaptcha () {
      this.$store.dispatch('changeCaptcha')
    }
  },
  watch: {
    captcha () {
      this.$store.dispatch('clearCaptchaError')
      this.$store.dispatch('setCaptcha', this.captcha)
//    if (this.captcha.length === 4) {
//      window.console.log(this.captcha)
//      //this.$store.dispatch('validateCaptcha')
//    }else{
//    	 this.$store.dispatch('setCaptchaError', '请输入4位验证码!')
//    }
    }
  }
}
</script>

<style lang="stylus" scoped>
.captcha
  .captcha-input
    float left
    width 258px
  	.el-input-group
			width 230px !important

  .captcha-img
    float left
    width 100px
    height 80px
    margin-left -8px
img
  width 100px
  height 45px
  margin-bottom 0
  margin-top 5px
</style>
