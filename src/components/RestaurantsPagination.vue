<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 前一頁 previousPage -->
      <li v-show="previousPage" :class="['page-item',{ disabled: currentPage ===1 } ]" >
        <router-link class="page-link" aria-label="Previous" :to="{ name: 'restaurants', query: {categoryId ,page: previousPage} }">
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>
      <!-- 頁籤 -->
      <!-- 用陣列包物件把class變成動態的，用單引號為靜態 -->
      <!-- 把 active 類別加在 <li> 上，而不是加在 <a> 上，這是因為 CSS 本來就是設計由 <li> 來做樣式變化。 -->
      <li :class="['page-item', {active: currentPage === page }]" v-for="page in totalPage" :key="page">
        <router-link class="page-link" :to="{name: 'restaurants', query: { categoryId, page }}" >
          {{page}}
        </router-link>
      </li>
      <!-- 後一頁 nextPage -->
      <li v-show="nextPage" :class="['page-item',{ disabled: currentPage === totalPage.length}]">
        <router-link class="page-link" aria-label="Next" :to="{name: 'restaurants', query: {categoryId, page : nextPage}}">
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RestaurantsPagination',
  props: {
    categoryId: {
      type: [Number, String], // 因為dummyData裡面是空字串，如果用Number會出現錯誤
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Array,
      required: true
    },
    previousPage: {
      type: Number,
      required: true
    },
    nextPage: {
      type: Number,
      required: true
    },
  }
}
</script>