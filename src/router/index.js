import Vue from 'vue'
// import了vue-router套件
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Restaurants from '../views/Restaurants.vue'
import store from './../store'

Vue.use(VueRouter)

const authorizeIsAdmin = (to, from, next) => {
      console.log(to, from)
      const currentUser = store.state.currentUser
      if(currentUser && !currentUser.isAdmin) {
        next('/not-found')
        return
      }
      next()
    }

// 不同的路由，讓使用者看到不同的組件是什麼，注意形式是 陣列 X 物件 [ {...},{...},{...} ]
const routes = [
  {
    // 當使用者直接到網站的 / 位置時，還是可以自動轉到 /restaurants，看到餐廳列表。
    path: '/',
    name: 'root',
    redirect: '/signin',
    beforeEnter:(to) => {
      console.log(to)
    }
  },
  {
    path: '/signin', // 網址字串
    name: 'sign-in', // 可以省略，如果路由有命名，在某些情況下也可以透過 name 屬性來指派路由
    component: SignIn // Vue 元件的名稱
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp
  },
  {
    // 類似首頁的話，用靜態路由
    path: '/restaurants',
    name:'restaurants',
    component: Restaurants
  },
  {
    // 因為並非每個使用者都會進入頁面，所以用動態路由
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    // 利用動態載入的方式，這樣的寫法可以減少不必要的流量：如果使用者沒有到達這裡、那就不用預先載入這頁的組件內容。
    component: () => import('../views/RestaurantsFeeds.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-top',
    component: () => import('../views/RestaurantsTop.vue')
  },
  // 製作個別的餐廳路由 => 用動態路由，記得因為是動態的，所以建立路由的時候要放到feeds, top之後～～～！
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashBoard.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/admin',
    exact: true, // 完全匹配到才會走這條路徑
    redirect: '/admin/restaurants',
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path:'/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authorizeIsAdmin
  },
   // 因為是由上往下匹配的，所以以上都沒有匹配到，才會渲染NotFound.vue，所以要放在最下面，寫*字號：表示所有網址，也就是說不管使用者輸入什麼，只要找不到對應網頁，最後就會返回 NotFound 這個頁面。
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  // mode分兩種：history, hash mode
  // mode: 'history', // 在沒有後端伺服器的情況下，使用history mode，當使用者的網誌輸入http://.../about，這時候就會找不到，因為有前端框架的原因，只會知道要從根目錄開始渲染，不能跳過根目錄直接取得about頁面的資料！
  linkExactActiveClass: 'active', // 將.router-link-exact-active改成 .active，就可以取得bs的樣式，修改class name的概念
  routes
})

router.beforeEach(async (to, from, next) => {
  // 從localStorage 取出 token
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token

  let isAuthenticated = store.state.isAuthenticated
  // (1)有token & (2)存在store中的token不一樣時 的情況下才向後端驗證
  if(token && token !== tokenInStore) {
    isAuthenticated  = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['sign-in', 'sign-up']

  // 如果token無效，則轉址到登入頁， 沒有後面to.name的判斷式會造成無窮迴圈
  if(!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)){
    next('/signin')
    return
  }

  // 如果token有效，則轉址到餐廳論壇頁， to.name...沒有這句會造成無窮迴圈
  if(isAuthenticated && pathsWithoutAuthentication.includes(to.name)){
    next('/restaurants')
    return
  }
  next()
})

export default router


// Vue Router 透過監聽 window.onhashchange 事件來處理這種路徑，當路徑從 http://localhost:8000/#/ 切換到 http://localhost:8000/#/about 的時候，就會觸發 onhashchange 事件，此時 Vue 就會重新渲染對應的元件。