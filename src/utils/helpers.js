import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

// .create , .mixin都是客製化的設定
// 建立baseURL，之後要取得API網址更簡潔
 export const apiHelper = axios.create({
  baseURL
})

// 想取得API網址的寫法：axios.get('/restaurants')



export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', // 顯示的位置
  showConfirmButton: false, // 要不要顯示確認按鈕
  timer: 3000 // 顯示時間
})

// 想使用彈跳視窗的方法：
// Toast.fire({
//   icon: 'success',
//   title: 'Signed in successfully'
// })