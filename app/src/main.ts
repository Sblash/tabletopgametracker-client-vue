import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import BootstrapVue3 from 'bootstrap-vue-3';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import './assets/global.css';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_BASE_URL + "api/";

const userTokens = getFromLocalStorage("user_tokens");

if (userTokens) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userTokens.access_token;
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.config.url.includes('refresh-token')) {
        removeItemLocalStorage("user_tokens");
        window.location.reload();
    }

    return Promise.reject(error);
});

  // Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) => axios.post(
    'refresh-token',
    {},
    {
      headers: {'Authorization': 'Bearer ' + userTokens.refresh_token}
    }
).then(tokenRefreshResponse => {
    userTokens.access_token = tokenRefreshResponse.data.access_token
    setItemLocalStorage("user_tokens", userTokens);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access_token;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access_token;
    return Promise.resolve();
}).catch(error => {
    removeItemLocalStorage("user_tokens");

    // router.push('/')
});

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic)

function getFromLocalStorage(key: string) {
    const res: any = localStorage.getItem(key)
    let tokens = undefined
    try {
      tokens = JSON.parse(res)
    } catch(e) {
      console.log("ERROR_getFromLocalStorage", e)
      tokens = undefined
    }
    return tokens
}

function setItemLocalStorage(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeItemLocalStorage(key: string) {
    localStorage.removeItem(key);
}

const app = createApp(App);

app.use(router);
app.use(BootstrapVue3);

app.mount('#app');
