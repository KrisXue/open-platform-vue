<template>
  <div id="form"  v-loading.fullscreen="fullscreenLoading" style="padding-left: 0px;">
  	 	<div class="header" id='docheader'>
      <mu-appbar style='background-color: #030329'>
        <div class="inner">
          <router-link to="/" exact>
            <img class="logo" src="../assets/topbar_pic_logo.png" alt="logo">
          </router-link>
          <router-link to="/" style="">开发者</router-link>         
        </div>
      </mu-appbar>
    </div>
    <img  class='bigBrowser' src="../assets/banner4-big.png" style='display: block;height: 100%;width: auto;'></img>
    <img  class='smallBrowser' src="../assets/banner4-small.png" style='display: block;height: 100%;width: auto;'></img>
    <p style="padding-left:40px;padding-top:19px;font-size:18px;"></p>
    <div class='main-body' style='padding: 0 4% 8% 4%;'>
    	<div style='margin-top: 40px;'><img src="../assets/SDK.png" ></img><span class='doc-title'>SDK</span></div>
    		<el-row :gutter="40">
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=SDK-pc.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>PC接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=SDK-ios.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>IOS接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=SDK-android.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>Android接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				</el-row>
			<div style='margin-top: 50px;'><img src="../assets/message.png"></img><span class='doc-title'>收单扫码</span></div>
    		<el-row :gutter="40">
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=acquirer-scan.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>收单扫码接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=acquirer-commercial.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>商户进件接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=acquirer-debug.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>收单应用调试文档</span>
					  	</div>
				  	</a>
				  </el-col>
				</el-row>
			<div style='margin-top: 50px;'><img src="../assets/shoudan.png"></img><span class='doc-title'>消息通道</span></div>
    		<el-row :gutter="40">
				  <el-col :span="8">
				  	<a href="https://51starpos.com:8280/download/static/generic/web/viewer.html?file=message.pdf" target="_blank">
					  	<div class="grid-content bg-purple">
					  		<span>消息通道接口文档</span>
					  	</div>
				  	</a>
				  </el-col>
				</el-row>
				<similar-users @closepdf="closepdf" v-show="isshowpdf" :pdfurl="testpdfurl"></similar-users>
    </div>
  	<footer style="color:#8998AA;font-size:14px;text-align: center; bottom:0; width: 100%; margin:30px 0 30px 0; padding-left: 12%; float: left;"> 
	    	Copyright © 2017   www.open.starpos.com.cn   All Rights Reserved闽ICP备  B2-20050028-3号
	  </footer>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
	created(){
  		$(document).ready(function(){
				var browserWidth = document.body.clientWidth
				var headerWidth = browserWidth + "px"
		 		$("#header").css("width", headerWidth)
    })
  }
}
</script>
<style>
	#form{
		background-color: #fbfbfb !important
	}
	 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #docheader .inner{
  	margin-left: 4% !important;
  }
  .el-row{
  	margin: 20px 0 0 0px !important;
  }
  .bg-purple {
  	vertical-align: middle;
  	text-align: center;
  	height: 120px;
  	cursor: pointer;
  	border: 1px solid #e9e9e9;
    background: #fff none repeat scroll 0 0;
    color: #4B4B4B;
    border-radius: 2px;
    box-shadow: 5px 5px 5px #e9e9e9;
    
	}
	.bg-purple span{
		position: relative;
		top:45px;
		font-size: 18px;
		
	}
	.bg-purple:hover {
		color: #fff;
  	border: 1px solid #C4C7D0;
    background: #C4C7D0 none repeat scroll 0 0;
    box-shadow: 5px 5px 5px #C4C7D0C;
	}
	.doc-title{
		font-size: 20px;
		margin-left: 10px;
		color: #4B4B4B;
		position: relative;
		top:-7px
	}
	a{
		outline:none
	}
</style>
