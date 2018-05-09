<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <div v-if="addList.length" v-loading="loading">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.consignee}}</div>
            <div class="address-msg">{{item.address}}</div>
            <div class="telephone">{{item.mobile}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault?'( 默认地址 )':'设为默认'"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div>
            <div class="operation">
              <!--<a href="javascript:;" @click="update(item)">修改</a>-->
              <el-button round @click="update(item)">修改</el-button>
              <el-button round :data-id="item.addressId" @click="del(item,i)">删除</el-button>
              <!--<a href="javascript:;" :data-id="item.addressId" @click="del(item,i)">删除</a>-->
            </div>

          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <el-dialog title="商品信息" :visible.sync="popupOpen" class="form-modify">
      <el-form :model="msg" ref="msg" label-width="100px">
        <el-form-item label="收货人姓名" >
          <el-input type="text" v-model="msg.userName" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" >
          <el-input type="number" v-model="msg.tel" ></el-input>
        </el-form-item>
        <el-form-item label="收货地址" >
          <el-input type="text" v-model="msg.streetName" ></el-input>
        </el-form-item>
        <el-form-item label="设为默认">
          <el-switch v-model="msg.isDefault"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popupOpen = false">取 消</el-button>
        <el-button type="primary" @click="save({addressId:msg.addressId,consignee:msg.userName,mobile:msg.tel,address:msg.streetName,isDefault:msg.isDefault,city:0})">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { addressList, addressUpdate, addressAdd, addressDel } from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        loading: false
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
      }
    },
    methods: {
      // 获取列表
      _addressList () {
        this.loading = true
        addressList().then(res => {
          if(res.code === 0) {
            let data = res.data
            if (data.length) {
              this.addList = res.data
              this.addressId = res.data[0].addressId || '1'
            } else {
              this.addList = []
            }
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
          this.loading = false
        })
      },
      // 修改收货地址
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          if(res.code === 0) {
            this.$message({
              message: '修改地址成功',
              type: 'success'
            });
            this._addressList()
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        })
      },
      //  添加地址
      _addressAdd (params) {
        addressAdd(params).then(res => {
          if(res.code === 0) {
            this.$message({
              message: '添加地址成功',
              type: 'success'
            });
            this._addressList()
          }else{
            this.$message({
              message: '添加失败',
              type: 'warning'
            });
          }
        })
      },
      // 修改默认地址
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = 1
          this._addressUpdate(item)
        }
        return false
      },
      // 保存添加地址
      save (p) {
        p.isDefault=(p.isDefault === true ? 1: 0)
        console.log(p);
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
        this.popupOpen = false
      },
      // 删除地址
      del (item, i) {
        this.$confirm('将删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj={
            addressId:item.addressId
          }
          addressDel({params:obj}).then(res => {
            if (res.code === 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.addList.splice(i, 1)
            } else {
              this.$message({
                message: '删除失败',
                type: 'warning'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
    },
    created () {
      this._addressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    border-bottom:1px solid #CFCFCF;
    .name {
      width: 100px;
      margin-left:10px;
    }
    .address-msg {
      width: 400px;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 240px;
      a {
        padding: 10px 5px;
        text-decoration:none;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
  .form-modify{
    width:70%;
    margin:0 auto;
  }
</style>
