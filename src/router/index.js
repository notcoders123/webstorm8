import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/views/index";
import Login from "@/views/login";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },

    {
        path: '/index',
        name: 'index',

        component:index,
        // component: () => import('@/views/home/Home.vue'),
        meta: {
            title: '主页',
        }
    },

]

const router = new VueRouter({
    mode:'history',
    routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router