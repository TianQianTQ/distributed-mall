import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/accounts/login', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchPost('/users/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchPost('/users/userInfo', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/accounts/register', params)
}
// 获取验证码
export const getSmsCode = (params) => {
  return http.fetchGet('/accounts/send-captcha', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/users/upload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/users/updateheadimage', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/products/home', params)
}

