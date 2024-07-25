import Layout from "@/layout/index.vue";

export const authMenu = [
    {
        path: '/auth',
        component: Layout,
        hidden: false,
        permissions: ['auth:user:edit'],
        meta: {title: '权限系统', activeMenu: '/auth', icon: 'star'},
        children: [
            {
                path: 'user-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                name: 'userManage',
                meta: {title: '用户管理', activeMenu: '/auth/user-manage', icon: 'star1'}
            }
        ]
    },
    // {
    //     path: '/auth',
    //     component: Layout,
    //     hidden: false,
    //     permissions: ['auth:role:edit'],
    //     meta: {title: '权限系统', activeMenu: '/auth', icon: 'star'},
    //     children: [
    //         {
    //             path: 'role-manage',
    //             component: () => import('@/views/platform/gameManage/index.vue'),
    //             name: 'userManage',
    //             meta: {title: '角色管理', activeMenu: '/auth/role-manage', icon: 'star1'}
    //         }
    //     ]
    // }
]