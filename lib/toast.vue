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
