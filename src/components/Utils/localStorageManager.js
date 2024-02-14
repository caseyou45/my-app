const setUser = (user) => {
  if (user) window.localStorage.setItem("newscycle", JSON.stringify(user));
};

const getUser = () => {
  const user = window.localStorage.getItem("newscycle");
  if (user) return JSON.parse(user);
};

const removeUser = () => {
  window.localStorage.removeItem("newscycle");
};

const getUserToken = () => {
  const user = getUser();
  if (user) return user.accessToken;
};

const localStorageManager = {
  setUser,
  getUser,
  removeUser,
  getUserToken,
};

export default localStorageManager;
