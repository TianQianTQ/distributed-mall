<template>
  <el-col :span="8" class="col">
    <div class="card">
      <slot name="couponId"></slot>
      <slot name="icon"></slot>
      <slot name="text"></slot>
      <slot name="available"></slot>
    </div>
  </el-col>
</template>

<script scoped>
  export default {
    name: "t-capsule",
    props: {
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      params: {
        type: String,
        default: ''
      },
      query: {
        type: String,
        default: ''
      },
      tclass:{
        type:String,
      }
    },
  }
</script>

<style scoped>
  .card{
    display:inline-block;
    width:280px;
    height:170px;
    /*text-align: center;*/
    border-radius:10px;
    box-shadow: 4px 4px 4px #8c939d;
    background:#f1f2f7;
    margin-right:30px;
    cursor:pointer;
  }
  .col{
    margin-bottom:40px;
  }

</style>
