import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  // 取得目前登入的使用者資料
  getCurrentUser(){
    return apiHelper.get('/get_current_user', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 取得特定使用者的資料
  get({userId}){
    return apiHelper.get(`/users/${userId}`)
  },
  // 新增用post
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`)
  },
  // 刪除用delete
  deleteFavorite({restaurantId}) {
    console.log(restaurantId)
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  // 新增用post
  addLike({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`)
  },
  // 刪除用delete
  deleteLike({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`)
  },
  getTopUsers(){
    return apiHelper.get('users/top')
  },
  // 新增用post
  addFollowing({userId}) {
    return apiHelper.post(`/following/${userId}`)
  },
  // 刪除用delete
  deleteFollowing({userId}) {
    return apiHelper.delete(`/following/${userId}`)
  },
}