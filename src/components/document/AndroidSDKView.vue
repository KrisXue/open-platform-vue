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
				<p class='one-title'>Android-SDK</p>
				<hr>
				<p class='two-title'>一、概述</p>
				<p class='three-title'>1.1 文档概述</p>
				<p class='content'>阅读对象：接入支付SDK技术开发人员</p>
				<p class='three-title'>1.2 接口约束说明</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>符号</td><td>含义</td>
					</tr>
					<tr>
						<td>0</td><td>可选项。</td>
					</tr>
					<tr>
						<td>1</td><td>数字1，代表必须且只能填1项。</td>
					</tr>
				</table>
				<ul class='content-ul'>
					<li style='color:red'>文档表格定义的字段，请准确写入请求参数中。</li>
					<li style='color:red'>secretKey值必须申请。</li>
					<li style='color:red'>在AndroidManifest文件中必须添加如下权限：<br>
						&lt;uses-permissionandroid:name="android.permission.INTERNET"/>
					</li>
				</ul>
				<p class='three-title'>1.3 名词解释：</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>名词</td><td>含义</td>
					</tr>
					<tr>
						<td>商户主扫</td><td>客户扫描商家生产的二维码付款</td>
					</tr>
					<tr>
						<td>客户主扫</td><td>商户扫描客户的付款二维码进行收款</td>
					</tr>
					<tr>
						<td>退款</td><td>支付成功的订单才能进行退款</td>
					</tr>
					<tr>
						<td>查询</td><td>查询某一笔订单的信息</td>
					</tr>
				</table>
				<p class='two-title'>二、接口公共参数表</p>
				<p class='three-title'>2.1 输入公共参数</p> 
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
						<td>trmTyp</td><td>0</td><td>String</td><td>设备类型</td><td>详情见附录4.3</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>商户单号</td><td>在商户端不重复(说明建议使用规则：设备号+0+当前毫秒时间戳)</td>
					</tr>
					<tr>
						<td>txnTime</td><td>1</td><td>String</td><td>设备端交易时间</td><td>如：20170527153245</td>
					</tr>
				</table>
				<p class='three-title'>2.2 返回公共参数</p> 
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>描述</td><td>备注</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>商户单号</td><td>在商户端不重复</td>
					</tr>
					<tr>
						<td>sysTime</td><td>1</td><td>String</td><td>系统交易时间号</td><td>如：20170527153245</td>
					</tr>
					<tr>
						<td>message</td><td>1</td><td>String</td><td>返回信息</td><td></td>
					</tr>
					<tr>
						<td>mercId</td><td>1</td><td>String</td><td>商户号</td><td></td>
					</tr>
				</table>
				<p class='two-title'>三、接口说明<span style='color:red'>(NldPaySdk)</span></p>
				<p class='three-title'>3.1  接口列表</p> 
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>方法</td><td>说明</td>
					</tr>
					<tr>
						<td>void init(String secretKey);</td><td>初始化key值</td>
					</tr>
					<tr>
						<td>void requestPhonePay(NldPhonePay nldPhonePay,OnResultListener&lt;NldPhoneResult&gt; onResultListener)</td><td>商户主扫</td>
					</tr>
					<tr>
						<td>void requestPosPay(NldPosPay nldPosPay, OnResultListener&lt;NldPosResult&gt; onResultListener)</td><td>客户主扫</td>
					</tr>
					<tr>
						<td>Void requestRefundPay(NldRefundPay nldRefundPay,OnResultListener&lt;NldRefundResult&gt; onResultListener)</td><td>退款</td>
					</tr>
					<tr>
						<td>void requestQueryPay(NldQueryPay nldQueryPay,OnResultListener&lt;NldQueryResult&gt; onResultListener)</td><td>订单查询</td>
					</tr>
					<tr>
						<td>void setDebugModule(final boolean isDebug)</td><td>是否显示log信息</td>
					</tr>
				</table>
				<p class='three-title'>3.1  接口详情说明</p> 
				<p class='four-title'>3.2.1  初始化设置key值</p> 
				<p class='content'>void init(String secretKey);</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void init(String secretKey)</td>
					</tr>
					<tr>
						<td>说明</td><td colspan="2">初始化设置key值</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td>
						<td>输入参数</td><td>String secretKey key值</td>
					</tr>
					<tr>
						<td>输出参数</td><td>void</td>
					</tr>
				</table>
				<p class='four-title'>3.2.2  商户主扫</p>
				<p class='content'>void requestPhonePay(NldPhonePay nldPhonePay,OnResultListener&lt;NldPhoneResult> onResultListener)</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void requestPhonePay(NldPhonePay nldPhonePay,OnResultListener&lt;NldPhoneResult>onResultListener)</td>
					</tr>
					<tr>
						<td>说明</td><td  colspan="2">客户主扫</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td><td>输入参数</td><td>1.NldPhonePay 输入参数<br>2.OnResultListener&lt;PhoneResult> onResultListener 接口回调</td>
					</tr>
					<tr>
						<td>输出参数</td><td>void</td>
					</tr>
					<tr>
						<td>附加说明</td><td colspan="2">NldPhoneResult:返回对象参数</td>
					</tr>
				</table>
				<p class='content'>1.NldPhonePay 输入参数</p>
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
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录4.1</td>
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
				<p class='content'>1.NldPhonePay 返回参数</p>
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
				<p class='four-title'>3.2.3  客户主扫</p>
				<p class='content'>void requestPosPay(NldPosPay nldPosPay,OnResultListen&lt;NldPosResult> onResultListener)</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void requestPosPay(NldPosPay nldPosPay,OnResultListener&lt;NldPosResult>onResultListener)</td>
					</tr>
					<tr>
						<td>说明</td><td colspan="2">客户主扫</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td><td>输入参数</td><td>1.NldPosPay 输入参数<br>2.OnResultListener&lt;NldPosResult> onResultListener 接口回调</td>
					</tr>
					<tr>
						<td >输出参数</td><td>void</td>
					</tr>
					<tr>
						<td >附加说明</td><td colspan="2">NldPosResult:返回对象参数</td>
					</tr>
				</table>
				<p class='content'>请求参数NldPosPay</p>
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
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录4.1</td>
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
				<p class='content'>返回参数NldPosResult</p>
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
						<td>payCode</td><td>0</td><td>二维码地址</td><td>string</td><td>二维码生成地址字符串</td>
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
				<p class='four-title'>3.2.4  退款</p> 
				<p class='content'>void requestRefundPay(NldRefundPay nldRefundPay,OnResultListener&lt;NldRefundResult> onResultListener)</p>
    			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void requestRefundPay(NldRefundPay nldRefundPay,OnResultListener&lt;NldRefundResult>onResultListener)</td>
					</tr>
					<tr>
						<td>说明</td><td colspan="2">退款</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td><td>输入参数</td><td>1.RefundPay 输入参数<br>2.OnResultListener&lt;NldRefundResult> onResultListener 接口回调</td>
					</tr>
					<tr>
						<td >输出参数</td><td>void</td>
					</tr>
					<tr>
						<td >附加说明</td><td colspan="2">NldRefundResult:返回对象参数</td>
					</tr>
				</table>
				<p class='content'>输入参数对象NldRefundPay</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>备注</td>
					</tr>
					<tr>
						<td>orderNo</td>	<td>1</td>	<td>支付渠道订单号</td>	<td></td>
					</tr>
					<tr>
						<td>txnAmt</td>	<td>0</td>	<td>退款金额</td>	<td>不送时，表示全额退款</td>
					</tr>
				</table>
				<p class='content'>返回参数对象NldRefundResult</p>
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
						<td>txnAmt</td><td>1</td><td>退款金额</td><td>string</td><td></td>
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
				<p class='four-title'>3.2.5  订单查询</p> 
				<p class='content'>void requestQueryPay(NldQueryPay nldQueryPay,OnResultListener&lt;NldQueryResult> onResultListener)</p>
    		<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void requestQueryPay(NldQueryPay nldQueryPay,OnResultListener&lt;NldQueryResult>onResultListener)</td>
					</tr>
					<tr>
						<td>说明</td><td colspan="2">订单查询</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td><td>输入参数</td><td>1.NldQueryPay 输入参数<br>2.OnResultListener&lt;NldQueryResult> onResultListener 接口回调</td>
					</tr>
					<tr>
						<td >输出参数</td><td>void</td>
					</tr>
					<tr>
						<td >附加说明</td><td colspan="2">NldQueryPay:返回对象参数</td>
					</tr>
				</table>
				<p class='content'>请求参数NldQueryPay</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>含义</td><td>备注</td>
					</tr>
					<tr>
						<td>qryNo</td><td>1</td><td>查询流水</td><td>可根据logNo、orderNo、tradeNo的值做查询</td>
					</tr>
				</table>
				<p class='content'>返回参数对象NldQueryResult</p>
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
						<td>payChannel</td><td>1</td><td>支付渠道</td><td>enum</td><td>附录4.1</td>
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
				<p class='four-title'>3.2.6 是否打印log信息</p> 
				<p class='content'>void setDebugModule(:nal boolean isDebug)</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr>
						<td>方法</td><td colspan="2">void setDebugModule(final boolean isDebug)</td>
					</tr>
					<tr>
						<td>说明</td><td colspan="2">是否打印log信息</td>
					</tr>
					<tr>
						<td rowspan="2">参数说明</td><td>输入参数</td><td>boolean isDebug说明：true 显示log信息false：不显示log信息</td>
					</tr>
					<tr>
						<td >输出参数</td><td>void</td>
					</tr>
				</table>
				<p class='two-title'>四、附录</p>
				<p class='three-title'>4.1 支付渠道列表</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>支付渠道</td><td>缩写</td>
					</tr>
					<tr>
						<td>支付宝</td><td>NldPayContant.PayChannel.ALIPAY</td>
					</tr>
					<tr>
						<td>微信</td><td>NldPayContant.PayChannel .WXPAY</td>
					</tr>
					<tr>
						<td>银联</td><td>NldPayContant.PayChannel .YLPAY</td>
					</tr>
				</table>
				<p class='three-title'>4.2 返回码列表</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>返回码</td><td>错误码</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. PARAM_IS_NULL</td><td>参数不能为空</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. PARAM_IS_ILLEGAL</td><td>传入非法参数</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. SDK_NOT_INIT</td><td>SDK未初始化</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. GET_CLIENT_SIGN_VALUE_ERROR</td><td>获取的客户端签名有误</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. RESPONSE_SIGN_VALUE_ERROR</td><td>服务器响应签名有误</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. NET_IO_ERROR</td><td>网络异常</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. NET_SERVER_ERROR</td><td>服务器异常</td>
					</tr>
					<tr>
						<td>NldPayContant.ErrorCode. SERVER_RETURN_CODE</td><td>服务器返回code码</td>
					</tr>
				</table>
				<p class='three-title'>4.3 设备类型</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>设备类型名</td><td>设备类型值</td>
					</tr>
					<tr>
						<td>智能POS</td><td>NldPayConstant.TrmTyp.Type_P</td>
					</tr>
					<tr>
						<td>app扫码</td><td>NldPayConstant.TrmTyp.Type_A</td>
					</tr>
					<tr>
						<td>PC端</td><td>NldPayConstant.TrmTyp.Type_C</td>
					</tr>
					<tr>
						<td>台牌扫码</td><td>NldPayConstant.TrmTyp.Type_T</td>
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