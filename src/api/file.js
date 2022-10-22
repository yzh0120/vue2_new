/*
 * @Author: wjs
 * @Date: 2022-02-18 12:37:13
 * @Description: 文件管理操作方法
 * @FilePath: \oaweb\src\api\file.js
 * 
 */
import oarequest from "@/utils/oarequest";
import axios from 'axios';
import {
  getCookie
} from '@/utils/auth.js';

import {
  Message,
  MessageBox
} from 'element-ui';

/**
 * 封装download下载文件流
 * @param url
 * @param title
 * @returns {Promise}
 */

export function download(params = {}, type, baseUrl = "") {
  let baseURL = baseUrl || process.env.VUE_APP_BASE_API;
  let headers = {
    'Authorization': "Bearer " + getCookie("token")
  }

  // if (!type) {
  //   if (/.xls|.xlsx|.doc|.docx|.ppt|.pptx/g.test(params.fileUrl)) {
  //     var ele = `
  //                  <iframe src='https://view.officeapps.live.com/op/view.aspx?src=${params.fileUrl}' width='100%' height='100%' frameborder='1'>
  //                  </iframe>
  //              `;
  //     var newwindow = window.open(params.fileUrl, "_blank", '');
  //     newwindow.document.write(ele);
  //   } else {
  //     window.open(params.fileUrl)
  //   }

  //   return;
  // }
  if (!type) {
    // return location.href = params.fileUrl
    return window.open(params.fileUrl)
  }

  let url = "" //"/v1/base/file/download"
  if (type == "batchImportHistory") {
    url = "/v1/data/batchImportHistory/download"
  } else if (type == "blacklist") {
    url = "/v1/data/blacklist/download"
  } else if (type == "riskmargin") {
    url = "/v1/performance/riskmargin/download"
  } else if (type == "performanceroyalty") {
    url = "/v1/performance/performanceroyalty/download"
  } else if (type == "riskmarginD") {
    url = "/v1/performance/riskmargin/downloadItems"
  } else if (type == "performanceroyaltyD") {
    url = "/v1/performance/performanceroyalty/downloadItems"
  } else if (type == "bill") {
    url = "/v1/data/apibill/exportDetail"
  } else if (type == "projectMeetingDownload") {
    url = "/projectMeeting/download"
  } else if (type == "filedownload") {
    url = "/v1/base/file/download"
  } else if (type == "bankCommondownload") { // 下载回传保函扫描件
    url = "/bh/bankCommon/download"
  } else {
    url = type
  }
  let msg = Message({
    message: "正在下载文件，请稍等",
    type: 'warning',
    duration: 0
  })

  return new Promise((resolve, reject) => {
    axios({
        method: 'get',
        url: url,
        baseURL: baseURL,
        params: params,
        responseType: 'blob',
        headers: headers
      })
      .then(response => {
        msg.close();

        // 兼容blob下载出错json提示
        if (response.request.responseType === 'blob' && response.data instanceof Blob && response.data.type && response.data.type.toLowerCase().indexOf('json') != -1) {
          reject("blob下载出错json提示")
          // 兼容blob下载出错json提示
          let reader = new FileReader()
          reader.onload = () => {
            response.data = JSON.parse(reader.result);

            Message({
              message: response.data.info,
              type: 'warning',
              duration: 2000
            })
            // resolve(Promise.reject(response.data.info))
          }

          reader.onerror = () => {
            // reject(response.data.info)
          }

          reader.readAsText(response.data)
          // 兼容blob下载出错json提示
          return;
        }
        // else {
        //   console.log("没有转JSON")
        // }

        let blob = new Blob([response.data]);
        let objectUrl = URL.createObjectURL(blob);

        let link = document.createElement("a");
        link.style.display = "none";
        link.href = objectUrl;
        if (response.headers.filename) {
          link.setAttribute("download", decodeURIComponent(response.headers.filename));
        } else {
          link.setAttribute("download", decodeURIComponent(response.headers["content-disposition"].split("filename=")[1]));
        }
        // link.setAttribute("download", decodeURIComponent(response.headers["content-disposition"].split("filename=")[1]));
        document.body.appendChild(link);
        // console.log(link, "link")
        link.click();
        resolve("成功")
      })
      .catch(err => {
        console.log(err, "err")
        msg.close();
        reject(err)
      })
  })
}


/**
 * 删除文件
 * @param {*} data 
 * @returns 
 */
export function del(data, fileDes = "") {
  return oarequest({
    url: `/v1/base/file/delete?fileDes=${fileDes}`,
    method: "post",
    data: data
  })
}


/**
 * folderId获取文件列表
 * @param {*} data 
 * @returns 
 */
export function getFileListByFolderId(data) {
  return oarequest({
    url: "/v1/base/file/getFileListByFolderId",
    method: "get",
    params: data
  })
}

/**
 * 银行电子保函获取文件列表
 * @param {*} data {fileType:"",projectId:""}
 * @returns 
 */
export function getBhFileAnnexesList(data) {
  return oarequest({
    url: "/bhFileAnnexes/getBhFileAnnexesList",
    method: "get",
    params: data
  })
}

/*
添加备注操作
*/
export function insertFileRemarks(data) {
  return oarequest({
    url: "/v1/base/file/insertFileRemarks",
    method: "get",
    params: data
  })
}

/**
 * 查询某个文件的历史文件
 * @param {*} data 
 * @returns 
 */
export function getHistoryFileListByFolderId(data) {
  return oarequest({
    url: "/v1/base/file/getHistoryFileListByFolderId",
    method: "get",
    params: data
  })
}

/**
 * 通过id获取附件
 * @param {*} data 
 * @returns 
 */
export function filebyId(data) {
  return oarequest({
    url: "/v1/base/file/id",
    method: "post",
    params: data
  })
}

/**
 * 获取文件在线预览url
 * @param {*} data 
 * @returns 
 */
export function onlinePreviewUrl(data) {
  return oarequest({
    url: "/v1/base/file/onlinePreviewUrl",
    method: "get",
    params: data,

    timeout: 10 * 60 * 1000,
  })
}
