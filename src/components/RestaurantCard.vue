<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      >
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name:'restaurant', params: {id: restaurant.id}}">
            {{restaurant.name}}
          </router-link>
        </p>
        <!-- 有些分類為null，需使用判斷式 -->
        <span class="badge badge-secondary">{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <!-- 使用v-if, v-else來決定加到/移除最愛按鈕要不要出現 -->
        <!-- v-on綁定事件，為了保險起見，只要是瀏覽器的事件，都跟著串上 stop.prevent -->
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite" 
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
        >
          移除最愛
        </button>
        <!-- 注意在 v-else 上沒有任何的標記，它必需要緊接在 v-if 之後使用 -->
        <button
          v-else
          @click.stop.prevent="addFavorite"
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
        >
          加到最愛
        </button>
        <!-- 使用v-if, v-else來決定like/unlike最愛按鈕要不要出現 -->
        <!-- v-on綁定事件，為了保險起見，只要是瀏覽器的事件，都跟著串上 stop.prevent -->
        <button
          v-if="restaurant.isLiked" 
          @click.stop.prevent="deleteLike"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <!-- 注意在 v-else 上沒有任何的標記，它必需要緊接在 v-if 之後使用 -->
        <button
          v-else
          @click.stop.prevent="addLike"
          type="button"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 資料不可以改變，呈現唯獨的方式
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  // 把資料從props傳到data之後，資料就可以改變
  data(){
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    addFavorite(){
      // isFavorited
      this.restaurant = {
        ...this.restaurant, // 保留餐廳內原有資料
        isFavorited: true // 只改想改的地方
      }
    },
    deleteFavorite() {
      // isFavorited
      this.restaurant = {
        ...this.restaurant, 
        isFavorited: false
      }
    },
    addLike() {
      // isLiked
      this.restaurant = {
        ...this.restaurant,
        isLiked: true
      }
    },
    deleteLike() {
      // isLiked
      this.restaurant = {
        ...this.restaurant,
        isLiked: false
      }
    },
  }
}
</script>