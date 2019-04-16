import Vue from 'vue'
import toast from './toast.vue'

const Toast = (params = {}) => {
  const options = {
    message: '',
    duration: 2000,
    preventScroll: true,
    opacity: 0
  }
  if (typeof params === 'string') {
    options.message = params
  } else {
    options.message = params.message || ''
    options.duration = params.duration || 2000
    options.preventScroll = params.preventScroll || true
    options.opacity = params.opacity || 0
  }
  const ToastConstructor = Vue.extend(toast)
  const instance = new ToastConstructor({
    el: document.createElement('div'),
    propsData: options
  })
  document.body.appendChild(instance.$el)
  return new Promise(resolve => {
    instance.showToast = true
    setTimeout(() => {
      instance.showToast = false
      resolve()
    }, options.duration)
  })
}

const install = (Vue) => {
  Vue.component('toast', toast)
  Vue.$toast = Vue.prototype.$toast = Toast
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  toast
}
