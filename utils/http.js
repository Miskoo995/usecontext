import axios from "axios";
import forResponse from "./forResponse";
class InitHTTP {
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:3000/v1",
    });
  }
  get(start, limit) {
    return forResponse(this.http.get(`/cryptocurrency/listings/latest?start=${start}&limit=${limit}`));
  }
}
const http = new InitHTTP();
export default http;
