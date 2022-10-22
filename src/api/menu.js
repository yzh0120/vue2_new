/**
 * 菜单管理
 */
import request from "@/utils/axiosHttp";

/**
 * 获取菜单列表
 * @param {*} params 
 * @returns 
 */
export function getmodulelist(params) {
  return request({
    url: "/user/getmodulelist",
    method: "get",
    params: params
  })
}
