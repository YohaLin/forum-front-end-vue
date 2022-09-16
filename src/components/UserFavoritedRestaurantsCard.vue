<template>
  <div class="card">
    <div class="card-header"><strong>{{favoritedRestaurants.length}}</strong> 收藏的餐廳</div>
    <div class="card-body" >
      <router-link :to="{name:'restaurant', params: {id:favoritedRestaurant.id}}" v-for="favoritedRestaurant in favoritedRestaurants" :key="favoritedRestaurant.id">
        <img
          :src="favoritedRestaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFavoritedRestaurantsCard',
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  },
}
</script>