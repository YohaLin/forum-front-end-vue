<template>
  <div class="container py-5">
    <!-- 因為是表單，所以v-on要寫在form的tag中 -->
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username"
          required autofocus>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control" placeholder="Password"
          autocomplete="current-password" required>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>



<!--  v-model來雙向綁定，取得使用者的資料(email, password) -->
<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit() {
      // 向後端伺服器驗證使用者資料，要寫一個方法來處理把資料送給後端，送給後端的資料要用JSON格式
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      console.log('data', data)
    }
  }
}
</script>