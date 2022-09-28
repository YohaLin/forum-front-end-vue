// 後台相關的路由

import { apiHelper } from "./../utils/helpers";
// toke已經存在localStorage了，直接取用
const getToken = () => localStorage.getItem('token')

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    }
  },
  restaurants: {
    // 取得餐廳的詳細資料
    getDetail({restaurantId}){
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    },
    // formData 可以把整個表單的內容打包
    create({formData}){
      return apiHelper.post('/admin/restaurants', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    },
    // 更新資料要用put
    update({restaurantId, formData}){
      return apiHelper.put(`/admin/restaurants/${restaurantId}`,formData,{
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    },
  }
}