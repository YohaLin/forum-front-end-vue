<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link  :to="{name:'restaurant',params: {id: restaurant.id}}">
            <img
              class="card-img"
              :src="restaurant.image"
            >
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{restaurant.name}}
            </h5>
            <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
            <p class="card-text">
              {{restaurant.description}}
            </p>
            <router-link
              :to="{name:'restaurant',params: {id: restaurant.id}}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'

const dummyData = {
    "restaurants": [
        {
            "id": 50,
            "name": "Jerome Wilderman",
            "tel": "(221) 030-4589",
            "address": "388 Hand Fort",
            "opening_hours": "08:00",
            "description": "Officia repudiandae tenetur. Placeat ullam placeat",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=42.90510482059571",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 2,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 49,
            "name": "Nils McClure",
            "tel": "210.410.2734 x649",
            "address": "467 Wilmer Gardens",
            "opening_hours": "08:00",
            "description": "Ut quo ipsum voluptatem.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.62206999164466",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 5,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 48,
            "name": "Halie Green",
            "tel": "1-835-468-6750",
            "address": "404 Larson Plaza",
            "opening_hours": "08:00",
            "description": "nemo",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=67.54262687369528",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 47,
            "name": "Octavia Mohr",
            "tel": "590.218.3000 x513",
            "address": "2308 Shanelle Falls",
            "opening_hours": "08:00",
            "description": "ut",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=0.11002669048221225",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 4,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 46,
            "name": "Loma Rodriguez",
            "tel": "920.646.7695 x91716",
            "address": "249 Olin Fork",
            "opening_hours": "08:00",
            "description": "qui",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=63.68373451877676",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 1,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 45,
            "name": "Roselyn O'Hara",
            "tel": "1-753-948-3866",
            "address": "7423 Otilia Creek",
            "opening_hours": "08:00",
            "description": "illum animi et",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=42.86267620747586",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 1,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 44,
            "name": "Miss Quentin Boyer",
            "tel": "362.186.6031 x225",
            "address": "930 Torp Hills",
            "opening_hours": "08:00",
            "description": "Dicta sapiente odio voluptatum accusantium incidun",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=97.58753499473505",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 43,
            "name": "Alfreda Dietrich",
            "tel": "1-749-826-6863 x0247",
            "address": "06055 Simonis Burg",
            "opening_hours": "08:00",
            "description": "Minima corporis fuga enim perspiciatis.\nEt itaque ",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=47.984142526295706",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 2,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 42,
            "name": "Alda Larson",
            "tel": "(987) 308-8033 x58886",
            "address": "0809 Gerhold Turnpike",
            "opening_hours": "08:00",
            "description": "Quia autem asperiores tempora similique.",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=57.3754633806415",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 3,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        },
        {
            "id": 41,
            "name": "Adam Mayert MD",
            "tel": "1-825-260-0616",
            "address": "351 Bailey Drive",
            "opening_hours": "08:00",
            "description": "enim",
            "image": "https://loremflickr.com/320/240/restaurant,food/?random=49.946717785460315",
            "viewCounts": 0,
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z",
            "CategoryId": 2,
            "FavoritedUsers": [],
            "isFavorited": false,
            "FavoriteCount": 0
        }
    ]
}

export default {
  components: {
    NavTabs
  },
  data() {
    return {
      restaurants: dummyData.restaurants
    }
  },
  methods: {
    deleteFavorite(id){
      this.restaurants.forEach((restaurant) => {
        if(restaurant.id === id)
        return restaurant.isFavorited = false
      })
    },
    addFavorite(id){
      this.restaurants.forEach((restaurant) => {
        if(restaurant.id === id)
        return restaurant.isFavorited = true
      })
    }
  }
}
</script>