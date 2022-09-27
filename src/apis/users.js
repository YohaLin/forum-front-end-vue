import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  // 新增用post
  addFavorite({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteFavorite({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 新增用post
  addLike({restaurantId}) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteLike({restaurantId}) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  getTopUsers(){
    return apiHelper.get('users/top', {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 新增用post
  addfollowing({userId}) {
    return apiHelper.post(`/following/${userId}`, null, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  // 刪除用delete
  deleteFollowing({userId}) {
    return apiHelper.delete(`/following/${userId}`, {
      header: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
}