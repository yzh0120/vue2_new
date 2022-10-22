import request from "@/utils/axiosHttp";

/**
 * 用户登录
 * @param {*} params 
 * @returns 
 */
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data: data
  })
}
