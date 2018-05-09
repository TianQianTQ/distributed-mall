<template>
  <div>
    <y-shelf title="账户资料">
      <div slot="content">
        <div class="avatar-box">
          <div class=img-box>
            <img :src="userInfo.info.headImage" alt="">
          </div>
          <div class="r-box">
            <!--<h3>修改头像</h3>-->
            <!--<y-button text="更换头像" classStyle="main-btn" style="margin: 0;" @btnClick="editAvatar()"></y-button>-->
            <el-upload
              class="avatar-uploader"
              action="/api-business/business/upload-image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <el-button type="primary" plain>更换头像</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div slot="content">
        <div class="avatar-box ">
          <div>
            <h1>账户昵称</h1>
            <p>{{userInfo.info.username}}</p>
          </div>
          <div >
            <el-button type="primary" plain @click="modifyUsername">修改</el-button>
          </div>
        </div>
      </div>
      <div slot="content">
        <div class="avatar-box ">
          <div>
            <h1>登录密码</h1>
            <p>互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p>
          </div>
          <div >
            <el-button type="primary" plain @click="modifyPassword">修改</el-button>
          </div>
        </div>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { upload, updateInfo } from '/api/index'
  import YShelf from '/components/shelf'
  import vueCropper from 'vue-cropper'
  import { mapState, mapMutations } from 'vuex'
  import { setStore, getStore } from '/utils/storage'
  export default {
    data () {
      return {
        imgSrc: '',
        imageUrl:'',
        editAvatarShow: false,
        cropContext: '',
        cropperImg: '',
        previews: {},
        option: {
          img: '',
          zoom: 0
        },
        fixedNumber: [1, 1],
        example2: {
          info: true,
          size: 1,
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true
        }
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO','GET_USERINFO'
      ]),
      handleAvatarSuccess(res, file) {
        if(res.code === 0){
          this.imageUrl = res.data.url;
          let params = {
            headImage: this.imageUrl,
             userId: getStore('userId')
          }
          updateInfo(params).then(res => {
            if(res.code === 0){
              let info = this.userInfo.info
              console.log(this.userInfo.info);
              info.headImage = this.imageUrl
              this.RECORD_USERINFO({info: info})
              this.$message('更改成功');
            }else{
              this.$message(res.msg);
            }
          })
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      modifyUsername(){
        this.$prompt('请输入昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          let params = {
            username: value,
            userId: getStore('userId')
          }
          updateInfo(params).then(res => {
            if(res.code === 0){
              let info = this.userInfo.info
              info.username = value
              this.RECORD_USERINFO({info: info})
              this.$message('更改成功');
              console.log(this.userInfo);
            }else{
              this.$message(res.msg);
            }
          })
          });
      },
      modifyPassword(){
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType:'password'
        }).then(({ value }) => {
          let params = {
            password: value,
            userId: getStore('userId')
          }
          updateInfo(params).then(res => {
            if(res.code === 0){
              let info = this.userInfo.info
              info.password = value
              this.RECORD_USERINFO({info: info})
              this.$message('更改成功');
            }else{
              this.$message(res.msg);
            }
          })
        });
      }
    },
    components: {
      YButton,
      YShelf,
      vueCropper
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .avatar-box {
    height: 124px;
    display: flex;
    /*margin: 0 30px 30px;*/
    /*padding: 0 30px;*/
    padding-left:20px;
    padding-right:10px;
    margin:0 30px;
    border-bottom: #dadada solid 1px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    .img-box {
      @include wh(80px);
      border-radius: 5px;
      overflow: hidden;
      border:1px solid #ccc;
    }
    img {
      display: block;
      @include wh(100%)
    }
    h1{
      font-size: 18px;
      font-weight: 400;
      color: #333;
    }
    p{
      color: #999;
    }
    .r-box {
      margin-left: 20px;
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
