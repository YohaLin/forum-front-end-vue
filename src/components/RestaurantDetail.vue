<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{restaurant.name}}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{restaurant.categoryName}}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
    :src="restaurant.image"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{restaurant.openingHours}}
          </li>
          <li>
            <strong>Tel:</strong>
            {{restaurant.tel}}
          </li>
          <li>
            <strong>Address:</strong>
            {{restaurant.address}}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <!-- 路由的名稱跟路徑是分開的兩件事情不要搞混淆了！ -->
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{name:'restaurant-dashboard',params: {id:restaurant.id}}"
      >Dashboard</router-link>
      <template class="favorite">
        <button
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite"
          type="button"
          class="btn btn-danger btn-border mr-2"
        >
          移除最愛
        </button>
        <button
          v-else
          @click.stop.prevent="addFavorite"
          type="button"
          class="btn btn-primary btn-border mr-2"
        >
          加到最愛
        </button>
      </template>
      <template class="like">
        <button
          v-if="restaurant.isLiked"
          @click.stop.prevent="deleteLike"
          type="button"
          class="btn btn-danger like mr-2"
        >
          Unlike
        </button>
        <button
          v-else
          @click.stop.prevent="addLike"
          type="button"
          class="btn btn-primary like mr-2"
        >
          Like
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RestaurantDetail',
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      restaurant: this.initialRestaurant
    }
  },
  watch: {
  initialRestaurant(newValue){
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods:{
    addFavorite(){
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      }
    },
    deleteFavorite(){
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    },
    addLike(){
      this.restaurant = {
        ...this.restaurant,
        isLiked: true
      }
    },
    deleteLike(){
      this.restaurant = {
        ...this.restaurant,
        isLiked: false
      }
    },
  }
}
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>