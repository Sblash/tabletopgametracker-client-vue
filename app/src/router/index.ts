import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../Home.vue';
 
const routes = [
    {
        path: '/',
        name: "home",
        component: Home 
    },
]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
    // console.log(to)
    const userTokens = getFromLocalStorage("user_tokens");

    if (userTokens && userTokens.access_token !== undefined) {
        // is logged
        if (to.name === "home") {
            next({ name: 'groups' });
        }
        next();
    } else {
        // is anonymous
        if(to.name !== 'home') {
            next({ name: 'home' });
        }

        next();
    }
  });

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

export default router