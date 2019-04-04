# toast
A simple toast in vue

# examples

main.js
```javascript
import toast from '@o-ui/toast'
import '@o-ui/toast/dist/toast.css'
Vue.use(toast)
```

components
```javascript
this.$toast('Lorem ipsum dolor sit amet')

this.$toast({
  message: 'Lorem ipsum dolor sit amet',
  duration: 3000
}).then(() => {
  console.log('toast')
})
```
