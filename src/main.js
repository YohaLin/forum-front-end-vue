// main.js是整個專案中Javascript的載入點：當啟動專案時會先來讀取這隻檔案
// 前端開發在載入套件時，大多習慣使用 ES6 的 import，而非 require 語法，後者來自 CommonJS 規範，而不是 ECMAScript 發佈的 ES6，但兩者載入套件和檔案的概念相近。
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,

  // 網頁會透過App來產生內容，再灌入到id名為app的div裡面
  render: h => h(App)
}).$mount('#app')
