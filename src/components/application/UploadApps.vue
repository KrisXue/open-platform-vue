<template>
  <div class="upload-view" v-loading="loading" :element-loading-text="loadingText">
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
  	<p style="padding:19px 0 25px 40px; font-size:18px; margin:0;" v-if='activeStep === 0'>上传安装包</p>
  	<p style="padding:19px 0 25px 40px; font-size:18px; margin:0;" v-if='activeStep === 1'>版本检测</p>
    <p style="padding:19px 0 25px 40px; font-size:18px; margin:0;" v-if='activeStep === 2'>信息维护</p>
    <div class="upload-step" style="margin-left: 100px; margin-right: 100px;">
      <mu-stepper :activeStep="activeStep">
        <mu-step>
          <mu-step-label>
          	上传安装包
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
          	版本检测
          </mu-step-label>
        </mu-step>
        <mu-step>
          <mu-step-label>
          	{{status}}
          </mu-step-label>
        </mu-step>
      </mu-stepper>
      <div class="upload-step-content">
        <template v-if="!finished">
          <div v-if="activeStep === 0" class="upload-step-one">
						<div style="margin-bottom: 20px;padding-bottom:20px;text-align: center;">
							<br><br><br>
							<span class="pre-text" style='margin-top:10px,width:19%'>选择安装包：</span>
							<input type="text" class="input-line"  @change="onFileChange"
					    	style="font-size: 0.9em; color: #999; height: 40px; width:51%;box-shadow:inset 0 1px 2px rgba(0, 0, 0, 0.075);">
								<!--<img  src='../../assets/shangchuan_icon_file.png' style='position:relative;top:15px;left:10px;bottom:0;'/>-->
		            <div slot="tip" class="el-upload__tip">请选择小于100M的安装包（*apk）</div><br>
		            <el-upload class="upload-demo" accept="application/vnd.android.package-archive"
		            	:action = "uploadApkAction()"
									:on-preview="handlePreview" 
									:on-remove="handleRemoveApk" 
									:on-success="handleApkSuccess"
									:on-progress='onApkProgress'
									:before-upload="beforeApkUpload" 
									:file-list="fileList">
									<br><br>
		            	<mu-raised-button size="middle"  :label="fileName !== '' ? '上传中...' : '点击上传'" style="width:200px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;top:-43px" :disabled="fileName !== ''" v-if ="fileName === ''"></mu-raised-button>
		            </el-upload>
		            <mu-raised-button size="middle"  :label="testing ? '检测中...' : '上传中...'" style="width:200px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;top:-50px" :disabled="true" v-if ="fileName !== ''"></mu-raised-button>
		            <input type="file" @change="onFileChange" multiple style="display: none;">
		         </div>
          </div>
          <div v-if="activeStep === 1" class="upload-step-two">
          	<div class="friends-lists" >
          	 <el-table :data="currentUploadPackage"  ref="singleTable" highlight-current-row @current-change="handleCurrentChange" stripe style="width: auto">
						    	<el-table-column
						      type="index"
						      label="序号"
						      width="80">
						    </el-table-column>
						      <el-table-column
						        prop="package"
						        label="包名"
						        width="auto">
						      </el-table-column>
						      <el-table-column
						        prop="onVersionCode"
						        label="已上线版本"
						        width="auto">
						      </el-table-column>
						      <el-table-column
						        prop="versionName"
						        label="当前上传版本号"
						        width="auto">
						      </el-table-column>
						      <el-table-column
						        prop="msgCode"
						        label="检测结果"
						       	width="auto">
						      </el-table-column>
						    </el-table>
						    </div>
						    <mu-dialog :open="dialog" title="提示" @close="close" width ='300px' height = '200px'>
						    	 <div class="upload-button" style='text-align: center;'>
						    	<img src='../../assets/tankuang_pic_tishi.png' style='text-align: center;'/>
						    	</div>
							    		服务商城存在已上传未审核的版本，继续上传将会覆盖原来版本，是否继续？
								  <div class="upload-button" style='text-align: center;margin-top: 30px;'>
								    <mu-raised-button size="middle" label="取消"  @click="close" style="width:100px;height:40px;margin-right: 10px;"/>
	            			<mu-raised-button size="middle" label="确定"    @click="continueClick" style="width:100px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;margin-left:10px;"/>
								  </div>
						    </mu-dialog>
						    <br>
          </div>
          <div v-if="activeStep === 2" class="upload-step-three">
          	<div style="width: auto; margin: 0 15% 0 18%;">
								<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px"  class="demo-ruleForm" >
										  <el-form-item label="服务名称：" prop="serverName">
										    <el-input  v-model="ruleForm.serverName" style="width:80%"></el-input>
										  </el-form-item>
										  <el-form-item class='serverLogo' label="服务logo：" required >
										  	<el-upload accept="image/png"
												  class="avatar-uploader"
												  :action = "uploadLogoAction()"
												  :show-file-list="false"
												  :on-success="handleLogoSuccess"
												  :before-upload="beforeLogoUpload"
												  :on-change ="changeLogo"
												   v-model='ruleForm.serverLogo'>
												  <img v-if="imageUrl" :src="imageUrl" class="avatar">
												  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
												</el-upload>
										  </el-form-item>

										  <p style='color:#48576a;margin-left: 16%;margin-bottom:5%'>125*125 ,大小不超过200KB,格式为png的图片</p>
										  <el-form-item label="建议分类：" prop="categoryId">
										  	<el-select v-model="ruleForm.categoryId" placeholder="请选择" @change="changeValue" style="width:215px" popper-class="sug-class" @visible-change="hiddenDown">
											    <el-option
											      v-for="category in categoryLists"
											      :key="category.categoryId"
											      :label="category.categoryName"
											      :value="category.categoryId">
											    </el-option>
											  </el-select>
										  </el-form-item>
										  <el-form-item label="是否需要开通：" prop="serverIsopen" class="is-open">
										    <el-select v-model="ruleForm.serverIsopen" placeholder="请选择" style="width:215px" popper-class="isopen" @visible-change="hiddenDown">
										      <el-option
											      v-for="item in options"
											      :key="item.serverIsopen"
											      :label="item.label"
											      :value="item.serverIsopen">
											    </el-option>
										    </el-select>
										    <el-button type="text" v-show="ruleForm.serverIsopen==='0'" @click="dialogFormAction">开通要求维护</el-button>
										  </el-form-item>
										  <el-form-item label="H5地址：" v-show = "ruleForm.serverIsopen==='0'">
										    <el-input v-model="ruleForm.htmlUrl" style="width:80%"></el-input>
										  </el-form-item>
										  <el-form-item label="测试账号：" prop="testUser" >
										    <el-input v-model="ruleForm.testUser" style="width:80%"></el-input>
										  </el-form-item>
										  <el-form-item label="测试密码：" prop="testPwd">
										    <el-input type='password' v-model="ruleForm.testPwd" style="width:80%"></el-input>
										  </el-form-item>
										  <el-form-item label="服务提供方："  required>
										    <el-input v-model="orgName" style="width:80%" :disabled = 'true'>{{orgName}}</el-input>
										  </el-form-item>
										  <el-form-item label="服务介绍：" prop="serverIntroduce" >
										   <el-input maxlength="500" type="textarea" v-model="ruleForm.serverIntroduce" style="width:80%" :rows="5" placeholder="对该服务的基本情况进行描述，不超过500个字"></el-input>
										  </el-form-item>
										  <el-form-item label="服务介绍图片：" class='serverProvidePictures' required >
											    <div v-if="images.length >0">
											      <ul class='el-upload-list el-upload-list--picture-card'>
											        <li v-for="(image,index) in images" class='el-upload-list__item is-success'>
											          <img :src="image" @click='delImage(index)' class='el-upload-list__item-thumbnail'/>
											            <span @click='delImage(index)' class="el-upload-list__item-actions"><span class="el-upload-list__item-delete"><i class="el-icon-delete2"></i></span></span>
											        </li>
											      </ul>
											    </div>
										  	<el-upload class="pic-uploader" accept="image/jpeg"
												  :action="uploadPicAction()"
												  list-type="picture-card"
												  :on-success="handlePicSuccess"
												  :before-upload="beforePicUpload" 
												  :on-remove="handleRemove"
												  v-model = 'ruleForm.serverProvidePictures'  v-if="!image">
												  <i class="el-icon-plus"></i>
												</el-upload>
										  </el-form-item>
										  <el-form-item label="服务介绍图片：" class='serverProvidePictures' required v-if='false'>
													  		<img  v-for='pic in ruleForm.serverProvidePictures' :src="pic" alt="">
												  	</ul>
												</el-dialog>
										  </el-form-item>
										  <p style='color:#48576a;margin-left: 16%;margin-bottom:5%'>请上传至少两张大小为不超过200KB，格式为jpg的图片</p>
										  <el-form-item label="版本介绍：" prop="versionIntroduce" >
										   <el-input maxlength="500" type="textarea" v-model="ruleForm.versionIntroduce" style="width:80%" :rows="5" placeholder="对该服务版本的基本情况进行描述，不超过500个字"></el-input>
										  </el-form-item>
										  <el-form-item label="使用说明：" prop="useInstruction" >
										    <el-input maxlength="500" type="textarea" v-model="ruleForm.useInstruction" style="width:80%"  :rows="5" placeholder="对该服务版本的基本情况进行描述，不超过500个字"></el-input>
										  </el-form-item>
										  <br>
										  <el-form-item>
										  	<mu-raised-button size="middle"  style="width:35%;color:#FFFFFF;;margin-right:9%;background:#57cf8d;height:40px;" @click="saveInfo('ruleForm')">暂存</mu-raised-button>
										    <mu-raised-button size="middle"  style="width:35%;color:#FFFFFF;background:#57cf8d;height:40px;" @click="submitInfo('ruleForm')">提交申请</mu-raised-button>
										  </el-form-item>
							</el-form>
							</div>
							<el-dialog title="维护参数" :visible.sync="dialogFormVisible">
							  <div class="panel-body form-horizontal">
								<el-form :model="maintainFileds"  :rules="rules" ref="maintainFileds" label-width="150px"  class="demo-ruleForm"  style='margin-left: 11%;'>
									<el-form-item label="字段名：" prop="fieldCode">
											<el-input  v-model="maintainFileds.fieldCode" style="width:80%" placeholder="请输入字段名"></el-input>
									</el-form-item>
									<el-form-item label="字段名称：" prop="fieldName">
											<el-input  v-model="maintainFileds.fieldName" style="width:80%" placeholder="请输入字段名称"></el-input>
									</el-form-item>
									 <el-form-item label="是否必须：" required>
									    <el-radio-group v-model="maintainFileds.isNeed">
									      <el-radio :label="1">是</el-radio>
    										<el-radio :label="0">否</el-radio>
									    </el-radio-group>
									</el-form-item>
									<el-form-item label="示例：" prop="openmaintainExample">
											<el-input  type='textarea' v-model="maintainFileds.openmaintainExample" style="width:80%" placeholder="请输入示例"></el-input>
									</el-form-item>
									<el-form-item label="描述：" prop="openmaintainDescription">
											<el-input  type='textarea' v-model="maintainFileds.openmaintainDescription" style="width:80%" placeholder="请输入描述"></el-input>
									</el-form-item>
									<el-form-item>
											<mu-raised-button size="middle"  style="width:100px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;"  @click="createFiled('maintainFileds')">添加</mu-raised-button>
											<mu-raised-button size="middle"  style="width:100px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;"  @click="closeDialog('maintainFileds')">完成</mu-raised-button>
									</el-form-item>
								</el-form>
								</div>  
								  <div class="panel-body"> 
								   <table class="table text-center" width="100%"> 
								    <thead style="background-color: #57CF8D;color:#fff;border: 1px solid #979797;line-height: 40px;"> 
								     <tr style='border:1px solid #979797;'> 
								      <th class="text-center" width="150px">字段名</th> 
								      <th class="text-center" width="150px">字段名称</th>
								      <th class="text-center" width="250px">是否必须</th> 
								      <th class="text-center" width="150px">示例</th> 
								      <th class="text-center" width="150px">描述</th> 
								      <th class="text-center" width="150px">操作</th> 
								     </tr> 
								    </thead> 
								    <tbody style="background-color:#F5F7F6;"> 
								     <tr v-for="filed in fileds">
								     	<td style='text-align: center;' :title="filed.fieldCode">{{ filed.fieldCode.length>6?filed.fieldCode.substring(0,6)+'...':filed.fieldCode}}</td> 
								      <td style='text-align: center;' :title="filed.fieldName">{{ filed.fieldName.length>6?filed.fieldName.substring(0,6)+'...':filed.fieldName}}</td> 
								      <td style='text-align: center;' v-if='filed.isNeed===1'>是</td> 
								      <td  style='text-align: center;' v-if='filed.isNeed===0'>否</td>
								      <td style='text-align: center;' v-if="filed.isNeed==='1'">是</td> 
								      <td  style='text-align: center;' v-if="filed.isNeed==='0'">否</td>
								      <td  style='text-align: center;' :title="filed.openmaintainExample">{{ filed.openmaintainExample.length>6?filed.openmaintainExample.substring(0,6)+'...':filed.openmaintainExample}}</td> 
								      <td  style='text-align: center;' :title="filed.openmaintainDescription">{{ filed.openmaintainDescription.length>6?filed.openmaintainDescription.substring(0,6)+'...':filed.openmaintainDescription}}</td> 
								      <td  style='text-align: center;padding-top:2px'><mu-raised-button @click="deleteFiled($index)" style="background-color:#57cf8d;color:#fff">删除</mu-raised-button></td> 
								     </tr> 
								    </tbody> 
								   </table> 
								  </div> 
							</el-dialog>
          </div>
          <div class="upload-button" v-if ="activeStep === 1 "style='text-align: center;'>
            <mu-raised-button size="middle"  label="上 一 步" :disabled="activeStep === 0" @click="handlePrev" style="background-color:#57cf8d;color: #FFFFFF;width:247px;margin-right: 30px;height: 40px;"/>
            <mu-raised-button size="middle"  :label="activeStep === 2 ? '完成' : '下 一 步'" :disabled="!(msgCode === '00037' || msgCode === '00000') "  @click="handleNext" style="width: 247px; background-color:#57cf8d;color: #FFFFFF;margin-left: 30px;height: 40px;"/>
          </div>
          <!--<div class="upload-button" style='text-align: center;'>
            <mu-raised-button size="middle" label="上 一 步" :disabled="activeStep === 0" @click="handlePrev" style="width:200px;height:40px;background-color:#57cf8d;color: #fff;"/>
            <mu-raised-button size="middle" :label="activeStep === 2 ? '完成' : '下 一 步'"   @click="handleNext" style="width:200px;color:#FFFFFF;background-image: linear-gradient(44deg, #70E3A4 0%, #2DCF76 100%);height:40px;"/>
          </div>-->
        </template>
      </div>
     </div>
    </div>
</template>

<script>
import appApi from '../../api/appApi'
import {api} from '../../api/api'
import _ from 'lodash'
import axios from 'axios'
import $ from 'jquery'
import Base64 from 'js-base64'
import Store from '../../utils/store.js'
export default {
  beforeCreate () {	

  },
  created () {
  	//获取建议分类下拉数据
  	this.infoMaintain()
  	//获取已登录用户名
    let user = Store.fetch('user')
    this.userName = user.user.userName
    this.logName = user.user.logName
    //机构名称
    this.orgName = user.user.orgName
    if(this.$route.params.activeStep !== undefined){
  		this.activeStep = this.$route.params.activeStep
  		this.ruleForm.serverName= this.$route.params.serverName
			this.imageUrl= this.$route.params.serverLogo
			this.logoUrl = this.imageUrl
			
			this.ruleForm.categoryId= this.$route.params.categoryId
			this.categoryName= this.$route.params.categoryName
			this.ruleForm.serverIsopen= this.$route.params.serverIsopen.toString()
			this.fileds = this.$route.params.fileds
			this.ruleForm.testUser= this.$route.params.testUser
			this.ruleForm.testPwd= this.$route.params.testPwd
			this.ruleForm.serverProvide= this.$route.params.serverProvide
			this.ruleForm.serverIntroduce= this.$route.params.serverIntroduce
			
			var arrayPic =[]
			arrayPic = this.$route.params.serverProvidePictures.replace('[','').replace(']','')
			console.log('arrayPic:'+arrayPic)
			if(arrayPic.indexOf(',') !== -1){
				arrayPic = arrayPic.split(',')
				this.images = arrayPic
			}else{
				this.images.push(arrayPic)
			}
		
			this.ruleForm.versionIntroduce= this.$route.params.versionIntroduce
			this.ruleForm.useInstruction= this.$route.params.useInstruction
			this.htmlUrl= this.$route.params.htmlUrl
			
			this.onVersionCode= this.$route.params.curOnlineVersionCode
			this.versionName= this.$route.params.curUploadVersionCode
			this.versionName= this.$route.params.curUploadVersionName
			this.versionCode= this.$route.params.curUploadVersionNo
			this.packageName= this.$route.params.packageName
			this.appSize= this.$route.params.appSize
			this.apkUrl= this.$route.params.serverDownPath
			this.fileId= this.$route.params.fileId
			console.log(this.fileId)
  	}
    $(document).ready(function(){
			var browserWidth = document.body.clientHeight - 180
			var minHeight = browserWidth + "px"
    	if(document.body.clientHeight>609){
	 			$(".upload-view").css("min-height", minHeight)
	    }
    	var browserWidth = document.body.clientWidth
			var headerWidth = browserWidth + "px"
		 	$("#header").css("width", headerWidth)
    })
  },
  data () {
    return {
    	isSize:'',
    	loadingText:'',
    	testing:false,
    	isFieldNameError:false,
    	isOpenmaintainExampleError:false,
    	isOpenmaintainDescriptionError:false,
			maintainFileds: {
					fieldCode:'',
			    fieldName:'',
					isNeed:1,
					openmaintainExample:'' ,
					openmaintainDescription:''
			    }, 
			fileds: [] ,
    	dialog:false,
    	isCover:0,
    	images: [],
    	isUpload:false,
      activeStep: 0,
      status: '信息维护',
      apkUrl:'',
      fileName:'',
      fileId:'',
      appSize:'',
      curOnlineVersionCode:'',
			curUploadVersionCode:'',
			curUploadVersionName:'',
			curUploadVersionNo:'',
			packageName:'',
			appSize:'',
			serverDownPath:'',
			fileId:'',
     	packageName:'',
	    onVersionCode:'',
	    versionCode:'',
	    currentUploadPackage:'',
      imageUrl: '',
      logoUrl:'',
      options:[{
          serverIsopen: '0',
          label: '是'
        },{
          serverIsopen: '1',
          label: '否'
        }],
      isNeedOptions:[{
          isNeed: '1',
          label: '是'
        },{
          isNeed: '0',
          label: '否'
        }],
      tableData: [{
      	package:'',
	    	onVersionCode:'',
	    	versionCode:'',
	    	msgCode:''
      }],
      msgCode:'',
      multipleSelection: [],
      serverPictures:[],
      logName:'',
      userName:'',
      orgName:'',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      sizePerOnePage: 8,
      fullscreenLoading:false,
      loading:false,
      categoryLists: [],
      categoryId:'',
      categoryName:'',
      serverIsopen:'',
      value: '',
      ruleForm: {
          serverName: '',
          serverLogo: '',
          categoryId: '',
          serverIsopen: '',
          htmlUrl:'_blank',
          testUser: '',
          testPwd: '',
          serverProvide: '',
          serverIntroduce:'',
          serverProvidePictures:[],
          versionIntroduce: '',
          useInstruction: ''
       },
      rules: {
      		fieldCode: [
            { required: true, message: '请输入字段名', trigger: 'change' },
            {validator:(rule,value,callback)=>{
			        if(/^[a-zA-Z]+$/.test(value) == false){
			          callback(new Error("字段名只能是字母"));
			        }else{
			          callback();
			        }
			      }, trigger:'change'}
          ],
        	fieldName: [
            { required: true, message: '请输入字段名', trigger: 'change' }
          ],
          isNeed: [
            { required: true, message: '请选择是否必须', trigger: 'change' }
          ],
          openmaintainExample: [
            { required: true, message: '请输入填写示例', trigger: 'change' }
          ],
          openmaintainDescription: [
            { required: true, message: '请输入描述', trigger: 'change' }
          ],
          serverName: [
            { required: true, message: '请输入服务名称', trigger: 'change' }
          ],
          serverLogo: [
            { required: true, message: '请上传服务Logo', trigger: 'change' }
          ],
          categoryId: [
            { type: 'number', required: true, message: '请选择建议分类', trigger: 'change' }
          ],
          serverIsopen: [
            { required: true, message: '请选择是否开通', trigger: 'change' }
          ],
          testUser: [
            { required: true, message: '请输入测试账号', trigger: 'change' }
          ],
          testPwd: [
            { required: true, message: '请输入测试密码', trigger: 'change' }
          ],
          serverProvide: [
            { required: true, message: '请输入服务提供方', trigger: 'change' }
          ],
          serverIntroduce: [
            { required: true, message: '请输入服务介绍', trigger: 'change' },
             {max: 500, message: '长度小于500个字符', trigger: 'change' }
          ],
          serverProvidePictures: [
            { type: 'array',required: true, message: '请上传服务介绍照片',  trigger: 'change' }
          ],
          versionIntroduce: [
            { required: true, message: '请输入版本介绍', trigger: 'change' },
             { max: 500, message: '长度小于500个字符', trigger: 'change' }
          ],
          useInstruction: [
            { required: true, message: '请输入使用说明', trigger: 'change' },
            {max: 500, message: '长度小于500个字符', trigger: 'change' }
          ]
        },
        dialogFormVisible: false,
        isAdd : false

    }
  },
  computed: {
    finished () {
      return this.activeStep > 2
    },
    totalCommentSize () {
      console.log('--------------------')
      console.log(this.tableData.length)
      return this.tableData.length
    }
  },
  methods: {
		hiddenDown(){
    	$("body").scroll(function() {
        $(".el-select-dropdown").css("display","none")		   
				//visible-change
		  })
		},
  	continueClick(){
  		this.isCover = 1
  		this.activeStep++
  	},
  	close(){
  		this.dialog = false
  	},
  	closeDialog(formName){
  		this.$refs[formName].validate((valid) => {
						if(valid){
							  	this.dialogFormVisible = false
  								$('.el-form-item__error').hide()
						}
        })

  	},
  	dialogFormAction(){
  		this.dialogFormVisible = true
  		$('.el-form-item__error').hide()
  	},
	 createFiled(formName) {
	 	$('.el-form-item__error').hide()
        this.$refs[formName].validate((valid) => {
						if(valid){
								var tempCode = ''
								this.fileds.forEach(function(item){
									console.log(item);
									console.log(item.fieldCode);
									tempCode = item.fieldCode
									
									});
									console.log(tempCode);
								if(this.maintainFileds.fieldCode === tempCode){
									  this.$alert('参数名:  '+tempCode+'   已存在！', '', {
					            	confirmButtonText: '确定',
					            	type:'info'
					            })
									}else{
											this.fileds.push(this.maintainFileds); 
											this.maintainFileds = {
															fieldCode:this.maintainFileds.fieldCode,
													    fieldName:this.maintainFileds.fieldName,
															isNeed:this.maintainFileds.isNeed,
															openmaintainExample:this.maintainFileds.openmaintainExample ,
															openmaintainDescription:this.maintainFileds.openmaintainDescription
													   }
										
									}

						}
        })

     },
    deleteFiled: function(index){ 
     // 删一个数组元素 
     this.fileds.splice(index,1); 
    } ,
    addPic () {
      $('input[type=file]').trigger('click')
      return false
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
    },
    delImage: function (index) {
//  	var _this = this
//  	console.log(index)
//  	console.log('删除的url为：'+_this.images[index])
//  	var data = {
//  		url : _this.images[index]
//  	}
//  	appApi.deleteFile(data).then(function (res) {
//          	 if (res.data['msgCode'] !== '00000') {
//				             _this.$alert(res.data['message'], '', {
//				            	confirmButtonText: '确定',
//				            	type:'error'
//				            })
//				        }
//			          
//			      }).catch(function (res) {
//				        if (res instanceof Error) {
//				          _this.$alert('服务器开小差了，请稍后再试...', '', {
//		            	confirmButtonText: '确定',
//		            	type:'error'
//		            })
//				        } else {
//				          _this.$alert('服务器开小差了，请稍后再试...', '', {
//		            	confirmButtonText: '确定',
//		            	type:'error'
//		            })
//				         }
//				      })
    	
			this.images.splice(index,1)
//    console.log('还剩下这些iamages'+this.images)
    },
  	uploadApkAction(){
  		return  appApi.uploadApk()+"&filesId=&userName="+encodeURI(encodeURI(this.userName))
  	},
  	uploadLogoAction(){
  		return  appApi.uploadLogo()+"&filesId="+this.fileId+"&userName="+encodeURI(encodeURI(this.userName))
  	},
  	uploadPicAction(){
  		return  appApi.uploadPic()+"&filesId="+this.fileId+"&userName="+encodeURI(encodeURI(this.userName))
  	},
  	changeValue(value) {
		      let obj = {};
		      obj = this.categoryLists.find((category)=>{
		      	  console.log(value);
		          return category.categoryId === value;
		          
		      });
		      this.categoryName = obj.categoryName 
		},
  	addApk(e){
            e.preventDefault();
            $('input[type=file]').trigger('click');
            return false;
        },
    onFileChange(e) {
            $('input[type=text]').val($('input[type=file]').val())
       },
    handleCurrentChange(val) {
        return this.currentRow = val;
     },
    infoMaintain(){
    	 var data = {
			  	'appDownPath' : '123'
			  }
    	 var _this = this
	    	appApi.infoMaintain(data).then(function (res) {
	          // 获取categoryLists
	            let categoryLists = res.data['categoryLists']
						  _this.categoryLists = categoryLists
	      })
	   },
	  handleApkSuccess(res, file) {	
	  	if(res['msgCode'] === '00000'){
	  		this.activeStep++
	  		this.fileId = res['fileId']
		  	this.apkUrl = res['url']
		  	this.tableData = [{
      	package:'',
	    	onVersionCode:'',
	    	versionCode:'',
	    	msgCode:''
      }]
		  	this.readApk()
	  	}else{
	  		this.$alert(res.data['message'], '', {
		          confirmButtonText: '确定',
		          type:'error'
		      })
	  	}
	  	
      },
    readApk(){
    	var _this = this
			_this.loading = true
			_this.loadingText = '版本检测中，请稍后...'
    		var data = {
			  	'fileId': this.fileId,
			  	'url':this.apkUrl
			  }
    	appApi.readAPK(data).then(function (res) {
    		_this.loading = false
				_this.packageName = res.data['package']
		    _this.onVersionCode= res.data['onVersionCode']
		    _this.versionCode= res.data['versionCode']
		    _this.versionName = res.data['versionName']
				_this.tableData.push(res.data)
				_this.msgCode =res.data['msgCode'] 
  			_this.currentUploadPackage = []
  			console.log(_this.tableData)
  			console.log(_this.tableData.length)
//	      for (var i = 1; i < _this.tableData.length; i++) {
	        _this.currentUploadPackage.push(_this.tableData[1])
	        console.log(_this.currentUploadPackage)
	        if(_this.tableData[1].msgCode === '00000'){
	        	_this.tableData[1].msgCode = '成功'
	        	//_this.activeStep++
	        }	
	        if(_this.tableData[1].msgCode === '00035'){
	        	_this.tableData[1].msgCode = '异常:'+_this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00037'){
	        	_this.tableData[1].msgCode = _this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00041'){
	        	_this.tableData[1].msgCode = '异常:'+_this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00042'){
	        	_this.tableData[1].msgCode ='异常:'+ _this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00043'){
	        	_this.tableData[1].msgCode ='异常:'+ _this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00044'){
	        	_this.tableData[1].msgCode ='异常:'+ _this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00040'){
	        	_this.tableData[1].msgCode = '异常:'+_this.tableData[1].message
	        	//_this.activeStep++
	        }
	        if(_this.tableData[1].msgCode === '00032'){
	        	_this.tableData[1].msgCode = '异常:'+_this.tableData[1].message
	        	//_this.activeStep++
	        }
//	      }
    		
    	})
    	.catch(function (res) {
				        if (res instanceof Error) {
				        	_this.loading = false
				          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        } else {
				        	_this.loading = false
				          __this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        }
				      })
    },
//  handleApkError(){
//  	this.$alert('上传apk失败！', '', {
//	            	confirmButtonText: '确定',
//	            	type:'error'
//	            }).then(() => {
//							$('input[type=text]').val('')
//							this.fileName = ''
//									})
//  },
    onApkProgress(){
    	this.testing = false
      	if($('.el-progress__text').text().toString() === '99%' ){
      		$('.el-progress__text').html('99%')
      	}
    	
       $('.el-upload-list__item-name').remove()
    },
    beforeApkUpload(file) {
       $('input[type=text]').val(file.name)
        this.fileName = file.name
				var fileType = file.name.slice(-3)
				const isAPK = fileType === 'apk'
				console.log(fileType)
        console.log(isAPK)
        const isLt100M = file.size / 1024/1024 < 100;
        this.appSize = file.size

        if (!isAPK) {
          this.$message.error('上传的安装包只能是 APK 格式!')
          $('input[type=text]').val('')
          this.fileName = ''
        }
        if (!isLt100M) {
          this.$message.error('上传的安装包大小不能超过 100	M!')
          $('input[type=text]').val('')
          this.fileName = ''
        }
        return  isAPK&&isLt100M;
     },
	  handleLogoSuccess(res, file) {			
  			this.logoUrl = res['url']
  			console.log(this.logoUrl)
  			this.serverLogo = res['url']
  			$(".serverLogo").find(".el-form-item__error").remove()
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log('isSize3'+this.isSize)
        if (!this.isSize) {
          this.$message.error('上传LOGO图片尺寸应该是125*125，请重新上传!')
        }
      },
    changeLogo(file, fileList){
			var image = new Image();
    	var _this = this
      image.onload = function () {
               var  width = this.width;
               var height =  this.height;
               if(this.width !== 125 || this.height !== 125){
               		_this.imageUrl = ''
               		_this.isSize = false
               		console.log('isSize1'+_this.isSize)
               		//_this.$message.error('上传LOGO图片尺寸应该是125*125，请重新上传!')
               }else{
               	_this.isSize = true
               	console.log('isSize2'+_this.isSize)
               }
              }
      image.src = URL.createObjectURL(file.raw);
    },
    beforeLogoUpload(file) {
        $('.serverLogoInput').find('input[type=text]').val(file.name)
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 < 200;

        if (!isPNG) {
          this.$message.error('上传LOGO图片只能是 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传LOGO图片大小不能超过 200KB!');
        }

        return isPNG && isLt2M ;
      },
    handlePicSuccess(res, file) {
    		let serverPictures = []
    		this.serverPictures.push(res['url'])
  			$(".serverProvidePictures").find(".el-form-item__error").remove()
      },
    beforePicUpload(file) {
    		console.log(file)
        const isJPG = file.type === 'image/jpeg';
        //const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 < 200;

        if (!isJPG) {
          this.$message.error('上传的介绍图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传的介绍图片大小不能超过 200KB!');
        }
        return isJPG && isLt2M;
      },
  	handleRemoveApk(file, fileList) {
  			//abort(file in fileList)
  			
  			this.fileName = ''
  			$('input[type=text]').val('')
        console.log(file, fileList);
      },
      handlePictureCardPreview(res,file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //暂存维护信息
	  saveInfo(formName) {
        this.$refs[formName].validate((valid) => {
        	console.log('服务logo啊  ====='+this.imageUrl)
        	if(this.imageUrl === ''){
        		$('.avatar-uploader').after('<div class="el-form-item__error">请上传服务LOGO</div>')
        		return
        	}
        	if(this.serverPictures.concat(this.images).length <2){
        		$('.pic-uploader').after('<div class="el-form-item__error">请上传至少两张服务介绍图片</div>')
        		return 
        	}
          if (valid) {
          	var data ={
          		  'logName' : this.logName,
			          'serverName': this.ruleForm.serverName,
			          'serverLogo': this.logoUrl,
			          'categoryId': this.ruleForm.categoryId,
			          'categoryName': this.categoryName,
			          'serverIsopen': this.ruleForm.serverIsopen,
			          'data':this.fileds,
			          'testUser': this.ruleForm.testUser,
			          'testPwd': this.ruleForm.testPwd,
			          'serverProvide': this.orgName,
			          'serverIntroduce': this.ruleForm.serverIntroduce,
			          'serverProvidePictures': this.serverPictures.concat(this.images),
			          'versionIntroduce': this.ruleForm.versionIntroduce,
			          'useInstruction': this.ruleForm.useInstruction,
			          
			          'curOnlineVersionCode':this.onVersionCode,
			          'curUploadVersionCode':this.versionName,
			          'curUploadVersionName':this.versionName,
			          'curUploadVersionNo':this.versionCode,
			          'packageName':this.packageName,
			          'appSize':this.appSize,
			          'serverDownPath':this.apkUrl,
			          'htmlUrl':this.ruleForm.htmlUrl,
			          'fileId':this.fileId,
			          'isCover':this.isCover
          	}
          	var _this = this
          	_this.loading = true
          	_this.loadingText = ''
            appApi.saveInfoMaintain(data).then(function (res) {
            	 if (res.data['msgCode'] !== '00000') {
				        		 _this.loading = false
				             _this.$alert(res.data['message'], '', {
				            	confirmButtonText: '确定',
				            	type:'error'
				            })
				        } else {
				          // 暂存
				          	_this.loading = false
								    _this.$alert(res.data['message'], '', {
				            	confirmButtonText: '确定',
				            	type:'success'
				            }).then(() => {
							          _this.$router.push({name:"myApps",params: {packageName:_this.packageName}})
							        })
				        }
			          
			      }).catch(function (res) {
				        if (res instanceof Error) {
				        	_this.loading = false
				          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        } else {
				        	_this.loading = false
				          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        }
				      }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },   
			//提交维护信息      
      submitInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if(this.imageUrl === ''){
        		$('.avatar-uploader').after('<div class="el-form-item__error">请上传服务LOGO</div>')
        		return
        	}
        	if(this.serverPictures.concat(this.images).length === 0){
        		$('.pic-uploader').after('<div class="el-form-item__error">请上传服务介绍图片</div>')
        		return 
        	}
          if (valid) {
          	var data ={
          			'logName' : this.logName,
			          'serverName': this.ruleForm.serverName,
			          'serverLogo': this.logoUrl,
			          'categoryId': this.ruleForm.categoryId,
			          'categoryName': this.categoryName,
			          'serverIsopen': this.ruleForm.serverIsopen,
			          'data':this.fileds,
			          'testUser': this.ruleForm.testUser,
			          'testPwd': this.ruleForm.testPwd,
			          'serverProvide': this.orgName,
			          'serverIntroduce': this.ruleForm.serverIntroduce,
			          'serverProvidePictures': this.serverPictures.concat(this.images),
			          'versionIntroduce': this.ruleForm.versionIntroduce,
			          'useInstruction': this.ruleForm.useInstruction,
			          
			          'curOnlineVersionCode':this.onVersionCode,
			          'curUploadVersionCode':this.versionName,
			          'curUploadVersionName':this.versionName,
			          'curUploadVersionNo':this.versionCode,
			          'packageName':this.packageName,
			          'appSize':this.appSize,
			          'serverDownPath':this.apkUrl,
			          'htmlUrl':this.ruleForm.htmlUrl,
			          'fileId':this.fileId,
			          'isCover':this.isCover
          	}
          	var _this = this
          	_this.loading = true
          	_this.loadingText = ''
            appApi.submitInfoMaintain(data).then(function (res) {
            	 if (res.data['msgCode'] !== '00000') {
				        		 _this.loading = false
				             _this.$alert(res.data['message'], '', {
				            	confirmButtonText: '确定',
				            	type:'error'
				            })
				        } else {
				          // 提交
				          	_this.loading = false
								    _this.$alert(res.data['message'], '', {
				            	confirmButtonText: '确定',
				            	type:'success'
				            }).then(() => {
							          _this.$router.push({name:"myApps",params: {packageName:_this.packageName}})
							        })
				        }
			          
			      }).catch(function (res) {
				        if (res instanceof Error) {
				        	_this.loading = false
				          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        } else {
				        	_this.loading = false
				          _this.$alert('服务器开小差了，请稍后再试...', '', {
		            	confirmButtonText: '确定',
		            	type:'error'
		            })
				        }
				      }) 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },   
  	get_friend () {
      var _this = this
      _this.getCurrentFriend(1)
    },
        handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCurrentFriend(val)
    },
    getCurrentFriend (page) {
      var size = this.tableData.length
      console.log('****************')
      console.log(size)
      // var sizePerOnePage = 2
      var startFriend = this.sizePerOnePage * (page - 1)
      var endFriend = startFriend + this.sizePerOnePage
      endFriend = endFriend < size ? endFriend : size
      this.currentFriend = []
      for (var i = startFriend; i < endFriend; i++) {
        this.currentFriend.push(this.tableData[i])
      }
    },
  	handleRemove(file, fileList) {
  		console.log(file.response.url)
  		console.log(this.serverPictures)
  		for(var i = 0; i<this.serverPictures.length;i++){
					if(this.serverPictures[i] === file.response.url){
						console.log('下标'+i)
						this.serverPictures.splice(i,1)
						console.log(this.serverPictures)
					}
  		}
  		console.log(this.serverPictures)
        
      },
    goToIndexPage () {
      this.$router.push('/')
    },
    handleNext () {
      if (this.activeStep === 0) {
        if (true) {
        	//this.uploadApk()
          this.activeStep++
        }
      } else if (this.activeStep === 1) {
      	if(this.msgCode === '00037'){
      		    this.$confirm('服务商城存在已上传未审核的版本，继续上传将会覆盖原来版本，是否继续', '', {
	            	confirmButtonText: '继续',
	            	cancelButtonText: '取消',
	            	confirmButtonClass:'queding',
	            	cancelButtonClass:'quxiao',
	            	type:'info'
	           }).then(() => {
	           	this.isCover = 1
							this.activeStep++
									})
      	}else{
      		this.isCover = 0
      		this.activeStep++
      	}
      } else {
      	
        this.activeStep++
      }
    },
    handlePrev () {
      this.activeStep--
      this.tableData = [{
      	package:'',
	    	onVersionCode:'',
	    	versionCode:'',
	    	msgCode:''
      }]
      this.fileName = ''
      
    },
    reset () {
      this.activeStep = 0
    }
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
.avatar-uploader .el-upload 
    border 1px dashed #d9d9d9
    border-radius  6px
    cursor pointer
    position relative
    overflow hidden
  
.avatar-uploader .el-upload:hover 
    border-color #20a0ff
  
.avatar-uploader-icon 
    font-size 28px
    color #8c939d
    width 125px
    height 125px
    line-height 125px
    text-align center
  
.avatar 
    width 125px !important
    height 125px !important
    display block
  
.el-pager li.active 
    background-color #7e57c2
    border-color #7e57c2
    color #fff
    cursor: default
    
/*@media screen and (min-height:600px) and (max-height:800px) {
	
}*/
.upload-view
  margin-top 50px
  padding-bottom 50px
  height 100%
  min-height 600px
  background-color #fff;
  box-shadow  0px 2px 4px 0px rgba(0,0,0,0.08)
  .upload-step
    margin 0 300px
    /*background-color rgb(51, 31, 149)*/
    .upload-step-content
      width 100%
      margin 0 auto
      /*background-color rgb(137, 25, 176)*/
      .upload-step-one

      .upload-step-two
        .password-score
          height 10px
          width 245px
          border 1px solid #ccc
          margin-left 55px
          .password-weak
            height 8px
            width 82px
            background-color #ff5957
          .password-medium
            height 8px
            width 165px
            background-color orange
          .password-strong
            height 8px
            background-color green
        .verification-area
          .verification-input
            float left
            width 200px
          .verification-button-div
            float left
            width 100px
            height 80px
            display table
            .verification-button
              float left
              margin-top 25%
              display table-cell
              vertical-align middle
      .upload-step-three
				
      .upload-back-button
        margin-left 0
      .upload-forward-button
        margin-left 50px
    input:focus 
	    border-color #57cf8d !important
	    box-shadow 0 0 3px #57cf8d !important
    input
      outline none
      -webkit-outline none  
  	textarea:focus
  		border-color #57cf8d !important
	    box-shadow 0 0 3px #57cf8d !important
    textarea
    	outline none
      -webkit-outline none  
    .el-input:focus
    	border-color #57cf8d !important
	    box-shadow 0 0 3px #57cf8d !important
	  .el-textarea__inner:focus
	  	border-color #57cf8d !important
	    box-shadow 0 0 3px #57cf8d !important
</style>
<style>
.el-pager li.active {
    border-color: #57CF8D !important;
    background-color: #57CF8D !important;
    color: #fff !important;
    cursor: default !important;
}
.el-select-dropdown__item.selected {
    color: #fff;
    background-color: #57cf8d !important;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload-list__item .el-progress {
    position: absolute;
    top: 20px;
    width: 100% !important;
}

.el-progress__text {
    color: #57cf8d !important;
    display: inline-block;
    font-size: 14px;
    line-height: 1;
    vertical-align: middle;
}
.el-progress-bar__inner{
	background-color: #57cf8d !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #57cf8d !important;
    border-color: #57cf8d !important;
}
.el-table__body tr.current-row > td {
    background: #57cf8d none repeat scroll 0 0;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none !important;
}
.el-upload--picture-card {
    background-color: #fff !important;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px !important;
    height: 148px !important;
    cursor: pointer;
    line-height: 146px;
    vertical-align: top;
}
.el-upload-list--picture-card .el-upload-list__item-actions :hover {
    opacity: 1;
}
.el-upload-list--picture-card a .el-upload-list__item-actions span {
    display: none;
    cursor: pointer;
}
.form-group{
	margin-top:10px
}
.el-dialog__body{
	padding-top: 0px !important;
}
.el-input__inner {
    -moz-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ddd !important;
    border-radius: 3px !important;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0 none;
    padding: 3px 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    box-shadow:inset 0 1px 2px rgba(0,0,0,0.075) ;
}
.mu-dialog-body {
    color: rgba(0, 0, 0, 0.6);
    padding: 24px 24px 20px;
    text-align: center;
}
.mu-raised-button.disabled {
		background-color: #57cf8d !important;
		background-image: none !important;
		opacity: .6;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.118), 0 1px 4px rgba(0, 0, 0, 0.118) !important;
    cursor: not-allowed;
}
.queding{
	width: 165px;
	position: relative;
	left: 0px;
}
.quxiao{
	width: 165px;
	float: left;
	position: relative;
	left: 0px;
}
.el-button--default{
	position: relative;
	right: 52px;
}
.el-progress-bar {
    box-sizing: border-box;
    margin-right: -55px;
    padding-right: 50px;
    width: 65% !important;
}
.quxiao:focus,.quxiao:hover{
	border-color: #57CF8D !important;
	color:#57CF8D !important
}
.mu-step-label-circle, .mu-step-label.disabled .mu-step-label-circle {
    background-color: #E9EDF2 !important
}
.mu-step-connector-line {
    border-color: #E9EDF2 !important;
    border-top: 1px solid #E9EDF2 !important;
    display: block;
    margin-left: -6px;
}
.mu-step-label.disabled {
    color: #979797 !important;
    cursor: not-allowed;
}
.mu-stepper{
	margin: 0 20% 0 20%
}
.el-select-dropdown{
	 z-index: 998 !important;
}
body{
	position: static !important;
}
.el-radio__input.is-checked .el-radio__inner {
    background: #57CF8D none repeat scroll 0 0 !important;
    border-color: #57CF8D !important;
}
.el-message{
	margin-left:5% !important ;
	
}
.el-icon-edit:hover, .el-icon-information:hover, .el-icon-message:hover, .el-icon-close:hover {
    cursor: pointer;
    color: transparent !important;
}
/*.cell{
	margin-right: 10px !important;
}*/
</style>