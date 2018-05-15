import http from './public'
// 商品列表--
export const getProductsList = (params) => {
  return http.fetchPost('/products/list', params)
}
// 获取购物车列表    !Q
// export const getCartList = (params) => {
//   return http.fetchPost('/users/cartList', params)
// }
// 加入购物车   !
// export const addCart = (params) => {
//   return http.fetchPost('/goods/addCart', params)
// }
// 批量加入购物车m  !
// export const addCartBatch = (params) => {
//   return http.fetchPost('/goods/addCartBatch', params)
// }
// 删除购物车   !
// export const delCart = (params) => {
//   return http.fetchPost('/goods/delCart', params)
// }
// 编辑购物车   !
// export const cartEdit = (params) => {
//   return http.fetchPost('/users/cartEdit', params)
// }
// 全选       !
// export const editCheckAll = (params) => {
//   return http.fetchPost('/users/editCheckAll', params)
// }
// 删除整条购物车   !
// export const cartDel = (params) => {
//   return http.fetchPost('/users/cartDel', params)
// }
// 获取用户地址--
export const addressList = () => {
  return http.fetchGet('/accounts/list-address')
}
// 修改收货地址--
export const addressUpdate = (params) => {
  return http.fetchPost('/accounts/update-address', params)
}
// 添加收货地址--
export const addressAdd = (params) => {
  return http.fetchPost('/accounts/add-address', params)
}
// 删除收货地址--
export const addressDel = (params) => {
  return http.fetchGet('/accounts/delete-address', params)
}
// 收货地址详情
export const infoAddress = (params) => {
  return http.fetchGet('/accounts/info-address', params)
}

// 创建订单
export const createOrder = (params) => {
  return http.fetchPost('/orders/create', params)
}

// 支付
export const payMent = (params) => {
  return http.fetchGet('/orders/pay', params)
}
// 查看订单
export const orderList = (params) => {
  return http.fetchPost('/orders/list', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/products/info', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/orders/delete', params)
}

// 更新订单状态

export const ordersUpdate = (params) => {
  return http.fetchGet('/orders/update', params)
}

// 优惠券列表
export const couponList = (params) => {
  return http.fetchGet('coupon-template/list', params)
}

// 领取优惠券
export const getCoupon = (params) => {
  console.log(params.params.templateId)
  return http.fetchGet('coupon/'+params.params.templateId, params)
}
// 用户优惠券列表

export const userCoupon = (params) => {
  return http.fetchGet('user/'+params.params.userId)
}
