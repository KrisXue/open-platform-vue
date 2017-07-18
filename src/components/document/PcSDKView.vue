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
				<p class='one-title'>PC-SDK</p>
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
				<p class='two-title'>二、版本及注意事项</p>
				<p class='three-title'>2.1 配置文件说明</p>
				<p class='content'>配置文件只有在Dll被加载的时候读取一次。如果修改了了配置文件，需要重新加载Dll。</p>
				<p class='content'>配置文件说明:</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>serverUrl</td><td>服务端访问接口路径</td>
					</tr>
					<tr>
						<td>serverTimeout</td><td>HTTP服务接收数据时超时,默认20秒</td>
					</tr>
				</table>
				<p class='three-title'>2.2  输入输出参数说明</p>
				<p class='content'>输入输出参数采用JSON格式字符串串，C++推荐jsonCpp库，其他语言请使用各自的json库操作。</p>
				<p class='three-title'>2.3 注意事项</p>
				<p class='content'><ul><li>retCode 格式为int，样例如下：</li></ul></p>
				<p class='content' style='background-color:#F8F8F8;width:50%;color: red;margin-left: 4%;'>"retCode":0<br>"retCode":-2</p>
				<p class='content'><ul><li>标记为(可选)的项目，可能不存在，或者有值为null 或者""，样例如下：</li></ul></p>
				<p class='content' style='background-color:#F8F8F8;width:50%;color: red;margin-left: 4%;'>"orderTitle":null,<br>"orderNo":“”,<br>"discountComment":null,</p>
				<p class='content' style='margin-left: 4%;'>注：这里"attachment"不存在</p>
				<p class='content'><ul><li>所有的金额相关的参数都是以分为单位的正整数形式，如1 元表示为100</li></ul></p>
				<p class='two-title'>三、接口公共参数表</p>
				<p class='three-title'>3.1 支付类型定义</p>
				<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>支付类型</td><td>缩写</td>
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
				<p class='two-title'>四、接口定义</p>
				<p class='three-title'>4.1 获取版本</p>
				<p class='content'>输入参数：无</p>
				<p class='content'>输出参数：</p>
				<p class='content' style='background-color:#F8F8F8;width:50%''>{<br><span style='margin-left:4%'>"version":"1.0.0",</span><br>}</p>
  			<p class='three-title'>4.2 商户扫码支付</p>
  			<p class='content'>输入参数</p>
  			<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"organizationNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantId":"xxxx",</span><br>
					<span style='margin-left:4%'>"terminalId":"xxxx",</span><br>
					<span style='margin-left:4%'>"operId":"xxxx",</span><br>
					<span style='margin-left:4%'>"devKey":"xxxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"paymentCode":"xxxx",</span><br>
					<span style='margin-left:4%'>"payType":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantName":"xxx",</span><br>
					<span style='margin-left:4%'>"batchNo":"xxx",</span><br>
					<span style='margin-left:4%'>"voucherNo":"xxx",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>organizationNo</td><td>机构号，从平台申请获得</td>
					</tr>
					<tr>
						<td>merchantId</td><td>商户ID，从平台申请获得（最大长度15 个字符）</td>
					</tr>
					<tr>
						<td>terminalId</td><td>终端ID，从平台申请获得或者用户指定，数字，字母（最大长度8 个字符）</td>
					</tr>
					<tr>
						<td>operId</td><td>操作员ID，用户指定，数字，字母（可选）（最大长度6 个字符）</td>
					</tr>
					<tr>
						<td>devKey</td><td>设备key 值，从平台申请获得</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额（最大长度13 个字符）</td>
					</tr>
					<tr>
						<td>paymentCode</td><td>扫微信/支付宝获得的付款码（最大长度256 个字符）</td>
					</tr>
					<tr>
						<td>payType</td><td>支付类型（最大长度20 个字符）</td>
					</tr>
					<tr>
						<td>merchantName</td><td>商户名称（最大长度256 个字符）（可选）用于打印</td>
					</tr>
					<tr>
						<td>batchNo</td><td>批次号 （可选）用于打印</td>
					</tr>
					<tr>
						<td>voucherNo</td><td>凭证号（可选）用于打印</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)（最大长度256 个字符）</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)（最大长度50 个字符）</td>
					</tr>
						<tr>
						<td>discountComment</td><td>优惠说明(可选)（最大长度250 个字符）</td>
					</tr>
						<tr>
						<td>userOrderNo</td><td>附加数据(可选)（最大长度250 个字符）</td>
					</tr>
				</table>
				<p class='content'>输入参数</p>
  			<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"retCode":xx,</span><br>
					<span style='margin-left:4%'>"retMsg":"success",</span><br>
					<span style='margin-left:4%'>"perTradeId":"xxx",</span><br>
					<span style='margin-left:4%'>"platformSerialNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"platformOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>retCode</td><td>返回码(int 类型)</td>
					</tr>
					<tr>
						<td>retMsg</td><td>返回信息</td>
					</tr>
					<tr>
						<td>perTradeId</td><td>每笔交易ID 号，可用于查询</td>
					</tr>
					<tr>
						<td>platformSerialNo</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>platformOrderNo</td><td>平台订单号，可用于退货(操作成功时返回)</td>
					</tr>
					<tr>
						<td>paymentAmount</td><td>实付金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)</td>
					</tr>
					<tr>
						<td>discountComment</td><td>优惠说明(可选)</td>
					</tr>
					<tr>
						<td>attachment</td><td>附加数据(可选)</td>
					</tr>
				</table>
				<p class='three-title'>4.2 客户扫码支付</p>
				<p class='content'>输入参数</p> 
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"organizationNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantId":"xxxx",</span><br>
					<span style='margin-left:4%'>"terminalId":"xxxx",</span><br>
					<span style='margin-left:4%'>"operId":"xxxx",</span><br>
					<span style='margin-left:4%'>"devKey":"xxxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"payType":"xxxx",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>organizationNo</td><td>机构号，从平台申请获得</td>
					</tr>
					<tr>
						<td>merchantId</td><td>商户ID，从平台申请获得（最大长度15 个字符）</td>
					</tr>
					<tr>
						<td>terminalId</td><td>终端ID，从平台申请获得或者用户指定，数字，字母（最大长度8 个字符）</td>
					</tr>
					<tr>
						<td>operId</td><td>操作员ID，用户指定，数字，字母（可选）（最大长度6 个字符）</td>
					</tr>
					<tr>
						<td>devKey</td><td>设备key 值，从平台申请获得</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额（最大长度13 个字符）</td>
					</tr>
					<tr>
						<td>paymentAmount</td><td>实付金额（最大长度13 个字符）</td>
					</tr>
					<tr>
						<td>payType</td><td>支付类型（最大长度20 个字符）</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)（最大长度256 个字符）</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)（最大长度50 个字符）</td>
					</tr>
						<tr>
						<td>discountComment</td><td>优惠说明(可选)（最大长度250 个字符）</td>
					</tr>
						<tr>
						<td>userOrderNo</td><td>附加数据(可选)（最大长度250 个字符）</td>
					</tr>
				</table>
				<p class='content'>输出参数</p>
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"retCode":xx,</span><br>
					<span style='margin-left:4%'>"retMsg":"success",</span><br>
					<span style='margin-left:4%'>"perTradeId":"xxx",</span><br>
					<span style='margin-left:4%'>"platformSerialNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"platformOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"QRCodeAddress":"xxxx",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>retCode</td><td>返回码(int 类型)</td>
					</tr>
					<tr>
						<td>retMsg</td><td>返回信息</td>
					</tr>
					<tr>
						<td>perTradeId</td><td>每笔交易ID 号，可用于查询</td>
					</tr>
					<tr>
						<td>platformSerialNo</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>platformOrderNo</td><td>平台订单号，可用于退货(操作成功时返回)</td>
					</tr>
					<tr>
						<td>paymentAmount</td><td>实付金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>QRCodeAddress</td><td>生成二维码的信息，用于用户扫码(可选)</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)</td>
					</tr>
					<tr>
						<td>discountComment</td><td>优惠说明(可选)</td>
					</tr>
					<tr>
						<td>attachment</td><td>附加数据(可选)</td>
					</tr>
				</table>
				<p class='three-title'>4.4 退款</p>
				<p class='content'>输入参数</p> 
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"organizationNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantId":"xxxx",</span><br>
					<span style='margin-left:4%'>"terminalId":"xxxx",</span><br>
					<span style='margin-left:4%'>"operId":"xxxx",</span><br>
					<span style='margin-left:4%'>"devKey":"xxxx",</span><br>
					<span style='margin-left:4%'>"platformOrderNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"amount":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantName":"xxx",</span><br>
					<span style='margin-left:4%'>"batchNo":"xxx",</span><br>
					<span style='margin-left:4%'>"voucherNo":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>organizationNo</td><td>机构号，从平台申请获得</td>
					</tr>
					<tr>
						<td>merchantId</td><td>商户ID，从平台申请获得（最大长度15 个字符）</td>
					</tr>
					<tr>
						<td>terminalId</td><td>终端ID，从平台申请获得或者用户指定，数字，字母（最大长度8 个字符）</td>
					</tr>
					<tr>
						<td>operId</td><td>操作员ID，用户指定，数字，字母（可选）（最大长度6 个字符）</td>
					</tr>
					<tr>
						<td>devKey</td><td>设备key 值，从平台申请获得</td>
					</tr>
					<tr>
						<td>platformOrderNo</td><td>订单号，支付时SDK 返回获得（最大长度64 个字符）</td>
					</tr>
					<tr>
						<td>amount</td><td>退款金额（最大长度13 个字符）</td>
					</tr>
					<tr>
						<td>merchantName</td><td>商户名称（最大长度256 个字符）（可选）用于打印</td>
					</tr>
					<tr>
						<td>batchNo</td><td>批次号 （可选）用于打印</td>
					</tr>
					<tr>
						<td>voucherNo</td><td>凭证号（可选）用于打印</td>
					</tr>
				</table>
				<p class='content'>输出参数</p>
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"retCode":xx,</span><br>
					<span style='margin-left:4%'>"retMsg":"success",</span><br>
					<span style='margin-left:4%'>"perTradeId":"xxx",</span><br>
					<span style='margin-left:4%'>"platformSerialNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"platformOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>retCode</td><td>返回码(int 类型)</td>
					</tr>
					<tr>
						<td>retMsg</td><td>返回信息</td>
					</tr>
					<tr>
						<td>perTradeId</td><td>每笔交易ID 号，可用于查询</td>
					</tr>
					<tr>
						<td>platformSerialNo</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>refundAmount</td><td>退款金额</td>
					</tr>
					<tr>
						<td>paymentAmount</td><td>实付金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)</td>
					</tr>
					<tr>
						<td>discountComment</td><td>优惠说明(可选)</td>
					</tr>
					<tr>
						<td>attachment</td><td>附加数据(可选)</td>
					</tr>
				</table>
				
				<p class='three-title'>4.5 订单查询</p>
				<p class='content'>输入参数</p> 
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"organizationNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"merchantId":"xxxx",</span><br>
					<span style='margin-left:4%'>"terminalId":"xxxx",</span><br>
					<span style='margin-left:4%'>"operId":"xxxx",</span><br>
					<span style='margin-left:4%'>"devKey":"xxxx",</span><br>
					<span style='margin-left:4%'>"queryCond":"xxxx"</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>organizationNo</td><td>机构号，从平台申请获得</td>
					</tr>
					<tr>
						<td>merchantId</td><td>商户ID，从平台申请获得（最大长度15 个字符）</td>
					</tr>
					<tr>
						<td>terminalId</td><td>终端ID，从平台申请获得或者用户指定，数字，字母（最大长度8 个字符）</td>
					</tr>
					<tr>
						<td>operId</td><td>操作员ID，用户指定，数字，字母（可选）（最大长度6 个字符）</td>
					</tr>
					<tr>
						<td>devKey</td><td>设备key 值，从平台申请获得</td>
					</tr>
					<tr>
						<td>queryCond</td><td>查询条件(platformSerialNo,operId,perTradeId)</td>
					</tr>
				</table>
				<p class='content'>输出参数</p>
				<p class='content' style='background-color:#F8F8F8;width:50%'>{<br>
					<span style='margin-left:4%'>"retCode":xx,</span><br>
					<span style='margin-left:4%'>"retMsg":"success",</span><br>
					<span style='margin-left:4%'>"perTradeId":"xxx",</span><br>
					<span style='margin-left:4%'>"platformSerialNo":"xxxx",</span><br>
					<span style='margin-left:4%'>"payType":"xxxx",</span><br>
					<span style='margin-left:4%'>"platformOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"paymentAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderAmount":"123.00",</span><br>
					<span style='margin-left:4%'>"orderTitle":"xxx",</span><br>
					<span style='margin-left:4%'>"userOrderNo":"xxx",</span><br>
					<span style='margin-left:4%'>"discountComment":"xxx",</span><br>
					<span style='margin-left:4%'>"attachment":"xxx",</span><br>
					}
  			</p>
  			<table class='content-table' border="0" cellspacing="1" cellpadding="0">
					<tr class='content-table-header'>
						<td>参数</td><td>说明</td>
					</tr>
					<tr>
						<td>retCode</td><td>返回码(int 类型)</td>
					</tr>
					<tr>
						<td>retMsg</td><td>返回信息</td>
					</tr>
					<tr>
						<td>perTradeId</td><td>每笔交易ID 号，可用于查询</td>
					</tr>
					<tr>
						<td>platformSerialNo</td><td>平台系统流水号</td>
					</tr>
					<tr>
						<td>payType</td><td>支付类型</td>
					</tr>
					<tr>
						<td>paymentAmount</td><td>实付金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderAmount</td><td>订单总金额(操作成功时返回)</td>
					</tr>
					<tr>
						<td>orderTitle</td><td>订单标题 (可选)</td>
					</tr>
					<tr>
						<td>userOrderNo</td><td>用户指定的订单号(可选)</td>
					</tr>
					<tr>
						<td>discountComment</td><td>优惠说明(可选)</td>
					</tr>
					<tr>
						<td>attachment</td><td>附加数据(可选)</td>
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