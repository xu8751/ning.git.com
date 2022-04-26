<template>
  <div>
    <div class="container">
        <el-upload
          class="upload-demo"
          ref="upload"
          :beforeUpload="beforeUploadPicture"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :multiple="true"
          :on-success="uploadSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-button size="small" type="primary" @click ="queryResult"> 查询</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
    <div>
      <el-button size="small" type="primary" @click ="deleteResult">
          删除
      </el-button>
    </div>
    <div class="showcontent">
      <div v-for="(item,index) in itemList" :key="index">
        <img class="img" :src='item' />
      </div>
    </div>
  </div>
</template>

<script>
import * as dataOperationFun from '@/api/operationalData';
import moment from 'moment';
import XLSX from 'xlsx';
// import fileType from '@renderer/utils/filetyoe.js';
export default {

  data:()=> ({
    fileList: [],
    dialogImageUrl: '',
    dialogVisible: false,
    itemList:[],
    fileListName:'文件名称',
    filejson:'',
    value1:moment(new Date()).format('YYYY-MM-DD')
  }),

  components: {

  },

  mounted() {
    // var Mock = require('mockjs')
    // var data = Mock.mock({
    //     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    //     'list|1-10': [{
    //         // 属性 id 是一个自增数，起始值为 1，每次增 1
    //         'id|+1': 1
    //     }]
    // })
    // // 输出结果
    // console.log(JSON.stringify(data, null, 4))
    var _this = this;
    _this.queryResult();
  },

  methods: {
      //删除所有数据
      deleteResult(){
        dataOperationFun.deleall({}).then((res)=>{
          console.log(res);
        }).catch((error)=>{
          console.log(error)
        });
      },
      // importFun(file, fileList){
      //   this.fileListName = file.name;
		  //   const fileReader = new FileReader();
      // 	fileReader.onload = (ev) => {
      //   try {
      //     const data = ev.target.result;
      //     const workbook = XLSX.read(data, {
      //       type: 'binary'
      //     });
      //     //console.log(workbook)
      //     let sheet = Object.keys(workbook.Sheets)[0];
      //     const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);  //获得以第一列为键名的sheet数组对象
      //     this.filejson = json;
      //     console.log(json)
      //     } catch (e) {
      //       console.log(e)
      //     }
      //   };
      //   fileReader.readAsBinaryString(file.raw);
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeUploadPicture(file){
        const isImage = file.type == 'image/png' || file.type == 'image/jpg' ||  file.type == 'image/jpeg' || file.type == 'image/bmp' || file.type == 'image/gif' || file.type == 'image/webp';
        // const isLt2M = file.size <  1024 * 1024 * 2;
        if (!isImage) {
          this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!');
        }else{
          
        }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // console.log(fileType.map);
        // var file = (...fileType.map)filter(x=>{x=='file.type'})
        var filedata = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function(file){
            let imgdata = {
              name:filedata.name,
              data:reader.result,
              time:moment(new Date()).format('YYYY-MM-DD'),
              type:filedata.type,
            }
            dataOperationFun.adddata(imgdata).then((res)=>{
              console.log(res);
            }).catch((error)=>{
              console.log(error)
            });
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemovePicture(file, fileList) {
        console.log(file, fileList);
      },
      imageChange(file, fileList, name) {
        console.log(file, fileList);
      },
      // 上传成功的处理,这里长传成功之后需要关闭弹框
      uploadSuccess(res, file, fileList) {
          if (res.code == 200) {
              // this.$message({
              //     message: "上传文件成功!",
              //     type: "success",
              // });
              this.dialogShow = false;
          } else {
              // this.$message({
              //     message: "上传文件失败!",,
              //     type: "error",
              // });
              this.$refs.upload.clearFiles(); // 清空组件的文件
          }
          this.fileList = []; // 清空绑定数据
      },
      submitUpload(){
          this.$refs.upload.submit();
      },
      //查询图片格式文件
      queryResult(){
        // var file = {type: "image/jpeg"};
        // var file = {type: "load"};
        var file = ''
        dataOperationFun.finddata(file).then((res)=>{
          var itemarr = [];
          this.itemList = [];
          for(let i=0;i<res.length;i++){
            itemarr.push(res[i].data);
          }
          this.itemList = itemarr;
        }).catch((error)=>{
          console.log(error)
        });
      }
  },
  computed: {
        // uploadUrl: function () {
        //     return baseUrl + this.folderId; 
        //     // 返回基础的请求地址和文件夹id拼接的请求地址
        //     // 实例:   "/upload/huejiw95ec16147a3965b9f";
        // },
        // // 上传的文件请求头,如果不需要请求头,可以不设置这个属性
        // uploadHeader: function () {
        //     if (authorization) {
        //      // authorization是一个全局变量,挂载在window上的
        //         return {
        //             Authorization: "Bearer " + authorization.token,
        //         };
        //     } else return {};
        // }
    }
}

</script>
<style lang='scss' scoped>
  .container{
    padding:20px;
  }
  .showcontent{
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: repeat(10, minmax(0, 1fr));
    img{
      height:100px;
      width:100px;
    }
  }
</style>