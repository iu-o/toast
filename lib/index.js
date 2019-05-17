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
  if (install.installed) return
  install.installed = true
  Vue.component('toast', toast)
  Vue.$toast = Vue.prototype.$toast = Toast
}

const plugin = {
  install,
}
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

component.install = install
export default toast
