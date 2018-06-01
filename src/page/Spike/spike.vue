<template>
  <div class="div-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        {{text}}
      </div>
      <el-row class="card-text">
        <el-col :span="24" class="col-text">
          <p class="p-text">
            <i class="iconfont t-daojishi"></i>
            <span>{{message}}</span>
          </p>
          <zk-time-down @time-end="message = '倒计时结束'" :endTime='endTime'></zk-time-down>
        </el-col>
        <el-col class="t-down">
          <el-button type="success" plain v-show="message === '倒计时结束'" @click="toSuccess">开始秒杀</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
    import zkTimeDown from '/components/zkTimeDown.vue'
    export default {
      name: "spike",
      components : {
        zkTimeDown
      },
      data () {
        return {
          text:'1000元秒杀锤子手机',
          endTime : '2018-06-01 23:35:00',
          message : '秒杀倒计时:',

        }
      },
      methods:{
        toSuccess(){
          this.$message({
            message: '秒杀成功',
            type: 'success'
          });
        }
      },
    }
</script>

<style scoped>
  .t-down{
    margin-top:20px;
  }
  .card-text{
    text-align: center;
    color:red;
  }
  .p-text{
    display:inline-block;
  }
  .div-text{
    margin-top:20px;
  }
  .clearfix{
    text-align: center;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
    margin:0 auto;
  }
</style>
