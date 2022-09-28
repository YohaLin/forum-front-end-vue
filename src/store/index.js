// 由vuex自動安裝的套件：index.js(狀態管理)
import Vue from 'vue'
import Vuex from 'vuex'
// 記得還是要引入API路徑
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 類似vue中的data
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  // 用來修改state的方法：只拿來修改state的methods
  mutations: {
    setCurrentUser(state, currentUser){
      state.currentUser = {
        // 由state取得
        ...state.currentUser,
        // 由API取得，覆蓋state.currentUser
        ...currentUser
      }

      // 如果有辦法取得API資料，代表已經驗證過了
      state.isAuthenticated = true
      // 在使用者第一次驗證 token 後，我們把該 token 儲存在這裡
      state.token = localStorage.getItem('token')
    },
    // 製作登出功能
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出後把token移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 透過API來請求資料
  actions: {
    // 回傳boolean給 /router/index.js 的router.beforeEach
    async fetchCurrentUser({commit}) {
      try{
        const { data } = await userAPI.getCurrentUser()
        const { id, name, email, image, isAdmin} = data
        commit('setCurrentUser', {
          id, name, email, image, isAdmin
        })

        if(data.status === 'error'){
          throw new Error(data.message)
        }
        return true
      } catch(error) {
        console.error(error.message)
        // 登入有問題的時候就直接把使用者登出
        this.commit('revokeAuthentication')
        return false
      }
    }
  },
  // 拆檔的概念
  modules: {
  }
})
