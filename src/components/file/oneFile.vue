



 <!-- 
 @success="(e)=>upLoadSuccess(e.res,e.taskName,e)"  这是此文件 有意的传参
 e是啥:
 {
	 file:
				name: "bc46ae05d293411786e930847ae79c86 (1).docx"
				percentage: 100
				raw: File
				response: {code: 200, info: '成功', data: {…}} -> res
				size: 14398
				status: "success"
				uid: 1645172356056
				
	 fileList: 就是 file 的集合
	 res:    
				code: 200
				data:
					appendCommentId: null
					createTime: "2022-02-18 16:19:15"
					createUserId: "1"
					createUserName: "admin"
					downloadCount: null
					fileDes: null
					fileExtensions: ".docx"
					fileName: "bc46ae05d293411786e930847ae79c86 (1).docx"
					filePath: "2022/02/4ebf70ae8ad84ce7bd0aa0023a94239d.docx"
					fileSize: 14398
					fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
					fileUrl: "http://api.szdbtest.zksj.com.cn/resources/"
					folderId: "1470676865478955011"
					id: "1494587302314455042"
					isDeleted: null
					onlinePreviewUrl: null
					remarks: null
					taskHistoryId: null
					taskName: "中标通知书"
					type: 2
				info: "成功"
	 taskName: 
 }
 -->
<template>
  <span>
    <el-progress :percentage="percentage" :text-inside="true" :stroke-width="15" v-if="percentage"></el-progress>

    <el-upload :disabled="btnDisabled" class="i-upload" :action="uploaduUrl" :show-file-list="false" multiple
      :on-success="upLoadSuccess" :on-error="error" :before-upload="
        (file) => {
          return beforeUpload(file, uploadObj);
        }
      " :on-change="handleChange" :headers="uploadHeaders" :on-progress="progress">
      <el-button :disabled="btnDisabled" :size="size" type="primary" v-on:click="setUploaduUrl">{{ btnText }}
      </el-button>
    </el-upload>


  </span>
</template>
 
<script>

import {
  getCookie
} from '@/utils/auth.js';
import * as fileApi from "@/api/file";
/* 
 up:{
          name: "中标通知书",
          taskName: "中标通知书",
          detail: [
        
        {
        num:3,  
        type:["doc", "docx"]
        }
      ],
          require: 0,
        },
 */
// let currentNum = 0;

export default {
  props: {
    // limit: {
    //       type: Number,
    //       default: null,
    //     },
    //项目id
    projectId: {
      type: [String, Number],
      default: "",
    },
    //文件对象信息
    uploadObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //上传路径可选
    path: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "上传资料",
    },
    size: {
      type: String,
      default: "mini",
    }
  },
  data() {
    return {
      currentNum: 0,
      percentage: 0,
      uploaduUrl: "", //process.env.VUE_APP_down_API + "/v1/base/file/upload", //上传地址
      btnDisabled: false,
      uploadHeaders: {
        //上传头
        Authorization: getCookie("token"),
      },
    };
  },
  created() {
    this.getFiles(); //获取历史文件///////////////////切换

  },
  methods: {
    //获取文件
    getFiles() {
      ///////////////////切换
      if (this.projectId) {
        fileApi
          .getFileListByFolderId({
            folderId: this.projectId,
            taskName: this.uploadObj.taskName,
          })
          .then((res) => {
            if (res.code == 200) {
              this.uploadObj.detail = res.data;
            } else {
              this.$message.error(res.info);
            }
          });
      }

    },
    // 0 设置路由
    setUploaduUrl() {
      // if (this.url) {
      //   this.uploaduUrl =
      //     process.env.VUE_APP_BASE_API + this.url
      // } else if (this.projectId) {
      //   this.uploaduUrl =
      //     process.env.VUE_APP_BASE_API +
      //     "/v1/base/file/upload" +
      //     "?folderId=" +
      //     this.projectId +
      //     "&taskName=" +
      //     this.uploadObj.taskName;
      // }

      if (this.path) {
        this.uploaduUrl = `${process.env.VUE_APP_BASE_API}${this.path}`
      } else if (this.projectId) {
        this.uploaduUrl = `${process.env.VUE_APP_BASE_API}/v1/base/file/upload?folderId=${this.projectId}&taskName=${this.uploadObj.taskName}`
      }

    },
    // 1 上传图片之前
    beforeUpload(file, item) {
      let activeFileType = file.name.split(".").pop();
      // return new Promise((resolve, reject) => {
      if (item.num && item.detail.length + this.currentNum >= item.num) {
        this.btnDisabled = !this.btnDisabled;
        this.$message.error(`只能上传${item.num}个`);
        // reject();
        return false;
      }
      // if (item.type && item.type.length && !item.type.some(p => p == activeFileType)) {//!item.type.includes(activeFileType)
      else if (
        item.type &&
        item.type.length &&
        !item.type.includes(activeFileType)
      ) {
        this.$message.error(`请上传正确的文件类型`);
        this.btnDisabled = !this.btnDisabled;
        // reject();
        return false;
      } else {
        // resolve();
        this.currentNum++;
        return true;
      }
      // });
    },
    //2 点击上传文件时的改变事件
    handleChange() {
      this.btnDisabled = !this.btnDisabled;
    },
    //2.5 文件上传中
    progress(event, file, fileList) {
      this.percentage = 0;
      // this.uploadPercentVisited = true;
      this.$nextTick(() => {
        this.percentage = Number(file.percentage.toFixed(0));
        if (this.percentage >= 100) {
          this.percentage = 0;
        }
      });
    },
    //3 文件上传成功
    upLoadSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.currentNum = 0;
        this.$message.success(res.data.fileName + "上传成功！");


        if (this.path) {
          this.$emit("success", {
            taskName: this.uploadObj.taskName,
            res,
            file,
            fileList,
          });
        }
        if (this.projectId) {
          fileApi
            .getFileListByFolderId({
              folderId: this.projectId,
              taskName: this.uploadObj.taskName,
            })
            .then((res) => {
              if (res.code == 200) {
                this.uploadObj.detail = res.data;
                this.$emit("success", {
                  taskName: this.uploadObj.taskName,
                  res,
                  file,
                  fileList,
                });
              } else {
                this.$message.error(res.info);
              }
            });
        }


        //      this.$emit("success", {///////////////////切换
        // taskName: this.uploadObj.taskName,
        // res,
        // file,
        // fileList,
        //       });
      } else {
        this.$message.error(res.info);
      }
    },
    error() {
      this.btnDisabled = !this.btnDisabled;
    },
  },
};
</script>
 
<style style="scss" scoped>
.downloadFile {
  cursor: pointer;
}
</style>
 