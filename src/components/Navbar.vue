<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      餐廳評論網
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link  :to="{name:'user', params: {id:currentUser.id}}" class="text-white mr-3" v-if="currentUser.isAdmin">
          管理員後台
        </router-link>

        <!-- is user is login -->
        <!-- 使用template，而不是用div，可以避免v-if出現後造成的破版 -->
        <template v-if="isAuthenticated">
          <router-link :to="{name:'user', params: {id:currentUser.id}}" class="text-white mr-3">
            {{currentUser.name || '使用者'}} 您好
          </router-link>
          <button type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">
            登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
// seed data:模擬API回傳的內容，此為假資料(預設資料)
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
  data() {
    return {
      // 這是在使用者未登入的情況下，Navbar 預設的空資料，他的登入狀態是 false，一旦接受到外部資料，這組 currentUser 就會被覆寫。
      currentUser: {
        id: -1,
        name: '',
        email: '',
        image: '',
        isAdmin: false // 使用者具有管理員權限 or not
      },
      isAuthenticated: false // 登入 or not
    }
  },
  methods: {
    // 會向後端API拉取資料
    fetchUser() {
      this.currentUser = {
        ...this.currentUser, // 類似預設值
        ...dummyUser.currentUser // 後面會覆蓋過前面的資料，有重複覆蓋，沒覆蓋則保留預設值
      }
      this.isAuthenticated = dummyUser.isAuthenticated
    }
  },
  created() {
    console.log('fetchUser')
    this.fetchUser()
  }

}
</script>