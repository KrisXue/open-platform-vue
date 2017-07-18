<template>
  <div class="today-movies">
    <div class="captcha-input" style='float: left;'>	
			<input type="captcha" class="input-line" v-model="captcha" placeholder="请输入验证码" v-bind:class="{ error: isError }" style=" color: #999; height: 45px; width:270px;">
    	<!--<el-input type="captcha"  v-model="captcha" placeholder="请输入验证码" style="margin-left:10px">
					<template slot="prepend"><mu-icon value="verified_user" style='margin-top:7px'/></template>
			</el-input>-->
    </div>
    <div class="captcha-img" style='float: left;margin-left:10px'>
      <img :src="captchaUrl"  @click="changeCaptcha" alt="点击刷新" />
    </div>
    <div style='float: left;margin-top:26px;'>
    	<span class="errorStyle" style="color:#ff5957;margin-top:0px;margin-left: 2px;">{{captchaError}}</span>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  name: 'today-movies',
  data() {
  	return{
  		isError:false
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
    		this.isError = true
    	}else{
    		this.isError = false
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
.captcha-input
  .input-line, .input-text
    width 600px
    margin-top 6px
    padding 6px 8px
    border 1px solid #ddd
    border-radius 3px
    box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.075)
    outline none
  .pre-text
    /*letter-spacing 5px*/
    padding-right 15px
    color #8B9AAB
  .pre-text2
    padding-right 16px
    color #8B9AAB
  input:focus
    border-color #57CF8D 
    box-shadow 0 0 3px #57CF8D 
  -webkit-input:focus
    border-color #57CF8D
    box-shadow 0 0 3px #57CF8D
.captcha-img
  float left
  margin-left 10px
  width 100px
  height 80px
  margin-left -8px
img
  width 100px
  height 45px
  margin-bottom 0
  margin-top 11px
</style>
