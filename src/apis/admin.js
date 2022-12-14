// 後台相關的路由
import { apiHelper } from "./../utils/helpers"

export default {
  categories: {
    get() {
      return apiHelper.get('/admin/categories')
    },
    create({name}){
      return apiHelper.post('/admin/categories', {name})
    },
    update({categoryId, name}){
      return apiHelper.put(`/admin/categories/${categoryId}`, {name})
    },
    delete({categoryId}){
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    }
  },
  restaurants: {
    get(){
      return apiHelper.get('/admin/restaurants')
    },
    // 取得餐廳的詳細資料
    getDetail({restaurantId}){
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    // formData 可以把整個表單的內容打包
    create({formData}){
      return apiHelper.post('/admin/restaurants', formData)
    },
    // 更新資料要用put
    update({restaurantId, formData}){
      return apiHelper.put(`/admin/restaurants/${restaurantId}`,formData)
    },
    delete({restaurantId}){
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    }
  }
}