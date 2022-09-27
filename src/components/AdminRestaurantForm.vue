<template>
  <form @submit.stop.prevent="handleSubmit" v-show="isLoading">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="restaurant.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      />
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <!-- selected 代表瀏覽器會自動先把這個選項選起來，而 value="" 是當這個選項被選到時，這個項目 (categoryId) 的值會是空字串；而 disabled 是確保使用者不能主動去選這個選項。 -->
      <select 
        id="categoryId" 
        v-model="restaurant.categoryId"
        class="form-control" 
        name="categoryId" 
        required
      >
        <option value="" selected disabled>--請選擇--</option>
        <!-- 餐廳類別由資料來改變，因為使用者可以修改類別 -->
        <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input
        id="tel"
        v-model="restaurant.tel"
        type="text"
        class="form-control"
        name="tel"
        placeholder="Enter telephone number"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        id="address"
        v-model="restaurant.address"
        type="text"
        class="form-control"
        placeholder="Enter address"
        name="address"
      />
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input
        id="opening-hours"
        v-model="restaurant.openingHours"
        type="time"
        class="form-control"
        name="opening_hours"
      />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="restaurant.description"
        class="form-control"
        rows="3"
        name="description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <!-- type="file" ：<input type="file">，這是 HTML5 提供的檔案上傳功能，
        相對於其他的 input 標籤，<input type="file"> 比較特殊，
        它會在瀏覽器上呈現出一個互動介面，讓使用者可以上傳檔案。
        accept(表示接受什麼類型的檔案) -->
      <img 
        v-if="restaurant.image"
        :src="restaurant.image" 
        class="d-block img-thumbnail mb-3" 
        width="200"
        height="200"/>
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button 
      type="submit" 
      class="btn btn-primary"
      disabled="isProcessing"
    >{{isProcesing? '處理中...' : '送出'}}</button>
  </form>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  name: 'AdminRestaurantForm',
  props: {
    // 1. 如果使用者按編輯資料就會跑initialRestaurant，Edit按鈕觸發後「才」會傳資料進來
    initialRestaurant: {
      type: Object,
      // props 屬性裡的 default，這是在寫入預設值，但是這裡我們沒有用 required 來設定必填，
      // 當資料不是必填時，比較好的習慣是要用 default 設定一組預設值。
      default: () => {
        return {
          name: "",
          tel: "",
          address: "",
          openingHours: "",
          description: " ",
          image: " ",
          categoryId: '',
        }
      }
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      // 表單的下拉選單要顯示出來的資料，列出餐廳類別清單，讓使用者可以選擇餐廳類別
      categories: [],
      // 表單上顯示出來的資料，也就是「要新增的餐廳資料」，一旦使用者提交表單，這筆資料將被送至後端伺服器
      // 2. 如果使用者按新增資料就會跑restaurant(空表單)，而initialRestaurant的資料也都是空的
      restaurant: {
        ...this.initialRestaurant
      },
      // 讀取中(正在從後端串接資料，不讓畫面被渲染)
      isLoading: true
    }
  },created(){
    this.fetchCategories()
    // 再來做 this.restaurant，這筆資料會影響到表單裡到底呈現什麼內容。第一步先展開 data 裡的預設值，也就是空白表單；
    // 接著展開 props 裡的資料，也就是父層傳進來的資料，如果沒有資料，就調動 default 的回傳值，仍然是空白表單。
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }
  },
  methods: {
    async fetchCategories(){
      try{
        const { data } = adminAPI.categories.get()

        if(data.status === 'error'){
          throw new Error(data.message)
        }
        this.categories = data.categories
        this.isLoading = true // 當取得後端API後可以渲染畫面
      } catch(error) {
        console.log(error)
        this.isLoading = true // 當讀取失敗也要渲染畫面
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
      
    },
    handleFileChange(e) {
      const {files } = e.target
      if (files.length === 0) {
        // 使用者沒有選擇上傳檔案
        this.restaurant.image = ''
        return 
      } else {
        // 可以接收files物件，當帶進來 window.URL.createObjectURL() 的時候，會自動產生一個URL(類似存在記憶體暫時的連結blob)
        const imageURL = window.URL.createObjectURL(files[0]) 
        this.restaurant.image = imageURL
      }
      
    },
    handleSubmit(e) {
      if(!this.restaurants.name){
        Toast.fire({
          icon: 'warning',
          title: '請填寫餐廳名稱'
        })
        return
      }else if(!this.restaurants.categoryId){
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳類別'
        })
        return
      }


      const form = e.target
      // new FormData(form) 來產生物件實例，存放在 formData 變數裡
      const formData = new FormData(form)
      // 要特別注意的是，不會再子元件中submit表單，因為修改、新增都會用到這個form，這樣後端不知道要如何操作資料
      this.$emit('after-submit', formData)
    }
  }
};
</script>