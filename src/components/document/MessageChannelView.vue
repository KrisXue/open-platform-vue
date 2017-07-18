<template>
  <div id="form"  v-loading.fullscreen="fullscreenLoading">
  	 	<div class="header" id='header'>
      <mu-appbar style='background-color: #030329'>
        <div class="inner" style="margin-left:18.5%; ">
          <router-link to="/" exact>
            <img class="logo" src="../../assets/topbar_pic_logo.png" alt="logo">
          </router-link>
          <router-link to="/" style="">开发者</router-link>         
        </div>
      </mu-appbar>
    </div>
    <p style="padding-left:40px;padding-top:19px;font-size:18px;"></p>
    <div class='main-body'>
				<p class='one-title'>消息通道接口(发起方)</p>
				<hr>
				<p class='two-title'>一、通讯模式</p>
				<p class='three-title'>1.1	http协议</p>
				<p class='content'>以http协议post方式， 以json对象做数据传递,字符默认集为GBK。</p>
				<p class='content'>contentType = "application/json"</p>
				<p class='three-title'>1.2	Tcp协议</p> 
				<p class='content'>以tcp同步短连接方式通讯, 字符默认集为GBK,报文格式为定长报文，报文前置长度为4个字节。</p>
				<p class='two-title'>二、接口列表</p>
				<p class='three-title'>2.1   记账结果通知</p>
				<p class='content'>说明：TMS系统发起请求，推送SN信息。</p>
				<p class='content'>请求参数:</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>序号</td><td>中文域名</td><td>英文域名</td><td>类型</td><td>域中值的填写方法</td>
					</tr>
					<tr class='content-table-body'>
						<td>1</td><td>结算日期</td><td>BalDate</td><td>Char(8)</td><td>YYYYMMDD</td>
					</tr>
					<tr class='content-table-body'>
						<td>2</td><td>合作商号</td><td>AgentId</td><td>Char(10)</td><td></td>
					</tr>
					<tr class='content-table-body'>
						<td>3</td><td>交易流水号</td><td>TxnLogId</td><td>Char(6)</td><td>从000001始直到999999，再从0开始</td>
					</tr>
					<tr class='content-table-body'>
						<td>4</td><td>收单商户号</td><td>BusinessId</td><td>Char(15)</td><td></td>
					</tr>
					<tr class='content-table-body'>
						<td>5</td><td>收单终端号</td><td>SDTermNo</td><td>Char(32)</td><td></td>
					</tr>
					<tr class='content-table-body'>
						<td>6</td><td>交易码</td><td>TxnCode</td><td>Char(4)</td><td>N001：扫手机<br> N002：扫POS <br>N007：公众号支付</td>
					</tr>
					<tr class='content-table-body'>
						<td>7</td><td>支付通道</td><td>PayChannel</td><td>Char(2)</td><td>1.支付宝ISV<br>2.微信支付<br> 3.百度百付宝<br>4.苏宁易付宝<br>5.支付宝城市服务商<br>6 京东钱包 <br>7.QQ钱包 <br>8 翼支付</td>
					</tr>
					<tr class='content-table-body'>
						<td>8</td><td>交易日期</td><td>TxnDate</td><td>Char(8)</td><td>YYYYMMDD</td>
					</tr>
					<tr class='content-table-body'>
						<td>9</td><td>交易时间</td><td>TxnTime</td><td>Char(6)</td><td>HHMMSS</td>
					</tr>
					<tr class='content-table-body'>
						<td>10</td><td>交易金额</td><td>TxnAmt</td><td>Char(10)</td><td>按分为单位填写</td>
					</tr>
					<tr class='content-table-body'>
						<td>11</td><td>交易状态</td><td>TxnStatus</td><td>Char(1)</td><td>1.成功 <br>2.失败</td>
					</tr>
					<tr class='content-table-body'>
						<td>12</td><td>支付银行</td><td>BankType</td><td>Char(20)</td><td>微信返回的支付银行</td>
					</tr>
					<tr class='content-table-body'>
						<td>13</td><td>支付通道订单号</td><td>OfficeId</td><td>Char(64)</td><td>微信/支付宝订单号</td>
					</tr>
					<tr class='content-table-body'>
						<td>14</td><td>商户单号</td><td>ChannelId</td><td>Char(64)</td><td>第三方通道流水号(商户单号)</td>
					</tr>
				</table>
				<p class='content'>返回参数:</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>序号</td><td>中文域名</td><td>英文域名</td><td>类型</td><td>域中值的填写方法</td>
					</tr>
					<tr>
						<td>1</td><td>响应码</td><td>RspCode</td><td>Char(6)</td><td>000000成功，其它失败</td>
					</tr>
					<tr>
						<td>2</td><td>描述</td><td>RspDes</td><td>Char(64)</td><td>不足右补空格</td>
					</tr>
				</table>
				
  	</div>
  	
  </div>
</template>
<script>
import $ from 'jquery'
export default {
		created(){
  		$(document).ready(function(){
				var browserWidth = document.body.clientWidth
				var headerWidth = browserWidth + "px"
				console.log(headerWidth)
		 		$("#header").css("width", headerWidth)
    })
  },
}
</script>
<style>
.main-body{
	margin:0 5%;
	padding-bottom: 10%;
}
.one-title{
	font-size: 20px;
	font-weight:bold;
	color:#4b4b4b
}
hr{
	color:#D8DDE9
}
.two-title{
	font-size:18px;
	color:#8998AA
}
.three-title{
	font-size:17px;
	color:#8998AA
}
.four-title{
	font-size:16px;
	color:#8998AA
}
.content{
	font-size:15px;
	margin-left: 2.2%;
	color:#8998AA
}
.content-table{
	margin-left:2.2% ;
	width: 100%;
	text-align: center;
	background-color:#8998AA;
	color:#8998AA
}
.content-table td{
	background-color: #FFFFFF;
	line-height: 30px;
}
.content-table-header td{
	background-color: #57CF8D;
	color: #FFFFFF;
}
.content-table-body td{
	/*border: 1px solid #8C939D;*/
}
.content-ul{
	margin-left:4% ;
	color: #8998AA
}
</style>