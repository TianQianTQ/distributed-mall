import http from './public'
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/accounts/login', params)
}
// 退出登陆
export const loginOut = () => {
  return http.fetchGet('/accounts/logout')
}
// 用户信息
export const userInfo = () => {
  return http.fetchGet('/accounts/info')
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/accounts/register', params)
}
// 获取验证码
export const getSmsCode = (params) => {
  return http.fetchGet('/accounts/send-captcha', params)
}
// // 上传图片
// export const upload = (params) => {
//   return http.fetchPost('/business/upload-image', params)
// }
// // 修改头像
// export const updateheadimage = (params) => {
//   return http.fetchPost('/users/updateheadimage', params)
// }
// 修改用户信息
export const updateInfo = (params) => {
  return http.fetchPost('/accounts/update', params)
}
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/products/home', params)
}

// 商品分类
export const category = () => {
  return http.fetchGet('/products/category')
}

