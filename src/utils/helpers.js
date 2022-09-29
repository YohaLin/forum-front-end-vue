import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL
})

//在呼叫API之前就先驗證token
axiosInstance.interceptors.request.use(config => {
  // 從 localStorage 將 token 取出
  const token = localStorage.getItem('token')

  // 如果 token 存在的話，則帶入到 headers 當中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, err => Promise.reject(err))

// .create , .mixin都是客製化的設定
// 建立baseURL，之後要取得API網址更簡潔
export const apiHelper = axiosInstance

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