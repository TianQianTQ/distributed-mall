<template>
  <div class="coupon-main">
    <capsile  v-for="(item,index) in items" :key="item.id" class="coupon-card">
      <div slot ="couponId" class="coupon-id">
        <p>优惠券id:{{item.couponId}}</p>
      </div>
      <div slot="icon" class="coupon-money">
        <i class="iconfont t-jiage1"></i>
        <p>{{item.money}}</p>
      </div>
      <div slot = 'text' class="coupon-text">
        <p>{{item.text}}</p>
        <p class="coupon-time">有效期：{{item.time}}</p>
      </div>
      <div slot = 'available' class="coupon-type">
        <p>限品类：{{item.type}}</p>
        <p v-if="!isReceive" class="coupon-button" @click="toGet(item.couponId)"> 立即领取</p>
        <p v-else class="coupon-received">
          <i class="iconfont t-yilingqu"></i>
        </p>
      </div>

    </capsile>
  </div>
</template>

<script>
  import capsile from '/components/capsule.vue'
  import { productDet  } from '/api/goods'
    export default {
        components:{
          capsile
        },
        name: "coupon",
        data(){
          return{
            isReceive: true,
            items:[
              {
                couponId: 1000,
                money: 24.00,
                text: '无门槛红包',
                time: '2018.03.22-2018.06.30',
                type: '不限',
                number: 254,
                background: 'gren',
                id: 1
              }
            ]
          }
        },
      methods:{
        toGet(couponId){
          productDet({params: {couponId}}).then(res => {
            if(res.code === 0){
              this.isReceive = true
              this.$message({
                message: '领取成功',
                type: 'success'
              });
            }else{
              this.$message.error(res.msg);
            }
          })
        }
      }
    }
</script>

<style scoped>
  .coupon-card{

  }
  .coupon-received{
    float:right;
    margin-right:10px;
    font-size:20px;
    font-weight: bold;
    color:#c81623;
  }
  .coupon-button{
    margin-left:90px;
    font-size:15px;
    font-weight: bold;
    color:#c81623;
  }
  .coupon-type{
    text-align: left;
    margin-left:30px;
    margin-top:5px;
    font-size:10px;
    font-family: "Adobe Arabic";
    color:#999999;
  }
  .coupon-type p{
    display:inline-block;
  }
  .coupon-time{
    font-size:0.2rem;
    letter-spacing:1px;
  }
  .coupon-text{
    text-align: center;
    font-size:10px;
    font-family: "Adobe Arabic";
    color:#999999;
    border-bottom:1px dashed #BEBEBE;
  }
  .coupon-money p{
    display:inline-block;
    margin-left:10px;
    font-size:50px;
    font-weight: bold;
  }
  .t-jiage1{
    font-size:25px;
    font-weight: bold;
    margin-left:70px;
    margin-top:20px;
  }
  .coupon-main{
    margin:20px auto;
    padding-left:130px;
  }
  .coupon-money{
   margin-bottom:3px;
  }
  .coupon-id{
    margin-top:5px;
    height:20px;
    line-height:20px;
    text-align:center;
    color:#999999;
    font-size:12px;
    background:#BEBEBE;
    font-family: "Adobe Devanagari";
    border-bottom:1px dashed #BEBEBE;
  }
  .
  .gren{
    background:#6ccac9;
  }
  .red{
    background:#FF6C60;
  }
  .yellow{
    background:#f8d347;
  }
  .blue{
    background:#57c8f2;
  }
</style>
