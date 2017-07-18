<template>
  <div class="documents-view personal-center">
    <el-row :gutter="20">
      <el-col :span="4" class="menu-left" style="padding-right:0; width:12%;">
        <div class="menu"style='position:relative'>
				 <br><br><br><br><br><br><br>
        <transition>
		      <router-view class="view"></router-view>
		    </transition>
		    
					<span style="font-size: 17px; padding-left: 20px;">
						<img src="../assets/SDK.png" class='menu-img'></img>&nbsp;&nbsp;<span style="margin-bottom: 5px;">SDK</span>
					</span>
					<router-link class="menu-item " to='/doc'>
						<p v-bind:class = "{selected:isSelect}" @click = "goTo('/doc')">PC接口文档</p>
					</router-link>
					<router-link class="menu-item " to='/document/ios-doc'>
						<p v-bind:class = "{selected:isSelect}" @click = "goTo('/document/msg-doc')">IOS接口文档</p>
					</router-link>
					<router-link class="menu-item " to='/document/andr-doc'>
						<p v-bind:class = "{selected:isSelect}" @click = "goTo('/document/andr-doc')">Android接口文档</p>
					</router-link>
					<span style="font-size: 17px;padding-left: 20px;">
						<img src="../assets/message.png" class='menu-img'></img>&nbsp;&nbsp;收单扫码
					</span>
          <router-link class="menu-item" to='/document/aqp-doc'>
          	<p v-bind:class = "{selected:isSelect}" @click = "goTo('/document/aqp-doc')">收单扫码接口文档</p>
          </router-link>
          <span style="font-size: 17px;padding-left: 20px;">
						<img src="../assets/shoudan.png" class='menu-img'></img>&nbsp;&nbsp;消息通道
					</span>
          <router-link class="menu-item" to='/document/msg-doc'>
          	<p v-bind:class = "{selected:isSelect}" @click = "goTo('/document/msg-doc')">消息通道接口文档</p>
          </router-link>
        </div>
      </el-col>
      <el-col :span="19" class="main-section" style="width: 84%;">
        <router-view name="documentsView"></router-view>
      </el-col>
    </el-row>
    <footer style="color:#8998AA;font-size:14px;text-align: center; bottom:0; width: 100%; margin:30px 0 30px 0; padding-left: 12%; float: left;"> 
	    	Copyright © 2017   www.open.starpos.com.cn   All Rights Reserved闽ICP备  B2-20050028-3号
	  </footer>
  </div>
</template>




<script>
import Store from '../utils/store.js'
import $ from 'jquery'
export default {
  name: 'documents-view',
  data () {
    return {
			isSelect:false
    }
  },
  methods: {
    goTo (route) {
      this.$router.push(route)
    }
  }
}
	
</script>

<style lang="stylus" scroped>
	.menu
		border none
	.menu-item
		padding 0 !important
		font-size 17px
	.menu-left
		position fixed
		top 0px
		height 100%
		z-index 1000
		/*max-height 1500px*/
		/*max-height 1380px*/
		background-color #fff
		border none
		padding-right 0
		box-shadow 0 2px 4px 4px rgba(0,0,0,0.08)
	.menu p
		color #8b9aab
		padding 7px 0 7px 45px !important
		font-size 15px
	.menu .logName
		color #8b9aab
		padding 7px 0 7px 0 !important
		margin-top 0
		margin-bottom 35px
		font-size 19px
	.menu-active
		color  #57CF8D !important
		background-color #EFFFF7 !important
		border-left 3px solid #57cf8d
	.mu-drawer
		position absolute
	.mu-popover
		position fixed !important
		top 143px !important
		height 150px
		border-radius 5px
	.mu-menu-item-wrapper
		font-size 14px !important	
		line-height 22px !important
		height 35px !important
		padding-left 21px
		padding-top 4px
		width 115px
	.menu-item
		padding 0
	.menu-item p
		padding 15px 0 15px 30px
		margin 10px 0
	.menu-item p:hover
		color  #57CF8D !important
		background-color #EFFFF7 !important
		border-left 3px solid #57cf8d
	.menu img
		margin-top 70px
		width 99px
</style>
<style>
	.upload-view{
		min-height: 700px;
	}
@media (min-height:901px) {
	footer{
		font-size: 16px !important;
	}
}
@media (min-height:801px) and (max-height:900px) {
	footer{
		font-size: 16px !important;
	}
}
.main-section{
	margin-left: 13.7%;
}
.inner{
	margin-left: 14% !important;
}
@media (min-width:1801px ) {
	.menu img{
			margin-left: 29%;
		}
	.menu .logName{
			margin-left: 20px;
			margin-right: 20px;
			width: auto;
			text-align: center;
	}
	.mu-popover{
		margin-left:8%;
	}
}	
@media (min-width:1601px ) and (max-width:1800px) {
	.menu img{
			margin-left: 26%;
		}
	.menu .logName{
			margin-left: 20px;
			margin-right: 20px;
			width: auto;
			text-align: center;
	}
	.mu-popover{
		margin-left:8%;
	}
}		
@media (min-width:1401px ) and (max-width:1600px) {
		.menu-left{
			width: 14% !important;
		}
		.main-section{
			width: 81% !important;
			margin-left: 16.3%;
		}
		.inner{
			margin-left: 16% !important;
		}
		.menu img{
			margin-left: 27%;
		}
	  .menu .logName{
			margin-left: 20px;
			margin-right: 20px;
			width: auto;
			text-align: center;
		}
		.mu-popover{
			margin-left:9%;
		}
}
@media (min-width:1201px ) and (max-width:1400px) {
		.menu-left{
			width: 15% !important;
		}
		.main-section{
			width: 79% !important;
			margin-left: 17.7%;
		}
		.inner{
			margin-left: 18% !important;
		}
		.menu img{
			margin-left: 24%;
		}
		.menu .logName{
			margin-left: 20px;
			margin-right: 20px;
			width: auto;
			text-align: center;
		}
		.mu-popover{
			margin-left:10%;
		}
}
@media (max-width:1201px) {
		.menu-left{
			width: 16% !important;
		}
		.main-section{
			width: 78% !important;
			margin-left: 18.7%;
		}
		.inner{
			margin-left: 20% !important;
		}
		.menu img{
			margin-left: 23%;
		}
		.menu .logName{
			margin-left: 20px;
			margin-right: 20px;
			width: auto;
			text-align: center;
		}
		.mu-popover{
			margin-left:11%;
		}
}

@media (min-height:600px ) and (max-width:779px) {
	/*.menu-left{
		height: 120%;
		max-height: 1400px;
	}*/
}

#form{
	/*	height:600px;*/
    background-color:#fff;
    box-shadow:0px 2px 4px 0px rgba(0,0,0,0.08);
    padding-left:20px
}
.pre-text{
    padding-right: 15px;
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
.error{
	border-color:#ff5957 !important;
	box-shadow: 0 0 3px #ff5957 !important
}
.mu-menu{
	border-radius: 6px !important;
}
.mu-menu-list{
	  /*padding:15px 0 15px 20px !important;*/
}
.mu-menu-item-title{
	color: #8998AA !important	;
}
.mu-menu-list i {
	position:absolute	;
	left:15px;
	padding-top:9px;
	z-index: 100;
}
.mu-menu-list i:hover {
  color: #57cf8d !important;
}
.mu-menu-list i:active {
  color: #57cf8d;
}
.el-icon-edit,.el-icon-information,.el-icon-message,.el-icon-close{
		color:#8998AA !important;
		}
.mu-menu-item-wrapper.hover{
		color:#57cf8d !important;
		background-color: #effff7 !important;
		}
.el-icon-edit:hover,.el-icon-information:hover,.el-icon-message:hover,.el-icon-close:hover{
	  cursor: pointer;
		color: #57CF8D !important;
		}
.mu-menu-item-title:hover{
		color:#57CF8D !important;
}
.el-icon-setting{
	color:#fff;
	background-color:#57cf8d;
	border-radius:15px;
	cursor:pointer
	
}
.menu-item.router-link-exact-active.router-link-active{
	background-color:#EFFFF7;
	border-left: 3px solid #57cf8d;
}
.menu-item.router-link-exact-active.router-link-active p{
	color:#57CF8D;
}
.mu-menu{
	width: 115px !important;
}
.mu-menu i {
	letter-spacing: 1px;
}
.menu-img{
    margin-left: 0px !important;
    margin-top: 0px !important;
    width: 17px !important;
    height: 17px !important;
    position: relative;
    top:3px
}
</style> 