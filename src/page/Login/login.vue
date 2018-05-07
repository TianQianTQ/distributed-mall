<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="title" v-if="loginPage">
          <img src="/static/img/logo.png">
          <span>旧物志</span>
        </div>
        <div v-if="loginPage" class="content">
          <ul class="common-form">
            <li class="username border-1p">
              <div class="input">
                <input type="text" v-model="ruleForm.mobile" placeholder="账号">
              </div>
            </li>
            <li>
              <div class="input">
                <input type="password" v-model="ruleForm.password" @keyup.enter="login" placeholder="密码">
              </div>
            </li>
            <li style="text-align: right" class="pr">
              <a href="javascript:;" style="padding: 0 5px" @click="loginPage = false">注册 </a>
            </li>
          </ul>
          <!--登陆-->
          <div>
            <y-button text="登陆" :classStyle="isLoginOk" @btnClick="login" class="btn"></y-button>
          </div>
        </div>
        <div class="registered" v-else>
          <h4>注册</h4>
          <div class="content" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div class="input">
                  <input type="text"
                         v-model="registered.username" placeholder="用户名">
                </div>
              </li>
              <li class="username border-1p">
                <div class="input">
                  <input type="text"
                         v-model="registered.mobile" placeholder="手机号">
                </div>
              </li>
              <li>
                <div class="input">
                  <input type="password"
                         v-model="registered.password"
                         placeholder="密码">
                </div>
              </li>
              <li>
                <div class="input " id="get-captcha">
                  <input type="number" v-model="registered.captcha" placeholder="验证码">
                  <button @click="getSmsCode" class="getMesCodeButton">
                    <count-down class="getMesCode" text="发送验证码" algin="'right'" :during="59" :active.sync="timmer" format="S 秒后重新发送" @change="timmerChange"></count-down>
                  </button>
                </div>
              </li>
            </ul>
            <div>
              <y-button :classStyle="isRegOk" text="注册" class="btn" @btnClick="regist"></y-button>
            </div>
            <ul class="common-form pr">
              <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{registered.errMsg}}</li>
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;">
                <span>如果您已拥有账号，则可在此</span>
                <a href="javascript:;"
                   style="margin: 0 5px"
                   @click="loginPage = true">登陆</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YFooter from '/common/footer'
  import YButton from '/components/YButton'
  import countDown from '/components/countDown'
  import { userLogin, register, getSmsCode } from '/api/index'
  // import { addCartBatch } from '/api/goods'
  import { getStore } from '/utils/storage'

  export default {
    data () {
      return {
        cart: [],
        loginPage: true,     // 登录页面
        ruleForm: {
          mobile: '',
          password: '',
          errMsg: ''
        },
        registered: {
          username: '',
          mobile: '',
          password: '',
          captcha: '',
          errMsg: '',
          uuid: ''
        },
        timmer: false   // 获取验证码时间
      }
    },
    computed: {
      // 可点击注册
      isRegOk (rules) {
        const {password, username, mobile, captcha} = this.registered
        return password && username && mobile && captcha ? 'main-btn' : 'disabled-btn'
      },
      isLoginOk () {
        const {password, mobile} = this.ruleForm
        return password && mobile ? 'main-btn' : 'disabled-btn'
      }
    },
    methods: {
      // 登陆时将本地的添加到用户购物车
      login_addCart () {
        let cartArr = []
        let locaCart = JSON.parse(getStore('buyCart'))
        if (locaCart && locaCart.length) {
          cartArr = locaCart.map(item => {
            return {
              'productId': item.productId,
              'productNum': item.productNum
            }
          })
        }
        this.cart = cartArr
      },
      login () {
        const {mobile, password} = this.ruleForm
        if (!mobile || !password) {
          this.ruleForm.errMsg = '账号或者密码不能为空!'
        } else {
          let params = {mobile, password}
          userLogin(params).then(res => {
            if (res.code === '0') {
              this.$router.go(-1)
            } else {
              this.ruleForm.errMsg = res.msg
            }
          })
        }
      },
      regist(){
        const {username, password, mobile, captcha, uuid} = this.registered
        if (!username || !password || !mobile || !captcha) {
          this.registered.errMsg = '请填写完整信息'
          return false
        }
        register({username, password, mobile, captcha, uuid}).then(res => {
          // this.registered.errMsg = res.msg
          if (res.code === 0) {
            console.log('注册成功')
            setTimeout(() => {
              this.ruleForm.errMsg = ''
              this.registered.errMsg = ''
              this.loginPage = true
            }, 500)
          } else {
            return false
          }
        })
      },
      getSmsCode () {
        if (this.timmer) {
          return false
        }
        const obj = {
          mobile: this.registered.mobile
        }
        getSmsCode({params: obj}).then(res => {
          if (res.code === 0) {
            this.registered.uuid = res.data.uuid
            console.log(this.registered.uuid)
            this.timmer = true
          }
        })
        this.timmer = true
      },
      timmerChange (val) { // 发送验证码数字变化---
        this.timmer = val
      }
    },
    mounted () {
      this.login_addCart()
    },
    components: {
      YFooter,
      YButton,
      countDown
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  * {
    box-sizing: content-box;
  }

  .login {
    overflow-x: hidden;
    overflow-y: hidden;
    .input {
      height: 50px;
      display: flex;
      align-items: center;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
    .wrapper {
      background: url(/static/images/bg_9b9dcb65ff.png) repeat;
      background-size: 100px;
      min-height: 800px;
      min-width: 630px;
    }
    .btn {
      margin: 0;
      width: 100%;
      height: 48px;
      font-size: 18px;
      line-height: 48px
    }
  }

  .v2 .dialog {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    position: absolute;
    .title {
      /*background: linear-gradient(#fff, #f5f5f5);*/
      text-align:center;
      font-size:24px;
      line-height:92px;
      font-family: "Microsoft YaHei";
      color: #333;
      font-weight: 400;
      overflow: visible;
      position: relative;
      background-position: top center;
      background-repeat: no-repeat;
      height: 92px;
      box-shadow: none;
      img{
        width:50px;
        margin-top:20px;
        margin-right:20px;
      }
    }
    .content {
      padding: 0 40px 22px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }

  .dialog-shadow, .v2 .bbs .dialog-shadow, .v2 .dialog-shadow {
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, .2), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 18px 20px -10px rgba(0, 0, 0, .04), 0 10px 20px -10px rgba(0, 0, 0, .04);
  }

  @media screen and (min-width: 737px), screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    .wrapper {
      background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .dialog {
      background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
      border-radius: 12px;
      display: none;
      margin: -163px 0 0 -218px;
      width: 436px;
      position: fixed;
      left: 50%;
      top: 50%;
    }
    .dialog .title h4 {
      border-bottom: #d1d1d1 solid 1px;
      box-shadow: 0 2px 6px #d1d1d1;
      color: #666;
      font-size: 20px;
      height: 61px;
      line-height: 61px;
      padding: 0 0 0 35px;
    }
    .common-form li {
      clear: both;
      margin-bottom: 15px;
      position: relative;
    }
  }

  .registered {
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
  }
  #get-captcha input {
    width:60%;
  }
  .getMesCodeButton{
    margin-left:15px;
    background:none;
    color:#5079d9;
    border:1px solid #ccc;
    width:129px;
    height:45px;
    border-radius:6px;
  }
  .getMesCodeButton:hover{
    border:1px solid #B0C4DE;
    background:#F8F8FF;
  }


</style>
