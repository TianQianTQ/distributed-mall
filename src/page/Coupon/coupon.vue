<template>
  <div class="coupon-main">
    <capsile  v-for="(item,index) in items" :key="item.id" class="coupon-card">
      <div slot ="couponId" class="coupon-id">
        <p>优惠券id:{{item.templateId}}</p>
      </div>
      <div slot="icon" class="coupon-money">
        <!--折扣券-->
        <div v-if="item.type===1" class="coupon-card-type">
          <i class="iconfont t-dazhe"></i>
          <p>{{item.percentOff}}</p>
        </div>
        <!--满减券-->
        <div v-else-if="item.type===2" class="coupon-card-type">
          <i class="iconfont t-jiage"></i>
          <p>{{item.amount}}</p>
        </div>
        <!--无条件减免券-->
        <div v-else class="coupon-card-type">
          <i class="iconfont t-jian"></i>
          <p>{{item.amount}}</p>
        </div>
      </div>
      <div slot = 'text' class="coupon-text">
        <p>{{item.description}}</p>
        <p class="coupon-time">有效期：{{item.startTime}}--{{item.endTime}}</p>
      </div>
      <div slot = 'available' class="coupon-type">
        <p>限品类：不限</p>
        <p  class="coupon-button" @click="toGet(item.templateId,item.isReceive)"> 立即领取</p>
        <!--<p v-else class="coupon-received">-->
          <!--<i class="iconfont t-yilingqu"></i>-->
        <!--</p>-->
      </div>

    </capsile>
  </div>
</template>

<script>
  import capsile from '/components/capsule.vue'
  import { couponList,getCoupon  } from '/api/goods'
  import { getStore} from '/utils/storage'

    export default {
        components:{
          capsile
        },
        name: "coupon",
        data(){
          return{
            isReceive: false,
            items:[]
          }
        },
        created(){
          couponList().then( res => {
            if(res.code === 0){
              this.items = res.data
            }else{
              this.$message(res.msg)
            }
          })
        },
        methods:{
          toGet(templateId,isReceive){
            let params = {
              userId:getStore('userId'),
              templateId:templateId
            }
            getCoupon({params: params}).then(res => {
              if(res.code === 0){
                if(!isReceive){
                  isReceive = true
                }
                this.$message({
                  message: '领取成功',
                  type: 'success'
                });

              }else{
                this.$message.error(res.data);
              }
            })
          }
        }
    }
</script>

<style scoped>
  .coupon-card-type{

  }
  .coupon-card-type i{
    display:inline-block;
    margin-left:50px;
    font-size:30px;
    color:#c81623;
  }
  .coupon-card-type p{
    display:inline-block;
    margin-left:30px;
    font-size:50px;
    font-weight:bold;
  }
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
