<template>
  <div class="card">
    <div class="card-header">
      最新餐廳
    </div>
    <div class="card-body">
      <!-- 要注意資料的value，若為null，則要做成判斷式 -->
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4>
          <router-link :to="{ name:'restaurant', params: {id: restaurant.id}}">
            {{restaurant.name}}
          </router-link>
          &nbsp;
          <small>{{ restaurant.Category ? restaurant.Category.name : '未分類'
          }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>
        at {{ restaurant.createdAt | fromNow}}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment' // 會顯示＊＊天前，＊＊周前的套件moment.js
import { fromNowFilter } from '../utils/mixins';
export default {
  mixins: [fromNowFilter],
  // filters: {
  //   fromNow(dateTime) {
  //     if(!dateTime) {
  //       return '-'
  //     }
  //     // 使用moment提供的fromNow方法
  //     return moment(dateTime).fromNow()
  //   }
  // },
  // 從父元件向下傳遞資料給子元件，會需要用到一個叫 props 的屬性，它是 properties 的縮寫，因為等下的感覺會有點像「讓子元件得到新的屬性」，props不可以修改，要修改就必須要傳到data()
  props: {
    restaurants: {
      type: Array, //告訴元件，傳進來的資料型態是 Array
      required: true //標明，這組資料是必要的，一定要傳進來，才不會出錯。
    }
  }
}
</script>

<style scoped>
small {
  font-size: 10px;
}
</style>