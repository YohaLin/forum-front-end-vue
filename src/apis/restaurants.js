import { apiHelper } from "./../utils/helpers";
// toke已經存在localStorage了，直接取用
const getToken = () => localStorage.getItem('token')

export default {
  //基本上使用這個方法已經可以撈到所有餐廳資料，還可以帶入參數
  getRestaurants({page, categoryId}){
    // 透過JS內建的方法來取得使用者給予的路由參數
    const searchParams = new URLSearchParams({ page, categoryId})
    // 第一個參數：路由；第二個參數：request設定
    return apiHelper.get(`/restaurants?${searchParams.toString()}`,{
      // JWT裡面內建的取得token的方法
      headers: { Authorization: `Bearer ${getToken()}`}
    })
  },
  getFeeds(){
    return apiHelper.get('/restaurants/feeds')
  }
}