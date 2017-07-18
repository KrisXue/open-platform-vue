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
				<p class='one-title'>收单扫码输出接口</p>
				<hr>
				<p class='two-title'>一、通讯模式</p>
				<p class='three-title'>1.1	支持的通信协议</p>
				<p class='content'>以http协议post方式， 以json对象做数据传递,字符默认集为GBK。</p>
				<p class='content'>contentType = "application/json"</p>
				<p class='three-title'>1.2	服务器地址</p> 
				<p class='content'>http:// xxx.xxx.xxx.xxx:xxxx/adpweb/ehpspos3/XX.json</p>
				<p class='two-title'>二、报文格式</p>
				<p class='three-title'>2.1   报文格式</p>
				<p class='content'>以json做为数据传输格式</p>
				<p class='three-title'>2.2  业务接口约束</p>
				<p class='content'>交易报文中的编码方式为GBK。对元素约束（出现次数）的表示方法请参见下表。</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>符号</td><td>含义</td>
					</tr>
					<tr class='content-table-body'>
						<td>?</td><td>0或1，可选项。</td>
					</tr>
					<tr class='content-table-body'>
						<td>*</td><td>0~n，可以没有，也可以有多项。</td>
					</tr>
					<tr class='content-table-body'>
						<td>+</td><td>1~n，至少有1项，也可以有多项。</td>
					</tr>
					<tr class='content-table-body'>
						<td>1</td><td>数字1，代表必须且只能填1项。</td>
					</tr>
				</table>
				<ul class='content-ul'>
					<li>文档表格定义的字段，请准确写入请求参数中。</li>
					<li>交易中某字段内容为空，请将节点写入，保证请求参数的完整性。</li>
				</ul>
				<p class='two-title'>三、安全规范</p>
				<p class='three-title'>3.1 数字签名</p>
				<p class='content'>为保证数据传输过程中的数据真实性，完整性和不可抵赖，我们需要对数据进行数字签名，在接收签名数据之后迚行签名校验。签名算法分为MD5</p>
				<p class='content'>签名机制如下：</p>
				<p class='content'>1.	签名字段不参与组成签名原文串。</p>
				<p class='content'>2.	待签名原文是请求参数按参数名字母进行升序排列装成的字符串。</p>
				<p class='content'>3.	如果提交的参数为{apam:value1, cpam:value2, bpam:value3}，设备key值为AFDFAASDASDAS，则待签名原文为：value1value3value2AFDFAASDASDAS</p>
				<p class='two-title'>四、接口公共请求参数</p>
				<p class='three-title'>4.1 请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>opSys</td><td>1</td><td>String</td><td>Max(1)</td><td>操作系统</td><td>0：ANDROID sdk<br>1：IOS sdk<br>2：windows sdk<br>3:直连</td>
					</tr>
					<tr>
						<td>characterSet</td><td>1</td><td>String</td><td>Max(2)</td><td>字符集</td><td>00-GBK 默认<br>01-UTF-8</td>
					</tr>
					<tr>
						<td>latitude</td><td>0</td><td>String</td><td>Max(15)</td><td>经度值</td><td></td>
					</tr>
					<tr>
						<td>longitude</td><td>0</td><td>String</td><td>Max(15)</td><td>纬度值</td><td></td>
					</tr>
					<tr>
						<td>orgNo</td><td>1</td><td>String</td><td>Max(15)</td><td>机构号</td><td></td>
					</tr>
					<tr>
						<td>trmNo</td><td>1</td><td>String</td><td>Max(8)</td><td>设备号</td><td></td>
					</tr>
					<tr>
						<td>oprId</td><td>0</td><td>string</td><td>Max(6)</td><td>操作员号</td><td></td>
					</tr>
					<tr>
						<td>trmTyp</td><td>0</td><td>String</td><td>Max(1)</td><td>设备类型</td><td>I-智能POS<br>A- app扫码<br>C-PC端<br>T-台牌扫码</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>Max(64)</td><td>商户单号</td><td>在商户端不重复</td>
					</tr>
					<tr>
						<td>txnTime</td><td>1</td><td>String</td><td>Max(14)</td><td>Max(14)	设备端交易时间</td><td>如：20170527153245</td>
					</tr>
					<tr>
						<td>signType</td><td>1</td><td>String</td><td>Max(6)</td><td>签名方式</td><td>MD5</td>
					</tr>
					<tr>
						<td>signValue</td><td>1</td><td>String</td><td>Max(64)</td><td>签名域，详见“加签说明”</td><td></td>
					</tr>
					<tr>
						<td>version</td><td>1</td><td>String</td><td>版本号</td><td>默认V1.0.0</td><td></td>
					</tr>
				</table>
				<p class='three-title'>4.2 返回参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>tradeNo</td><td>1</td><td>String</td><td>Max(64)</td><td>商户单号</td><td>在商户端不重复</td>
					</tr>
					<tr>
						<td>returnCode</td><td>1</td><td>String</td><td>Max(10)</td><td>返回码</td><td>6位（返回时必输)000000表示成功</td>
					</tr>
					<tr>
						<td>sysTime</td><td>1</td><td>String</td><td>Max(14)</td><td>系统交易时间</td><td>如：20170527153245</td>
					</tr>
					<tr>
						<td>message</td><td>1</td><td>String</td><td>Max(100)</td><td>返回信息</td><td></td>
					</tr>
					<tr>
						<td>mercId</td><td>1</td><td>String</td><td>Max(15)</td><td>商户号</td><td></td>
					</tr>
					<tr>
						<td>signValue</td><td>1</td><td>String</td><td>Max(64)</td><td>签名域，详见“数字签名”</td><td></td>
					</tr>
				</table>
				<p class='two-title'>五、接口列表</p>
				<p class='three-title'>5.1 交易类</p>
				<p class='four-title'>5.1.1 扫码支付-商户主扫 ( sdkBarcodePay)</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>authCode</td><td>1</td><td>String</td><td>Max(256)</td><td></td><td>扫码支付授权码，设备读取用户微信或支付宝中的条码或者二维码信息</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>String</td><td>Max(20)</td><td>支付渠道</td><td>附录5.2</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
			<p class='content'>返回参数(当returnCode为"000000有")</p>
			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>LogNo</td><td>1</td><td>String</td><td>Max(20)</td><td>系统流水号</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>String</td><td>Max(1)</td><td>交易结查</td><td>S-交易成功<br>F-交易失败<br>A-等待授权<br>Z-交易未知</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>String</td><td>Max(64)</td><td>支付渠道订单号</td><td>与用户支付订单中条码一致，可用于退货；</td>
					</tr>
					<tr>
						<td>amount</td><td>0</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='four-title'>5.1.2 扫码支付-客户主扫（sdkBarcodePosPay）</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>1</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>authCode</td><td>1</td><td>String</td><td>Max(256)</td><td></td><td>扫码支付授权码，设备读取用户微信或支付宝中的条码或者二维码信息</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>String</td><td>Max(20)</td><td>支付渠道</td><td>附录5.2</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goods_tag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='content'>返回参数(当returnCode为"000000有")</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>LogNo</td><td>1</td><td>String</td><td>Max(20)</td><td>系统流水号</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>String</td><td>Max(1)</td><td>交易结查</td><td>S-交易成功<br>F-交易失败<br>Z-交易未知</td>
					</tr>
					<tr>
						<td>payCode</td><td>0</td><td>String</td><td>Max(256)</td><td>二维码地址</td><td>二维码生成地址字符串</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>String</td><td>Max(64)</td><td>支付渠道订单号</td><td></td>
					</tr>
					<tr>
						<td>amount</td><td>0</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='four-title'>5.1.3  退款（sdkRefundBarcodePay）</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>orderNo</td><td>1</td><td>String</td><td>Max(64)</td><td>支付渠道订单号</td><td></td>
					</tr>
					<tr>
						<td>txnAmt</td><td>0</td><td>String</td><td>Max(13)</td><td>退款金额</td><td>不送时，表示全额退款</td>
					</tr>
				</table>
				<p class='content'>返回参数(当returnCode为"000000有")</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>LogNo</td><td>1</td><td>String</td><td>Max(20)</td><td>系统流水号</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>String</td><td>Max(1)</td><td>交易结查</td><td>S-交易成功<br>F-交易失败<br>Z-交易未知</td>
					</tr>
					<tr>
						<td>txnAmt</td><td>1</td><td>String</td><td>Max(13)</td><td>退款金额</td><td></td>
					</tr>
					<tr>
						<td>amount</td><td>0</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='four-title'>5.1.4 订单查询（sdkQryBarcodePay）</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>qryNo</td><td>1</td><td>String</td><td>Max(64)</td><td>查询流水</td><td>可根据logNo、orderNo、tradeNo的值做查询</td>
					</tr>
				</table>
				<p class='content'>返回参数(当returnCode为"000000有")</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>LogNo</td><td>1</td><td>String</td><td>Max(20)</td><td>系统流水号</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>String</td><td>Max(1)</td><td>交易结查</td><td>S-交易成功<br>F-交易失败<br>Z-交易未知</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>String</td><td>Max(20)</td><td>支付渠道</td><td>附录5.2</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>String</td><td>Max(64)</td><td>支付渠道订单号</td><td></td>
					</tr>
					<tr>
						<td>amount</td><td>0</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='four-title'>5.1.5  公众号查询（pubSigQry）</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
				</table>
				<p class='content'>返回参数(当returnCode为"000000有")</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>appId</td><td>1</td><td>String</td><td>Max(32)</td><td>微信公众账号</td><td></td>
					</tr>
					<tr>
						<td>appIdKey</td><td>1</td><td>String</td><td>Max(128)</td><td>微信公众号密钥</td><td></td>
					</tr>
				</table>
				<p class='four-title'>5.1.6  公众号支付(pubSigPay)</p>
				<p class='content'>请求参数</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>amount</td><td>1</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>payChannel</td><td>1</td><td>String</td><td>Max(20)</td><td>支付渠道</td><td>附录5.2</td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>0</td><td>String</td><td>Max(50)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='content'>返回参数(当returnCode为"000000有")</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>元素名称</td><td>约束</td><td>类型</td><td>最大长度</td><td>描述</td><td>说明</td>
					</tr>
					<tr>
						<td>LogNo</td><td>1</td><td>String</td><td>Max(20)</td><td>系统流水号</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>result</td><td>1</td><td>String</td><td>Max(1)</td><td>交易结查</td><td>S-交易成功<br>F-交易失败<br>Z-交易未知</td>
					</tr>
					<tr>
						<td>orderNo</td><td>0</td><td>String</td><td>Max(64)</td><td>支付渠道订单号</td><td></td>
					</tr>
					<tr>
						<td>amount</td><td>0</td><td>String</td><td>Max(13)</td><td>实付金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>total_amount</td><td>0</td><td>String</td><td>Max(13)</td><td>订单总金额</td><td>以分为单位，如1元表示为100</td>
					</tr>
					<tr>
						<td>PrepayId</td><td>1</td><td>String</td><td>Max(64)</td><td>预支付 ID</td><td></td>
					</tr>
					<tr>
						<td>apiAppid</td><td>1</td><td>String</td><td>Max(32)</td><td>支付公众号 ID</td><td></td>
					</tr>
					<tr>
						<td>apiTimestamp</td><td>1</td><td>String</td><td>Max(32)</td><td>支付时间戳</td><td></td>
					</tr>
					<tr>
						<td>apiNoncestr</td><td>1</td><td>String</td><td>Max(32)</td><td>支付随机字符串</td><td></td>
					</tr>
					<tr>
						<td>apiPackage</td><td>1</td><td>String</td><td>Max(128)</td><td>订单详情扩展字符串</td><td></td>
					</tr>
					<tr>
						<td>apiSigntype</td><td>1</td><td>String</td><td>Max(32)</td><td>签名方式</td><td></td>
					</tr>
					<tr>
						<td>apiPaysign</td><td>1</td><td>String</td><td>Max(64)</td><td>签名</td><td></td>
					</tr>
					<tr>
						<td>subject</td><td>0</td><td>String</td><td>Max(256)</td><td>订单标题</td><td></td>
					</tr>
					<tr>
						<td>selOrderNo</td><td>1</td><td>String</td><td>Max(64)</td><td>订单号</td><td>订货订单号</td>
					</tr>
					<tr>
						<td>goodsTag</td><td>0</td><td>String</td><td>Max(250)</td><td>订单优惠说明</td><td></td>
					</tr>
					<tr>
						<td>attach</td><td>0</td><td>String</td><td>Max(250)</td><td>附加数据</td><td></td>
					</tr>
				</table>
				<p class='three-title'>5.2  支付渠道列表</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>支付渠道</td><td>缩写</td>
					</tr>
					<tr>
						<td>支付宝</td><td>ALIPAY</td>
					</tr>
					<tr>
						<td>微信</td><td>WXPAY</td>
					</tr>
					<tr>
						<td>银联</td><td>YLPAY</td>
					</tr>
				</table>
				<p class='three-title'>5.3  错误代码列表</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>代码</td><td>错误描述</td>
					</tr>
					<tr>
						<td>00000</td><td>成功</td>
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