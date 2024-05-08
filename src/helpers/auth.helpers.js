import Cookies from "js-cookie";

export const setToken = (token) => {
  if (token) {
    Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
  }
};

export const removeToken = () => {
  Cookies.remove("jwt");
};

export const getAllCookies = () => {
  return Cookies.get();
};

export const getToken = () => {
  return Cookies.get("jwt");
};
