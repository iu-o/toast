<template>
  <div v-if="showToast" class="toast-mask" @touchstart="handleStart" :style="{    'background-color': bgColor}">
    <div class="toast-wrap">
      <div class="toast" v-html="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    showToast: {
      type: Boolean,
      default: false
    },
    preventScroll: {
      type: Boolean,
      default: true
    },
    message: String,
    duration: {
      type: Number,
      default: 2000
    },
    callBack: {
      type: Function,
      default: () => {}
    },
    opacity: {
      type: Number,
      default: 0
    }
  },
  computed: {
    bgColor () {
      return `rgba(0, 0, 0, ${this.opacity})`
    }
  },
  methods: {
    handleStart (e) {
      if (this.preventScroll) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss">
.toast-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  // background-color: rgba(0, 0, 0, .0);
  .toast-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .toast {
    padding: 16px 20px;
    background-color: rgba(#000, .6);
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    line-height: 22px;
    max-width: 280px;
  }
}
</style>
