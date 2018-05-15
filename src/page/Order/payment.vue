<template>
  <div class="w" style="padding-bottom: 100px;">
    <y-shelf title="支付订单">
      <div slot="content">
        <div class="box-inner order-info">
          <h3>提交订单成功</h3>
          <p class="payment-detail">请在 <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
          <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p></div>
        <!--支付方式-->
        <div class="pay-type">
          <div class="p-title">商品信息</div>
          <div class="confirm-table-title">
            <span class="name">商品信息</span>
            <div>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
          </div>
          <!--商品-->
          <div class="confirm-goods-table">
            <div class="cart-items" v-for="(item,i) in cartList1" :key="i" v-if="item.checked === '1'">
              <div class="name">
                <div class="name-cell ellipsis">
                  <a >{{item.productName}}</a>
                  <p><img :src="item.productImg"></p>
                </div>
              </div>
              <div class="n-b">
                <div class="subtotal ">
                  <div class="subtotal-cell"> ¥ {{item.productPrice * item.productNum}}<br></div>
                </div>
                <div class="goods-num ">{{item.productNum}}</div>
                <div class="price ">¥ {{item.productPrice}}</div>
              </div>
            </div>
          </div >
          <div class="confirm-coupon">
            是否使用优惠券
            <el-checkbox v-model="checked" @change="couponSwitch" true-label="checked" false-label="nochecked">    </el-checkbox>
                <div v-if="couponList.length && useCoupon">
                  <div v-for="(item,i) in couponList" :key="i">
                    <div class="gray-sub-title cart-title">
                      <div class="first">
                        <div>
                          <!--<span class="date" >{{item.data}} </span>-->
                          <span class="order-id"> 优惠券编号
                            <!--<a href="javascript:;">{{item.couponId}}</a> -->
                          </span>
                        </div>
                        <div class="f-bc">
                          <span class="price">描述</span>
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
                            <div class="img-box">
                              <el-radio v-model="radio" :label="item.couponId" @change="couponChange(radio)"></el-radio>
                            </div>
                            <!--<div class="img-box">{{item.description}}</div>-->
                          </div>
                          <div class="cart-l-r">
                            <div class="ellipsis">{{item.description}}</div>
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
                          <div class="status"> {{item.startTime}}至{{item.endTime}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

          </div>
          <!--合计-->
          <div class="order-discount-line">
            <p> 商品总计： <span>¥ {{checkPrice}}</span></p>
            <p> 优惠减免： <span>¥ {{reduce}}</span></p>
            <p> 运费： <span>+ ¥ 0.00</span></p></div>
          <!--支付方式-->
          <div class="p-title">支付方式</div>
          <div class="pay-item">
            <div :class="{active:payType==1}" @click="payType=1"><img src="/static/images/alipay@2x.png" alt=""></div>
            <div :class="{active:payType==2}" @click="payType=2"><img src="/static/images/weixinpay@2x.png" alt="">
            </div>
          </div>
        </div>

        <div>
          <div class="box-inner">
            <div>
              <span>
                应付金额:
              </span>
              <em><span>¥</span>{{checkPrice}}</em>
              <y-button text="立刻支付"
                        classStyle="main-btn"
                        style="width: 120px;height: 40px;font-size: 16px;line-height: 38px"
                        @btnClick="paySuc()"
              ></y-button>
            </div>
          </div>
        </div>

      </div>
    </y-shelf>
    <!--地址信息-->
    <div class="p-msg w">
      <div class="confirm-detail">
        <div class="info-title">收货信息</div>
        <p class="info-detail">姓名：{{addList.consignee}}</p>
        <p class="info-detail">联系电话：{{addList.mobile}}</p>
        <p class="info-detail">详细地址：{{addList.address}}</p></div>
    </div>

  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import { infoAddress,  payMent, productDet, userCoupon } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import {getStore} from '/utils/storage'
  export default {
    data () {
      return {
        checked:false,
        // useCoupon:false,
        payType: 1,   //  支付方式
        addList: {},
        cartList1: [],
        addressId: 0,
        productId: '',
        num: '',
        resource: '',
        couponList:[],// 用户优惠券列表
        radio: '1',// 变量的值
        couponId:null,
        reduce:0
      }
    },
    computed: {
      ...mapState(['cartList']),
      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList1 && this.cartList1.forEach(item => {
          if (item.checked === '1') {
            totalPrice += (item.productNum * item.productPrice)
          }
        })
        return totalPrice
      }
    },
    methods: {
      //使用优惠券
      couponChange(label){
        console.log(label);
        this.couponId = label
      },
      // 选择优惠券
      couponSwitch(){
        let params = {
          userId:getStore('userId')
        }
        userCoupon({params:params}).then( res => {
          if(res.code ===0){
            this.couponList = res.data
          }
        })
        if(this.checked =='checked'){
          this.$message('使用')
          this.useCoupon = true

        }else{
          this.$message.error('不使用');
          this.useCoupon = false
        }
        // if(this.checked = true){
        //   this.$message('使用');
        //   this.checked = false
        // }else{
        //   this.$message.error('不使用');
        // }
      },
      _getCartList () {
        this.cartList1 = this.cartList
      },
      _addressList (params) {
        let param = {
          params
        }
        infoAddress(param).then(res => {
          if(res.code === 0) {
            let data = res.data
            // console.log(res.data);
            if (data.address) {
              this.addList = res.data
            } else {
              this.addList = []
            }
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      paySuc () {
        let orderId = getStore('orderId');
        if (orderId) {
          let params = {
            orderId: orderId
          }
          payMent({params: params}).then( res => {
            const div = document.createElement('div');
            div.innerHTML = res;
            document.body.appendChild(div);
            document.forms.punchout_form.submit();
          }
        )

        }
      },
      _productDet (productId) {
        productDet({params: {productId}}).then(res => {
          let item = res.result
          item.checked = '1'
          item.productNum = this.num
          item.productPrice = item.salePrice
          this.cartList1.push(item)
        })
      }
    },
    created () {
      let query = this.$route.query
      this.addressId = query.addressId
      if (this.addressId) {
        this._addressList({addressId: this.addressId})
        if (query.productId && query.num) {
          this.productId = query.productId
          this.num = query.num
          this._productDet(this.productId)
        } else {
          this._getCartList()
        }
      } else {
        this.$router.push({path: '/'})
      }
    },
    components: {
      YShelf,
      YButton
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";
  /*.el-button{
    width:20px;
    height:20px;
    margin-top:2px;
  }
  .el-button span{
    font-size:10px;
    text-align: center;
    line-height:20px;
    display:inline-block;
    position:relative;
    top:-10px;
    left:-10px;
  }*/
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
  .w {
    padding-top: 39px;
  }

  .order-info {
    padding: 60px 0 55px;
    color: #333;
    background: #fff !important;
    h3 {
      padding-bottom: 14px;
      line-height: 36px;
      text-align: center;
      font-size: 36px;
      color: #212121;
    }
    .payment-detail {
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #999;
    }
  }

  /*支付类型*/
  .pay-type {
    margin: 0 auto;
    width: 90%;
    padding-bottom: 30px;
    .p-title {
      font-size: 18px;
      line-height: 40px;
      padding: 0 10px;
      position: relative;
      &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-bottom: 1px solid #ccc;
      }
    }

  }

  .pay-type {
    .pay-item {
      display: flex;
      align-items: center;
      div {
        margin-top: 20px;
        width: 175px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E5E5E5;
        cursor: pointer;
        border-radius: 6px;
        margin-right: 10px;
        background: #FAFAFA;
        &.active {
          border-color: #6A8FE5;
          background: #fff;
        }
        img {
          display: block;
          height: 34px;
          margin: 8px auto;
        }
      }
    }
  }

  .box-inner {
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
    > div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
    em {
      margin-left: 5px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
      margin-right: 10px;
      span {
        margin-right: 4px;
        font-size: 16px;

      }
    }
  }

  .confirm-detail {
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
    .info-title {
      height: 14px;
      margin: 30px 0 17px;
      line-height: 14px;
      font-weight: bolder;
      color: #333;
    }
    .info-detail {
      line-height: 24px;
      color: #666;
    }
  }

  .confirm-table-title {
    padding: 3px 0 0 30px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 175px;
      text-align: center;
    }
  }

  .confirm-goods-table {
    border-top: 1px solid #D5D5D5;
    .cart-items {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #333;
      }
    }
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 175px;
        text-align: center;
      }
    }
  }

  .order-discount-line {
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

  .name {
    width: 40%;
    margin-left:30px;
  }

  .name-cell {
    p{
      display:inline-block;
      img{
        width:50px;
        height: 50px;
        margin-left:30px;
      }
    }
  }
  .confirm-coupon{
    border-top: 1px solid #D5D5D5;
    margin-top:20px;
    padding:25px 30px 53px;
  }
</style>
