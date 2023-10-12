// Set config defaults when creating the instance
import axios from "axios";
// import qs from "qs";


const myAxios = axios.create({
    // baseURL: 'http://localhost:8085/api',
    baseURL: 'https://friendback.chenkai.fun/api'
    //baseURL: 'https://friendsback.chenkai.fun/api'
    //baseURL: 'http://friendsback.chenkai.fun/api'
});

// Alter defaults after instance has been created
// myAxios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

myAxios.defaults.withCredentials = true;
// myAxios.defaults.
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log("我接收到请求啦",config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data?.code == 40100){
        const redirectUrl = window.location.href;
        window.location.href = `/#/user/login?redirect=${redirectUrl}`;
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
