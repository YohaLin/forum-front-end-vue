<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button
          @click.stop.prevent="handleDeleteButtonClick(comment.id)"
          v-if="currentUser.isAdmin"
          type="button"
          class="btn btn-danger float-right"
        >
          Delete
        </button>
        <h3>
          <router-link :to="{ name:'user', params: {id: comment.User.id}}">
            {{comment.User.name}}
          </router-link>
        </h3>
        <p>{{comment.text}}</p>
        <footer class="blockquote-footer">
          <!-- 雖然用mixins的方式，但還是可以用fromNow的名稱 -->
          {{comment.createdAt | fromNow}}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import {fromNowFilter} from './../utils/mixins'
// 從Postman取得的
const dummyUser = {
  currentUser:{
    "id": 1,
    "name": "root",
    "email": "root@example.com",
    "isAdmin": true
  },
  isAuthenticated: true
}

export default {
  name: 'RestaurantComments',
  mixins: [fromNowFilter],
  props: {
    restaurantComments: {
      type: Array,
      requried: true
    }
  },
  data(){
    return {
      currentUser : dummyUser.currentUser
    }
  },methods: {
    handleDeleteButtonClick(commentId) {
      console.log('handleDeleteButtonClick', commentId)
      // TODO: 請求 API 伺服器刪除 id 為 commentId 的評論
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit('after-delete-comment', commentId)
    }
  }
  // 因為這個區塊重複很多次，所以改用mixins的方式！
  // filters: {
  //   fromNow(dateTime){
  //     if(!dateTime) return '-'
  //     return moment(dateTime).fromNow()
  //   }
  // }
}
</script>
