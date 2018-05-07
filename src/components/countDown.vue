<template>
  <span class="vc-count-down" :class="{'disabled':isActive}">{{isActive ? formatStr: text}}</span>
</template>

<script>
  /**
   * 用法:
   * <countdown text="获取验证码" :active="true" :during="120" format="M分S秒"></countdown>
   * 参数说明
   * active: true 开始倒计时 false 停止倒计时
   * during: 倒计时长 单位秒
   * format: 格式化输入  H 时 M 分 S 秒
   */
  export default{
    name: 't-countdown',
    props: {
      text: String, // 非计时状态显示文字
      during: Number, // 到计时长 秒
      active: Boolean, // 启动开关
      format: {
        type: String,
        default: 'S'
      }
    },
    data () {
      return {
        current: this.during,
        isActive: this.active
      }
    },
    created () {
      if (!!this.active && this.active === true) {
        this.start
      }
    },
    computed: {
      formatStr () {
        const hour = Math.floor(this.current / 3600)
        const minute = (Math.floor(this.current / 60) % 60)
        const second = this.current % 60

        const res = this.format
        return res.replace('H', hour).replace('M', minute).replace('S', second)
      }
    },
    methods: {
      start () {
        const timer = window.setInterval(() => {
          if (this.current-- < 1 || this.active === false) {
            this.isActive = false
            this.current = this.during
            window.clearInterval(timer)
          }
        }, 1000)
      }
    },
    watch: {
      active (val) {
        this.isActive = val
        val && this.start()
      },
      isActive (val) {
        this.$emit('change', val)
      }

    }
  }
</script>

<style scoped>
  .vc-count-down {
    font-size: 16px;
  }
  .disabled{
      color: #888;
    }
</style>
