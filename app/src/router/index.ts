import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Groups from '../views/Group/Groups.vue';
import Group from '../views/Group/Group.vue';
import Game from '../views/Game/Game.vue';
import CreateGroup from '../views/Group/CreateGroup.vue';
import CreateGame from '../views/Game/CreateGame.vue';
 
const routes = [
    {
        path: '/',
        name: "home",
        component: Home 
    },
    {
        path: '/groups',
        name: "groups",
        component: Groups 
    },
    {
        path: '/group/create',
        name: "create-group",
        component: CreateGroup
    },
    {
        path: "/group/:slug/games",
        name: "group-games",
        component: Group
    },
    {
        path: '/group/:slug/create-game',
        name: "create-game",
        component: CreateGame
    },
    {
        path: '/game/:slug/pages',
        name: "game-pages",
        component: Game
    }
]
  
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const userTokens = getFromLocalStorage("user_tokens");

    if (userTokens && userTokens.access_token !== undefined) {
        // is logged
        if (to.name === "home") {
            next({ name: 'groups' });
        }
        next();
    } else {
        // is anonymous
        // if(to.name !== 'home') {
        //     next({ name: 'home' });
        // }

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