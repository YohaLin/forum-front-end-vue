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
const dummyData ={
    "restaurant": {
        "id": 1,
        "name": "Salma Witting",
        "tel": "985-688-3156 x3929",
        "address": "631 Orn Crossing",
        "opening_hours": "08:00",
        "description": "Nam praesentium dolores est omnis quibusdam harum aut. Adipisci dolorem velit libero quisquam velit est modi. Quis velit quas nisi. Officia et facilis. Voluptatem nihil dolores quasi sint voluptatem voluptatem recusandae.\n \rAspernatur est recusandae ut blanditiis nihil beatae nemo dolorum inventore. Deleniti commodi tempora incidunt consequatur aliquam aspernatur magnam. Ut doloremque iure. Perferendis enim consequatur suscipit quidem harum quo voluptatem. Dolorem enim rerum ut. Voluptas officia sint fuga dolorem.\n \rEum earum praesentium qui aut rerum quam ex. Consectetur magni repellat enim et. Vel quia quos dolor. Exercitationem asperiores ex molestiae et animi est est accusantium consequatur. Provident accusamus excepturi et tempora cumque laborum officiis rerum vel.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=52.48245367400537",
        "viewCounts": 1,
        "createdAt": "2022-09-12T12:57:08.000Z",
        "updatedAt": "2022-09-14T10:04:31.649Z",
        "CategoryId": 5,
        "Category": {
            "id": 5,
            "name": "素食料理",
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z"
        },
        "FavoritedUsers": [],
        "LikedUsers": [],
        "Comments": [
            {
                "id": 1,
                "text": "Soluta soluta atque est est saepe voluptas nesciunt.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-09-12T12:57:08.000Z",
                "updatedAt": "2022-09-12T12:57:08.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$38X.UAUF.Vj/xRW2QqfPIOiuNE9PdLPpnLEg3jbawXvM8lJDRejAS",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-09-12T12:57:08.000Z",
                    "updatedAt": "2022-09-12T12:57:08.000Z"
                }
            },
            {
                "id": 51,
                "text": "Ipsum voluptatem consequatur laudantium.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-09-12T12:57:08.000Z",
                "updatedAt": "2022-09-12T12:57:08.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$38X.UAUF.Vj/xRW2QqfPIOiuNE9PdLPpnLEg3jbawXvM8lJDRejAS",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-09-12T12:57:08.000Z",
                    "updatedAt": "2022-09-12T12:57:08.000Z"
                }
            },
            {
                "id": 101,
                "text": "Qui doloremque laudantium quia.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-09-12T12:57:08.000Z",
                "updatedAt": "2022-09-12T12:57:08.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$38X.UAUF.Vj/xRW2QqfPIOiuNE9PdLPpnLEg3jbawXvM8lJDRejAS",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-09-12T12:57:08.000Z",
                    "updatedAt": "2022-09-12T12:57:08.000Z"
                }
            }
        ]
    },
    "isFavorited": false,
    "isLiked": false
}

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  name: 'Restaurant',
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
      currentUser : dummyUser.currentUser,
      restaurantComments: []
    }
  },
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  created() {
    console.log('params:', this.$route.params) // 可以取得動態路由
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    // vue不可以用_的方式命名，所以opening_hours改成openingHours
    fetchRestaurant(restaurantId ) {
      console.log('fetchRestaurant id: ', restaurantId)
      const { restaurant, isFavorited, isLiked } = dummyData
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