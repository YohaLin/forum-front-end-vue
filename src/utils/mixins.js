// 因為這個區塊在三隻檔案都出現，所以直接定義在一隻檔案就好
import moment from 'moment'

// 記得把他export出來
export const fromNowFilter = {
 filters: {
    fromNow(dateTime){
      return dateTime ? moment(dateTime).fromNow() : '-'
    }
  }
}

// 照片跑不出來或無，就使用假圖片
export const emptyImageFilter = {
  filters: {
    emptyImage (src) {
      return src || 'https://fakeimg.pl/350x220/DFDFDF/?text=No+Image'
    }
  }
}
