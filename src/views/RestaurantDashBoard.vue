<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.commentsLength }} </li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
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
        "updatedAt": "2022-09-14T10:04:31.000Z",
        "CategoryId": 5,
        "Category": {
            "id": 5,
            "name": "素食料理",
            "createdAt": "2022-09-12T12:57:08.000Z",
            "updatedAt": "2022-09-12T12:57:08.000Z"
        },
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
    }
}

export default {
  name: 'RestaurantDashBoard',
  data(){
    return{
      restaurant: {
        name: '',
        viewCounts: 0,
        categoryName: '',
        commentsLength: 0,
      }
      
    }
  },
  methods: {
    fetchRestaurant(){
      // {}裡的名稱要吻合dummyData的key name
      const { name, Category, Comments, viewCounts} = dummyData.restaurant
      this.restaurant.name = name
      this.restaurant.categoryName = Category.name
      this.restaurant.commentsLength = Comments.length
      this.restaurant.viewCounts = viewCounts
    }
  },
  created(){
    this.fetchRestaurant()
  }
}
</script>