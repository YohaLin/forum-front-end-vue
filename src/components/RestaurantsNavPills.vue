<template>
  <ul class="nav nav-pills mb-4">
    <li class="nav-item">
      <!-- 回到index.js的routes看每個路由都有一個name -->
      <router-link class="nav-link" :to="{ name: 'restaurants' }">
        全部
      </router-link>
    </li>

    <li v-for="category in categories" :key="category.id" class="nav-item">
      <!-- 有了query就可以向後端抓資料 -->
      <router-link class="nav-link" :to="{ name: 'restaurants', query: { categoryId: category.id } }">
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>