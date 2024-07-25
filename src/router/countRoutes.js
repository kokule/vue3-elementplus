import Layout from "@/layout/index.vue";

export const countMenu = [
    {
        path: '/recharge',
        component: Layout,
        hidden: false,
        permissions: ['recharge:user:edit'],
        meta: {title: '充值类', activeMenu: '/recharge', icon: 'money'},
        children: [
            {
                path: 'comprehensive-recharge',
                component: () => import('@/views/recharge/comprehensiveRecharge'),
                name: 'comprehensiveRecharge',
                meta: {title: '综合充值', activeMenu: '/recharge/comprehensive-recharge', icon: 'education1'}
            },
            {
                path: 'count-by-day',
                component: () => import('@/views/recharge/countByDay'),
                name: 'countByDay',
                meta: {title: '数据按日统计', activeMenu: '/recharge/count-by-day', icon: 'education1'}
            },
            {
                path: 'count-by-server',
                component: () => import('@/views/recharge/countByServer'),
                name: 'countByServer',
                meta: {title: '充值按区服统计', activeMenu: '/recharge/count-by-server', icon: 'education1'}
            },
        ]
    }
]