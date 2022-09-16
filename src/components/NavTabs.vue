 <!--<router-link> 還有另一個好處，
它可以在比對目前路由與to=""裡的路由，若有對應，就幫在該 <router-link> 上添加一個 class 樣式。  -->
<!-- 完全吻合時，vue會自動增加class="router-link-exact-active" -->
<!-- 完全吻合時，vue會自動增加class="router-link-active" -->

<!-- 當我們把頁籤的連結和名稱變成資料、直接透過 v-for 迴圈一次跑出所有的頁籤 -->
<template>
  <ul class="nav nav-tabs mb-4">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="nav-item"
    >
      <router-link
        :to="tab.path"
        class="nav-link"
      >
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {v4 as uuidv4} from 'uuid'
export default {
  data () {
    return {
      tabs: [
        {
          id: uuidv4(),
          title: '首頁',
          path: '/restaurants'
        },
        {
          id: uuidv4(),
          title: '最新動態',
          path: '/restaurants/feeds'
        },
        {
          id: uuidv4(),
          title: 'TOP 10 人氣餐廳',
          path: '/restaurants/top'
        },
        {
          id: uuidv4(),
          title: '美食達人',
          path: '/users/top'
        }
      ]
    }
  }
}
</script>