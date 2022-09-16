<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />

    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <!-- 因為輸出的資料不改值，所以不用加上initial -->
    <RestaurantsNavPills 
      :categories="categories"/>

    <div class="row">
    <!-- 餐廳卡片 RestaurantCard ，在vue中，tag也可以用v-for-->
    <!-- 因為輸出的資料會改值(isFavorited, isLiked)，所以加上initial -->
      <RestaurantCard 
        v-for="restaurant in restaurants" 
        :key="restaurant.id" 
        :initialRestaurant="restaurant"/>
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination 
      v-if="totalPage > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :previous-page="previousPage"
      :next-page="nextPage"
      :categoryId="categoryId"/>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantCard from './../components/RestaurantCard';
import RestaurantsNavPills from './../components/RestaurantsNavPills';
import RestaurantsPagination from './../components/RestaurantsPagination'

// 建立種子資料 
// isFavorited: true => 加到最愛； isLiked:true => 點過like 
const dummyData = {
  "restaurants": [
    {
      "id": 4,
      "name": "Sonia Kassulke",
      "tel": "(940) 425-9551",
      "address": "698 Schowalter Lodge",
      "opening_hours": "08:00",
      "description": "Et officiis sapiente voluptatem omnis dolor dignis",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=3.8704297568656676",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 5,
      "name": "Hailee Deckow",
      "tel": "1-955-550-3318 x4259",
      "address": "722 Omer Walks",
      "opening_hours": "08:00",
      "description": "beatae eos quia",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.741130713126488",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 10,
      "name": "Marley Bernhard",
      "tel": "018-657-6776 x0155",
      "address": "218 Beahan Trail",
      "opening_hours": "08:00",
      "description": "Numquam eum quia itaque.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=6.7426668352599695",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 20,
      "name": "Gino Farrell II",
      "tel": "183.462.7809",
      "address": "6102 Schoen Square",
      "opening_hours": "08:00",
      "description": "Eos non provident aliquid suscipit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=53.22119102025562",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 22,
      "name": "Easton Abshire",
      "tel": "(959) 477-5890 x931",
      "address": "1512 Tristian Club",
      "opening_hours": "08:00",
      "description": "Optio et eaque enim odit ad id delectus incidunt. ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=13.02755862503695",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 40,
      "name": "Mikel Schiller",
      "tel": "(146) 566-2406",
      "address": "85904 Norma Motorway",
      "opening_hours": "08:00",
      "description": "Earum sunt voluptatem. Aspernatur enim necessitati",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=19.964600313406766",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
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
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
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
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 14,
      "name": "Gunner Terry",
      "tel": "876-394-5471 x3081",
      "address": "455 Sebastian Meadow",
      "opening_hours": "08:00",
      "description": "Magni earum labore ut impedit et inventore corrupt",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=99.26121653502989",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 24,
      "name": "Pearl Gibson MD",
      "tel": "142.326.2449",
      "address": "072 O'Kon Mill",
      "opening_hours": "08:00",
      "description": "autem est nulla",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.225894791567631",
      "viewCounts": 0,
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-12T12:57:08.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "中式料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 3,
      "name": "義大利料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 4,
      "name": "墨西哥料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 5,
      "name": "素食料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 6,
      "name": "美式料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    },
    {
      "id": 7,
      "name": "複合式料理",
      "createdAt": "2022-09-12T12:57:08.000Z",
      "updatedAt": "2022-09-12T12:57:08.000Z"
    }
  ],
  "categoryId": "",
  "page": 1,
  "totalPage": [
    1,
    2,
    3,
    4,
    5
  ],
  "prev": 1,
  "next": 2
}

export default {
  name: 'Restaurants',
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data() {
    return {
      // 比較特別的是 categoryId 和 totalPage 寫 -1，這是因為這兩個資料一定來自後端，在後端提供資料之前，前端無法預測。因此我預期這兩筆資料必須要被後端覆寫掉，所以我放了 -1。有些人也會寫 undefined 或 0 來表達這種狀況。
      restaurants: [],
      categories: [],
      catagoryId: -1, // 表示只想看到哪個餐廳類別的資料
      currentPage: 1,
      totalPage: -1,
      previousPage: -1,
      nextPage: -1
    }
  },
  methods: {
    fetchRestaurants() {
      // 利用解構賦值的方式取得資料
      const { restaurants, categories, categoryId, page, totalPage, prev, next} = dummyData
      this.restaurants = restaurants 
      this.categories = categories
      this.categoryId = categoryId 
      this.currentPage = page 
      this.totalPage = totalPage 
      this.previousPage = prev
      this.nextPage = next
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>