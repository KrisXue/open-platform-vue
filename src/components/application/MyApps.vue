<template>
  <div class="friends-lists"  v-loading.fullscreen="fullscreenLoading">
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
    <!--<el-input placeholder="请输入内容" v-model="input5">
      <el-button slot="append" icon="search"></el-button>
    </el-input>-->
    <p style="padding:19px 0 25px 40px; font-size:18px; margin:0;">我的应用</p>
    <div v-if="total === 0" class="no-records" >
    	<img  src="../../assets/yingyongzhongxin_pic_wujilu.png" />
    	<p style="color: #8998AA;letter-spacing: 0.38px; font-size: 18px;">暂无记录...</p>
    </div>
    <!--<el-table :data="myApps" ref="singleTable" highlight-current-row  class="ver-table" stripe style='width:auto' v-if="!(total === 0)"   :row-class-name="tableRowClassName">-->
    <el-table :data="myApps" ref="singleTable" highlight-current-row  class="ver-table" stripe style='width:auto' v-if="!(total === 0)" :row-class-name="tableRowClassName">
    <el-table-column
        prop="serverName"
        label="服务名称"
        width="auto"
        >
      </el-table-column>
    	<el-table-column
        prop="packageName"
        label="包名"
        width="auto"
        >
      </el-table-column>
      <!--<el-table-column
        prop="curUploadVersionCode"
        label="版本名称"
        width="auto">
      </el-table-column>-->
      <el-table-column
        prop="curUploadVersionCode"
        label="版本号"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="curStatus"
        label="状态"
        width="auto">
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交时间"
        width="110px"
        id="sttime"
        v-if="timeSize==1"
        >
      </el-table-column>
      <el-table-column
        prop="handleTime"
        label="处理时间"
        width="110px"
        id="httime"
        v-if="timeSize==1"
        >
      </el-table-column>
      <el-table-column
        prop="submitTime"
        label="提交时间"
        width="200px"
        id="sttime"
        v-if="timeSize==2"
        >
      </el-table-column>
      <el-table-column
        prop="handleTime"
        label="处理时间"
        width="200px"
        id="httime"
        v-if="timeSize==2"
        >
      </el-table-column>
      <el-table-column 
      	label="操作"   	
        width="auto"
      	>
        <template scope="scope">
            <div v-show = "scope.row.curStatus === '提交'">
            	<el-button size="small"  @click = "handleRecall(scope.$index, tableData)"  class="table-btn" style="position: relative !important; left: 0 !important;">
	            	撤销
	            </el-button>
            </div>
            <div v-show = "scope.row.curStatus === '暂存'">
            	 <el-button size="small"  @click = "handleSubmit(scope.$index, tableData)"  class="table-btn" style="position: relative !important; left: 0 !important;">
	            	提交
	            </el-button>
	            <el-button size="small"  @click = "handleMaintain(scope.$index, myApps)"  class="table-btn" style="position: relative !important; left: 0 !important;">
	            	维护
	            </el-button>
            </div>  
            <!--<div v-show = "scope.row.curStatus === '提交'">
            	<el-button size="middle"  @click = "handleRecall(scope.$index, tableData)" type = 'text' class="table-btn">
	            	撤销
	            </el-button>
            </div>
            <div v-show = "scope.row.curStatus === '暂存'">
            	 <el-button size="middle"  @click = "handleSubmit(scope.$index, tableData)" type = 'text' class="table-btn">
	            	提交
	            </el-button>
	            <el-button size="middle"  @click = "handleMaintain(scope.$index, myApps)" type = 'text' class="table-btn">
	            	维护
	            </el-button>
            </div>  -->
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination  v-if="!(total === 0)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="sizePerOnePage"
      layout="sizes, prev, pager, next ,total"
      :total="totalCommentSize">
    </el-pagination>
  </div>
</template>


<script>
import appApi from '../../api/appApi'
import _ from 'lodash'
import FileUpload from '../common/FileUpload'
import axios from 'axios'
import $ from 'jquery'
import Store from '../../utils/store.js'

export default {
  created () {
  	//获取已登录用户名
    let user = Store.fetch('user')
    this.userName = user.user.logName
    this.get_friend()
    $(document).ready(function(){
			var browserHeight = document.body.clientHeight - 180
			var minHeight = browserHeight + "px"
    	if(document.body.clientHeight>660){
	 			$(".friends-lists").css("min-height", minHeight)
	    }else{
	 			$(".friends-lists").css("min-height", "515px")
	    }
	    var browserWidth = document.body.clientWidth
			var headerWidth = browserWidth + "px"
		 	$("#header").css("width", headerWidth)
    	
    })
  },
  data () {
    return {
      currentPage: 1,
      sizePerOnePage: 5,
      myApps: [],
      tableData: [],
      myAppsInfo:[],
      total:0  ,
      fullscreenLoading:false,
      userName:'',
      timeSize:1
    }
  },
  methods: {
  	tableRowClassName(row, index) {
        if (row['packageName'] === this.$route.params.packageName) {
          return 'current-row';
        } 
     },
    get_friend () {
      var _this = this
      _this.getCurrentFriend(1)
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    handleSizeChange (val) {
    	this.sizePerOnePage = val
    	this.getCurrentFriend()
      console.log(`每页 ${val} 条`)
      $("body").scroll(function() {
        $(".el-select-dropdown").css("display","none")		   
		  })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCurrentFriend(val)
      return this.currentRow = val;
    },
    getCurrentFriend (page) {
    	if(document.body.clientWidth>1500){
		 		var ts = 2
		 		this.timeSize = ts
		 	}
      var size = this.tableData.length
      console.log('****************')
      console.log(page)
      console.log(size)
      var startFriend = this.sizePerOnePage * (page - 1)
      var endFriend = startFriend + this.sizePerOnePage
      endFriend = endFriend < size ? endFriend : size

      var data = {
      		'logName' : this.userName,
			  	'page' : this.currentPage,
			  	'rows' : this.sizePerOnePage,
			  }
      var _this = this
		  _this.fullscreenLoading = true
	    appApi.queryAppInfoBeanList(data).then(function (res) {
	      // 获取rows
	      let tableData = res.data['rows']
	      let total = res.data['total']
	      if(total === 0){
	      	_this.fullscreenLoading = false
	      }
	      _this.total = total
	      _this.tableData  = tableData
				_this.myApps = []
		    for (var i = 0; i < _this.tableData.length; i++) {	
		    	if(tableData[i].submitTime === null){
		    		tableData[i].submitTime =" "
		    	}else{
						var st =  _this.timeTrans(tableData[i].submitTime)
						_this.tableData[i].submitTime = st
		    	}
			    if(tableData[i].handleTime === null){
		    		tableData[i].handleTime =" "
		    	}else{
		    		var ht =  _this.timeTrans(tableData[i].handleTime)
			    	_this.tableData[i].handleTime = ht
		    	}
			    			    	
		    	if(tableData[i].curStatus === 1){
		    		tableData[i].curStatus = "在线"	    		
		    	}
		    	else if(tableData[i].curStatus === 2){
		    		tableData[i].curStatus = "下架"
		    	}
		    	else if(tableData[i].curStatus === 3){
		    		tableData[i].curStatus = "提交"
		    	}
		    	else if(tableData[i].curStatus === 4){
		    		tableData[i].curStatus = "暂存"

		    	}
		    	else if(tableData[i].curStatus === 5){
		    		tableData[i].curStatus = "审核通过"
		    	}
		    	else if(tableData[i].curStatus === 6){
		    		tableData[i].curStatus = "审核拒绝"
		    	}
		    	else{
		    		tableData[i].curStatus = "错误"
		    	}
		      _this.myApps.push(_this.tableData[i])
		      _this.fullscreenLoading = false
		      console.log(tableData[i]) 
		    }
	    	console.log(_this.tableData.length) 
	    })
	    .catch(function(error){
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
    },
    handleRecall(index, rows){
    	var data = {
			  	'packageName' : rows[index].packageName,
			  	'curUploadVersionNo' : rows[index].curUploadVersionNo,
			  }
      var _this = this
      _this.fullscreenLoading = true
    	appApi.recallInfoMaintain(data).then(function (res) {
    		var msgCode = res.data.msgCode
    		if(msgCode === "00000"){
    			_this.fullscreenLoading = false
    			_this.$alert(res.data['message'], '', {
	            confirmButtonText: '确定',
	            type:'success'
	            }).then(() => {
//					_this.$router.push('/application/my-apps')
					_this.fullscreenLoading = false
					_this.getCurrentFriend()
				})
    			}
    			else if(msgCode === "00033"){
    				_this.fullscreenLoading = false
		            _this.$alert(res.data['message'], '', {
		            confirmButtonText: '确定',
		            type:'error'
	            }).then(() => {
//					_this.$router.push('/application/my-apps')
					_this.getCurrentFriend()
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
	},
	handleSubmit(index, rows){		
		var arrayPic =[]
		console.log(rows[index].serverProvidePictures)
			arrayPic = rows[index].serverProvidePictures.replace('[','').replace(']','')
			console.log('arrayPic:'+arrayPic)
			if(arrayPic.indexOf(',') !== -1){
				arrayPic = arrayPic.split(',')
				rows[index].serverProvidePictures = arrayPic
			}
			
		var data = rows[index]			  
      var _this = this
      _this.fullscreenLoading = true
    	appApi.submitInfoMaintain(data).then(function (res) {
    		var msgCode = res.data.msgCode
    		if(msgCode === "00000"){
    			_this.fullscreenLoading = false
    			_this.$alert(res.data['message'], '', {
	            confirmButtonText: '确定',
	            type:'success'
	            }).then(() => {
//					_this.$router.push('/application/my-apps')
					_this.fullscreenLoading = false
					_this.getCurrentFriend()

				})
    			}
    			else if(msgCode === "00024"){
    				_this.fullscreenLoading = false
		            _this.$alert(res.data['message'], '', {
		            confirmButtonText: '确定',
		            type:'error'
	            }).then(() => {
	            	_this.getCurrentFriend()
//					_this.$router.push('/application/my-apps')
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
	},
	handleMaintain(index, rows) {
				var data = {
					'curUploadVersionCode':rows[index].curUploadVersionCode,
					'packageName':rows[index].packageName
				}
				var _this = this
        _this.fullscreenLoading = true
        appApi.queryInfoMaintain(data).then(function (res) {
        	_this.$router.push({name:"uploadApps",params: {
        		serverName: res.data['appInfoBean'].serverName,
        		activeStep  : res.data['appInfoBean'].activeStep,
			  		serverName : res.data['appInfoBean'].serverName,
						serverLogo : res.data['appInfoBean'].serverLogo,
						categoryId : res.data['appInfoBean'].categoryId,
						categoryName : res.data['appInfoBean'].categoryName,
						serverIsopen : res.data['appInfoBean'].serverIsopen,
					  fileds : res.data['openMainTains'],
						testUser : res.data['appInfoBean'].testUser,
						testPwd : res.data['appInfoBean'].testPwd,
						serverProvide : res.data['appInfoBean'].serverProvide,
						serverIntroduce : res.data['appInfoBean'].serverIntroduce,
						serverProvidePictures : res.data['appInfoBean'].serverProvidePictures,
						versionIntroduce : res.data['appInfoBean'].versionIntroduce,
						useInstruction : res.data['appInfoBean'].useInstruction,
						          
						curOnlineVersionCode : res.data['appInfoBean'].curOnlineVersionCode,
						curUploadVersionCode : res.data['appInfoBean'].curUploadVersionCode,
						curUploadVersionName : res.data['appInfoBean'].curUploadVersionName,
						curUploadVersionNo : res.data['appInfoBean'].curUploadVersionNo,
						packageName : res.data['appInfoBean'].packageName,
						appSize : res.data['appInfoBean'].appSize,
						serverDownPath : res.data['appInfoBean'].serverDownPath,
						htmlUrl : res.data['appInfoBean'].htmlUrl,
						fileId : res.data['appInfoBean'].fileId,
        		activeStep :2}})
        	
						_this.$router.push({name:"uploadApps",params: { serverName: res.data['appInfoBean'].serverName,activeStep :2}})

			          
			      }).catch(function (res) {
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
				
      },
	timeTrans(value) {
       var date = new Date(value)
       var Y = date.getFullYear()
       var m = date.getMonth() + 1
       var d = date.getDate()
       var H = date.getHours()
       var i = date.getMinutes()
       var s = date.getSeconds()
        if (m < 10) {
            m = '0' + m
        }
        if (d < 10) {
            d = '0' + d
        }
        if (H < 10) {
            H = '0' + H
        }
        if (i < 10) {
            i = '0' + i
        }
        if (s < 10) {
            s = '0' + s
        }

        var t = Y+'-'+ m +'-'+ d +' '+ H + ':' + i +':'+ s
        return t
 },   
},
  computed: {
    totalCommentSize () {
      return this.total
    }
  },
  watch: {
    movie: {
      handler: function (val, oldVal) {
        console.log('99999999999999999')
        this.handleCurrentChange(this.currentPage)
      },
      deep: true
    }
  }
}
</script>

<style>
	.friends-lists{
    background-color:#fff;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.08);
    margin-top: 50px;
    }
  .ver-table{
  	width: 90% !important;
  	margin-left: 5%;
  	border: 0 !important;
  	text-align: center;
		
  }
  .el-pagination{
  	text-align: right;
  	margin-right: 5%;
  }
  .cell{
  	text-align: center;
  	margin-right: 0px !important;
  	word-break:break-word !important;
  }
  .el-table-column{
  	border: 0 !important;
  }
  .el-table td{
  	border-bottom: 0 !important;
  	padding: 7px ;
  	color: #979797;
  }
  .el-table th
  	{
  		border: 0 !important;
  		padding:9px 0;
  		background-color: #F5F7F6 !important;
  	}
    .el-table th .cell{
    	color: #9AA7B6 !important;
    	font-weight: normal;
    	font-size: 15px;
    	background-color: #F5F7F6;
    }
</style>
<style>
.el-button + .el-button {
    margin-left: 0px ;
    margin-top:0px ;
}
.el-table__body tr.current-row>td {
    background: #57CF8D !important;
    color:#fff !important
}
.el-table__body tr.positive-row>td {
    background: #57CF8D !important;
    color:#fff !important
}
/*.el-button:focus, .el-button:hover {
    color: #57cf8d !important;
    border-color: #57cf8d !important;
}*/
.el-table::after, .el-table::before{
	background: none !important;
}
.table-btn:hover, .table-btn:focus{
	color: #57cf8d !important;
    border-color: #57cf8d !important;
}
.cell{
	 padding-left: 0 !important;
   padding-right: 0 !important;
}
.el-table__row td{
	 padding-left: 0 !important;
   padding-right: 0 !important;
}
.el-table__body-wrapper {
    overflow: hidden !important;  
    position: relative;
}
.el-upload-list--picture-card .el-upload-list__item {
    background-color: #fff;
    border: 1px dashed #c0ccda !important;
    border-radius: 6px;
    box-sizing: border-box;
    display: inline-block;
    height: 148px;
    margin: 0 8px 8px 0;
    overflow: hidden;
    width: 148px;
}
.no-records{
	text-align: center;
	margin-top: 8%;
}
.el-loading-spinner .el-loading-text {
    color: #57cf8d !important;
    margin: 3px 0;
    font-size: 14px;
}
.el-button--text{
		color:#57CF8D !important
}
.el-pagination{
	padding-bottom: 40px !important;
}
.el-pager li:hover {
    color: #57CF8D !important;
}
.el-pagination button:hover {
    color: #57CF8D !important;
}
</style>
