export function getUrlParam(name) {
  // const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const str = window.location+'';
  const r = str.split('=')[1];
  return r;
}
// 获取商品页面序号
export function getItem() {
  return getUrlParam('item');
}
