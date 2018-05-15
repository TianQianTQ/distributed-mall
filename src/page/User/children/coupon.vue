<template>
  <div>
    <y-shelf title="我的优惠">
      <div slot="content">
        <div v-if="couponList.length">
          <div v-for="(item,i) in couponList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <!--<span class="date" >{{item.data}} </span>-->
                  <span class="order-id"> 优惠券编号： <a href="javascript:;">{{item.couponId}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">类型</span>
                  <span class="price">优惠</span>
                  <span class="price">使用情况</span>
                </div>
              </div>
              <div class="last">
                <span class="order-detail"> 使用时间 </span>
              </div>
            </div>
            <div class="pr">
              <div class="cart" >
                <div class="cart-l" :class="{bt:i>0}">
                  <div class="car-l-l">
                    <div class="img-box">{{item.description}}</div>
                  </div>
                  <div class="cart-l-r">
                    <div class="ellipsis">{{item.type}}</div>
                    <div class="ellipsis" v-if="item.amount">￥{{item.amount}}</div>
                    <div class="ellipsis" v-else>{{item.percentOff}}%</div>
                    <div v-text="item.status===2 ? '已使用':'未使用'"></div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
                <div class="prod-operation pa" style="right: 0;top: 0;">
                  <!--<div class="status"> {{item.orderStatus === '1' ? '已支付' : '待支付'}}  </div>-->
                  <div class="status"> {{item.startTime}}至{{item.endTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 100px 0;text-align: center">
            你还未领取优惠券
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import capsile from '/components/capsule.vue'
  import { getStore} from '/utils/storage'
  import {userCoupon} from '/api/goods'
  export default {
    components: {
      YShelf,
      capsile
    },
    data(){
      return{
        couponList:[],
      }
    },
    created(){
      let params = {
        userId:getStore('userId')
      }
      userCoupon({params:params}).then( res => {
        if(res.code ===0){
          this.couponList = res.data
        }
      })
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
  span {
    display: inline-block;
    height: 100%;
  }
  .first {
    display: flex;
    justify-content: space-between;
    flex: 1;
  .f-bc {
  > span {
    width: 112px;
    text-align: center;
  }
  }
  }
  .last {
    width: 230px;
    text-align: center;
    display: flex;
    border-left: 1px solid #ccc;
  span {
    flex: 1;
  }
  }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  .order-id {
    margin-left: 20px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
  &:hover {
  .del-order {
    display: block;
  }
  }
  .del-order {
    display: none;
  }
  .cart-l {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 15px 0;
    justify-content: space-between;
    position: relative;
  &:before {
     position: absolute;
     content: ' ';
     right: -1px;
     top: 0;
     width: 1px;
     background-color: #EFEFEF;
     height: 100%;
   }
  .ellipsis {
    margin-left: 20px;
    width: 220px;
  }
  .img-box {
    /*border: 1px solid #EBEBEB;*/
    /*border-radius: 1px;*/
  }
  img {
    display: block;
  @include wh(80px);
  }
  .cart-l-r {
    display: flex;
  > div {
    text-align: center;
    width: 112px;
  }
  }
  .car-l-l {
    display: flex;
    align-items: center;
  }
  }
  .cart-r {
    width: 230px;
    display: flex;
  span {
    text-align: center;
    flex: 1;
  }
  }
  }

  .prod-operation {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
  div {
    width: 100%;
    text-align: center;
  }
  }
</style>
