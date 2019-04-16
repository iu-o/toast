<template>
  <div class="demo">
    <div class="btn" @click="simple">simple</div>
    <div class="btn" @click="custom">custom</div>
  </div>
</template>

<script>
import Vue from 'vue'
import toastExample from '../lib'
Vue.use(toastExample)
export default {
  name: 'toast-demo',
  methods: {
    simple () {
      this.$toast('Lorem ipsum dolor sit amet')
    },
    custom () {
      this.$toast({
        message: 'Lorem ipsum dolor sit amet',
        duration: 30000,
        opacity: 0.9
      }).then(() => {
        console.log('res')
      })
    }
  }
}
</script>

<style lang="scss">
  .demo {
    .btn {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      border: 1px solid #ddd;
      cursor: pointer;
      + .btn {
        margin-left: 20px;
      }
    }
  }
</style>
