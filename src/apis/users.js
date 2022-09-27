import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  // 新增用post
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorites/${restaurantId}`, null, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteFavorite({restaurantId}) {
    return apiHelper.delete(`/favorites/${restaurantId}`, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}