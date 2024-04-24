import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

// Thêm một bộ đón chặn request
instance.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
instance.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    const { data, status, config } = error.response;

    if (status === 400 && config.url === "/auth/signup") {
      throw new Error(data);
    }
    return Promise.reject(error);
  }
);

export default instance;
