import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import ContactFormView from '../view/ContactFormView.vue'

const routes = [
    {
        path: '/calculate',
        name: 'home',
        component: HomeView
    },
    {
        path: '/contactform',
        name: 'contactform',
        component: ContactFormView,

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        //component: () => import(/* webpackChunkName: "about" */ '../views/ContactFormView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
