<template>
  <div id="restaurant-forum">
    <!-- 頁面會改變的地方，點選不同router-link會渲染router-view，其他的地方就類似partial template -->
    <Navbar/>
    <main class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css' // 載入BS的CSS
import 'bootstrap' // 載入BS的JS(這是因為在 node_module/bootstrap/package.json 的 main 中，已有指定預設路徑為 dist/js/bootstrap，在這種情況下就可以直接簡寫)

// 因為這個 Navbar component 是每一個頁面都會用到的，最好直接在 App.vue 做全域的載入。
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar, // Navbar:Navbar可以縮寫成左邊那樣子
  }
}
</script>

