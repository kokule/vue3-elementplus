import Layout from "@/layout/index.vue";

export const cpMenu = [
    {
        path: '/cp',
        component: Layout,
        hidden: false,
        permissions: ['cp:user:edit'],
        meta: {title: '系统', activeMenu: '/cp', icon: 'star'},
        children: [
            {
                name: 'cpUserManage',
                path: 'cp-user-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                meta: {title: '用户管理', activeMenu: '/cp/cp-user-manage', icon: 'star1'}
            },
            {
                name: 'cpRoleManage',
                path: 'cp-role-manage',
                component: () => import('@/views/platform/gameManage/index.vue'),
                meta: {title: '角色管理', activeMenu: '/cp/cp-role-manage', icon: 'star1'}
            }
        ]
    }
]