import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});


axiosClient.interceptors.request.use(
    (config) => {
        // Lấy access token từ localStorage
        const accessToken = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


axiosClient.interceptors.response.use(
    (response) => response, // Nếu thành công, trả về dữ liệu như bình thường
    async (error) => {
        console.log(error.response)
        // Nếu lỗi 401 (Unauthorized) do access token hết hạn
        if (error.response && error.response.status === 401) {
            console.warn("Access token hết hạn. Đang thực hiện refresh token...");
            // alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
