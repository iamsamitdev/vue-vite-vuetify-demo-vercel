import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Product from '@/views/Product.vue'
import Order from '@/views/Order.vue'
import Report from '@/views/Report.vue'
import Setting from '@/views/Setting.vue'

const routes: Array<RouteRecordRaw> = [
    {
         // Default Layout
         path: '/',
         name: 'Defalut',
         component: DefaultLayout,
         children: [
            {
                path: '/',
                redirect: '/dashboard'
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    // title: 'Dashboard',
                    header: 'menu_dashboard'
                }
            },
            {
                path: '/product',
                name: 'Product',
                component: Product,
                meta: {
                    // title: 'Product',
                    header: 'menu_product'
                }
            },
            {
                path: '/order',
                name: 'Order',
                component: Order,
                meta: {
                    // title: 'Order',
                    header: 'menu_order'
                }
            },
            {
                path: '/report',
                name: 'Report',
                component: Report,
                meta: {
                    // title: 'Report',
                    header: 'menu_report'
                }
            },
            {
                path: '/setting',
                name: 'Setting',
                component: Setting,
                meta: {
                    // title: 'Setting',
                    header: 'menu_setting'
                }
            }
        ]
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.URL),
    routes
})

// router.beforeEach((to, _, next) => {

//     if(typeof(to.meta.title) == 'string'){
//         document.title = to.meta.title
//     }

//     next()
// })

export default router