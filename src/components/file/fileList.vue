<template>
  <div>
    <panel>
      <div slot="head">
        <!-- <h4>资料文件信息</h4> -->
        资料文件信息
      </div>
      <table class="table row">
        <tbody>
          <tr>
            <td width="30%">资料名称</td>
            <td>详情</td>
            <td width="13%" v-if="showUploadBtn">操作</td>
          </tr>
          <tr v-for="(item, index) in fileList" :key="index">
            <td>
              {{ item.name }}
              <span style="color: red" v-if="item.require">*</span>
            </td>
            <td>
              <file-list-show :arr="item.detail" :del="candelete" />
            </td>
            <td class="text-center">
              <oneFile :projectId="projectId" :uploadObj="item"></oneFile>
            </td>
          </tr>
        </tbody>
      </table>
    </panel>
  </div>
</template>

<script>
/* 
   /*
    arr:[
       {
         name: "中标通知书",
         taskName: "中标通知书",
         detail: [],
         require: 0,
       },
       {
         name: "其他辅助资料",
         taskName: "其他辅助资料",
         detail: [
         
       ],
         require: 0,
       }
     ],
    */

// import * as Cookie from "@/tools/cookjs.js";
import {
  getCookie
} from '@/utils/auth.js';
export default {
  props: {
    /**
     * 是否显示上传按钮
     */
    showUploadBtn: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否显示删除按钮
     */
    candelete: {
      type: Boolean,
      default: true,
    },
    projectId: {
      type: [String, Number],
      default: "",
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      //uploaduUrl: process.env.VUE_APP_down_API + "/v1/base/file/upload", //上传地址
      uploadHeaders: {
        //上传头
        Authorization: getCookie("token"),
      },
      taskName: "",
    };
  },
  methods: {
    check() {
      let checkOK = true;
      try {
        this.fileList.forEach((item) => {
          if (item.required) {
            if (!item.detail[0]) {
              this.$message.error(`请上传${item.name}`);
              checkOK = false;
              throw new Error("EndIterative");
            }
          }
        });
      } catch (e) {
        if (e.message != "EndIterative") throw e;
      }
      if (!checkOK) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style style="scss" scoped>
.downloadFile {
  cursor: pointer;
}
</style>



<!-- <template>
  <div>
    <panel >
      <div slot="head" >
        <h4>资料文件信息</h4>
      </div>
      <table class="table row">
        <tbody>
          <tr>
            <td width="30%">资料名称</td>
            <td>详情</td>
            <td width="13%">操作</td>
          </tr>
          <tr v-for="(item,index) in fileList" :key="index">
            <td>{{item.name}} <span style="color:red" v-if="item.require">*</span> </td>
            <td>
			  <file-List :arr="item.detail" :del="true"/>
            </td>
            <td class="text-center">
				<up :projectId="projectId" :uploadObj="item" @success="(e)=>upLoadSuccess(e.res,e.taskName)" ></up>
            </td>
          </tr>

        </tbody>
      </table>
    </panel>
  </div>
</template>

<script>
import * as fileApi from "@/axios/api/file";
import * as Cookie from "@/tools/cookjs.js";
export default {
  props: {
    projectId: {
      type: String,
      default: "",
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      uploaduUrl: process.env.VUE_APP_down_API + "/v1/base/file/upload", //上传地址
      uploadHeaders: {
        //上传头
        // Authorization: Cookie.get("token")
		"Authorization": process.env.VUE_APP_down_token_API
      },
      taskName: "",
    };
  },
  created() {
    this.getFiles(); //获取历史文件
  },
  methods: {
	 //获取文件
    getFiles() {
      this.fileList.forEach((item) => {
        fileApi
          .getFileListByFolderId({
            folderId: this.projectId,
            taskName: item.taskName,
          })
          .then((result) => {
            if (result.code == 200) {
              item.detail = result.data;
            } else {
              this.$message.error(res.info);
            }
          });
        // }
      });
    },

    //3 文件上传成功
    upLoadSuccess(res,taskName) {
      if (res.code == 200) {
        this.$message.success(res.data.fileName + "上传成功！");
        this.fileList.forEach((item) => {
          if (item.taskName == taskName) {
            fileApi
              .getFileListByFolderId({
                folderId: this.projectId,
                taskName: taskName,
              })
              .then((result) => {
                if (result.code == 200) {
                  item.detail = result.data;
                } else {
                  this.$message.error(res.info);
                }
              });
          }
        });
      } else {
        this.$message.error(res.info);
      }
    },

  },
};
</script>

<style style="scss" scoped>
.downloadFile {
  cursor: pointer;
}
</style> -->




<!-- 
 必填校验
 	 
 -->


