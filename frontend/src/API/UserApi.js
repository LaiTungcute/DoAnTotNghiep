import axiosClient from "./Config";

const userApi = {
  register(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
};

export default userApi;
