import { HTTP } from '../utils/http.js';


class FindModel extends HTTP {
  find(moveType, start = 0, count = 20) {
    return this.request({
      url: `${moveType}`,
      data: {
        start,
        count
      }
    })
  }
  
}

export {
  FindModel
}
