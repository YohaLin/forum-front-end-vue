<template>
  <div class="container py-5">
    <!-- 因為是表單，所以v-on要寫在form的tag中 -->
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>



<!--  v-model來雙向綁定，取得使用者的資料(email, password) -->
<script>
import authorization from "../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false, // 使用者點擊是否正在處理
    };
  },
  methods: {
    async handleSubmit() {
      // 向後端伺服器驗證使用者資料，要寫一個方法來處理把資料送給後端，送給後端的資料要用JSON格式
      // const data = JSON.stringify({
      //   email: this.email,
      //   password: this.password
      // })
      // console.log('data', data)

      try {
        // 如果 email 或 password 為空，則使用 Toast 提示
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "error",
            title: "請填入 email 和 password",
          });
          // 然後 return 不繼續往後執行
          return;
        }

        // 表示正在等待伺服器回應
        this.isProcessing = true;

        //首次成功向後端取得資料
        const response = await authorization.signIn({
          email: this.email,
          password: this.password,
        });
        // 取得 API 請求後的資料
        const { data } = response;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 呼叫vuex中的mutations方法，把使用者資會存到vuex的state中
        this.$store.commit('setCurrentUser', data.user)
        
        // 成功登入後轉址到餐廳首頁；因為成功登入就會轉址，所以不用還原 isProcessing 的狀態
        this.$router.push("/restaurants");
      } catch (error) {
        // 只要漏填或是填錯都會走到catch得到錯誤訊息
        // 將密碼欄位清空
        this.password = "";
        // 顯示錯誤提示
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
        this.isProcessing = false;
        console.log(error);
      }
    },
  },
};
</script>