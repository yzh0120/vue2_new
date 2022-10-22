import request from "@/utils/axiosHttp";

/**
 * 获取用户基础信息
 * @param {*} params 
 * @returns 
 */
export function getAppSession(data) {
  return request({
    url: "/user/getUserInfo",
    method: "get",
    params: data
  })
}
