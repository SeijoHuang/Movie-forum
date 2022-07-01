import { apiHelper } from "../utils/helpers";

export default {
  getLatest(){
    return apiHelper.get("/movie/latest")
  }
}