import qs from 'qs'
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
// 注：qs，使用axios，必须得安装 qs，所有的Post 请求，我们都需要 qs,对参数进行序列化。

// let root = `${window.location.origin}`;
let root = `http://rap2api.taobao.org/app/mock/222209`

// axios 配置
axios.defaults.timeout = 30000;//请求超时的时间段
axios.defaults.baseURL = root;//接口请求地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//post请求头....

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


//返回状态判断
axios.interceptors.response.use((res) => {
    return res;
}, (error) => {
    return Promise.reject(error);
});

function get(url,params,loadingVisible){
    let loadingInstance  = loadingVisible && Vue.prototype.$loading({
        text: '正在加载...'
    })
    return new Promise((resolve, reject) => {
        let link = params ? '?' + qs.stringify(params) : ''
        axios.get(`${url}${link}`).then(response => {
            loadingInstance && loadingInstance .close()
            resolve(response.data);
        }, err => {
            loadingInstance && loadingInstance .close()
            reject(err.data);
        }).catch((error) => {
            loadingInstance && loadingInstance .close()
            reject(error.data)
        })
    })
}

function post(url, params,loadingVisible) {
    let loadingInstance  = loadingVisible && Vue.prototype.$loading({
        text: '正在加载...'
    })
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            loadingInstance && loadingInstance .close()
            resolve(response.data);
        }, err => {
            loadingInstance && loadingInstance .close()
            reject(err.data);
        }).catch((error) => {
            loadingInstance && loadingInstance .close()
            reject(error.data)
        })
    })
}

export default {
    getLinkage(params,loadingVisible=true){
        return post('/linkage/get',params,loadingVisible)
    },
    publish(params,loadingVisible=true){
        return post('/publish/get',params,loadingVisible)
    }
}