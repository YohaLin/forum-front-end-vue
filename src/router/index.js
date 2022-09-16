import Vue from 'vue'
// import了vue-router套件
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Restaurants from '../views/Restaurants.vue'

Vue.use(VueRouter)

// 不同的路由，讓使用者看到不同的組件是什麼，注意形式是 陣列 X 物件 [ {...},{...},{...} ]
const routes = [
  {
    // 當使用者直接到網站的 / 位置時，還是可以自動轉到 /restaurants，看到餐廳列表。
    path: '/',
    name: 'root',
    redirect: '/restaurants'
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

export default router


// Vue Router 透過監聽 window.onhashchange 事件來處理這種路徑，當路徑從 http://localhost:8000/#/ 切換到 http://localhost:8000/#/about 的時候，就會觸發 onhashchange 事件，此時 Vue 就會重新渲染對應的元件。