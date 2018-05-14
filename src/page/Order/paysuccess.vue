<template>
  <div class="w">
    <y-shelf title="支付成功" style="text-align: center">
      <div slot="content" class="content">
        <p>恭喜你支付成功</p>
        <div style="margin-top: 20px;">
          <router-link to="/user">
            <y-button text="查看订单" style="width: 150px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
          <router-link to="/home">
            <y-button text="继续选购" style="width: 150px;height: 50px;line-height: 48px;font-size: 20px"
                      classStyle="main-btn"></y-button>

          </router-link>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import {GetQueryString} from '/utils/utils'
  import {ordersUpdate} from '/api/goods'
  export default {
    data () {
      return {
        price: 10
      }
    },
    components: {
      YShelf,
      YButton
    },
    created(){
      let orderId = GetQueryString('out_trade_no');
      console.log(orderId);
      let params = {
        orderId:orderId,
        orderStatus:2
      }
      ordersUpdate({params:params})
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    padding: 150px 0;
    font-size: 30px;
  }

  .btn {

  }
   span.price {
    color: #d44d44;
    font-weight: 700;
    line-height: 20px;
    text-align: right;
  }
</style>
