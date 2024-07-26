import Layout from "@/layout/index.vue";

export const countMenu = [
    {
        path: '/search',
        component: Layout,
        hidden: false,
        permissions: ['search:user:edit'],
        meta: {title: '查询类', activeMenu: '/search', icon: 'star'},
        children: [
            {
                name: 'userInfo',
                path: 'user-info',
                component: () => import('@/views/count/recharge/comprehensiveRecharge'),
                meta: {title: '查询用户资料', activeMenu: '/search/user-info', icon: 'education1'}
            },
            {
                name: 'deviceNumber',
                path: 'device-number',
                component: () => import('@/views/count/search/device-number'),
                meta: {title: '设备号查询', activeMenu: '/search/device-number', icon: 'education1'}
            }
        ]
    },
    {
        path: '/register',
        component: Layout,
        hidden: false,
        permissions: ['register:user:edit'],
        meta: {title: '注册类', activeMenu: '/register', icon: 'star'},
        children: [
            {
                name: 'registerRetention',
                path: 'register-retention',
                component: () => import('@/views/count/register/register-retention/index.vue'),
                meta: {title: '注册留存率', activeMenu: '/register/register-retention', icon: 'education1'}
            },
            {
                name: 'createRoleRetention',
                path: 'create-role-retention',
                component: () => import('@/views/count/register/create-role-retention/index.vue'),
                meta: {title: '创角留存率', activeMenu: '/register/create-role-retention', icon: 'education1'}
            }
        ]
    },

    {
        path: '/recharge',
        component: Layout,
        hidden: false,
        permissions: ['recharge:user:edit'],
        meta: {title: '充值类', activeMenu: '/recharge', icon: 'money'},
        children: [
            {
                name: 'comprehensiveRecharge',
                path: 'comprehensive-recharge',
                component: () => import('@/views/count/recharge/comprehensiveRecharge/index.vue'),
                meta: {title: '综合充值', activeMenu: '/recharge/comprehensive-recharge', icon: 'education1'}
            },
            {
                name: 'countByDay',
                path: 'count-by-day',
                meta: {title: '数据按日统计', activeMenu: '/recharge/count-by-day', icon: 'education1'},
                component: () => import('@/views/count/recharge/countByDay/index.vue')
            },
            {
                name: 'countByServer',
                path: 'count-by-server',
                meta: {title: '充值按区服统计', activeMenu: '/recharge/count-by-server', icon: 'education1'},
                component: () => import('@/views/count/recharge/countByServer/index.vue')
            },
        ]
    }
]