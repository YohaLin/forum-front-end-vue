<template>
  <div class="container py-5">
    <AdminRestaurantForm :initialRestaurant="restaurant" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
  /*eslint-disable*/
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";

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
    };
  },
  created(){
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  methods: {
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
    fetchRestaurant(restaurantId){
      const { restaurant } = dummyData
      const { id, name, tel, address, opening_hours: openingHours, description, image, CategoryId: categoryId} = restaurant
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
    }
  },
};
</script>