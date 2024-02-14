import axios from "axios";

const baseUrl = "/api/article";

const getArticlesByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${baseUrl}/category?category=${category}`
    );
    return response.data.filter((article) => article.urlToImage !== null);
  } catch (error) {
    throw error;
  }
};

const getArticleById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/id?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const articleService = {
  getArticlesByCategory,
  getArticleById,
};

export default articleService;
