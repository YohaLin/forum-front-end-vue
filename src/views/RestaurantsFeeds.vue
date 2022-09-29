<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">最新動態</h1>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import NewestRestaurants from "./../components/NewestRestaurants";
import NewestComments from "./../components/NewestComments";
import Spinner from "./../components/Spinner";
// 直接取用restaurant的API就好，不用額外匯入restaurants/feeds
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
console.log(restaurantsAPI.getFeeds());

export default {
  name: "RestaurantFeeds",
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true; // 先轉再抓資料
        const { data } = await restaurantsAPI.getFeeds();
        this.restaurants = data.restaurants;
        // 因為有些餐廳與評論是null，所以要過濾掉
        this.comments = data.comments.filter(
          (comment) => comment.Restaurant && comment.text
        );
        this.isLoading = false; // 抓完資料要改回來
      } catch (error) {
        this.isLoading = false; // 失敗也要改回來，不然會一直轉不停
        console.log("123", error);
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
};
</script>