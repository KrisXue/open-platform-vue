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
				<p class='one-title'>IOS-SDK</p>
				<hr>
				<p class='two-title'>手动安装</p>
				<p class='three-title'>1.	IOS客户端SDK下载</p>
				<p class='three-title'>2. 集成SDK</p> 
				<p class='content'>SDK 说明：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;最低支持版本为8.2<br>
					&nbsp;&nbsp;&nbsp;&nbsp;资源文件：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包名为SingleSDK<br>
					&nbsp;&nbsp;&nbsp;&nbsp;SDK文件夹：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;包含头文件 SingleSDK.h，<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;静态库文件 SingleSDK.a，<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支持的iOS版<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本为 8.2 及以上版本<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;demo文件夹：示例<br>
					集成：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;将SDK文件夹直接添加到项目中
				</p>
				<p class='three-title'>3.	初始化SDK</p> 
				<p class='content'>导入 SingleSDK.h 使其整个项目可以访问
				然后在 application: didFinishLaunchWithOptions 方法中初始化key<br>
				eg: [SingleSDK setKey:@"申请的secretkey"];</p>
				<p class='three-title'>4.	接口说明</p> 
				<p class='four-title'>4.1	接口约束说明</p> 
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>符号</td><td>含义</td>
					</tr>
					<tr>
						<td>0</td><td>可选项</td>
					</tr>
					<tr>
						<td>1</td><td>必传字段</td>
					</tr>
				</table>
				<ul class='content-ul'>
					<li style='color:red'>文档表格定义的字段，请准确写入请求参数中。</li>
					<li style='color:red'>所有的 value 不能用字符串“null” 赋值</li>
					<li style='color:red'>secretKey值必须申请。</li>
				</ul>
				<p class='four-title'>4.2	请求公共参数</p> 
				<p class='content'>公共参数是每个接口请求的时候都要传的，在SDK中把请求的公共参数封装在一个model中，即PaySDKModel</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>描述</td><td>备注</td>
					</tr>
					<tr>
						<td>latitude</td><td>0</td><td>String</td><td>经度值</td><td></td>
					</tr>
					<tr>
						<td>longitude</td><td>0</td><td>String</td><td>纬度值</td><td></td>
					</tr>
					<tr>
						<td>orgNo</td><td>1</td><td>String</td><td>机构号</td><td></td>
					</tr>
					<tr>
						<td>mercId</td><td>1</td><td>String</td><td>商户号</td><td></td>
					</tr>
					<tr>
						<td>trmNo</td><td>1</td><td>String</td><td>设备号</td><td></td>
					</tr>
					<tr>
						<td>optId</td><td>0</td><td>String</td><td>操作员号</td><td></td>
					</tr>
					<tr>
						<td>trmTyp</td><td>0</td><td>String</td><td>设备类型</td><td>详情见附录5.2</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>商户单号</td><td>在商户端不重复<br>(说明建议使用规则：设备号+0+当前毫秒时间戳)</td>
					</tr>
				</table>
				<p class='four-title'>4.3	返回的公共参数</p> 
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>描述</td><td>备注</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>商户单号</td><td>在商户端不不重复</td>
					</tr>
					<tr>
						<td>sysTime</td><td>1</td><td>String</td><td>系统交易时间</td><td>如：20170527153245</td>
					</tr>
					<tr>
						<td>message</td><td>1</td><td>String</td><td>返回信息</td><td></td>
					</tr>
					<tr>
						<td>mercId</td><td>1</td><td>String</td><td>商户号</td><td></td>
					</tr>
				</table>
				<p class='four-title'>4.4	接口列表</p> 
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>方法</td><td>说明</td>
					</tr>
					<tr>
						<td style='margin-left:10px ;'><spn style='color:#57CF8D'>/**初始化SDK 的key<br>
 								@param key 申请的key*/<br></spn>
								+ (<span style='color: #D16EC0;'>void</span>)initWithKey:(<span style='color:#9B69C4'>NSString</span> *)key;<br>
						</td>
						<td>初始化key值</td>
					</tr>
					<tr>
						<td>
							<span style='color:#57CF8D'>/**扫码支付-商户主扫**/</span><br>
							+ (<span style='color: #D16EC0;'>void</span>) postSdkBarcodePayWithPayModel:(<span style='color:#417F91'>SDKPayModel</span> *)model<br>
                             AndAmount:(<span style='color:#9B69C4'>NSString</span> *)amount<br>
                       AndTotal_Amount:(<span style='color:#9B69C4'>NSString</span> *)total_amount<br>
                           AndAuthCode:(<span style='color:#9B69C4'>NSString</span> *)authCode<br>
                         AndPayChannel:(<span style='color:#417F91'>PayChannel</span>)payChannel<br>
                            AndSubject:(<span style='color:#9B69C4'>NSString</span> *)subject<br>
                         AndSelOrderNo:(<span style='color:#9B69C4'>NSString</span> *)selOrderNo<br>
                          AndGoods_tag:(<span style='color:#9B69C4'>NSString</span> *)goods_tag<br>
                             AndAttach:(<span style='color:#9B69C4'>NSString</span> *)attach<br>
                               success:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color: #D16EC0;'>id</span>))success<br>
                               failure:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color:#9B69C4'>NSError</span> *, <span style='color:#9B69C4'>NSString</span> *, <span style='color:#9B69C4'>NSString</span> *))failure;<br>

						</td>
						<td>商户主扫</td>
					</tr>
					<tr>
						<td>
							<span style='color:#57CF8D'>/**扫码支付-客户主扫**/<br></span>
							+ (<span style='color: #D16EC0;'>void</span>) postSdkBarcodePosPayWithPayModel:(<span style='color:#417F91'>SDKPayModel</span> *)model<br>
                                AndAmount:(<span style='color:#9B69C4'>NSString</span>  *)amount<br>
                          AndTotal_Amount:(<span style='color:#9B69C4'>NSString</span>  *)total_amount<br>
                            AndPayChannel:(<span style='color:#417F91'>PayChannel</span>)payChannel<br>
                               AndSubject:(<span style='color:#9B69C4'>NSString</span>  *)subject<br>
                            AndSelOrderNo:(<span style='color:#9B69C4'>NSString</span>  *)selOrderNo<br>
                             AndGoods_tag:(<span style='color:#9B69C4'>NSString</span>  *)goods_tag<br>
                                AndAttach:(<span style='color:#9B69C4'>NSString</span> *)attach<br>
                                  success:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color: #D16EC0;'>id</span>))success<br>
                                  failure:(<span style='color: #D16EC0;'>void</span>(^)(<span style='color:#9B69C4'>NSError</span> *, <span style='color:#9B69C4'>NSString</span> *, <span style='color:#9B69C4'>NSString</span> *))failure;<br>

						</td>
						<td>客户主扫</td>
					</tr>
					<tr>
						<td>
							<span style='color:#57CF8D'>/**退款**/<br></span>
							+ (<span style='color: #D16EC0;'>void</span>) postSdkRefundBarcodePayWithPayModel:(<span style='color:#417F91'>SDKPayModel</span> *)model<br>
                                  AndOrderNo:(<span style='color:#9B69C4'>NSString</span> *)orderNo<br>
                                   AndTxnAmt:(<span style='color:#9B69C4'>NSString</span> *)txnAmt<br>
                                     success:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color: #D16EC0;'>id</span>))success<br>
                                     failure:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color:#9B69C4'>NSError</span> *, <span style='color:#9B69C4'>NSString</span> *, <span style='color:#9B69C4'>NSString</span> *))failure;<br>

						</td>
						<td>退款</td>
					</tr>
					<tr>
						<td>
							<span style='color:#57CF8D'>/**订单查询**/<br></span>
							+ (<span style='color: #D16EC0;'>void</span>) postSdkQryBarcodePayWithPayModel:(<span style='color:#417F91'>SDKPayModel</span> *)model<br>
                                 AndQryNo:(<span style='color:#9B69C4'>NSString</span> *)qryNo<br>
                                  success:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color: #D16EC0;'>id</span>))success<br>
                                  failure:(<span style='color: #D16EC0;'>void</span> (^)(<span style='color:#9B69C4'>NSError</span> *, <span style='color:#9B69C4'>NSString</span> *, <span style='color:#9B69C4'>NSString</span> *))failure;<br>

						</td>
						<td>订单查询</td>
					</tr>
				</table>
				<p class='four-title'>4.4.1	初始化key值</p> 
				<p class='content'>详情见3</p>
				<p class='four-title'>4.4.2	商户主扫</p> 
				<p class='content'>请求参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>authCode</td><td>1</td><td>二维码信息</td><td>string</td><td>扫码支付授权码，设备读取用户微信或⽀支付宝中的条码或者二维码信息</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录5.1</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='content'>返回参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>logNo</td><td>1</td><td>系统流水号</td><td>string</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>交易结查</td><td>string</td><td>S-交易易成功<br>F-交易易失败<br>A-等待授权<br>Z-交易易未知</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>支付渠道订单号</td><td>string</td><td>与用户支付订单中条码⼀一致，可用于退货；</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='four-title'>4.4.3	商户主扫</p> 
				<p class='content'>请求参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录5.1</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='content'>返回参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>logNo</td><td>1</td><td>系统流水号</td><td>string</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>交易结查</td><td>string</td><td>S-交易易成功<br>F-交易易失败<br>A-等待授权<br>Z-交易易未知</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>支付渠道订单号</td><td>string</td><td>与用户支付订单中条码一致，可用于退货；</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='four-title'>4.4.4	退款</p> 
				<p class='content'>请求参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>orderNo</td><td>1</td><td>支付渠道订单号</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>txnAmt</td><td>1</td><td>退款金额</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='content'>返回参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>logNo</td><td>1</td><td>系统流水号</td><td>string</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>交易结查</td><td>string</td><td>S-交易易成功<br>F-交易易失败<br>Z-交易易未知</td>
					</tr>
					<tr>
						<td>txnAmt</td><td>0</td><td>退款金额</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='four-title'>4.4.5	订单查询</p> 
				<p class='content'>请求参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>qryNo</td><td>1</td><td>查询流水</td><td>string</td><td>可根据logNo、orderNo、tradeNo的值做查询</td>
					</tr>
				</table>
				<p class='content'>返回参数说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>字段类型</td><td>备注</td>
					</tr>
					<tr>
						<td>logNo</td><td>1</td><td>系统流水号</td><td>string</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>交易结查</td><td>string</td><td>S-交易易成功<br>F-交易易失败<br>A-等待授权<br>Z-交易易未知</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录5.1</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>支付渠道订单号</td><td>string</td><td>与用户支付订单中条码一致，可用于退货；</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>实付金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>订单总金额</td><td>string</td><td>1元表示100（分为单位 ）</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>订单标题</td><td>string</td><td>订单title</td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>订单号</td><td>string</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>订单优惠说明</td><td>string</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>附加数据</td><td>string</td><td></td>
					</tr>
				</table>
				<p class='two-title'>附录</p> 
				<p class='three-title'>5.1 支付渠道列表</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>支付渠道</td><td>缩写</td>
					</tr>
					<tr>
						<td>支付宝</td><td>PayChannel.ALIPAY</td>
					</tr>
					<tr>
						<td>微信</td><td>PayChannel.WXPAY</td>
					</tr>
					<tr>
						<td>银联</td><td>PayChannel.YLPAY</td>
					</tr>
				</table>
				<p class='three-title'>5.2 设备类型</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>设备类型名</td><td>设备类型值</td>
					</tr>
					<tr>
						<td>智能POS</td><td>I</td>
					</tr>
					<tr>
						<td>app扫码</td><td>A</td>
					</tr>
					<tr>
						<td>PC端</td><td>C</td>
					</tr>
					<tr>
						<td>台牌扫码</td><td>T</td>
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