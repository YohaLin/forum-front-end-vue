<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />

    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <!-- 因為輸出的資料不改值，所以不用加上initial -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard ，在vue中，tag也可以用v-for-->
      <!-- 因為輸出的資料會改值(isFavorited, isLiked)，所以加上initial -->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initialRestaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :previous-page="previousPage"
      :next-page="nextPage"
      :categoryId="categoryId"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import RestaurantCard from "./../components/RestaurantCard";
import RestaurantsNavPills from "./../components/RestaurantsNavPills";
import RestaurantsPagination from "./../components/RestaurantsPagination";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";

// 為串接後端資料可以先建立種子資料 dummyData
// isFavorited: true => 加到最愛； isLiked:true => 點過like

export default {
  name: "Restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
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
      nextPage: -1,
    };
  },
  created() {
    // 1.當使用者直接輸入網址，或是進入到這個頁面的方式
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    this.fetchRestaurants({
      queryPage: "",
      queryCategoryId: "",
    });
  },
  //  2. 當使用者從A點連結到B的方法
  // vue內建可以改變路由的方法
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
  methods: {
    // 並且可以帶入參數 page 與 categoryId
    // 呼叫 API 後取得 response
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        // 利用解構賦值的方式取得資料，response.data就是取代之前的dummyData
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
        console.log(response);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  }
};
</script>