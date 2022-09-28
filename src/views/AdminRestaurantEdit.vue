<template>
  <div class="container py-5">
    <AdminRestaurantForm :initialRestaurant="restaurant" @after-submit="handleAfterSubmit" :isProcessing="isProcessing"/>
  </div>
</template>

<script>
  /*eslint-disable*/
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

const dummyData = {
  restaurant: {
    id: 2,
    name: "Mr. Oswaldo Morar",
    tel: "147-862-4744",
    address: "4605 Howe Crossing",
    opening_hours: "08:00",
    description:
      "Officia voluptatem voluptas et excepturi corporis dolorem sit qui rem. Odit harum magni ut velit. Aut dignissimos consequatur autem rem est error. Sit sint vitae.\n \rQuis et impedit porro reprehenderit. Velit exercitationem fuga labore saepe. Qui neque sit eaque. Laborum praesentium ut dignissimos impedit sit sint.\n \rProvident eum vitae in totam. Vitae a sint. Aut inventore vitae eaque doloremque.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=94.00554442330656",
    viewCounts: 0,
    createdAt: "2022-09-12T12:57:08.000Z",
    updatedAt: "2022-09-12T12:57:08.000Z",
    CategoryId: 5,
    Category: {
      id: 5,
      name: "素食料理",
      createdAt: "2022-09-12T12:57:08.000Z",
      updatedAt: "2022-09-12T12:57:08.000Z",
    },
  },
};

export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        openingHours: "",
        description: " ",
        image: " ",
        categoryId: '',
      },
      isProcessing: false
    };
  },
  created(){
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next){
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    },
    async fetchRestaurant(restaurantId){
      try{
        const { data } = await adminAPI.restaurants.getDetail({restaurantId})
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, name, tel, address, opening_hours: openingHours, description, image, CategoryId: categoryId} = data.restaurant
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          openingHours,
          description,
          image,
          categoryId
        }
      }catch(error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  },
};
</script>