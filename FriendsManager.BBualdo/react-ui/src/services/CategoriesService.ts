import { url } from "@/config/config";
import { Category } from "@/models/Category";
import axios from "axios";

class CategoriesService {
  async GetCategories(): Promise<Category[]> {
    return (await axios.get(url + "/categories")).data as Category[];
  }
}

export default new CategoriesService();
