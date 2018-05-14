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
// 转换时间戳
export function timestampToTime(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y+M+D+h+m+s;
}

