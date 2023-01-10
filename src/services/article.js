import axios from "axios";
const baseUrl = "/api/article";

const articlesByCategory = async (category) => {
  try {
    const response = await axios.get(
      baseUrl + "/category?category=" + category
    ); //makes API call to get news from backend by category
    return response.data.filter((el) => el.urltoimage !== null); //filters out any articles that do not have pictures
  } catch (error) {
    return error;
  }
};

const articleById = async (id) => {
  try {
    const response = await axios.get(baseUrl + "/id?id=" + id); //makes API call to get one article from backend by id
    return response.data;
  } catch (error) {
    return error;
  }
};

export default { articlesByCategory, articleById };
