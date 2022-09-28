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
    return apiHelper.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 新增用post
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteFavorite({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 新增用post
  addLike({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteLike({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  getTopUsers(){
    return apiHelper.get('users/top', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 新增用post
  addFollowing({userId}) {
    return apiHelper.post(`/following/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteFollowing({userId}) {
    return apiHelper.delete(`/following/${userId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
}