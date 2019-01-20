import { HTTP } from '../utils/http.js';


class SearchModel extends HTTP {
  search(q, start = 0, count = 20) {
    return this.request({
      url: `search`,
      // method: "POST",
      data: {
        q,
        start,
        count
      }
    })
  }

}

export {
  SearchModel
}
