// import * as VueRouter from "vue-router";
import {createRouter, createWebHashHistory} from "vue-router";

import Index from "../views/Index.vue";

import SearchPage from "../views/Searchpage.vue";
import SearchByTagpage from "../views/SearchByTagpage.vue";

import Team from "../views/Team.vue";
import TeamAddPage from "../views/TeamAddPage.vue";
import TeamUpdatePage from "../views/TeamUpdatePage.vue";

import User from "../views/User.vue";
import EditUserPage from "../views/EditUserPage.vue";
import UserEditPage from "../views/UserEditPage.vue"
import UserLoginPage from "../views/LoginPage.vue";
import UserTeamCreatePage from "../views/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../views/UserTeamJoinPage.vue";


const routes = [
    { path: '/',title:'伙伴匹配', component: Index },
    // { path: '/index', component: Index }

    { path: '/search', title:'标签搜索', component: SearchPage},
    { path: '/search/userByTag', title:'标签搜索结果', component: SearchByTagpage},

    { path: '/team', title:'队伍', component: Team },
    { path: '/team/add', title:'添加队伍', component: TeamAddPage },
    { path: '/team/update', title:'更新队伍', component: TeamUpdatePage },

    { path: '/user', title:'个人信息', component: User },
    { path: '/user/update:', title:'基本信息', component: UserEditPage},
    { path: '/user/edit:', title:'修改信息', component: EditUserPage},
    { path: '/user/login', title:'登入', component: UserLoginPage},
    { path: '/user/team/create', title:'已创建队伍', component: UserTeamCreatePage},
    { path: '/user/team/join', title:'已加入队伍', component: UserTeamJoinPage},



]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});
export {routes};
export default router;//导出一下
