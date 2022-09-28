<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initialRestaurant="restaurant"/>
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments :restaurant-comments="restaurantComments" @after-delete-comment="afterDeleteComment"/>
    <!-- 新增評論 CreateComment -->
    <CreateComment :restaurant-id="restaurant.id" @after-create-comment="afterCreateComment"/>
  </div>
</template>

<script>
import RestaurantDetail from './../components/RestaurantDetail'
import RestaurantComments from './../components/RestaurantComments'
import CreateComment from './../components/CreateComment'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'Restaurant',
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      // id 寫了 -1，代表我們預期這組初始值會被後端資料覆蓋過去，這個標誌傳遞出一個訊息：我這裡只是列出資料格式，不是真的要使用這組資料。
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      } ,
      restaurantComments: []
    }
  },
  computed:{
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate(to){
    const { id } = to.params
    this.fetchRestaurant(id)
  },
  created() {
    console.log('params:', this.$route.params) // 可以取得動態路由
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    // vue不可以用_的方式命名，所以opening_hours改成openingHours
    async fetchRestaurant(restaurantId ) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({restaurantId})
        console.log(data, restaurantId)
        if(data.status === 'error') {
          throw new Error(data.message)
        }
        const { restaurant, isFavorited, isLiked } = data
        const { id, name, Category, image, opening_hours: openingHours, tel, address, description, Comments } = restaurant
        this.restaurant = {
          // key-value都一樣時可以合併！
          id,
          name,
          categoryName: Category.name ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        }
        this.restaurantComments = Comments
      } catch(error){
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }

      
    },
    // 因為資料是存放在父層，所以修改資料都要從子層傳入放在父層
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    // payload => 像是一大包資料
    afterCreateComment(payload){
      const {commentId, restaurantId, text} = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantID: restaurantId,
        User: {
          id: this.currentUser.name,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date() // 直接取得現在的時間
      })
    }
  }
}
</script>