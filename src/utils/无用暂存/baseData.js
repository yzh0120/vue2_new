import * as dataItemApi from "@/api/dataDic"
import * as userApi from "@/api/user"
import * as companyApi from "@/api/company"
import * as departmentApi from "@/api/department"
import * as roleApi from "@/api/role"
import * as postApi from "@/api/post"

import {
  Message,
} from 'element-ui';

/**
 * 获取数据字典
 * @param {*} data 
 *  @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema | 
 *  @param | -------- | -------- | ----- | -------- | -------- | ------ | 
 *  @param |itemCode|itemCode|query|false|string|| 
 *  @param |keyword|keyword|query|false|string|| 
 * @returns 
 */
export function getDataItemDetailList(data) {
  return new Promise((resolve, reject) => {
    dataItemApi.getdetaillist(data).then(res => {
      if (res.code == 200) {
        resolve(res.data)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 获取公司数据
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |enCode|公司代码|query|false|string||
 * @param |manager|负责人|query|false|string||
 * @param |name|公司名称|query|false|string||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @param |parentId|上级主键id|query|false|string||
 * @returns 
 */
export function getCompanyList(data) {
  return new Promise((resolve, reject) => {
    companyApi.search(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 获取部门数据
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |companyId|公司主键id|query|false|string||
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |fullName|部门名称|query|false|string||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @returns 
 */
export function getDepartmentList(data) {
  return new Promise((resolve, reject) => {
    departmentApi.search(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 获取角色数据
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @param |roleName|角色名称|query|false|string||
 * @param |type|角色类型|query|false|string||
 * @returns 
 */
export function getRoleList(data) {
  return new Promise((resolve, reject) => {
    roleApi.search(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 获取岗位数据
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @param |roleName|角色名称|query|false|string||
 * @param |type|角色类型|query|false|string||
 * @returns 
 */
export function getPostList(data) {
  return new Promise((resolve, reject) => {
    postApi.search(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 获取用户数据
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |companyId|公司主键|query|false|string||
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |departmentId|部门主键|query|false|string||
 * @param |email|电子邮箱|query|false|string||
 * @param |gender|性别|query|false|integer(int32)||
 * @param |nickName|昵称|query|false|string||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @param |phone|手机号码|query|false|string||
 * @param |realName|真实姓名|query|false|string||
 * @param |userName|用户名|query|false|string||
 * @returns 
 */
export function getUserList(data) {
  return new Promise((resolve, reject) => {
    userApi.search(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}

/**
 * 根据角色主键查找用户
 * @param {*} data 
 * @param | 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
 * @param | -------- | -------- | ----- | -------- | -------- | ------ |
 * @param |curPage|当前页码|query|false|integer(int32)||
 * @param |pageSize|每页条数|query|false|integer(int32)||
 * @param |roleId|角色主键|query|false|string||
 * @returns 
 */
export function finduserByRoleId(data) {
  return new Promise((resolve, reject) => {
    roleApi.finduser(data).then(res => {
      if (res.code == 200) {
        resolve(res.data.contents)
      } else {
        Message({
          message: res.info,
          type: 'error',
          duration: 3 * 1000
        })
      }
    })
  })
}
