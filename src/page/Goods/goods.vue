<template>
  <div class="goods">
    <div class="nav">

      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sort(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sort(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="max">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>
    </div>

    <!--商品-->
    <div class="goods-box w">
      <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
    </div>
    <div v-show="!busy"
         class="w load-more"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="10">
      <p  v-loading="loading"></p>
    </div>
  </div>
</template>
<script>
  import { getProductsList } from '/api/goods'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  // import {getUrlParam} from '/utils/utils'
  import * as utils from '/utils/utils'
  export default {
    data () {
      return {
        goods: [],
        min: '',
        max: '',
        busy: false,
        timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        params: {
          page: 1,
          sort: ''
        },
        loading: false,
        pages: null,   // 最大页限制
        productCategoryId: utils.getItem()
      }
    },
    methods: {
      _getProductsList (flag) {
        this.productCategoryId = utils.getItem()
        let params = {
          pageNo: this.params.page,
            sort: this.params.sort,
          minPrice: this.min,
          maxPrice: this.max,
          productCategoryId: this.productCategoryId,
          pageSize: 20
        }
        getProductsList(params).then(res => {
          if(res.code === 0 ) {
            this.pages = res.data.pages
            console.log(res.data.pages);
            let data = res.data.list
            if(flag){
              console.log('不是第一次请求数据');
              this.goods = this.goods.concat(data)
              if(res.data.list.length == 0){
                this.busy = true;
              }else{
                this.busy = false;
                this.loading = false
              }
            }else{
              console.log('第一次请求数据');
              this.goods = data
              this.busy = false;
              this.loading = false
            }
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      // 重置
      _getList(flag){
        this.productCategoryId = utils.getItem()
        this.pages = null
        this.goods = null
        let params = {
          pageNo: this.params.page,
          sort: this.params.sort,
          minPrice: this.min,
          maxPrice: this.max,
          productCategoryId: this.productCategoryId,
          pageSize: 20
        }
        getProductsList(params).then(res => {
          if(res.code === 0 ) {
            this.pages = res.data.pages
            let data = res.data.list
            if(flag){
              console.log('不是第一次请求数据');
              this.goods = this.goods.concat(data)
              if(res.data.list.length == 0){
                this.busy = true;
              }else{
                this.busy = false;
                this.loading = false
              }
            }else{
              console.log('第一次请求数据');
              this.goods = data
              this.busy = false;
              this.loading = false
            }
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.params.sort = ''
        this.params.page = 1
        this.busy = false
        this._getProductsList()
      },
      // 价格排序
      sort (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.params.sort = v
        this.params.page = 1
        this.busy = false
        this._getProductsList()
      },
      // 加载更多
      loadMore () {
        this.busy = true
        this.loading = true
        if(this.params.page < this.pages){
          this.timer = setTimeout(() => {
            this.params.page++
            this._getProductsList(true)
          },1000)
        }else{
          this.loading = false
          this.busy = false
        }
      }
    },
    created () {
       this._getProductsList()
      // console.log(this.productCategoryId )
    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
      // this._getProductsList()
      // console.log('dayin'+this.productCategoryId )
    },
    watch:{
      "$route": "_getList"
    },
    components: {
      mallGoods,
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }
  .load-more {
    text-align: center;background: #fff
  }
  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }


</style>
