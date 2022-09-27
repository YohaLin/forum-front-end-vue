import { apiHelper } from './../utils/helpers'

export default {
  // 帶入需要的參數
  signIn({email, password}) {
    // post, get取決於你要怎麼向後端抓資料，return為Promise，但由該頁面去做.then的動作
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}